-- BoF Scoring — Close out unfinished sets from past game nights
-- Run this in: Supabase > SQL Editor > New query
--
-- Awards any set that was scored but never finished to whichever team led.
-- Going forward the scorer's "End set" button does this at the time.
--
-- Deliberately skipped:
--   * Tied sets — those get played out to a deciding point, never awarded.
--   * Sets still at the 4-4 start — never played, so nothing to award.
--   * The week currently open for each division — tonight's games are still
--     being scored, so they must not be closed out from under the ref. The
--     cutoff uses get_editable_week(), the same function the week lock uses,
--     so it tracks whatever is live rather than a hardcoded date.
--   * Anything outside this season — the f26_ prefix keeps prior seasons out.
--
-- week_lock rejects writes to past weeks, and the SQL editor is not an
-- authenticated user so it cannot use the admin bypass. The trigger is
-- therefore disabled for the length of the transaction only.
--
-- Reversible: the audit trigger records every before/after in
-- game_results_history, and the rows are stamped updated_by '... closed out
-- unfinished sets' so they can be found again.

BEGIN;
ALTER TABLE game_results DISABLE TRIGGER week_lock;

UPDATE game_results
SET winner      = CASE WHEN score_a > score_b THEN 'A' ELSE 'B' END,
    is_complete = TRUE,
    updated_at  = NOW(),
    updated_by  = 'buildwithliou@gmail.com (closed out unfinished sets)'
WHERE starts_with(game_key, 'f26_')
  AND winner IS NULL
  AND score_a <> score_b
  AND NOT (score_a = 4 AND score_b = 4)
  AND week < get_editable_week(division);

ALTER TABLE game_results ENABLE TRIGGER week_lock;
COMMIT;

-- What just changed
SELECT division, week, slot_idx, court, game_key, score_a, score_b, winner
FROM game_results
WHERE updated_by = 'buildwithliou@gmail.com (closed out unfinished sets)'
ORDER BY division, week, slot_idx, court, game_key;
