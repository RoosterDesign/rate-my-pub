INSERT INTO criteria (name, subtitle, display_order) VALUES
  ('Beer Selection & Prices', NULL, 1),
  ('General Ambience', NULL, 2),
  ('Outdoor Space', NULL, 3),
  ('Entertainment', 'Music, Live Sports, Pool table, Dartboard etc...', 4),
  ('Snack', NULL, 5)
ON CONFLICT DO NOTHING;
