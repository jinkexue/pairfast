/* ==========================================================================
   Main Application Entry & Routing Controller
   ========================================================================== */

import { store } from './store.js';
import { t, setLang, getLang } from './i18n.js';
import { renderAuthModal, renderAdminConsole } from './auth.js';
import { renderFeatureA } from './featureA.js';
import { renderFeatureB } from './featureB.js';
import { renderFeatureC } from './featureC.js';

let currentRoute = 'home'; // 'home', 'featA', 'featB', 'featC'

export function initApp() {
  renderNavbar();
  renderRoute();
}

function renderNavbar() {
  const navEl = document.getElementById('mainNavbar');
  if (!navEl) return;

  const currentUser = store.getCurrentUser();
  const allUsers = store.getUsers();
  const perms = currentUser.permissions || [];
  const lang = getLang();

  navEl.innerHTML = `
    <a class="nav-brand" id="brandBtn">
      <div class="brand-icon">⚡</div>
      <div>
        <span class="brand-title">${t('appName')}</span>
        <div style="font-size:10px;color:var(--text-muted);font-weight:700">Multi-Module Platform</div>
      </div>
    </a>

    <div class="nav-menu">
      <button class="nav-btn ${currentRoute === 'home' ? 'active' : ''}" id="navHomeBtn">
        🏠 ${t('navHome')}
      </button>
      <button class="nav-btn ${currentRoute === 'featA' ? 'active' : ''}" id="navFeatABtn">
        ⚡ ${t('navFeatA')}
        ${!perms.includes('A') ? '<span class="badge-pill">🔒</span>' : ''}
      </button>
      <button class="nav-btn feat-b ${currentRoute === 'featB' ? 'active feat-b' : ''}" id="navFeatBBtn">
        🎮 ${t('navFeatB')}
        ${!perms.includes('B') ? '<span class="badge-pill">🔒</span>' : ''}
      </button>
      <button class="nav-btn feat-c ${currentRoute === 'featC' ? 'active feat-c' : ''}" id="navFeatCBtn">
        🚗 ${t('navFeatC')}
        ${!perms.includes('C') ? '<span class="badge-pill">🔒</span>' : ''}
      </button>
    </div>

    <div class="nav-user-area">
      <!-- Quick Demo Switcher -->
      <select id="quickNavUserSelect" style="background:rgba(255,255,255,0.06);border:1px solid var(--panel-border);color:var(--text-main);padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;outline:none;cursor:pointer">
        ${allUsers.map(u => `
          <option value="${u.id}" ${u.id === currentUser.id ? 'selected' : ''}>
            ${u.avatar} ${u.name} ${u.role === 'admin' ? '(Admin)' : ''}
          </option>
        `).join('')}
      </select>

      ${currentUser.role === 'admin' ? `
        <button class="btn btn-ghost btn-sm" id="navAdminBtn" style="border-color:var(--secondary);color:var(--secondary)">
          ⚙️ ${t('navAdmin')}
        </button>
      ` : ''}

      <div class="user-chip">
        <div class="user-avatar">${currentUser.avatar || '👤'}</div>
        <div>
          <strong style="display:block;line-height:1">${currentUser.name}</strong>
          <small style="color:var(--text-muted);font-size:10px">${currentUser.email}</small>
        </div>
      </div>

      <button class="btn-lang" id="toggleLangBtn">
        🌐 ${lang === 'en' ? '中文' : 'English'}
      </button>
    </div>
  `;

  // Bind Navbar Events
  document.getElementById('brandBtn').onclick = () => navigate('home');
  document.getElementById('navHomeBtn').onclick = () => navigate('home');
  document.getElementById('navFeatABtn').onclick = () => navigate('featA');
  document.getElementById('navFeatBBtn').onclick = () => navigate('featB');
  document.getElementById('navFeatCBtn').onclick = () => navigate('featC');

  const adminBtn = document.getElementById('navAdminBtn');
  if (adminBtn) {
    adminBtn.onclick = () => {
      renderAdminConsole(() => renderNavbar());
    };
  }

  document.getElementById('quickNavUserSelect').onchange = (e) => {
    store.setCurrentUser(e.target.value);
    renderNavbar();
    renderRoute();
  };

  document.getElementById('toggleLangBtn').onclick = () => {
    const nextLang = getLang() === 'en' ? 'zh' : 'en';
    setLang(nextLang);
    renderNavbar();
    renderRoute();
  };
}

function navigate(route) {
  const currentUser = store.getCurrentUser();
  const perms = currentUser.permissions || [];

  if (route === 'featA' && !perms.includes('A')) {
    alert(t('accessDenied'));
    return;
  }
  if (route === 'featB' && !perms.includes('B')) {
    alert(t('accessDenied'));
    return;
  }
  if (route === 'featC' && !perms.includes('C')) {
    alert(t('accessDenied'));
    return;
  }

  currentRoute = route;
  renderNavbar();
  renderRoute();
}

function renderRoute() {
  const container = document.getElementById('appContent');
  if (!container) return;

  if (currentRoute === 'home') {
    renderHomePortal(container);
  } else if (currentRoute === 'featA') {
    renderFeatureA(container);
  } else if (currentRoute === 'featB') {
    renderFeatureB(container);
  } else if (currentRoute === 'featC') {
    renderFeatureC(container);
  }
}

function renderHomePortal(container) {
  const currentUser = store.getCurrentUser();
  const perms = currentUser.permissions || [];
  const lang = getLang();

  container.innerHTML = `
    <!-- Hero Section -->
    <div class="glass-panel hero-box">
      <div style="position:relative;z-index:1">
        <span class="hero-badge">
          ✨ ${t('heroBadge')}
        </span>
        <h1 class="hero-title">${t('heroTitle')}</h1>
        <p class="hero-desc">${t('heroDesc')}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-primary" id="heroStartBtn">${t('selectModule')}</button>
          ${currentUser.role === 'admin' ? `
            <button class="btn btn-ghost" id="heroAdminBtn">⚙️ ${t('adminTitle')}</button>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Feature Option Cards Grid (A, B, C) -->
    <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
      <h2 style="font-size:24px;font-weight:800;letter-spacing:-0.02em">
        ${lang === 'zh' ? '功能系统选项 (Options A / B / C)' : 'System Modules (Options A / B / C)'}
      </h2>
      <span style="font-size:13px;color:var(--text-muted)">
        ${lang === 'zh' ? `当前用户：${currentUser.name} (已赋权 ${perms.length} 项)` : `Logged in as: ${currentUser.name} (${perms.length} modules unlocked)`}
      </span>
    </div>

    <div class="feature-grid">
      <!-- Option A Card -->
      <div class="glass-panel feature-card ${!perms.includes('A') ? 'locked' : ''}">
        <div class="card-top">
          <div class="card-header-icon" style="background:var(--primary-light);color:var(--primary)">
            ⚡
          </div>
          <div class="card-title">
            <span>${t('featATitle')}</span>
            ${!perms.includes('A') ? '<span class="tag-pill" style="color:var(--danger)">Locked</span>' : ''}
          </div>
          <p class="card-desc">${t('featADesc')}</p>
          <div class="card-meta">
            <span class="tag-pill">Leader Candidates</span>
            <span class="tag-pill">Avoid Constraints</span>
            <span class="tag-pill">Heatmap Analytics</span>
          </div>
        </div>
        <div>
          <button class="btn ${perms.includes('A') ? 'btn-primary' : 'btn-ghost'} launch-card-btn" data-route="featA" style="width:100%" ${!perms.includes('A') ? 'disabled' : ''}>
            ${perms.includes('A') ? t('enterFeatA') : '🔒 Permission Required'}
          </button>
        </div>
      </div>

      <!-- Option B Card -->
      <div class="glass-panel feature-card ${!perms.includes('B') ? 'locked' : ''}">
        <div class="card-top">
          <div class="card-header-icon" style="background:var(--secondary-light);color:var(--secondary)">
            🎮
          </div>
          <div class="card-title">
            <span>${t('featBTitle')}</span>
            ${!perms.includes('B') ? '<span class="tag-pill" style="color:var(--danger)">Locked</span>' : ''}
          </div>
          <p class="card-desc">${t('featBDesc')}</p>
          <div class="card-meta">
            <span class="tag-pill">30-min Intervals</span>
            <span class="tag-pill">5 Game Categories</span>
            <span class="tag-pill">2nd Confirmation</span>
          </div>
        </div>
        <div>
          <button class="btn ${perms.includes('B') ? 'btn-secondary' : 'btn-ghost'} launch-card-btn" data-route="featB" style="width:100%" ${!perms.includes('B') ? 'disabled' : ''}>
            ${perms.includes('B') ? t('enterFeatB') : '🔒 Permission Required'}
          </button>
        </div>
      </div>

      <!-- Option C Card -->
      <div class="glass-panel feature-card ${!perms.includes('C') ? 'locked' : ''}">
        <div class="card-top">
          <div class="card-header-icon" style="background:rgba(249,115,22,0.15);color:var(--accent-orange)">
            🚗
          </div>
          <div class="card-title">
            <span>${t('featCTitle')}</span>
            ${!perms.includes('C') ? '<span class="tag-pill" style="color:var(--danger)">Locked</span>' : ''}
          </div>
          <p class="card-desc">${t('featCDesc')}</p>
          <div class="card-meta">
            <span class="tag-pill">TCG Machines HQ</span>
            <span class="tag-pill">Distance Sorting</span>
            <span class="tag-pill">Anonymous Privacy</span>
          </div>
        </div>
        <div>
          <button class="btn ${perms.includes('C') ? 'btn-orange' : 'btn-ghost'} launch-card-btn" data-route="featC" style="width:100%" ${!perms.includes('C') ? 'disabled' : ''}>
            ${perms.includes('C') ? t('enterFeatC') : '🔒 Permission Required'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind Home Events
  container.querySelectorAll('.launch-card-btn').forEach(btn => {
    btn.onclick = () => {
      const r = btn.dataset.route;
      navigate(r);
    };
  });

  const adminHeroBtn = container.querySelector('#heroAdminBtn');
  if (adminHeroBtn) {
    adminHeroBtn.onclick = () => {
      renderAdminConsole(() => {
        renderNavbar();
        renderRoute();
      });
    };
  }

  container.querySelector('#heroStartBtn').onclick = () => {
    if (perms.includes('A')) navigate('featA');
    else if (perms.includes('B')) navigate('featB');
    else if (perms.includes('C')) navigate('featC');
  };
}
