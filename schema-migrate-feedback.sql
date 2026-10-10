-- Feedback table + pickleball icon fix (safe to re-run)
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

UPDATE games SET icon = 'pickle', color = '#ff6b00' WHERE id = 'g1';
UPDATE games SET icon = '🏓' WHERE id = 'g2';
