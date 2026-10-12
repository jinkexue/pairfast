  // --------------------------------------------------------------------------
  // 5. Feature B: Activity Teamup System
  // --------------------------------------------------------------------------
  const DAYS = [
    { id: 'Mon', en: 'Monday', zh: '周一', dow: 1 },
    { id: 'Tue', en: 'Tuesday', zh: '周二', dow: 2 },
    { id: 'Wed', en: 'Wednesday', zh: '周三', dow: 3 },
    { id: 'Thu', en: 'Thursday', zh: '周四', dow: 4 },
    { id: 'Fri', en: 'Friday', zh: '周五', dow: 5 },
    { id: 'Sat', en: 'Saturday', zh: '周六', dow: 6 },
    { id: 'Sun', en: 'Sunday', zh: '周日', dow: 0 }
  ];
  const TIME_SLOTS = [];
  for (let h = 12; h <= 21; h++) {
    const hStr = String(h).padStart(2, '0');
    TIME_SLOTS.push(`${hStr}:00`); TIME_SLOTS.push(`${hStr}:30`);
  }
  let activeWeek = 'this';
  let activeSubTabB = 'viewB1';
  let pastHubExpanded = false;
  let calendarRange = null;

  function startOfLocalDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function toISODate(d) {
    const x = startOfLocalDay(d);
    const y = x.getFullYear();
    const m = String(x.getMonth() + 1).padStart(2, '0');
    const day = String(x.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseISODate(iso) {
    const [y, m, d] = String(iso).split('-').map(Number);
    return startOfLocalDay(new Date(y, m - 1, d));
  }

  function getMonday(d) {
    const x = startOfLocalDay(d);
    const day = x.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    x.setDate(x.getDate() + diff);
    return x;
  }

  function getWeekDayInfos(week) {
    const monday = getMonday(new Date());
    if (week === 'next') monday.setDate(monday.getDate() + 7);
    return DAYS.map(day => {
      const offset = day.dow === 0 ? 6 : day.dow - 1;
      const date = new Date(monday);
      date.setDate(monday.getDate() + offset);
      return { ...day, date, iso: toISODate(date) };
    });
  }

  function dayKeyToDate(dayKey) {
    if (!dayKey) return null;
    const parts = String(dayKey).split('-');
    if (parts.length < 2) return null;
    const [w, d] = parts;
    const infos = getWeekDayInfos(w === 'next' ? 'next' : 'this');
    const info = infos.find(i => i.id === d);
    return info ? info.date : null;
  }

  function resolveWeekAndDay(date) {
    const target = startOfLocalDay(date);
    const iso = toISODate(target);
    const thisWeek = getWeekDayInfos('this');
    const nextWeek = getWeekDayInfos('next');
    for (const info of thisWeek) {
      if (info.iso === iso) return { week: 'this', dayId: info.id, info };
    }
    for (const info of nextWeek) {
      if (info.iso === iso) return { week: 'next', dayId: info.id, info };
    }
    const thisMon = getMonday(new Date());
    const nextMon = new Date(thisMon);
    nextMon.setDate(thisMon.getDate() + 7);
    const targetMon = getMonday(target);
    const dThis = Math.abs(targetMon - thisMon);
    const dNext = Math.abs(targetMon - nextMon);
    const week = dNext < dThis ? 'next' : 'this';
    const dayId = (DAYS.find(d => d.dow === target.getDay()) || DAYS[0]).id;
    const info = getWeekDayInfos(week).find(i => i.id === dayId);
    return { week, dayId, info };
  }

  function eachDateInclusive(fromIso, toIso) {
    const dates = [];
    if (!fromIso || !toIso) return dates;
    let cur = parseISODate(fromIso);
    const end = parseISODate(toIso);
    if (cur > end) return dates;
    while (cur <= end) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  }

  function ensureCalendarRangeForWeek(week) {
    const infos = getWeekDayInfos(week);
    calendarRange = { from: infos[0].iso, to: infos[infos.length - 1].iso };
  }

  if (!calendarRange) ensureCalendarRangeForWeek(activeWeek);

  function renderSportIcon(g, size) {
    const sz = size || 24;
    const name = String((g && g.name) || '').toLowerCase();
    const icon = (g && g.icon) || '';
    const isPickle = icon === 'pickle' || name.includes('pickle') || name.includes('匹克');
    if (isPickle) {
      const color = (g && g.color) || '#ff6b00';
      return `<svg class="sport-icon-pickle" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="9.2" cy="9" rx="6.4" ry="7.2" transform="rotate(-38 9.2 9)" fill="${color}"/>
        <circle cx="7.1" cy="6.6" r="0.9" fill="#0b0f19" opacity="0.55"/>
        <circle cx="9.6" cy="6.2" r="0.9" fill="#0b0f19" opacity="0.55"/>
        <circle cx="7.8" cy="9" r="0.9" fill="#0b0f19" opacity="0.55"/>
        <circle cx="10.3" cy="8.6" r="0.9" fill="#0b0f19" opacity="0.55"/>
        <circle cx="8.5" cy="11.4" r="0.9" fill="#0b0f19" opacity="0.55"/>
        <rect x="13.6" y="13.2" width="2.4" height="8.2" rx="1.2" transform="rotate(-38 14.8 17.3)" fill="${color}"/>
        <circle cx="19.2" cy="5.6" r="2.35" fill="${color}"/>
        <circle cx="18.55" cy="5" r="0.45" fill="#0b0f19" opacity="0.45"/>
        <circle cx="19.7" cy="5.15" r="0.45" fill="#0b0f19" opacity="0.45"/>
        <circle cx="19.1" cy="6.25" r="0.45" fill="#0b0f19" opacity="0.45"/>
      </svg>`;
    }
    return `<span style="font-size:${sz}px;line-height:1">${icon || '🎮'}</span>`;
  }

  function matchEndDateTime(m) {
    const date = dayKeyToDate(m.dayKey);
    if (!date) return null;
    const end = new Date(date);
    const [eh, em] = String(m.endT || '00:00').split(':').map(Number);
    end.setHours(eh || 0, em || 0, 0, 0);
    return end;
  }

  function isMatchPast(m) {
    const end = matchEndDateTime(m);
    return end ? end.getTime() < Date.now() : false;
  }

  function formatMatchDateLabel(m, lang) {
    const date = dayKeyToDate(m.dayKey);
    if (!date) return m.dayKey || '';
    const [w, d] = String(m.dayKey).split('-');
    const dayObj = DAYS.find(item => item.id === d) || { en: d, zh: d };
    const weekLabel = w === 'next' ? t('tabNextWeek') : t('tabThisWeek');
    const dayName = lang === 'zh' ? dayObj.zh : dayObj.en;
    return `${weekLabel} · ${dayName} · ${toISODate(date)}`;
  }

  function renderMatchCard(m, games, currentUser, lang) {
    const gameObj = games.find(g => g.id === m.gameId) || { name: m.gameId, icon: '🎮' };
    const allUsers = store.getUsers();
    const isConfirmed = m.status === 'confirmed';
    const userHasConfirmed = (m.confirmedUserIds || []).includes(currentUser.id);
    const past = isMatchPast(m);
    return `
      <div class="match-card ${isConfirmed ? 'confirmed' : ''} ${past ? 'past' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:12px">
            <span class="sport-icon-wrap" style="width:48px;height:48px;background:rgba(255,255,255,0.06);border-radius:14px">${renderSportIcon(gameObj, 28)}</span>
            <div>
              <h4 style="font-size:18px;font-weight:800;color:#fff">${gameObj.name}</h4>
              <div style="color:var(--text-muted);font-size:13px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:4px">
                <span>📅 ${t('realDateLabel')}: ${formatMatchDateLabel(m, lang)}</span>
                <strong style="color:var(--secondary)">⏰ ${t('continuousLabel')}: ${m.startT} - ${m.endT} (${m.durationMins} mins)</strong>
              </div>
            </div>
          </div>
          <span class="status-badge ${isConfirmed ? 'confirmed' : 'pending'}">${isConfirmed ? t('statusConfirmed') : t('statusPending')}</span>
        </div>
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:12px;margin-bottom:16px">
          <span style="font-size:12px;color:var(--text-muted);font-weight:700;display:block;margin-bottom:8px">${t('membersLabel')} (${(m.confirmedUserIds || []).length}/${(m.userIds || []).length} Confirmed)</span>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${(m.userIds || []).map(uId => {
              const u = allUsers.find(item => item.id === uId) || { name: uId, avatar: '👤' };
              const hasConf = (m.confirmedUserIds || []).includes(uId);
              return `
                <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:${hasConf?'var(--success-bg)':'rgba(255,255,255,0.06)'};border:1px solid ${hasConf?'var(--success)':'rgba(255,255,255,0.1)'};font-size:13px;font-weight:600">
                  <span>${u.avatar} ${u.name}</span>
                  ${hasConf ? '<span style="color:var(--success)">✓</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        ${(!past && (m.userIds || []).includes(currentUser.id)) ? `
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn btn-ghost btn-sm opt-out-btn" data-id="${m.id}">${t('optOutSession')}</button>
            <button class="btn ${userHasConfirmed ? 'btn-secondary' : 'btn-primary'} btn-sm confirm-btn" data-id="${m.id}" ${userHasConfirmed ? 'disabled' : ''}>
              ${userHasConfirmed ? '✓ Confirmed' : t('confirmSession')}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderFeatureB(container) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;

    if (!calendarRange) ensureCalendarRangeForWeek(activeWeek);

    const userPref = store.getUserGamePref(currentUser.id);
    const games = store.getGames();
    const matches = store.getGameMatches();
    const lang = getLang();

    let selectedSlots = new Set(userPref.slots || []);
    let selectedGames = new Set(userPref.gameIds || []);

    const rangeDates = eachDateInclusive(calendarRange.from, calendarRange.to);
    const upcomingMatches = matches.filter(m => !isMatchPast(m));
    const pastMatches = matches.filter(m => isMatchPast(m));

    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
          <div>
            <span class="hero-badge" style="background:var(--secondary-light);color:var(--secondary);border-color:rgba(20,184,166,0.3)">🎮 Option B · Activity Teamup</span>
            <h1 style="font-size:30px;font-weight:800;margin-top:8px">${t('featBTitle')}</h1>
          </div>
          ${currentUser.role === 'admin' ? `<button class="btn btn-ghost btn-sm" id="manageCategoriesBtn">⚙️ ${t('manageCategoriesBtn')}</button>` : ''}
        </div>
      </div>
      <div class="sub-tabs">
        <button class="sub-tab-btn ${activeSubTabB==='viewB1'?'active':''}" id="tabB1">${t('b1Title')}</button>
        <button class="sub-tab-btn ${activeSubTabB==='viewB2'?'active':''}" id="tabB2">${t('b2Title')} (${upcomingMatches.length})</button>
      </div>

      <!-- View B1 -->
      <div id="viewB1" style="${activeSubTabB==='viewB1'?'display:block':'display:none'}">
        <div class="glass-panel" style="padding:24px;margin-bottom:32px">
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('b1Sub')}</p>

          <div class="calendar-toolbar">
            <div class="calendar-toolbar-row">
              <button class="btn btn-sm ${activeWeek==='this'?'btn-secondary':'btn-ghost'}" id="setThisWeekBtn">${t('tabThisWeek')}</button>
              <button class="btn btn-sm ${activeWeek==='next'?'btn-secondary':'btn-ghost'}" id="setNextWeekBtn">${t('tabNextWeek')}</button>
              <span style="font-size:12px;color:var(--text-muted);font-weight:700">${t('dateRangeLabel')}</span>
              <div class="date-range-inputs">
                <label style="font-size:12px;color:var(--text-muted)">${t('dateFrom')}</label>
                <input type="date" id="calFrom" class="form-input" value="${calendarRange.from}">
                <label style="font-size:12px;color:var(--text-muted)">${t('dateTo')}</label>
                <input type="date" id="calTo" class="form-input" value="${calendarRange.to}">
                <button class="btn btn-ghost btn-sm" id="applyCalRangeBtn">${t('confirm')}</button>
              </div>
            </div>
            <div class="calendar-toolbar-row">
              <span style="font-size:12px;color:var(--text-muted);font-weight:700">${t('quickPresets')}</span>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekdays"> <span>${t('presetWeekdays')}</span></label>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekends"> <span>${t('presetWeekends')}</span></label>
              <span style="font-size:12px;color:var(--text-muted)">${t('startTimeLabel')}:</span>
              <input type="time" id="rangeStart" class="form-input" style="width:110px;padding:6px 10px" value="17:00">
              <span style="font-size:12px;color:var(--text-muted)">${t('endTimeLabel')}:</span>
              <input type="time" id="rangeEnd" class="form-input" style="width:110px;padding:6px 10px" value="19:00">
              <button class="btn btn-secondary btn-sm" id="applyRangeBtn">${t('applyTimeRangeBtn')}</button>
              <button class="btn btn-danger btn-sm" id="clearSlotsBtn">${t('clearSlots')}</button>
            </div>
          </div>

          <div style="margin-bottom:28px">
            <label class="form-group label">AVAILABILITY · ${calendarRange.from} → ${calendarRange.to}</label>
            <div style="display:grid;gap:14px">
              ${rangeDates.length === 0 ? `<p style="color:var(--text-muted);font-size:13px">Select a valid calendar range.</p>` : rangeDates.map(dateObj => {
                const resolved = resolveWeekAndDay(dateObj);
                const day = DAYS.find(d => d.id === resolved.dayId) || DAYS[0];
                const iso = toISODate(dateObj);
                return `
                  <div class="day-row">
                    <div class="day-row-title">
                      <span>📅 ${lang === 'zh' ? day.zh : day.en}</span>
                      <span class="date-label">${iso}</span>
                      <span style="font-size:11px;color:var(--text-muted);font-weight:600">${resolved.week === 'next' ? t('tabNextWeek') : t('tabThisWeek')}</span>
                    </div>
                    <div class="time-slot-grid">
                      ${TIME_SLOTS.map(tSlot => {
                        const slotKey = `${resolved.week}-${resolved.dayId}-${tSlot}`;
                        const isSelected = selectedSlots.has(slotKey);
                        return `<button class="slot-btn ${isSelected ? 'selected' : ''}" data-slot="${slotKey}">${tSlot} - ${add30Mins(tSlot)}</button>`;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div style="margin-bottom:24px">
            <label class="form-group label">${t('selectGamesLabel')}</label>
            <div class="game-picker-grid">
              ${games.map(g => {
                const isSel = selectedGames.has(g.id);
                return `
                  <div class="game-item-card ${isSel ? 'selected' : ''}" data-id="${g.id}">
                    <span class="sport-icon-wrap">${renderSportIcon(g, 24)}</span>
                    <div><strong style="display:block;font-size:14px;color:var(--text-main)">${g.name}</strong></div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px">
            <span id="saveFeedbackB" style="color:var(--success);font-weight:700;font-size:14px;display:none">✓ ${t('successMsg')}</span>
            <button class="btn btn-secondary" id="savePrefBtn">💾 ${t('savePrefBtn')}</button>
          </div>
        </div>
      </div>

      <!-- View B2 -->
      <div id="viewB2" style="${activeSubTabB==='viewB2'?'display:block':'display:none'}">
        <div class="glass-panel" style="padding:24px">
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('b2Sub')}</p>
          <div style="margin-bottom:18px">
            <h4 style="font-size:14px;font-weight:800;margin-bottom:12px;color:var(--text-main)">${t('upcomingSessions')} (${upcomingMatches.length})</h4>
            ${upcomingMatches.length === 0 ? `
              <div style="text-align:center;padding:36px 20px;color:var(--text-muted)">
                <p style="font-size:40px;margin-bottom:10px">🎾</p>
                <p style="font-size:15px">${t('noUpcoming')}</p>
                <p style="font-size:13px;margin-top:6px">${t('setAvailabilityHint')}</p>
              </div>
            ` : upcomingMatches.map(m => renderMatchCard(m, games, currentUser, lang)).join('')}
          </div>
          ${pastMatches.length ? `
            <button type="button" class="hub-section-toggle" id="togglePastHubBtn">
              <span>${t('pastSessions')} (${pastMatches.length})</span>
              <span>${pastHubExpanded ? t('hidePast') : t('showPast')}</span>
            </button>
            <div class="hub-section-body ${pastHubExpanded ? '' : 'collapsed'}" id="pastHubBody">
              ${pastMatches.map(m => renderMatchCard(m, games, currentUser, lang)).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    const tabB1 = container.querySelector('#tabB1');
    const tabB2 = container.querySelector('#tabB2');
    tabB1.onclick = () => { activeSubTabB = 'viewB1'; renderFeatureB(container); };
    tabB2.onclick = () => { activeSubTabB = 'viewB2'; renderFeatureB(container); };

    container.querySelector('#setThisWeekBtn').onclick = () => {
      activeWeek = 'this';
      ensureCalendarRangeForWeek('this');
      renderFeatureB(container);
    };
    container.querySelector('#setNextWeekBtn').onclick = () => {
      activeWeek = 'next';
      ensureCalendarRangeForWeek('next');
      renderFeatureB(container);
    };

    const applyCalBtn = container.querySelector('#applyCalRangeBtn');
    if (applyCalBtn) {
      applyCalBtn.onclick = () => {
        const from = container.querySelector('#calFrom').value;
        const to = container.querySelector('#calTo').value;
        if (!from || !to) return;
        if (parseISODate(from) > parseISODate(to)) {
          calendarRange = { from: to, to: from };
        } else {
          calendarRange = { from, to };
        }
        const mid = eachDateInclusive(calendarRange.from, calendarRange.to);
        if (mid.length) {
          const resolved = resolveWeekAndDay(mid[0]);
          activeWeek = resolved.week;
        }
        renderFeatureB(container);
      };
    }

    const togglePast = container.querySelector('#togglePastHubBtn');
    if (togglePast) {
      togglePast.onclick = () => {
        pastHubExpanded = !pastHubExpanded;
        renderFeatureB(container);
      };
    }

    container.querySelector('#applyRangeBtn').onclick = async () => {
      const isWeekdays = container.querySelector('#chkWeekdays').checked;
      const isWeekends = container.querySelector('#chkWeekends').checked;
      const startT = container.querySelector('#rangeStart').value;
      const endT = container.querySelector('#rangeEnd').value;

      const targetDows = new Set();
      if (isWeekdays) [1, 2, 3, 4, 5].forEach(d => targetDows.add(d));
      if (isWeekends) { targetDows.add(6); targetDows.add(0); }
      if (targetDows.size === 0) [1, 2, 3, 4, 5].forEach(d => targetDows.add(d));

      eachDateInclusive(calendarRange.from, calendarRange.to).forEach(dateObj => {
        if (!targetDows.has(dateObj.getDay())) return;
        const resolved = resolveWeekAndDay(dateObj);
        TIME_SLOTS.forEach(tSlot => {
          if (tSlot >= startT && tSlot < endT) {
            selectedSlots.add(`${resolved.week}-${resolved.dayId}-${tSlot}`);
          }
        });
      });
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
        renderFeatureB(container);
      } catch (err) { alert(err.message); }
    };

    container.querySelector('#clearSlotsBtn').onclick = async () => {
      eachDateInclusive(calendarRange.from, calendarRange.to).forEach(dateObj => {
        const resolved = resolveWeekAndDay(dateObj);
        TIME_SLOTS.forEach(tSlot => {
          selectedSlots.delete(`${resolved.week}-${resolved.dayId}-${tSlot}`);
        });
      });
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
        renderFeatureB(container);
      } catch (err) { alert(err.message); }
    };

    container.querySelectorAll('.slot-btn').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        const slotKey = btn.dataset.slot;
        if (selectedSlots.has(slotKey)) {
          selectedSlots.delete(slotKey);
          btn.classList.remove('selected');
        } else {
          selectedSlots.add(slotKey);
          btn.classList.add('selected');
        }
        try {
          await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelectorAll('.game-item-card').forEach(card => {
      card.onclick = async (e) => {
        e.preventDefault();
        const gId = card.dataset.id;
        if (selectedGames.has(gId)) {
          selectedGames.delete(gId);
          card.classList.remove('selected');
        } else {
          selectedGames.add(gId);
          card.classList.add('selected');
        }
        try {
          await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelector('#savePrefBtn').onclick = async () => {
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
        const fb = container.querySelector('#saveFeedbackB');
        if (fb) {
          fb.style.display = 'inline-block';
          setTimeout(() => { fb.style.display = 'none'; }, 2500);
        }
      } catch (err) { alert(err.message); }
    };

    container.querySelectorAll('.confirm-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.confirmGameMatch(btn.dataset.id, currentUser.id);
          activeSubTabB = 'viewB2';
          renderFeatureB(container);
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelectorAll('.opt-out-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.optOutGameMatch(btn.dataset.id, currentUser.id);
          activeSubTabB = 'viewB2';
          renderFeatureB(container);
        } catch (err) { alert(err.message); }
      };
    });

    const manageBtn = container.querySelector('#manageCategoriesBtn');
    if (manageBtn) manageBtn.onclick = () => renderGameCategoryModal(() => renderFeatureB(container));
  }
