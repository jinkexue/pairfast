CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  permissions TEXT NOT NULL DEFAULT '["B"]',
  avatar TEXT,
  phone TEXT
);
