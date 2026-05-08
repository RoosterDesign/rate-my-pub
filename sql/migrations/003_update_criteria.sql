-- Rename "Beer Selection & Prices" to "Beer Selection"
UPDATE criteria SET name = 'Beer Selection', display_order = 1 WHERE name = 'Beer Selection & Prices';

-- Shift existing criteria down to make room for "Pricing" at slot 2
UPDATE criteria SET display_order = 3 WHERE name = 'General Ambience';
UPDATE criteria SET display_order = 4 WHERE name = 'Outdoor Space';
UPDATE criteria SET display_order = 5 WHERE name = 'Entertainment';

-- Insert new "Pricing" criterion
INSERT INTO criteria (name, subtitle, display_order) VALUES ('Pricing', NULL, 2);

-- Delete "Snack" (cascades to scores)
DELETE FROM criteria WHERE name = 'Snack';
