-- Run this once on existing D1 database if tables were already created without game_matches
CREATE TABLE IF NOT EXISTS game_matches (
  id TEXT PRIMARY KEY,
  match_slot_key TEXT UNIQUE NOT NULL,
  day_key TEXT,
  start_t TEXT,
  end_t TEXT,
  duration_mins INTEGER,
  game_id TEXT,
  user_ids TEXT NOT NULL DEFAULT '[]',
  confirmed_user_ids TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending'
);
