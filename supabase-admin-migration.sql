-- BoF Scoring — Admin audit + week-lock bypass migration
-- Run this in: Supabase > SQL Editor > New query

-- ═══════════════════════════════════════════════════
-- 1. Add updated_by to live tables
-- ═══════════════════════════════════════════════════

ALTER TABLE game_results
  ADD COLUMN IF NOT EXISTS updated_by TEXT;

ALTER TABLE allstars
  ADD COLUMN IF NOT EXISTS updated_by TEXT;

-- ═══════════════════════════════════════════════════
-- 2. Add changed_by to history table
-- ═══════════════════════════════════════════════════

ALTER TABLE game_results_history
  ADD COLUMN IF NOT EXISTS changed_by TEXT;

-- ═══════════════════════════════════════════════════
-- 3. Update audit trigger to capture who made the change
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION log_game_result_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO game_results_history (
    game_key, operation,
    old_score_a, old_score_b, old_winner,
    new_score_a, new_score_b, new_winner,
    changed_by
  ) VALUES (
    COALESCE(NEW.game_key, OLD.game_key),
    TG_OP,
    OLD.score_a,  OLD.score_b,  OLD.winner,
    NEW.score_a,  NEW.score_b,  NEW.winner,
    NEW.updated_by
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════
-- 4. Update week lock — authenticated users bypass it
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION enforce_current_week_only()
RETURNS TRIGGER AS $$
DECLARE
  editable INT;
BEGIN
  -- Logged-in admins can edit any week
  IF auth.uid() IS NOT NULL THEN
    RETURN NEW;
  END IF;

  editable := get_editable_week(NEW.division);
  IF NEW.week <> editable THEN
    RAISE EXCEPTION
      'Week % is locked. Only week % is editable for % right now.',
      NEW.week, editable, NEW.division;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
