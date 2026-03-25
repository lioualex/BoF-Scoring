-- VolleyScore BoF Spring 2026 — Supabase Schema
-- Run this in your Supabase SQL editor at: Project > SQL Editor > New query

-- ═══════════════════════════════════════════════════
-- CORE TABLES
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS game_results (
  game_key       TEXT PRIMARY KEY,
  division       TEXT NOT NULL,
  week           INT  NOT NULL,
  slot_idx       INT  NOT NULL,
  court          INT  NOT NULL,
  team_a_id      INT  NOT NULL,
  team_b_id      INT  NOT NULL,
  score_a        INT  NOT NULL DEFAULT 4,
  score_b        INT  NOT NULL DEFAULT 4,
  winner         TEXT,          -- 'A', 'B', or NULL
  is_complete    BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS allstars (
  game_key       TEXT PRIMARY KEY,
  division       TEXT NOT NULL,
  week           INT  NOT NULL,
  team_a_allstar TEXT,
  team_b_allstar TEXT,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════
-- AUDIT LOG (immutable history — never loses data)
-- Every insert/update on game_results is appended here.
-- Scores can always be recovered from this table.
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS game_results_history (
  id           BIGSERIAL PRIMARY KEY,
  game_key     TEXT        NOT NULL,
  operation    TEXT        NOT NULL,  -- 'INSERT' or 'UPDATE'
  old_score_a  INT,
  old_score_b  INT,
  old_winner   TEXT,
  new_score_a  INT,
  new_score_b  INT,
  new_winner   TEXT,
  changed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_game_result_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO game_results_history (
    game_key, operation,
    old_score_a, old_score_b, old_winner,
    new_score_a, new_score_b, new_winner
  ) VALUES (
    COALESCE(NEW.game_key, OLD.game_key),
    TG_OP,
    OLD.score_a,  OLD.score_b,  OLD.winner,
    NEW.score_a,  NEW.score_b,  NEW.winner
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS game_results_audit ON game_results;
CREATE TRIGGER game_results_audit
AFTER INSERT OR UPDATE ON game_results
FOR EACH ROW EXECUTE FUNCTION log_game_result_changes();

-- ═══════════════════════════════════════════════════
-- WEEK LOCK (database-level — rejects writes to any
-- week other than the current one, even if the client
-- sends a rogue request)
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_editable_week(p_division TEXT)
RETURNS INT AS $$
DECLARE
  game_dates DATE[];
  today      DATE := CURRENT_DATE;
  i          INT;
  min_diff   INT  := 999;
  closest    INT  := 1;
  diff_days  INT;
BEGIN
  IF p_division = 'adv' THEN
    game_dates := ARRAY[
      '2026-03-25'::DATE, '2026-04-01'::DATE, '2026-04-08'::DATE,
      '2026-04-15'::DATE, '2026-04-22'::DATE, '2026-04-29'::DATE,
      '2026-05-06'::DATE
    ];
  ELSE
    game_dates := ARRAY[
      '2026-03-26'::DATE, '2026-04-02'::DATE, '2026-04-09'::DATE,
      '2026-04-16'::DATE, '2026-04-23'::DATE, '2026-04-30'::DATE,
      '2026-05-07'::DATE
    ];
  END IF;

  FOR i IN 1..array_length(game_dates, 1) LOOP
    diff_days := ABS(today - game_dates[i]);
    IF diff_days < min_diff THEN
      min_diff := diff_days;
      closest  := i;
    END IF;
  END LOOP;

  RETURN closest;
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION enforce_current_week_only()
RETURNS TRIGGER AS $$
DECLARE
  editable INT;
BEGIN
  editable := get_editable_week(NEW.division);
  IF NEW.week <> editable THEN
    RAISE EXCEPTION
      'Week % is locked. Only week % is editable for % right now.',
      NEW.week, editable, NEW.division;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS week_lock ON game_results;
CREATE TRIGGER week_lock
BEFORE INSERT OR UPDATE ON game_results
FOR EACH ROW EXECUTE FUNCTION enforce_current_week_only();

-- ═══════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════

ALTER TABLE game_results         ENABLE ROW LEVEL SECURITY;
ALTER TABLE allstars             ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_all" ON game_results;
DROP POLICY IF EXISTS "public_all" ON allstars;
DROP POLICY IF EXISTS "read_only"  ON game_results_history;

CREATE POLICY "public_all" ON game_results         FOR ALL  USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON allstars             FOR ALL  USING (true) WITH CHECK (true);
CREATE POLICY "read_only"  ON game_results_history FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════
-- REALTIME
-- ═══════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'game_results'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE game_results;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'allstars'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE allstars;
  END IF;
END $$;
