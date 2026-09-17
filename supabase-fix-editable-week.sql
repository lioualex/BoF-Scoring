-- BoF Scoring — Point the week lock at the Fall 2026 schedule
-- Run this in: Supabase > SQL Editor > New query
--
-- WHY: the week_lock trigger on game_results calls get_editable_week(), which
-- keeps its own copy of the schedule. It still held the Summer dates, so it
-- reported week 7 as editable and rejected every write to week 1. allstars has
-- no such trigger, which is why MVPs saved while scores silently did not.
--
-- Two changes beyond the dates:
--   1. Matches src/data/league.js — "first week on or after today", not
--      "closest week". Closest made the day AFTER game night resolve to the
--      week just played while the app had already advanced, so writes failed.
--   2. Uses Pacific time, not CURRENT_DATE (UTC). Games run ~8pm PT, which is
--      already tomorrow in UTC — the lock would drift mid-game-night.

CREATE OR REPLACE FUNCTION get_editable_week(p_division TEXT)
RETURNS INT AS $$
DECLARE
  game_dates DATE[];
  today      DATE := (NOW() AT TIME ZONE 'America/Los_Angeles')::DATE;
  i          INT;
BEGIN
  IF p_division = 'adv' THEN
    game_dates := ARRAY[
      '2026-09-16'::DATE, '2026-09-23'::DATE, '2026-09-30'::DATE,
      '2026-10-07'::DATE, '2026-10-14'::DATE, '2026-10-21'::DATE,
      '2026-10-28'::DATE
    ];
  ELSE
    game_dates := ARRAY[
      '2026-09-17'::DATE, '2026-09-24'::DATE, '2026-10-01'::DATE,
      '2026-10-08'::DATE, '2026-10-15'::DATE, '2026-10-22'::DATE,
      '2026-10-29'::DATE
    ];
  END IF;

  FOR i IN 1..array_length(game_dates, 1) LOOP
    IF game_dates[i] >= today THEN
      RETURN i;
    END IF;
  END LOOP;

  -- Season over — keep the last week editable
  RETURN array_length(game_dates, 1);
END;
$$ LANGUAGE plpgsql STABLE;

-- Should read 2 for adv (week 1 was 09/16) and 1 for int (09/17) on 2026-09-17
SELECT get_editable_week('adv') AS adv_editable_week,
       get_editable_week('int') AS int_editable_week;
