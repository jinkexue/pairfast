CREATE TABLE carpool_profiles (
  user_id TEXT PRIMARY KEY,
  lat REAL NOT NULL DEFAULT 51.0447,
  lng REAL NOT NULL DEFAULT -114.0719,
  address_name TEXT DEFAULT 'Downtown Calgary, AB',
  has_car INTEGER NOT NULL DEFAULT 0,
  work_time TEXT DEFAULT '08:30',
  home_time TEXT DEFAULT '18:00',
  work_status TEXT DEFAULT '["seeking"]',
  home_status TEXT DEFAULT '["seeking"]'
);

CREATE TABLE carpool_matches (
  id TEXT PRIMARY KEY,
  driver_id TEXT NOT NULL,
  rider_id TEXT NOT NULL,
  requester_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_matches (
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
