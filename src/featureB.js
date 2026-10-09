/* ==========================================================================
   Feature B: Game & Sports Matching System
   ========================================================================== */

import { store } from './store.js';
import { t, getLang } from './i18n.js';

const DAYS = [
  { id: 'Mon', en: 'Monday', zh: '周一' },
  { id: 'Tue', en: 'Tuesday', zh: '周二' },
  { id: 'Wed', en: 'Wednesday', zh: '周三' },
  { id: 'Thu', en: 'Thursday', zh: '周四' },
  { id: 'Fri', en: 'Friday', zh: '周五' },
  { id: 'Sat', en: 'Saturday', zh: '周六' },
  { id: 'Sun', en: 'Sunday', zh: '周日' }
];

// Generate 30-min time slots from 12:00 to 21:30
const TIME_SLOTS = [];
for (let h = 12; h <= 21; h++) {
  const hStr = String(h).padStart(2, '0');
  TIME_SLOTS.push(`${hStr}:00`);
  TIME_SLOTS.push(`${hStr}:30`);
}

let activeWeek = 'this'; // 'this' or 'next'

export function renderFeatureB(container) {
  const currentUser = store.getCurrentUser();
  const userPref = store.getUserGamePref(currentUser.id);
  const games = store.getGames();
  const matches = store.getGameMatches();
  const lang = getLang();

  let selectedSlots = new Set(userPref.slots || []);
  let selectedGames = new Set(userPref.gameIds || []);

  container.innerHTML = `
    <div style="margin-bottom: 28px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <span class="hero-badge" style="background:var(--secondary-light);color:var(--secondary);border-color:rgba(20,184,166,0.3)">
            🎮 Option B · Sports & Games
          </span>
          <h1 style="font-size:32px;font-weight:800;margin-top:8px">${t('featBTitle')}</h1>
        </div>
        ${currentUser.role === 'admin' ? `
          <button class="btn btn-ghost" id="manageCategoriesBtn">
            ⚙️ ${t('manageCategoriesBtn')}
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Sub Navigation Tabs -->
    <div class="sub-tabs">
      <button class="sub-tab-btn active" id="tabB1">${t('b1Title')}</button>
      <button class="sub-tab-btn" id="tabB2">
        ${t('b2Title')} (${matches.length})
      </button>
    </div>

    <!-- View B1: Time & Game Preference Setting -->
    <div id="viewB1">
      <div class="glass-panel" style="padding:28px;margin-bottom:32px">
        <h3 style="font-size:20px;font-weight:800;margin-bottom:6px">${t('b1Title')}</h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('b1Sub')}</p>

        <!-- Week Switcher & Quick Presets -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:20px;background:rgba(0,0,0,0.2);padding:14px;border-radius:var(--radius-md)">
          <div style="display:flex;gap:8px">
            <button class="btn btn-sm ${activeWeek==='this'?'btn-secondary':'btn-ghost'}" id="setThisWeekBtn">${t('tabThisWeek')}</button>
            <button class="btn btn-sm ${activeWeek==='next'?'btn-secondary':'btn-ghost'}" id="setNextWeekBtn">${t('tabNextWeek')}</button>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span style="font-size:12px;color:var(--text-muted);font-weight:700">${t('quickPresets')}</span>
            <button class="btn btn-ghost btn-sm" id="presetWeekdayBtn">${t('presetWeekdayEve')}</button>
            <button class="btn btn-ghost btn-sm" id="presetWeekendBtn">${t('presetWeekendAft')}</button>
            <button class="btn btn-danger btn-sm" id="clearSlotsBtn">${t('clearSlots')}</button>
          </div>
        </div>

        <!-- 30-min Time Slots Grid per Day -->
        <div style="margin-bottom:28px">
          <label class="form-group label">${activeWeek === 'this' ? 'THIS WEEK' : 'NEXT WEEK'} AVAILABILITY MATRIX (30-MIN INTERVALS)</label>
          
          <div style="display:grid;gap:16px">
            ${DAYS.map(day => {
              return `
                <div style="background:rgba(255,255,255,0.02);padding:14px;border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.05)">
                  <div style="font-weight:700;font-size:14px;margin-bottom:10px;color:#a5b4fc;display:flex;align-items:center;gap:8px">
                    <span>📅 ${lang === 'zh' ? day.zh : day.en}</span>
                  </div>
                  <div class="time-slot-grid">
                    ${TIME_SLOTS.map(tSlot => {
                      const slotKey = `${activeWeek}-${day.id}-${tSlot}`;
                      const isSelected = selectedSlots.has(slotKey);
                      return `
                        <button class="slot-btn ${isSelected ? 'selected' : ''}" data-slot="${slotKey}">
                          ${tSlot} - ${add30Mins(tSlot)}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Multi Game Category Selector -->
        <div style="margin-bottom:28px">
          <label class="form-group label">${t('selectGamesLabel')}</label>
          <div class="game-picker-grid">
            ${games.map(g => {
              const isSel = selectedGames.has(g.id);
              return `
                <div class="game-item-card ${isSel ? 'selected' : ''}" data-id="${g.id}">
                  <span style="font-size:24px">${g.icon}</span>
                  <div>
                    <strong style="display:block;font-size:14px;color:var(--text-main)">
                      ${lang === 'zh' ? g.nameZh : g.nameEn}
                    </strong>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-secondary" id="savePrefBtn">
            💾 ${t('savePrefBtn')}
          </button>
        </div>
      </div>
    </div>

    <!-- View B2: Auto Pre-Matched Sessions Hub -->
    <div id="viewB2" style="display:none">
      <div class="glass-panel" style="padding:28px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <div>
            <h3 style="font-size:20px;font-weight:800">${t('b2Title')}</h3>
            <p style="color:var(--text-muted);font-size:14px">${t('b2Sub')}</p>
          </div>
        </div>

        ${matches.length === 0 ? `
          <div style="text-align:center;padding:48px 20px;color:var(--text-muted)">
            <p style="font-size:48px;margin-bottom:12px">🎾</p>
            <p style="font-size:16px">No pre-matched game sessions yet.</p>
            <p style="font-size:13px">Set your 30-min time slots in B1 above to auto-match with colleagues!</p>
          </div>
        ` : `
          <div>
            ${matches.map(m => {
              const gameObj = games.find(g => g.id === m.gameId) || { nameEn: m.gameId, icon: '🎮' };
              const allUsers = store.getUsers();
              const isConfirmed = m.status === 'confirmed';
              const userHasConfirmed = m.confirmedUserIds.includes(currentUser.id);

              // parse slot info: "this-Mon-17:00"
              const [w, d, time] = m.slot.split('-');
              const dayObj = DAYS.find(item => item.id === d) || { en: d, zh: d };

              return `
                <div class="match-card ${isConfirmed ? 'confirmed' : ''}">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px">
                    <div style="display:flex;align-items:center;gap:12px">
                      <span style="font-size:32px;background:rgba(255,255,255,0.06);padding:8px 14px;border-radius:14px">
                        ${gameObj.icon}
                      </span>
                      <div>
                        <h4 style="font-size:18px;font-weight:800;color:#fff">
                          ${lang === 'zh' ? gameObj.nameZh : gameObj.nameEn}
                        </h4>
                        <div style="color:var(--text-muted);font-size:13px;display:flex;align-items:center;gap:8px;margin-top:4px">
                          <span>📅 ${w === 'this' ? 'This Week' : 'Next Week'} (${lang === 'zh' ? dayObj.zh : dayObj.en})</span>
                          <span>⏰ ${time} - ${add30Mins(time)}</span>
                        </div>
                      </div>
                    </div>
                    <span class="status-badge ${isConfirmed ? 'confirmed' : 'pending'}">
                      ${isConfirmed ? t('statusConfirmed') : t('statusPending')}
                    </span>
                  </div>

                  <!-- Members Avatar & Confirmations -->
                  <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:12px;margin-bottom:16px">
                    <span style="font-size:12px;color:var(--text-muted);font-weight:700;display:block;margin-bottom:8px">
                      ${t('membersLabel')} (${m.confirmedUserIds.length}/${m.userIds.length} Confirmed)
                    </span>
                    <div style="display:flex;flex-wrap:wrap;gap:8px">
                      ${m.userIds.map(uId => {
                        const u = allUsers.find(item => item.id === uId) || { name: uId, avatar: '👤' };
                        const hasConf = m.confirmedUserIds.includes(uId);
                        return `
                          <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:${hasConf?'var(--success-bg)':'rgba(255,255,255,0.06)'};border:1px solid ${hasConf?'var(--success)':'rgba(255,255,255,0.1)'};font-size:13px;font-weight:600">
                            <span>${u.avatar} ${u.name}</span>
                            ${hasConf ? '<span style="color:var(--success)">✓</span>' : ''}
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- Actions -->
                  ${m.userIds.includes(currentUser.id) ? `
                    <div style="display:flex;gap:10px;justify-content:flex-end">
                      <button class="btn btn-ghost btn-sm opt-out-btn" data-id="${m.id}">
                        ${t('optOutSession')}
                      </button>
                      <button class="btn ${userHasConfirmed ? 'btn-secondary' : 'btn-primary'} btn-sm confirm-btn" data-id="${m.id}" ${userHasConfirmed ? 'disabled' : ''}>
                        ${userHasConfirmed ? '✓ Confirmed' : t('confirmSession')}
                      </button>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  // Bind Tab Event Handlers
  const tabB1 = container.querySelector('#tabB1');
  const tabB2 = container.querySelector('#tabB2');
  const viewB1 = container.querySelector('#viewB1');
  const viewB2 = container.querySelector('#viewB2');

  tabB1.onclick = () => {
    tabB1.classList.add('active');
    tabB2.classList.remove('active');
    viewB1.style.display = 'block';
    viewB2.style.display = 'none';
  };

  tabB2.onclick = () => {
    tabB2.classList.add('active');
    tabB1.classList.remove('active');
    viewB2.style.display = 'block';
    viewB1.style.display = 'none';
  };

  // Week Switcher
  container.querySelector('#setThisWeekBtn').onclick = () => {
    activeWeek = 'this';
    renderFeatureB(container);
  };
  container.querySelector('#setNextWeekBtn').onclick = () => {
    activeWeek = 'next';
    renderFeatureB(container);
  };

  // Presets
  container.querySelector('#presetWeekdayBtn').onclick = () => {
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].forEach(day => {
      ['17:00', '17:30', '18:00', '18:30'].forEach(tSlot => {
        selectedSlots.add(`${activeWeek}-${day}-${tSlot}`);
      });
    });
    renderFeatureB(container);
  };

  container.querySelector('#presetWeekendBtn').onclick = () => {
    ['Sat', 'Sun'].forEach(day => {
      ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'].forEach(tSlot => {
        selectedSlots.add(`${activeWeek}-${day}-${tSlot}`);
      });
    });
    renderFeatureB(container);
  };

  container.querySelector('#clearSlotsBtn').onclick = () => {
    selectedSlots.clear();
    renderFeatureB(container);
  };

  // Slot Click
  container.querySelectorAll('.slot-btn').forEach(btn => {
    btn.onclick = () => {
      const slotKey = btn.dataset.slot;
      if (selectedSlots.has(slotKey)) {
        selectedSlots.delete(slotKey);
        btn.classList.remove('selected');
      } else {
        selectedSlots.add(slotKey);
        btn.classList.add('selected');
      }
    };
  });

  // Game Pick
  container.querySelectorAll('.game-item-card').forEach(card => {
    card.onclick = () => {
      const gId = card.dataset.id;
      if (selectedGames.has(gId)) {
        selectedGames.delete(gId);
        card.classList.remove('selected');
      } else {
        selectedGames.add(gId);
        card.classList.add('selected');
      }
    };
  });

  // Save Preferences
  container.querySelector('#savePrefBtn').onclick = () => {
    store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
    alert(t('successMsg'));
    renderFeatureB(container);
  };

  // Confirm / Opt-out Match Actions
  container.querySelectorAll('.confirm-btn').forEach(btn => {
    btn.onclick = () => {
      store.confirmGameMatch(btn.dataset.id, currentUser.id);
      renderFeatureB(container);
    };
  });

  container.querySelectorAll('.opt-out-btn').forEach(btn => {
    btn.onclick = () => {
      store.optOutGameMatch(btn.dataset.id, currentUser.id);
      renderFeatureB(container);
    };
  });

  // Admin Game Category Manager
  const manageBtn = container.querySelector('#manageCategoriesBtn');
  if (manageBtn) {
    manageBtn.onclick = () => {
      renderGameCategoryModal(() => renderFeatureB(container));
    };
  }
}

function add30Mins(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  if (m === 0) return `${String(h).padStart(2, '0')}:30`;
  return `${String(h + 1).padStart(2, '0')}:00`;
}

function renderGameCategoryModal(onSaved) {
  let modal = document.getElementById('categoryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'categoryModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const games = store.getGames();

  modal.innerHTML = `
    <div class="glass-panel modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="font-size:20px;font-weight:800">${t('catModalTitle')}</h3>
        <button class="btn btn-ghost btn-sm" id="closeCatBtn">✕</button>
      </div>

      <div style="margin-bottom:20px;max-height:240px;overflow-y:auto">
        ${games.map(g => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:rgba(255,255,255,0.04);border-radius:10px;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">${g.icon}</span>
              <span><strong>${g.nameEn}</strong> / ${g.nameZh}</span>
            </div>
            <button class="btn btn-danger btn-sm del-cat-btn" data-id="${g.id}">Delete</button>
          </div>
        `).join('')}
      </div>

      <form id="addCatForm" style="border-top:1px dashed var(--panel-border);padding-top:20px">
        <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">+ ${t('addCategoryBtn')}</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;margin-bottom:14px">
          <input type="text" id="catEn" class="form-input" placeholder="${t('catNameEn')}" required>
          <input type="text" id="catZh" class="form-input" placeholder="${t('catNameZh')}" required>
          <input type="text" id="catIcon" class="form-input" value="🎯" style="width:60px;text-align:center">
        </div>
        <button type="submit" class="btn btn-secondary btn-sm" style="width:100%">${t('addCategoryBtn')}</button>
      </form>
    </div>
  `;

  modal.classList.add('active');
  document.getElementById('closeCatBtn').onclick = () => modal.classList.remove('active');

  modal.querySelectorAll('.del-cat-btn').forEach(btn => {
    btn.onclick = () => {
      store.deleteGame(btn.dataset.id);
      renderGameCategoryModal(onSaved);
    };
  });

  document.getElementById('addCatForm').onsubmit = (e) => {
    e.preventDefault();
    const nameEn = document.getElementById('catEn').value;
    const nameZh = document.getElementById('catZh').value;
    const icon = document.getElementById('catIcon').value;
    store.addGame({ nameEn, nameZh, icon });
    renderGameCategoryModal(onSaved);
    if (onSaved) onSaved();
  };
}
