CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  slots TEXT NOT NULL DEFAULT '[]',
  game_ids TEXT NOT NULL DEFAULT '[]'
);
