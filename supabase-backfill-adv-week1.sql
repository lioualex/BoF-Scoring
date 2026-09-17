BEGIN;
ALTER TABLE game_results DISABLE TRIGGER week_lock;

INSERT INTO game_results
  (game_key, division, week, slot_idx, court, team_a_id, team_b_id,
   score_a, score_b, winner, is_complete, updated_at, updated_by)
VALUES
  ('f26_adv_w1_s0_c1','adv',1,0,1,7,3,25,23,'A',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s0_c1_s2','adv',1,0,1,7,3,25,15,'A',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s0_c2','adv',1,0,2,2,5,19,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s0_c2_s2','adv',1,0,2,2,5,25,22,'A',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s1_c1','adv',1,1,1,2,4,25,16,'A',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s1_c1_s2','adv',1,1,1,2,4,25,23,'A',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s1_c2','adv',1,1,2,6,1,21,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s1_c2_s2','adv',1,1,2,6,1,19,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s2_c1','adv',1,2,1,1,5,23,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s2_c1_s2','adv',1,2,1,1,5,24,26,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s2_c2','adv',1,2,2,2,7,15,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)'),
  ('f26_adv_w1_s2_c2_s2','adv',1,2,2,2,7,16,25,'B',TRUE,NOW(),'buildwithliou@gmail.com (backfill)')
ON CONFLICT (game_key) DO UPDATE SET
  score_a = EXCLUDED.score_a, score_b = EXCLUDED.score_b,
  winner  = EXCLUDED.winner,  is_complete = EXCLUDED.is_complete,
  updated_at = EXCLUDED.updated_at, updated_by = EXCLUDED.updated_by;

ALTER TABLE game_results ENABLE TRIGGER week_lock;
COMMIT;

SELECT game_key, team_a_id, team_b_id, score_a, score_b, winner
FROM game_results
WHERE division = 'adv' AND week = 1
ORDER BY game_key;
