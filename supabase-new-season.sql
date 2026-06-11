-- VolleyScore BoF — New Season Reset
-- Run this in your Supabase SQL editor at: Project > SQL Editor > New query
--
-- This archives the previous season's live data into snapshot tables
-- (the full history already lives in game_results_history, which is
-- never touched) and clears the live tables so the UI starts fresh
-- with the new "Team 1".."Team 8" rosters/schedules.

-- ═══════════════════════════════════════════════════
-- 1. ARCHIVE — snapshot the current season's data
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS game_results_season1 AS
  SELECT * FROM game_results;

CREATE TABLE IF NOT EXISTS allstars_season1 AS
  SELECT * FROM allstars;

-- ═══════════════════════════════════════════════════
-- 2. RESET — clear live tables for the new season
-- (game_results_history retains the full audit trail
-- of every score ever entered and is left untouched)
-- ═══════════════════════════════════════════════════

TRUNCATE TABLE game_results;
TRUNCATE TABLE allstars;
