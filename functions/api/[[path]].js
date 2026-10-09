import {
  getDb,
  json,
  options,
  readJson,
  mapUser,
  mapGame,
  mapGameMatch,
  mapCarpoolMatch,
  loadBootstrap,
  ensureGameMatchesTable
} from './_utils.js';

function pathParts(params) {
  const p = params.path;
  if (!p) return [];
  return Array.isArray(p) ? p : [p];
}

export async function onRequest(context) {
  const { request, env, params } = context;
  if (request.method === 'OPTIONS') return options();

  let db;
  try {
    db = getDb(env);
  } catch (e) {
    return json({ error: e.message }, 500);
  }

  const parts = pathParts(params);
  const resource = parts[0] || '';
  const id = parts[1] || null;
  const method = request.method;

  try {
    // GET /api/bootstrap
    if (resource === 'bootstrap' && method === 'GET') {
      const data = await loadBootstrap(db);
      return json(data);
    }

    // POST /api/login
    if (resource === 'login' && method === 'POST') {
      const body = await readJson(request);
      if (!body || !body.name || !body.password) {
        return json({ success: false, error: 'Missing credentials' }, 400);
      }
      const row = await db
        .prepare('SELECT * FROM users WHERE lower(name) = lower(?) AND password = ?')
        .bind(String(body.name).trim(), String(body.password))
        .first();
      if (!row) return json({ success: false }, 401);
      return json({ success: true, user: mapUser(row) });
    }

    // /api/users
    if (resource === 'users') {
      if (method === 'GET') {
        const res = await db.prepare('SELECT * FROM users ORDER BY id').all();
        return json({ users: (res.results || []).map(mapUser) });
      }
      if (method === 'POST') {
        const body = await readJson(request);
        const newUser = {
          id: body.id || ('u_' + Date.now().toString(36)),
          name: body.name || 'New User',
          password: body.password || '123456',
          role: body.role || 'user',
          permissions: JSON.stringify(body.permissions || ['B']),
          avatar: body.avatar || '👤',
          phone: body.phone || '+1 (403) 000-0000'
        };
        await db
          .prepare('INSERT INTO users (id, name, password, role, permissions, avatar, phone) VALUES (?, ?, ?, ?, ?, ?, ?)')
          .bind(newUser.id, newUser.name, newUser.password, newUser.role, newUser.permissions, newUser.avatar, newUser.phone)
          .run();
        return json({ user: mapUser({ ...newUser, permissions: newUser.permissions }) });
      }
      if (method === 'PUT' && id) {
        const body = await readJson(request);
        await db
          .prepare('UPDATE users SET name = ?, password = ?, permissions = ?, avatar = COALESCE(?, avatar), phone = COALESCE(?, phone) WHERE id = ?')
          .bind(
            body.name,
            body.password,
            JSON.stringify(body.permissions || ['B']),
            body.avatar ?? null,
            body.phone ?? null,
            id
          )
          .run();
        const row = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
        return json({ user: mapUser(row) });
      }
      if (method === 'DELETE' && id) {
        if (id === 'u1') return json({ error: 'Cannot delete primary admin' }, 403);
        await db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
        await db.prepare('DELETE FROM user_preferences WHERE user_id = ?').bind(id).run();
        await db.prepare('DELETE FROM carpool_profiles WHERE user_id = ?').bind(id).run();
        return json({ ok: true });
      }
    }

    // /api/games
    if (resource === 'games') {
      if (method === 'GET') {
        const res = await db.prepare('SELECT * FROM games ORDER BY id').all();
        return json({ games: (res.results || []).map(mapGame) });
      }
      if (method === 'POST') {
        const body = await readJson(request);
        const game = {
          id: body.id || ('g_' + Date.now().toString(36)),
          name: body.name,
          icon: body.icon || '🎯',
          color: body.color || '#6557ff'
        };
        await db
          .prepare('INSERT INTO games (id, name, icon, color) VALUES (?, ?, ?, ?)')
          .bind(game.id, game.name, game.icon, game.color)
          .run();
        return json({ game: mapGame(game) });
      }
      if (method === 'DELETE' && id) {
        await db.prepare('DELETE FROM games WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }
    }

    // PUT /api/preferences/:userId
    if (resource === 'preferences' && id && method === 'PUT') {
      const body = await readJson(request);
      const slots = JSON.stringify(body.slots || []);
      const gameIds = JSON.stringify(body.gameIds || []);
      await db
        .prepare(`
          INSERT INTO user_preferences (user_id, slots, game_ids) VALUES (?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET slots = excluded.slots, game_ids = excluded.game_ids
        `)
        .bind(id, slots, gameIds)
        .run();
      return json({ ok: true, slots: body.slots || [], gameIds: body.gameIds || [] });
    }

    // /api/game-matches
    if (resource === 'game-matches') {
      await ensureGameMatchesTable(db);
      if (method === 'PUT') {
        const body = await readJson(request);
        const matches = body.matches || [];
        await db.prepare('DELETE FROM game_matches').run();
        for (const m of matches) {
          await db
            .prepare(`
              INSERT INTO game_matches
              (id, match_slot_key, day_key, start_t, end_t, duration_mins, game_id, user_ids, confirmed_user_ids, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .bind(
              m.id,
              m.matchSlotKey,
              m.dayKey,
              m.startT,
              m.endT,
              m.durationMins,
              m.gameId,
              JSON.stringify(m.userIds || []),
              JSON.stringify(m.confirmedUserIds || []),
              m.status || 'pending'
            )
            .run();
        }
        return json({ ok: true, count: matches.length });
      }
      if (method === 'PATCH' && id) {
        const body = await readJson(request);
        const row = await db.prepare('SELECT * FROM game_matches WHERE id = ?').bind(id).first();
        if (!row) return json({ error: 'Not found' }, 404);
        const current = mapGameMatch(row);
        const next = {
          ...current,
          userIds: body.userIds ?? current.userIds,
          confirmedUserIds: body.confirmedUserIds ?? current.confirmedUserIds,
          status: body.status ?? current.status
        };
        if (body.delete) {
          await db.prepare('DELETE FROM game_matches WHERE id = ?').bind(id).run();
          return json({ ok: true, deleted: true });
        }
        await db
          .prepare('UPDATE game_matches SET user_ids = ?, confirmed_user_ids = ?, status = ? WHERE id = ?')
          .bind(JSON.stringify(next.userIds), JSON.stringify(next.confirmedUserIds), next.status, id)
          .run();
        return json({ match: next });
      }
    }

    // PUT /api/carpool-profiles/:userId
    if (resource === 'carpool-profiles' && id && method === 'PUT') {
      const body = await readJson(request);
      await db
        .prepare(`
          INSERT INTO carpool_profiles
          (user_id, lat, lng, address_name, has_car, work_time, home_time, work_status, home_status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            lat = excluded.lat,
            lng = excluded.lng,
            address_name = excluded.address_name,
            has_car = excluded.has_car,
            work_time = excluded.work_time,
            home_time = excluded.home_time,
            work_status = excluded.work_status,
            home_status = excluded.home_status
        `)
        .bind(
          id,
          body.lat ?? 51.0447,
          body.lng ?? -114.0719,
          body.addressName || 'Downtown Calgary, AB',
          body.hasCar ? 1 : 0,
          body.workTime || '08:30',
          body.homeTime || '18:00',
          JSON.stringify(body.workStatus || ['seeking']),
          JSON.stringify(body.homeStatus || ['seeking'])
        )
        .run();
      return json({ ok: true });
    }

    // /api/carpool-matches
    if (resource === 'carpool-matches') {
      if (method === 'POST') {
        const body = await readJson(request);
        const match = {
          id: body.id || ('cp_' + Date.now().toString(36)),
          driverId: body.driverId,
          riderId: body.riderId,
          requesterId: body.requesterId,
          status: body.status || 'pending'
        };
        await db
          .prepare('INSERT INTO carpool_matches (id, driver_id, rider_id, requester_id, status) VALUES (?, ?, ?, ?, ?)')
          .bind(match.id, match.driverId, match.riderId, match.requesterId, match.status)
          .run();
        return json({ match: mapCarpoolMatch({
          id: match.id,
          driver_id: match.driverId,
          rider_id: match.riderId,
          requester_id: match.requesterId,
          status: match.status,
          created_at: new Date().toISOString()
        }) });
      }
      if (method === 'PATCH' && id) {
        const body = await readJson(request);
        if (body.status) {
          await db.prepare('UPDATE carpool_matches SET status = ? WHERE id = ?').bind(body.status, id).run();
        }
        const row = await db.prepare('SELECT * FROM carpool_matches WHERE id = ?').bind(id).first();
        return json({ match: mapCarpoolMatch(row) });
      }
      if (method === 'DELETE' && id) {
        await db.prepare('DELETE FROM carpool_matches WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }
    }

    return json({ error: 'Not found', path: parts }, 404);
  } catch (err) {
    console.error(err);
    return json({ error: err.message || String(err) }, 500);
  }
}
