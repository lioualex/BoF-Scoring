-- BoF Scoring — Archive Summer 2026 season
-- Run this in: Supabase > SQL Editor > New query
--
-- The app now writes fall-season keys ('f26_adv_w1_s0_c1'), so summer rows
-- ('adv_w1_s0_c1') no longer appear in the UI. They are still live in
-- game_results / allstars. This snapshots them into dedicated archive tables
-- so they are clearly labelled and safe from future cleanup.
--
-- Nothing is deleted. Re-running is safe.

CREATE TABLE IF NOT EXISTS game_results_archive (LIKE game_results INCLUDING ALL);
ALTER TABLE game_results_archive ADD COLUMN IF NOT EXISTS season TEXT;

CREATE TABLE IF NOT EXISTS allstars_archive (LIKE allstars INCLUDING ALL);
ALTER TABLE allstars_archive ADD COLUMN IF NOT EXISTS season TEXT;

INSERT INTO game_results_archive
SELECT g.*, 's26'
FROM game_results g
WHERE g.game_key NOT LIKE 'f26\_%'
ON CONFLICT (game_key) DO NOTHING;

INSERT INTO allstars_archive
SELECT a.*, 's26'
FROM allstars a
WHERE a.game_key NOT LIKE 'f26\_%'
ON CONFLICT (game_key) DO NOTHING;

-- Confirm what was archived
SELECT 'game_results' AS table, COUNT(*) FROM game_results_archive WHERE season = 's26'
UNION ALL
SELECT 'allstars', COUNT(*) FROM allstars_archive WHERE season = 's26';
