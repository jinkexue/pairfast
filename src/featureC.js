/* ==========================================================================
   Feature C: Smart Carpool Matching System (Leaflet Map & Privacy Protection)
   ========================================================================== */

import { store, TCG_HQ } from './store.js';
import { t, getLang } from './i18n.js';

let mapInstance = null;
let mapMarkers = [];

export function renderFeatureC(container) {
  const currentUser = store.getCurrentUser();
  const myProfile = store.getCarpoolProfile(currentUser.id);
  const candidates = store.getCarpoolCandidates(currentUser.id);
  const lang = getLang();

  container.innerHTML = `
    <div style="margin-bottom: 28px;">
      <span class="hero-badge" style="background:rgba(249,115,22,0.15);color:var(--accent-orange);border-color:rgba(249,115,22,0.3)">
        🚗 Option C · Carpool Mobility
      </span>
      <h1 style="font-size:32px;font-weight:800;margin-top:8px">${t('featCTitle')}</h1>
    </div>

    <!-- Sub Navigation Tabs -->
    <div class="sub-tabs">
      <button class="sub-tab-btn active" id="tabC2">${t('c2Title')}</button>
      <button class="sub-tab-btn" id="tabC1">${t('c1Title')}</button>
    </div>

    <!-- View C2: Map & Distance-Sorted Candidates -->
    <div id="viewC2">
      <!-- Privacy Banner Alert -->
      <div class="anonymity-alert">
        <span>${t('privacyNote')}</span>
      </div>

      <!-- Leaflet Map Box -->
      <div class="glass-panel" style="padding:16px;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 8px">
          <span style="font-weight:800;font-size:15px;color:#a5b4fc">
            🗺️ Interactive Map · Destination: TCG Machines HQ
          </span>
          <span style="font-size:12px;color:var(--text-muted)">
            Showing ${candidates.length} nearby commuters
          </span>
        </div>
        <div id="carpoolMap"></div>
      </div>

      <!-- Distance Sorted Candidate List -->
      <div class="glass-panel" style="padding:28px">
        <h3 style="font-size:20px;font-weight:800;margin-bottom:6px">
          ${t('c2Title')}
        </h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('c2Sub')}</p>

        ${candidates.length === 0 ? `
          <div style="text-align:center;padding:40px;color:var(--text-muted)">
            <p style="font-size:40px">🚙</p>
            <p>No available carpool candidates right now.</p>
          </div>
        ` : `
          <div style="display:grid;gap:14px">
            ${candidates.map(item => {
              const isMatched = item.matchState === 'accepted';
              const isPending = item.matchState === 'pending';
              const isIncomingReq = isPending && item.requesterId !== currentUser.id;
              const isMyOutReq = isPending && item.requesterId === currentUser.id;

              return `
                <div class="glass-card" style="padding:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;border-left:4px solid ${isMatched?'var(--success)':(item.profile.hasCar?'var(--primary)':'var(--accent-orange)')}">
                  <div style="display:flex;align-items:center;gap:16px">
                    <span style="font-size:36px;background:rgba(255,255,255,0.06);padding:10px;border-radius:16px">
                      ${isMatched ? (item.fullUser.avatar || '👤') : '👤'}
                    </span>
                    <div>
                      <div style="display:flex;align-items:center;gap:10px">
                        <h4 style="font-size:18px;font-weight:800">
                          ${isMatched ? `${item.fullUser.name} (${item.fullUser.phone})` : item.user.name}
                        </h4>
                        <span class="tag-pill" style="${item.profile.hasCar?'color:var(--primary);border-color:var(--primary)':'color:var(--accent-orange);border-color:var(--accent-orange)'}">
                          ${item.profile.hasCar ? '🚘 Driver (Car Owner)' : '🎒 Rider'}
                        </span>
                      </div>
                      <div style="font-size:13px;color:var(--text-muted);margin-top:6px;display:flex;gap:14px;flex-wrap:wrap">
                        <span>📍 ${item.profile.addressName}</span>
                        <strong style="color:var(--secondary)">
                          📏 ${item.distanceKm} ${t('distanceKm')}
                        </strong>
                        <span>⏰ ${item.profile.workTime} / ${item.profile.homeTime}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Match Buttons & Status -->
                  <div>
                    ${isMatched ? `
                      <span class="status-badge confirmed">
                        ✓ ${t('matchedStatus')}
                      </span>
                    ` : isIncomingReq ? `
                      <div style="display:flex;gap:8px">
                        <button class="btn btn-danger btn-sm reject-cp-btn" data-id="${item.matchId}">
                          ${t('rejectCarpool')}
                        </button>
                        <button class="btn btn-secondary btn-sm accept-cp-btn" data-id="${item.matchId}">
                          ✓ ${t('acceptCarpool')}
                        </button>
                      </div>
                    ` : isMyOutReq ? `
                      <span class="status-badge pending">
                        ⏳ ${t('awaitingConsent')}
                      </span>
                    ` : `
                      <button class="btn ${myProfile.hasCar ? 'btn-secondary' : 'btn-orange'} btn-sm req-cp-btn" data-target="${item.fullUser.id}">
                        ${myProfile.hasCar ? t('offerPickup') : t('requestJoin')}
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>

    <!-- View C1: Carpool Profile & Location Settings -->
    <div id="viewC1" style="display:none">
      <div class="glass-panel" style="padding:28px">
        <h3 style="font-size:20px;font-weight:800;margin-bottom:6px">${t('c1Title')}</h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('c1Sub')}</p>

        <form id="carpoolProfileForm">
          <div style="background:rgba(99,102,241,0.12);padding:14px 18px;border-radius:var(--radius-md);border:1px solid rgba(99,102,241,0.25);margin-bottom:20px;color:#a5b4fc;font-weight:700;font-size:14px">
            🏢 ${t('destinationFixed')}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
            <div class="form-group">
              <label>${t('hasCarLabel')}</label>
              <select class="form-select" id="cpHasCar">
                <option value="false" ${!myProfile.hasCar ? 'selected' : ''}>${t('riderOption')}</option>
                <option value="true" ${myProfile.hasCar ? 'selected' : ''}>${t('driverOption')}</option>
              </select>
            </div>
            <div class="form-group">
              <label>${t('rideStatusLabel')}</label>
              <select class="form-select" id="cpStatus">
                <option value="seeking" ${myProfile.status === 'seeking' ? 'selected' : ''}>${t('statusSeeking')}</option>
                <option value="offering" ${myProfile.status === 'offering' ? 'selected' : ''}>${t('statusOffering')}</option>
                <option value="none" ${myProfile.status === 'none' ? 'selected' : ''}>${t('statusNone')}</option>
              </select>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
            <div class="form-group">
              <label>${t('workTimeLabel')}</label>
              <input type="time" id="cpWorkTime" class="form-input" value="${myProfile.workTime || '08:30'}">
            </div>
            <div class="form-group">
              <label>${t('homeTimeLabel')}</label>
              <input type="time" id="cpHomeTime" class="form-input" value="${myProfile.homeTime || '18:00'}">
            </div>
          </div>

          <div class="form-group">
            <label>${t('originAddrLabel')}</label>
            <input type="text" id="cpAddressName" class="form-input" value="${myProfile.addressName || ''}" placeholder="e.g. Market St & 5th, SF">
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
            <div class="form-group">
              <label>Latitude (Lat)</label>
              <input type="number" step="0.0001" id="cpLat" class="form-input" value="${myProfile.lat}">
            </div>
            <div class="form-group">
              <label>Longitude (Lng)</label>
              <input type="number" step="0.0001" id="cpLng" class="form-input" value="${myProfile.lng}">
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end">
            <button type="submit" class="btn btn-secondary">
              💾 ${t('saveCarpoolBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Bind Tab Switching
  const tabC1 = container.querySelector('#tabC1');
  const tabC2 = container.querySelector('#tabC2');
  const viewC1 = container.querySelector('#viewC1');
  const viewC2 = container.querySelector('#viewC2');

  tabC2.onclick = () => {
    tabC2.classList.add('active');
    tabC1.classList.remove('active');
    viewC2.style.display = 'block';
    viewC1.style.display = 'none';
    initLeafletMap(myProfile, candidates);
  };

  tabC1.onclick = () => {
    tabC1.classList.add('active');
    tabC2.classList.remove('active');
    viewC1.style.display = 'block';
    viewC2.style.display = 'none';
  };

  // Carpool Action Event Handlers
  container.querySelectorAll('.req-cp-btn').forEach(btn => {
    btn.onclick = () => {
      store.requestCarpool(currentUser.id, btn.dataset.target);
      renderFeatureC(container);
    };
  });

  container.querySelectorAll('.accept-cp-btn').forEach(btn => {
    btn.onclick = () => {
      store.acceptCarpool(btn.dataset.id);
      renderFeatureC(container);
    };
  });

  container.querySelectorAll('.reject-cp-btn').forEach(btn => {
    btn.onclick = () => {
      store.rejectCarpool(btn.dataset.id);
      renderFeatureC(container);
    };
  });

  // Profile Save Form
  container.querySelector('#carpoolProfileForm').onsubmit = (e) => {
    e.preventDefault();
    store.saveCarpoolProfile(currentUser.id, {
      hasCar: document.getElementById('cpHasCar').value === 'true',
      status: document.getElementById('cpStatus').value,
      workTime: document.getElementById('cpWorkTime').value,
      homeTime: document.getElementById('cpHomeTime').value,
      addressName: document.getElementById('cpAddressName').value,
      lat: parseFloat(document.getElementById('cpLat').value),
      lng: parseFloat(document.getElementById('cpLng').value)
    });
    alert(t('successMsg'));
    renderFeatureC(container);
  };

  // Init Map on load
  initLeafletMap(myProfile, candidates);
}

function initLeafletMap(myProfile, candidates) {
  setTimeout(() => {
    const mapEl = document.getElementById('carpoolMap');
    if (!mapEl) return;

    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
    }

    if (window.L) {
      mapInstance = L.map('carpoolMap').setView([myProfile.lat, myProfile.lng], 12);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance);

      // TCG Machines HQ Marker
      L.marker([TCG_HQ.lat, TCG_HQ.lng]).addTo(mapInstance)
        .bindPopup(`<b>🏢 ${TCG_HQ.name}</b><br>Destination Company HQ`);

      // Current User Origin Marker
      L.circleMarker([myProfile.lat, myProfile.lng], {
        radius: 9,
        color: '#6366f1',
        fillColor: '#4f46e5',
        fillOpacity: 0.9
      }).addTo(mapInstance).bindPopup(`<b>📍 My Departure Point</b><br>${myProfile.addressName}`);

      // Candidate Markers
      candidates.forEach(cand => {
        const isMatched = cand.matchState === 'accepted';
        const color = isMatched ? '#10b981' : (cand.profile.hasCar ? '#6366f1' : '#f97316');
        
        const marker = L.circleMarker([cand.profile.lat, cand.profile.lng], {
          radius: 7,
          color,
          fillColor: color,
          fillOpacity: 0.8
        }).addTo(mapInstance);

        marker.bindPopup(`
          <div style="font-family:sans-serif">
            <strong>${cand.user.name}</strong><br>
            <span>${cand.profile.hasCar ? '🚘 Driver' : '🎒 Rider'} · ${cand.distanceKm} km away</span><br>
            <small>📍 ${cand.profile.addressName}</small>
          </div>
        `);
      });
    }
  }, 100);
}
