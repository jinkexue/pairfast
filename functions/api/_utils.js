/** Shared helpers for Pages Functions → D1 */

export function getDb(env) {
  const db = env.DB || env.pairfast || env.PAIRFAST;
  if (!db) {
    throw new Error('D1 binding missing. Set Pages → Settings → Bindings → D1 Variable name to "DB".');
  }
  return db;
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export function options() {
  return json({ ok: true });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function parseJsonField(value, fallback) {
  if (value == null || value === '') return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function mapUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    password: row.password,
    role: row.role,
    permissions: parseJsonField(row.permissions, ['B']),
    avatar: row.avatar || '👤',
    phone: row.phone || ''
  };
}

export function mapGame(row) {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon || '🎯',
    color: row.color || '#6557ff'
  };
}

export function mapPref(row) {
  return {
    slots: parseJsonField(row.slots, []),
    gameIds: parseJsonField(row.game_ids, [])
  };
}

export function mapCarpoolProfile(row) {
  if (!row) return null;
  return {
    lat: row.lat,
    lng: row.lng,
    addressName: row.address_name,
    hasCar: !!row.has_car,
    workTime: row.work_time,
    homeTime: row.home_time,
    workStatus: parseJsonField(row.work_status, ['seeking']),
    homeStatus: parseJsonField(row.home_status, ['seeking'])
  };
}

export function mapCarpoolMatch(row) {
  return {
    id: row.id,
    driverId: row.driver_id,
    riderId: row.rider_id,
    requesterId: row.requester_id,
    status: row.status,
    createdAt: row.created_at
  };
}

export function mapGameMatch(row) {
  return {
    id: row.id,
    matchSlotKey: row.match_slot_key,
    dayKey: row.day_key,
    startT: row.start_t,
    endT: row.end_t,
    durationMins: row.duration_mins,
    gameId: row.game_id,
    userIds: parseJsonField(row.user_ids, []),
    confirmedUserIds: parseJsonField(row.confirmed_user_ids, []),
    status: row.status
  };
}

export async function ensureGameMatchesTable(db) {
  await db.prepare(`
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
    )
  `).run();
}

export async function loadBootstrap(db) {
  await ensureGameMatchesTable(db);

  const [usersRes, gamesRes, prefsRes, profilesRes, cpMatchesRes, gameMatchesRes] = await Promise.all([
    db.prepare('SELECT * FROM users ORDER BY id').all(),
    db.prepare('SELECT * FROM games ORDER BY id').all(),
    db.prepare('SELECT * FROM user_preferences').all(),
    db.prepare('SELECT * FROM carpool_profiles').all(),
    db.prepare('SELECT * FROM carpool_matches').all(),
    db.prepare('SELECT * FROM game_matches').all()
  ]);

  const userGamePreferences = {};
  (prefsRes.results || []).forEach((row) => {
    userGamePreferences[row.user_id] = mapPref(row);
  });

  const carpoolProfiles = {};
  (profilesRes.results || []).forEach((row) => {
    carpoolProfiles[row.user_id] = mapCarpoolProfile(row);
  });

  return {
    users: (usersRes.results || []).map(mapUser),
    games: (gamesRes.results || []).map(mapGame),
    userGamePreferences,
    carpoolProfiles,
    carpoolMatches: (cpMatchesRes.results || []).map(mapCarpoolMatch),
    gameMatches: (gameMatchesRes.results || []).map(mapGameMatch)
  };
}
