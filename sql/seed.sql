INSERT INTO criteria (name, subtitle, display_order) VALUES
  ('Beer Selection', NULL, 1),
  ('Pricing', NULL, 2),
  ('General Ambience', NULL, 3),
  ('Outdoor Space', NULL, 4),
  ('Entertainment', 'Music, Live Sports, Pool table, Dartboard etc...', 5),
  ('Staff', 'Friendliness, speedy service, etc...', 6)
ON CONFLICT DO NOTHING;
