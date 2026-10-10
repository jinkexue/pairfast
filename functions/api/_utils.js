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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
    role: row.role,
    permissions: parseJsonField(row.permissions, ['B']),
    avatar: row.avatar || '👤',
    phone: row.phone || '',
    lastLogin: row.last_login || row.lastLogin || null
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
    memberRanges: parseJsonField(row.member_ranges, {}),
    status: row.status
  };
}

export function mapFeedback(row) {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    message: row.message,
    createdAt: row.created_at
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

export async function ensureMatchSchema(db) {
  await ensureGameMatchesTable(db);
  try {
    await db.prepare(`ALTER TABLE game_matches ADD COLUMN member_ranges TEXT NOT NULL DEFAULT '{}'`).run();
  } catch (_) { /* column already exists */ }
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS game_match_optouts (
      user_id TEXT NOT NULL,
      day_key TEXT NOT NULL,
      game_id TEXT NOT NULL,
      start_t TEXT NOT NULL,
      end_t TEXT NOT NULL
    )
  `).run();
}

export async function ensureSessionsTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `).run();
}

export async function ensureUsersTableSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      permissions TEXT NOT NULL DEFAULT '["B"]',
      avatar TEXT,
      phone TEXT,
      last_login TEXT
    )
  `).run();

  try {
    await db.prepare('ALTER TABLE users ADD COLUMN last_login TEXT').run();
  } catch (_) {
    // Column already exists.
  }
}

const SESSION_TTL_MS = 30 * 24 * 3600 * 1000;

export async function createSession(db, userId) {
  await ensureSessionsTable(db);
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  await db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)')
    .bind(token, userId, Date.now()).run();
  return token;
}

export async function deleteSession(db, request) {
  const token = bearerToken(request);
  if (!token) return;
  await ensureSessionsTable(db);
  await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
}

function bearerToken(request) {
  const h = request.headers.get('Authorization') || '';
  const m = h.match(/^Bearer\s+([a-f0-9]{64})$/i);
  return m ? m[1] : null;
}

/** Returns the logged-in user row (mapped) or null. */
export async function getAuthUser(db, request) {
  const token = bearerToken(request);
  if (!token) return null;
  await ensureSessionsTable(db);
  const row = await db.prepare(`
    SELECT u.*, s.created_at AS session_created FROM sessions s
    JOIN users u ON u.id = s.user_id WHERE s.token = ?
  `).bind(token).first();
  if (!row) return null;
  if (Date.now() - Number(row.session_created) > SESSION_TTL_MS) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  return mapUser(row);
}

// --------------------------------------------------------------------------
// Activity Teamup matching
// Slots are absolute: "YYYY-MM-DD|HH:MM" (30-minute granularity).
// Rule: same game + same date + overlapping 30-min slots, >= 2 users.
// Contiguous slots that each have >= 2 users form one session card; every
// user present in any of those slots is a member (overlapping groups merge).
// --------------------------------------------------------------------------
const SLOT_RE = /^(\d{4}-\d{2}-\d{2})\|(\d{2}):(00|30)$/;

function toMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function fromMin(n) {
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
}

function rangesFromMinutes(mins) {
  const sorted = [...mins].sort((a, b) => a - b);
  const out = [];
  let start = null;
  let prev = null;
  for (const m of sorted) {
    if (start === null) { start = m; prev = m; continue; }
    if (m === prev + 30) { prev = m; continue; }
    out.push(`${fromMin(start)}-${fromMin(prev + 30)}`);
    start = m; prev = m;
  }
  if (start !== null) out.push(`${fromMin(start)}-${fromMin(prev + 30)}`);
  return out;
}

export function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

export function buildMatchCandidates(prefsByUser, validGameIds, optouts, today) {
  // bucket[date___game][userId] = Set(minutes)
  const buckets = {};
  for (const [userId, pref] of Object.entries(prefsByUser)) {
    const gameIds = (pref.gameIds || []).filter((g) => validGameIds.has(g));
    if (!gameIds.length) continue;
    for (const raw of pref.slots || []) {
      const m = SLOT_RE.exec(String(raw));
      if (!m) continue;
      const date = m[1];
      if (date < today) continue;
      const minute = Number(m[2]) * 60 + Number(m[3]);
      for (const g of gameIds) {
        const key = `${date}___${g}`;
        (buckets[key] ||= {});
        (buckets[key][userId] ||= new Set()).add(minute);
      }
    }
  }

  // Apply opt-outs: remove the opted range from that user's slots.
  for (const o of optouts) {
    const users = buckets[`${o.day_key}___${o.game_id}`];
    const set = users && users[o.user_id];
    if (!set) continue;
    const s = toMin(o.start_t);
    const e = toMin(o.end_t);
    for (const minute of [...set]) if (minute >= s && minute < e) set.delete(minute);
  }

  const candidates = [];
  for (const [key, users] of Object.entries(buckets)) {
    const [date, gameId] = key.split('___');
    const userIds = Object.keys(users);
    if (userIds.length < 2) continue;
    const slotUsers = new Map();
    for (const u of userIds) {
      for (const minute of users[u]) {
        if (!slotUsers.has(minute)) slotUsers.set(minute, []);
        slotUsers.get(minute).push(u);
      }
    }
    const shared = [...slotUsers.keys()].filter((mm) => slotUsers.get(mm).length >= 2).sort((a, b) => a - b);
    let block = [];
    const flush = () => {
      if (!block.length) return;
      const memberMins = {};
      for (const mm of block) {
        for (const u of slotUsers.get(mm)) (memberMins[u] ||= []).push(mm);
      }
      const members = Object.keys(memberMins).sort();
      const memberRanges = {};
      members.forEach((u) => { memberRanges[u] = rangesFromMinutes(memberMins[u]); });
      const startT = fromMin(block[0]);
      const endT = fromMin(block[block.length - 1] + 30);
      candidates.push({
        matchSlotKey: `${date}___${startT}-${endT}___${gameId}`,
        dayKey: date,
        startT,
        endT,
        durationMins: block.length * 30,
        gameId,
        userIds: members,
        memberRanges
      });
      block = [];
    };
    for (const mm of shared) {
      if (block.length && mm !== block[block.length - 1] + 30) flush();
      block.push(mm);
    }
    flush();
  }
  return candidates;
}

function overlapMins(a, b) {
  const s = Math.max(toMin(a.startT), toMin(b.startT));
  const e = Math.min(toMin(a.endT), toMin(b.endT));
  return Math.max(0, e - s);
}

/** Recompute all upcoming matches from preferences and persist the diff. */
export async function recomputeGameMatches(db, today) {
  await ensureMatchSchema(db);
  const day = /^\d{4}-\d{2}-\d{2}$/.test(String(today || '')) ? today : isoToday();

  const [prefsRes, gamesRes, matchesRes, optRes] = await Promise.all([
    db.prepare('SELECT * FROM user_preferences').all(),
    db.prepare('SELECT id FROM games').all(),
    db.prepare('SELECT * FROM game_matches').all(),
    db.prepare('SELECT * FROM game_match_optouts').all()
  ]);

  const prefsByUser = {};
  (prefsRes.results || []).forEach((r) => { prefsByUser[r.user_id] = mapPref(r); });
  const validGameIds = new Set((gamesRes.results || []).map((g) => g.id));
  const existing = (matchesRes.results || []).map(mapGameMatch);
  const isIso = (k) => /^\d{4}-\d{2}-\d{2}$/.test(String(k || ''));
  // Past matches are frozen; legacy (non-ISO) matches are discarded.
  const live = existing.filter((m) => isIso(m.dayKey) && m.dayKey >= day);
  const frozen = existing.filter((m) => isIso(m.dayKey) && m.dayKey < day);

  const candidates = buildMatchCandidates(prefsByUser, validGameIds, optRes.results || [], day);
  const claimed = new Set();
  const next = candidates.map((c) => {
    let best = null;
    let bestOverlap = 0;
    for (const m of live) {
      if (claimed.has(m.id) || m.dayKey !== c.dayKey || m.gameId !== c.gameId) continue;
      const ov = overlapMins(m, c);
      if (ov > bestOverlap) { best = m; bestOverlap = ov; }
    }
    if (best) claimed.add(best.id);
    const confirmedUserIds = best ? (best.confirmedUserIds || []).filter((u) => c.userIds.includes(u)) : [];
    return {
      ...c,
      id: best ? best.id : 'm_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12),
      confirmedUserIds,
      status: confirmedUserIds.length >= c.userIds.length ? 'confirmed' : 'pending'
    };
  });

  // Rewrite all non-frozen rows in one transaction (ids are preserved so
  // confirmations carry over; deleting first avoids match_slot_key collisions).
  const frozenIds = new Set(frozen.map((m) => m.id));
  const stmts = [];
  existing.filter((m) => !frozenIds.has(m.id)).forEach((m) => {
    stmts.push(db.prepare('DELETE FROM game_matches WHERE id = ?').bind(m.id));
  });
  next.forEach((m) => {
    stmts.push(db.prepare(`
      INSERT INTO game_matches
        (id, match_slot_key, day_key, start_t, end_t, duration_mins, game_id, user_ids, confirmed_user_ids, member_ranges, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      m.id, m.matchSlotKey, m.dayKey, m.startT, m.endT, m.durationMins, m.gameId,
      JSON.stringify(m.userIds), JSON.stringify(m.confirmedUserIds), JSON.stringify(m.memberRanges), m.status
    ));
  });
  if (stmts.length) await db.batch(stmts);

  return [...frozen, ...next];
}

export async function ensureFeedbackTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      user_name TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

export async function ensurePickleballIcon(db) {
  try {
    await db.prepare(`UPDATE games SET icon = 'pickle', color = '#ff6b00' WHERE id = 'g1' AND (icon = '🏓' OR icon IS NULL OR icon = '')`).run();
  } catch (_) { /* ignore if games table missing */ }
}

export async function loadBootstrap(db, authUser) {
  await ensureMatchSchema(db);
  await ensureFeedbackTable(db);
  await ensurePickleballIcon(db);
  const isAdmin = !!(authUser && authUser.role === 'admin');

  const [usersRes, gamesRes, prefsRes, profilesRes, cpMatchesRes, gameMatchesRes, feedbackRes] = await Promise.all([
    db.prepare('SELECT * FROM users ORDER BY id').all(),
    db.prepare('SELECT * FROM games ORDER BY id').all(),
    db.prepare('SELECT * FROM user_preferences').all(),
    db.prepare('SELECT * FROM carpool_profiles').all(),
    db.prepare('SELECT * FROM carpool_matches').all(),
    db.prepare('SELECT * FROM game_matches ORDER BY day_key, start_t').all(),
    isAdmin
      ? db.prepare('SELECT * FROM feedback ORDER BY created_at DESC LIMIT 200').all()
      : Promise.resolve({ results: [] })
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
    authUser,
    users: (usersRes.results || []).map(mapUser),
    games: (gamesRes.results || []).map(mapGame),
    userGamePreferences,
    carpoolProfiles,
    carpoolMatches: (cpMatchesRes.results || []).map(mapCarpoolMatch),
    gameMatches: (gameMatchesRes.results || []).map(mapGameMatch),
    feedback: (feedbackRes.results || []).map(mapFeedback)
  };
}
