INSERT INTO criteria (name, subtitle, display_order) VALUES
  ('Beer Selection', NULL, 1),
  ('Pricing', NULL, 2),
  ('General Ambience', NULL, 3),
  ('Outdoor Space', NULL, 4),
  ('Entertainment', 'Music, Live Sports, Pool table, Dartboard etc...', 5),
  ('Staff', 'Friendliness, speedy service, etc...', 6),
  ('Toilets', 'Cleanliness, stupid door signs, etc...', 7),
  ('Radiators', NULL, 8),
  ('View', 'The view from inside or sat outside the pub', 9),
  ('Bike Facilities', 'Somewhere safe to lock up your bike, or dedicated bike storage', 10)
ON CONFLICT DO NOTHING;
