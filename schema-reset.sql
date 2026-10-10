-- ==========================================================================
-- D1 重置脚本：删除旧表 → 按新结构重建 → 写入种子数据
-- 适用：表已存在但列不完整 / 没有业务数据需要保留
-- 在 Cloudflare D1 Console 中【整份】粘贴执行
-- ==========================================================================

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS game_matches;
DROP TABLE IF EXISTS carpool_matches;
DROP TABLE IF EXISTS carpool_profiles;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  permissions TEXT NOT NULL DEFAULT '["B"]',
  avatar TEXT,
  phone TEXT,
  last_login TEXT
);

CREATE TABLE games (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  slots TEXT NOT NULL DEFAULT '[]',
  game_ids TEXT NOT NULL DEFAULT '[]'
);

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

INSERT INTO users (id, name, password, role, permissions, avatar, phone) VALUES
('u1', 'yqcw', '123456', 'admin', '["A","B","C"]', '👑', '+1 (403) 999-0001'),
('u2', 'Ghai', '123456', 'user', '["B"]', '👨‍💻', '+1 (403) 012-3456'),
('u3', 'CJ', '123456', 'user', '["B"]', '👨‍🎨', '+1 (403) 014-7890'),
('u4', 'Joshua', '123456', 'user', '["B"]', '👨‍💻', '+1 (403) 018-4321');

INSERT INTO games (id, name, icon, color) VALUES
('g1', 'Pickleball (匹克球)', '🏓', '#11b8a6'),
('g2', 'Table Tennis (乒乓球)', '🏓', '#6557ff'),
('g3', 'Billiards (台球)', '🎱', '#ff7a59'),
('g4', 'Board Game (桌游)', '🎲', '#8f7cff'),
('g5', 'Badminton (羽毛球)', '🏸', '#06b6d4');

INSERT INTO user_preferences (user_id, slots, game_ids) VALUES
('u1', '["this-Thu-17:00","this-Thu-17:30"]', '["g1","g2"]'),
('u2', '["this-Thu-17:00","this-Thu-17:30"]', '["g1","g3"]'),
('u3', '["this-Thu-17:00","this-Thu-17:30"]', '["g1","g2"]'),
('u4', '["this-Thu-17:00","this-Thu-17:30"]', '["g2","g4"]');

INSERT INTO carpool_profiles (user_id, lat, lng, address_name, has_car, work_time, home_time, work_status, home_status) VALUES
('u1', 51.0447, -114.0719, 'Downtown Calgary, AB', 1, '08:30', '18:00', '["offering"]', '["offering"]'),
('u2', 51.0550, -114.0850, 'Sunnyside, Calgary, AB', 0, '08:30', '18:00', '["seeking"]', '["seeking"]'),
('u3', 51.0350, -114.0500, 'Beltline, Calgary, AB', 1, '08:30', '18:00', '["offering","seeking"]', '["seeking"]'),
('u4', 51.0800, -114.0600, 'Mount Pleasant, Calgary, AB', 1, '08:30', '18:00', '["offering"]', '["seeking"]');
