/* ==========================================================================
   SocialPair Hub - Bundled Core Script (Cloudflare D1 Ready & Blank Auth)
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. i18n Dictionary
  // --------------------------------------------------------------------------
  const translations = {
    en: {
      appName: "SocialPair Hub",
      navHome: "Home Portal",
      navFeatA: "Grouping (A)",
      navFeatB: "Activity Teamup (B)",
      navFeatC: "Carpool (C)",
      navAdmin: "Admin Console",
      loginBtn: "Sign In",
      logoutBtn: "Sign Out",
      accessDenied: "Access Denied: You do not have permission for this module. Contact administrator.",
      loginTitle: "Sign In to SocialPair Hub",
      loginSubtitle: "Please sign in with your first name (name).",
      usernameLabel: "Username (name)",
      passwordLabel: "Password",
      loginSubmit: "Sign In Now",
      loginNamePlaceholder: "Please use your name to sign in, e.g. Kevin",
      invalidAuth: "Invalid username or password.",
      adminTitle: "User & Permission Management Console",
      addUserBtn: "+ Add New User",
      colName: "Username (name)",
      colRole: "Role",
      colPerms: "Module Permissions (A/B/C)",
      colLastLogin: "Last Login",
      colActions: "Actions",
      editPerms: "Edit Permissions",
      deleteUser: "Delete User",
      modalUserTitle: "Manage User Info & Permissions",
      saveUserBtn: "Save User Settings",
      heroBadge: "Multi-Module Pairing & Mobility Platform",
      selectModule: "Select Module to Launch",
      featATitle: "Option A: Dynamic Grouping",
      featADesc: "Leader candidates, prefer/avoid constraints, dynamic cycle adjustments, and repeat-meeting heatmaps.",
      enterFeatA: "Launch Grouping System",
      featBTitle: "Option B: Activity Teamup",
      featBDesc: "Weekly time slots, continuous time intersection auto-merging, multi-sport selection & 2nd confirmation.",
      enterFeatB: "Launch Activity Teamup",
      featCTitle: "Option C: Carpool Mobility",
      featCDesc: "Google Maps integration to 7019 8 St NE, Calgary. Work/Home willingness multi-selection, distance sorting & anonymous privacy.",
      enterFeatC: "Launch Carpool System",
      b1Title: "My Availability",
      b1Sub: "Configure your available time slots for this week & next week, and select activities you want to join.",
      tabThisWeek: "This Week",
      tabNextWeek: "Next Week",
      quickPresets: "Cycle Quick Presets:",
      presetWeekdays: "Weekdays (Mon-Fri)",
      presetWeekends: "Weekends (Sat-Sun)",
      startTimeLabel: "Start Time",
      endTimeLabel: "End Time",
      applyTimeRangeBtn: "Generate Time Slots",
      clearSlots: "Clear All Slots",
      selectGamesLabel: "Select Activity Categories (Multiple):",
      venueSelectLabel: "Select Activity Venue (Optional):",
      venueMapLabel: "Venue Map",
      noVenueSelected: "No venue selected",
      manageCategoriesBtn: "Manage Categories (Admin)",
      manageVenuesBtn: "Manage Venues (Admin)",
      googleMapsApiKeyLabel: "Google Maps API Key",
      googleMapsApiKeyHelp: "Stored in app settings, not in source code.",
      savePrefBtn: "Save Availability & Activity Choices",
      b2Title: "Auto Match",
      b2Sub: "Auto pre-matched sessions based on continuous time intersection & identical activity choice.",
      confirmSession: "Confirm Attendance (2nd Step)",
      optOutSession: "Opt-Out",
      statusPending: "Pre-Matched (Pending 2nd Confirmation)",
      statusConfirmed: "Session Teamup Confirmed! 🎉",
      membersLabel: "Members:",
      catModalTitle: "Manage Activity Categories",
      catName: "Category Name (name)",
      catIcon: "Emoji Icon",
      addCategoryBtn: "Add Category",
      dateRangeLabel: "Calendar date range",
      dateFrom: "From",
      dateTo: "To",
      upcomingSessions: "Upcoming",
      pastSessions: "Past sessions",
      showPast: "Show past",
      hidePast: "Hide past",
      noUpcoming: "No upcoming pre-matched sessions yet.",
      setAvailabilityHint: "Set overlapping dates & times in Preferences — matches appear here for 2nd confirmation.",
      feedbackTitle: "Share feedback",
      feedbackHint: "Tell us what to improve. Admins review submissions in the console.",
      feedbackPlaceholder: "Your suggestion or issue…",
      feedbackSend: "Send feedback",
      feedbackThanks: "Thanks — feedback sent!",
      feedbackTab: "Feedback Inbox",
      feedbackEmpty: "No feedback yet.",
      continuousLabel: "Overlap",
      realDateLabel: "Date",
      c1Title: "My Carpool Profile & Location",
      c1Sub: "Set departure location with Google Places Autocomplete (Destination: 7019 8 St NE, Calgary, AB T2E 8A2).",
      destinationFixed: "Fixed Destination: 7019 8 St NE, Calgary, AB T2E 8A2",
      hasCarLabel: "Vehicle Ownership:",
      driverOption: "Driver (Have Car)",
      riderOption: "Rider (No Car)",
      workTimeLabel: "Morning Commute Time (To Work):",
      homeTimeLabel: "Evening Commute Time (To Home):",
      workStatusLabel: "Morning Ride Willingness (To Work):",
      homeStatusLabel: "Evening Ride Willingness (To Home):",
      statusSeeking: "Seeking Ride (Want to Join)",
      statusOffering: "Offering Ride (Want to Pick Up)",
      originAddrLabel: "Departure Location (Google Places Autocomplete):",
      saveCarpoolBtn: "Update Carpool Profile",
      c2Title: "Matched Teammates & Google Map",
      c2Sub: "Sorted from nearest to farthest distance in Calgary.",
      privacyNote: "🔒 Privacy Protection: Usernames are anonymous (#ID) before match confirmation. Names and phone numbers are unlocked once both parties accept.",
      distanceKm: "km away from you",
      requestJoin: "Request to Join Carpool",
      offerPickup: "Invite / Pick Up Rider",
      matchedStatus: "Match Confirmed (Connected)",
      awaitingConsent: "Awaiting Dual Confirmation...",
      acceptCarpool: "Accept Ride Request",
      rejectCarpool: "Decline",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      successMsg: "Settings saved successfully!"
    },
    zh: {
      appName: "SocialPair 匹配调度平台",
      navHome: "系统首页",
      navFeatA: "动态分组 (A)",
      navFeatB: "活动组队 (B)",
      navFeatC: "拼车系统 (C)",
      navAdmin: "管理员后台",
      loginBtn: "登录",
      logoutBtn: "退出登录",
      accessDenied: "访问受限：您没有该功能的访问权限，请联系管理员赋权。",
      loginTitle: "登录 SocialPair 匹配调度平台",
      loginSubtitle: "请使用姓名（名）登录。",
      usernameLabel: "用户名 (name)",
      passwordLabel: "密码",
      loginSubmit: "立即登录",
      loginNamePlaceholder: "请使用 名登录 例如 Kevin",
      invalidAuth: "用户名或密码错误。",
      adminTitle: "用户与系统选项权限管理中心",
      addUserBtn: "+ 添加新用户",
      colName: "用户名 (name)",
      colRole: "角色",
      colPerms: "可进入系统选项 (A/B/C)",
      colLastLogin: "上次登录时间",
      colActions: "操作",
      editPerms: "编辑权限",
      deleteUser: "删除用户",
      modalUserTitle: "管理用户信息与系统选项权限",
      saveUserBtn: "保存用户配置",
      heroBadge: "多功能社群匹配与协同平台",
      selectModule: "请选择要启用的功能模块",
      featATitle: "动态玩家分组系统 (功能 A)",
      featADesc: "高效算法分组，支持组长候选、希望/回避集合约束、周期动态重算与相遇热力矩阵分析。",
      enterFeatA: "进入动态分组系统",
      featBTitle: "活动组队系统 (功能 B)",
      featBDesc: "本周及下周时间段设置，连续重合时段取交集自动合并组局，支持匹克球/乒乓球/台球/桌游/羽毛球等多项目二次确认。",
      enterFeatB: "进入活动组队系统",
      featCTitle: "拼车系统 (功能 C)",
      featCDesc: "基于 Google 地图的拼车匹配（终点 7019 8 St NE, Calgary）。上下班意愿独立多选、距离排序与匹配前匿名防护。",
      enterFeatC: "进入拼车匹配系统",
      b1Title: "我的空余时间 (B1)",
      b1Sub: "请设置您本周及下周空余时间段并勾选喜爱的活动/运动类型。",
      tabThisWeek: "本周 (This Week)",
      tabNextWeek: "下周 (Next Week)",
      quickPresets: "快速周期选择：",
      presetWeekdays: "工作日 (周一至周五)",
      presetWeekends: "休息日 (周六与周日)",
      startTimeLabel: "起始时间",
      endTimeLabel: "结束时间",
      applyTimeRangeBtn: "生成时间段范围",
      clearSlots: "清空当前已选",
      selectGamesLabel: "选择活动/运动种类（可多选）：",
      venueSelectLabel: "选择活动场地（可选）：",
      venueMapLabel: "场地地图",
      noVenueSelected: "未选择场地",
      manageCategoriesBtn: "管理活动种类 (管理员专用)",
      manageVenuesBtn: "管理活动场地 (管理员专用)",
      googleMapsApiKeyLabel: "Google Maps API Key",
      googleMapsApiKeyHelp: "仅保存在应用设置中，不会出现在源代码明文里。",
      savePrefBtn: "保存我的时间与活动设置",
      b2Title: "自动匹配 (B2)",
      b2Sub: "系统自动提取同项目用户的连续交集时间段打包合并为组局场次。",
      confirmSession: "二次确认参加 (2nd Step)",
      optOutSession: "退出该场",
      statusPending: "预匹配中（等待二次确认）",
      statusConfirmed: "🎉 组局成功！",
      membersLabel: "已加成员：",
      catModalTitle: "管理活动/运动分类列表",
      catName: "分类名称 (name)",
      catIcon: "Emoji 图标",
      addCategoryBtn: "新增分类",
      dateRangeLabel: "日历日期范围",
      dateFrom: "开始日期",
      dateTo: "结束日期",
      upcomingSessions: "即将到来",
      pastSessions: "已过期活动",
      showPast: "展开过期",
      hidePast: "收起过期",
      noUpcoming: "暂无即将到来的预匹配场次。",
      setAvailabilityHint: "在偏好设置中填写相同日期与重叠时段后，预匹配会显示在此处供二次确认。",
      feedbackTitle: "意见反馈",
      feedbackHint: "欢迎提出改进建议，管理员可在后台查看。",
      feedbackPlaceholder: "写下你的建议或问题…",
      feedbackSend: "提交意见",
      feedbackThanks: "已提交，感谢反馈！",
      feedbackTab: "意见箱",
      feedbackEmpty: "暂无反馈。",
      continuousLabel: "重叠时段",
      realDateLabel: "日期",
      c1Title: "我的拼车状态与出发位置设置 (C1)",
      c1Sub: "设置您的上下班出发点（集成 Google 地图自动补全，终点固定 7019 8 St NE, Calgary, AB T2E 8A2）。",
      destinationFixed: "固定终点：7019 8 St NE, Calgary, AB T2E 8A2",
      hasCarLabel: "车辆设置：",
      driverOption: "有车 / 司机 (Driver)",
      riderOption: "无车 / 乘客 (Rider)",
      workTimeLabel: "上班出发时间 (Morning):",
      homeTimeLabel: "下班出发时间 (Evening):",
      workStatusLabel: "早晨上班意愿 (To Work):",
      homeStatusLabel: "晚间下班意愿 (To Home):",
      statusSeeking: "愿意加入拼车 (Seeking Ride)",
      statusOffering: "愿意载客 (Offering Ride)",
      originAddrLabel: "出发位置（Google Places 地址自动补全）：",
      saveCarpoolBtn: "更新我的拼车资料",
      c2Title: "匹配用户列表与 Google 地图 (C2)",
      c2Sub: "已按卡尔加里当地距离由近到远自动排序。",
      privacyNote: "🔒 隐私防护提示：在匹配成功前隐藏用户名（显示为匿名代号 #ID）。双方互相确认后解封真实姓名与电话！",
      distanceKm: "公里 (距您的出发点)",
      requestJoin: "申请加入该车拼车",
      offerPickup: "邀约接载该乘客",
      matchedStatus: "已组队成功 (组员互可见)",
      awaitingConsent: "等待对方确认中...",
      acceptCarpool: "同意接受组队",
      rejectCarpool: "拒绝",
      cancel: "取消",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      successMsg: "配置保存成功！"
    }
  };

  let currentLang = 'en';
  function getLang() { return currentLang; }
  function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  }
  function t(key) {
    const dict = translations[currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  // --------------------------------------------------------------------------
  // 2. Core Store Engine (Cloudflare D1 via /api/* Pages Functions)
  // --------------------------------------------------------------------------
  const SESSION_KEY = 'socialpair_hub_session_v1';
  const CALGARY_HQ = {
    name: 'TCG Machines Calgary Office',
    address: '7019 8 St NE, Calgary, AB T2E 8A2',
    lat: 51.1172,
    lng: -114.0436
  };

  async function api(path, options = {}) {
    let authHeader = {};
    try {
      const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}');
      if (session && session.token) {
        authHeader = { Authorization: 'Bearer ' + session.token };
      }
    } catch (_) { /* ignore */ }
    const res = await fetch('/api/' + path.replace(/^\//, ''), {
      headers: { 'Content-Type': 'application/json', ...authHeader, ...(options.headers || {}) },
      ...options
    });
    let data = null;
    try { data = await res.json(); } catch (_) { data = null; }
    if (!res.ok) {
      const msg = (data && data.error) || ('API ' + res.status);
      throw new Error(msg);
    }
    return data;
  }

  class Store {
    constructor() {
      this.ready = false;
      this.data = {
        lang: 'en',
        currentUserId: null,
        isLoggedIn: false,
        users: [],
        games: [],
        userGamePreferences: {},
        gameMatches: [],
        carpoolProfiles: {},
        carpoolMatches: [],
        feedback: [],
        activityVenues: [
          {
            id: 'v_default_calgary_pickleball',
            name: 'Calgary Pickleball Center',
            address: '1145 65 Ave NE, Calgary, AB T2E 8T9',
            lat: 51.1036,
            lng: -114.0369,
            supportedGameIds: ['g1', 'g2']
          }
        ],
        settings: {
          googleMapsApiKey: ''
        }
      };
      this._loadSession();
    }

    _loadSession() {
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (!raw) return;
        const s = JSON.parse(raw);
        this.data.currentUserId = s.currentUserId || null;
        this.data.isLoggedIn = !!s.isLoggedIn;
        this.data.token = s.token || null;
        if (s.lang) this.data.lang = s.lang;
      } catch (_) { /* ignore */ }
    }

    _saveSession() {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        currentUserId: this.data.currentUserId,
        isLoggedIn: this.data.isLoggedIn,
        token: this.data.token || null,
        lang: this.data.lang || getLang()
      }));
    }

    async hydrate() {
      const remote = await api('bootstrap');
      this.data.users = remote.users || [];
      this.data.games = remote.games || [];
      this.data.userGamePreferences = {};
      Object.entries(remote.userGamePreferences || {}).forEach(([userId, pref]) => {
        this.data.userGamePreferences[userId] = {
          slots: normalizeSlotList(pref && pref.slots ? pref.slots : []),
          gameIds: Array.from(new Set((pref && pref.gameIds) || [])),
          venueId: pref && pref.venueId ? pref.venueId : null
        };
      });
      this.data.carpoolProfiles = remote.carpoolProfiles || {};
      this.data.carpoolMatches = remote.carpoolMatches || [];
      this.data.gameMatches = remote.gameMatches || [];
      this.data.feedback = remote.feedback || [];
      this.data.activityVenues = Array.isArray(remote.activityVenues) && remote.activityVenues.length
        ? remote.activityVenues
        : [
            {
              id: 'v_default_calgary_pickleball',
              name: 'Calgary Pickleball Center',
              address: '1145 65 Ave NE, Calgary, AB T2E 8T9',
              lat: 51.1036,
              lng: -114.0369,
              supportedGameIds: ['g1', 'g2']
            }
          ];
      this.data.settings = {
        ...(this.data.settings || {}),
        ...(remote.settings || {})
      };
      this.data.activityVenues = Array.isArray(remote.activityVenues) && remote.activityVenues.length
        ? remote.activityVenues
        : (this.data.activityVenues && this.data.activityVenues.length ? this.data.activityVenues : [{
            id: 'v_default_calgary_pickleball',
            name: 'Calgary Pickleball Center',
            address: '1145 65 Ave NE, Calgary, AB T2E 8T9',
            lat: 51.1036,
            lng: -114.0369,
            supportedGameIds: ['g1', 'g2']
          }]);
      this.data.settings = {
        ...(this.data.settings || {}),
        ...(remote.settings || {})
      };
      // Normalize pickleball icon client-side if DB still has ping-pong emoji
      this.data.games = this.data.games.map(g => {
        const n = (g.name || '').toLowerCase();
        if (g.id === 'g1' || n.includes('pickle') || n.includes('匹克')) {
          return { ...g, icon: g.icon === '🏓' ? 'pickle' : (g.icon || 'pickle'), color: g.color || '#ff6b00' };
        }
        return g;
      });
      if (this.data.isLoggedIn && this.data.currentUserId) {
        const stillExists = this.data.users.some(u => u.id === this.data.currentUserId);
        if (!stillExists) {
          this.data.isLoggedIn = false;
          this.data.currentUserId = null;
          this._saveSession();
        }
      }
      // Always recalculate so overlap matches stay in sync with prefs
      await this.autoGenerateGameMatches();
      this.ready = true;
      return this.data;
    }

    getCurrentUser() {
      if (!this.data.isLoggedIn || !this.data.currentUserId) return null;
      return this.data.users.find(u => u.id === this.data.currentUserId) || null;
    }

    async login(name, password) {
      const httpRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
      let res = null;
      try { res = await httpRes.json(); } catch (_) { res = null; }
      if (httpRes.ok && res && res.success && res.user) {
        const idx = this.data.users.findIndex(u => u.id === res.user.id);
        if (idx === -1) this.data.users.push(res.user);
        else this.data.users[idx] = res.user;
        this.data.currentUserId = res.user.id;
        this.data.isLoggedIn = true;
        this.data.token = res.token || null;
        this._saveSession();
        return { success: true, user: res.user, token: res.token || null };
      }
      return { success: false };
    }

    logout() {
      this.data.isLoggedIn = false;
      this.data.currentUserId = null;
      this.data.token = null;
      this._saveSession();
    }

    getUsers() { return this.data.users; }

    async addUser(userObj) {
      const res = await api('users', {
        method: 'POST',
        body: JSON.stringify({
          name: userObj.name || 'New User',
          password: userObj.password || '123456',
          permissions: userObj.permissions || ['B'],
          avatar: userObj.avatar || '👤',
          phone: userObj.phone || '+1 (403) 000-0000'
        })
      });
      if (res.user) this.data.users.push(res.user);
      return res.user;
    }

    async updateUser(updated) {
      const res = await api('users/' + updated.id, {
        method: 'PUT',
        body: JSON.stringify(updated)
      });
      const idx = this.data.users.findIndex(u => u.id === updated.id);
      if (idx !== -1 && res.user) this.data.users[idx] = res.user;
    }

    async refreshGameMatches() {
      const remote = await api('bootstrap');
      this.data.gameMatches = remote.gameMatches || [];
      return this.data.gameMatches;
    }

    async deleteUser(userId) {
      if (userId === 'u1') return;
      await api('users/' + userId, { method: 'DELETE' });
      this.data.users = this.data.users.filter(u => u.id !== userId);
    }

    getGames() { return this.data.games; }

    getActivityVenues() { return this.data.activityVenues || []; }

    getActivityVenue(venueId) {
      return (this.data.activityVenues || []).find(v => v.id === venueId) || null;
    }

    getGoogleMapsApiKey() {
      const configured = this.data.settings && this.data.settings.googleMapsApiKey ? this.data.settings.googleMapsApiKey : '';
      if (configured) return configured;
      const globalCfg = window && window.__SOCIALPAIR_CONFIG__ ? window.__SOCIALPAIR_CONFIG__.googleMapsApiKey : '';
      return globalCfg || '';
    }

    async saveGoogleMapsApiKey(apiKey) {
      this.data.settings = { ...(this.data.settings || {}), googleMapsApiKey: String(apiKey || '').trim() };
      try {
        await api('settings', {
          method: 'PUT',
          body: JSON.stringify({ googleMapsApiKey: this.data.settings.googleMapsApiKey })
        });
      } catch (err) {
        console.warn('Settings sync failed:', err);
      }
      return this.data.settings.googleMapsApiKey;
    }

    async addActivityVenue(venue) {
      const newVenue = {
        id: venue.id || 'v_' + Date.now().toString(36),
        name: venue.name || 'New Activity Venue',
        address: venue.address || '',
        lat: Number(venue.lat) || 0,
        lng: Number(venue.lng) || 0,
        supportedGameIds: Array.isArray(venue.supportedGameIds) ? venue.supportedGameIds : []
      };
      this.data.activityVenues = [...(this.data.activityVenues || []), newVenue];
      try {
        await api('activity-venues', {
          method: 'PUT',
          body: JSON.stringify({ venues: this.data.activityVenues })
        });
      } catch (err) {
        console.warn('Venue sync failed:', err);
      }
      return newVenue;
    }

    async deleteActivityVenue(venueId) {
      this.data.activityVenues = (this.data.activityVenues || []).filter(v => v.id !== venueId);
      try {
        await api('activity-venues', {
          method: 'PUT',
          body: JSON.stringify({ venues: this.data.activityVenues })
        });
      } catch (err) {
        console.warn('Venue sync failed:', err);
      }
    }

    async addGame(gameObj) {
      const res = await api('games', {
        method: 'POST',
        body: JSON.stringify(gameObj)
      });
      if (res.game) this.data.games.push(res.game);
      await this.autoGenerateGameMatches();
      return res.game;
    }

    async deleteGame(gameId) {
      await api('games/' + gameId, { method: 'DELETE' });
      this.data.games = this.data.games.filter(g => g.id !== gameId);
      await this.autoGenerateGameMatches();
    }

    getUserGamePref(userId) {
      const pref = this.data.userGamePreferences[userId] || { slots: [], gameIds: [] };
      return {
        slots: normalizeSlotList(pref.slots || []),
        gameIds: Array.from(new Set(pref.gameIds || [])),
        venueId: pref.venueId || null
      };
    }

    async saveUserGamePref(userId, slots, gameIds, venueId = null) {
      const normalizedSlots = normalizeSlotList(slots);
      const normalizedGames = Array.from(new Set(gameIds || []));
      const normalizedVenueId = venueId || null;
      this.data.userGamePreferences[userId] = {
        slots: normalizedSlots,
        gameIds: normalizedGames,
        venueId: normalizedVenueId
      };
      await api('preferences/' + userId, {
        method: 'PUT',
        body: JSON.stringify({ slots: normalizedSlots, gameIds: normalizedGames, venueId: normalizedVenueId })
      });
      await this.autoGenerateGameMatches();
    }

    async autoGenerateGameMatches() {
      const grouped = {};
      Object.entries(this.data.userGamePreferences).forEach(([userId, pref]) => {
        const slots = normalizeSlotList(pref && pref.slots ? pref.slots : []);
        const games = Array.from(new Set(pref && pref.gameIds ? pref.gameIds : []));
        const venueId = pref && pref.venueId ? pref.venueId : null;
        if (!venueId) return;
        games.forEach(gameId => {
          slots.forEach(slotKey => {
            const m = /^([0-9]{4}-[0-9]{2}-[0-9]{2})\|([0-9]{2}:[0-9]{2})$/.exec(String(slotKey));
            if (!m) return;
            const [, dayKey, timeStr] = m;
            const minute = timeToMinutes(timeStr);
            const key = `${dayKey}___${gameId}___${venueId}`;
            if (!grouped[key]) grouped[key] = {};
            if (!grouped[key][userId]) grouped[key][userId] = new Set();
            grouped[key][userId].add(minute);
          });
        });
      });

      const newMatches = [];
      const seen = new Set();
      Object.entries(grouped).forEach(([mapKey, userMinuteMap]) => {
        const userIds = Object.keys(userMinuteMap).filter(u => userMinuteMap[u] && userMinuteMap[u].size);
        if (userIds.length < 2) return;

        const parts = mapKey.split('___');
        const dayKey = parts[0];
        const gameId = parts[1];
        const venueId = parts[2] || null;
        const minuteToUsers = new Map();
        userIds.forEach(u => {
          userMinuteMap[u].forEach(minute => {
            if (!minuteToUsers.has(minute)) minuteToUsers.set(minute, new Set());
            minuteToUsers.get(minute).add(u);
          });
        });

        const sharedMinutes = [...minuteToUsers.keys()].filter(minute => minuteToUsers.get(minute).size >= 2).sort((a, b) => a - b);
        let block = [];
        const flush = () => {
          if (block.length < 2) { block = []; return; }
          const memberSet = new Set();
          block.forEach(minute => {
            (minuteToUsers.get(minute) || []).forEach(u => memberSet.add(u));
          });
          const members = [...memberSet].sort();
          if (members.length < 2) { block = []; return; }
          const startT = minutesToTime(block[0]);
          const endT = minutesToTime(block[block.length - 1] + 30);
          const matchSlotKey = `${dayKey}___${startT}-${endT}___${gameId}___${venueId}___${members.join('_')}`;
          if (seen.has(matchSlotKey)) { block = []; return; }
          seen.add(matchSlotKey);

          const existing = (this.data.gameMatches || []).find(m => m.matchSlotKey === matchSlotKey);
          const confirmedUserIds = existing
            ? (existing.confirmedUserIds || []).filter(u => members.includes(u))
            : [];

          newMatches.push({
            id: existing ? existing.id : 'm_' + Math.random().toString(36).slice(2, 8),
            matchSlotKey,
            dayKey,
            startT,
            endT,
            durationMins: block.length * 30,
            gameId,
            venueId,
            userIds: members,
            confirmedUserIds,
            status: confirmedUserIds.length >= members.length ? 'confirmed' : 'pending'
          });
          block = [];
        };

        for (let i = 0; i < sharedMinutes.length; i++) {
          const minute = sharedMinutes[i];
          if (block.length && minute !== block[block.length - 1] + 30) flush();
          block.push(minute);
        }
        flush();
      });

      this.data.gameMatches = newMatches;
      try {
        await api('game-matches', {
          method: 'PUT',
          body: JSON.stringify({ matches: newMatches })
        });
      } catch (err) {
        console.warn('Game match sync failed:', err);
      }
    }

    getFeedback() { return this.data.feedback || []; }

    async submitFeedback(userId, userName, message) {
      const res = await api('feedback', {
        method: 'POST',
        body: JSON.stringify({ userId, userName, message })
      });
      if (res.feedback) {
        this.data.feedback = [res.feedback, ...(this.data.feedback || [])];
      }
      return res.feedback;
    }

    async refreshFeedback() {
      const res = await api('feedback');
      this.data.feedback = res.feedback || [];
      return this.data.feedback;
    }

    async deleteFeedback(id) {
      await api('feedback/' + id, { method: 'DELETE' });
      this.data.feedback = (this.data.feedback || []).filter(f => f.id !== id);
    }

    async confirmGameMatch(matchId, userId) {
      const match = (this.data.gameMatches || []).find(m => m.id === matchId);
      if (match && match.userIds.includes(userId)) {
        if (!match.confirmedUserIds.includes(userId)) match.confirmedUserIds.push(userId);
        if (match.confirmedUserIds.length >= match.userIds.length) match.status = 'confirmed';
        await api('game-matches/' + matchId, {
          method: 'PATCH',
          body: JSON.stringify({
            confirmedUserIds: match.confirmedUserIds,
            status: match.status
          })
        });
        await this.refreshGameMatches();
      }
    }

    async optOutGameMatch(matchId, userId) {
      const match = (this.data.gameMatches || []).find(m => m.id === matchId);
      if (!match) return;
      match.userIds = match.userIds.filter(id => id !== userId);
      match.confirmedUserIds = match.confirmedUserIds.filter(id => id !== userId);
      if (match.userIds.length < 2) {
        this.data.gameMatches = this.data.gameMatches.filter(m => m.id !== matchId);
        await api('game-matches/' + matchId, {
          method: 'PATCH',
          body: JSON.stringify({ delete: true })
        });
      } else {
        if (match.confirmedUserIds.length >= match.userIds.length) match.status = 'confirmed';
        await api('game-matches/' + matchId, {
          method: 'PATCH',
          body: JSON.stringify({
            userIds: match.userIds,
            confirmedUserIds: match.confirmedUserIds,
            status: match.status
          })
        });
      }

      await this.refreshGameMatches();

      const pref = this.getUserGamePref(userId);
      const currentSlots = new Set(normalizeSlotList(pref.slots || []));
      const matchDate = dayKeyToDate(match.dayKey);
      if (matchDate) {
        const startM = timeToMinutes(match.startT);
        const endM = timeToMinutes(match.endT);
        const slotsToRemove = [];
        for (let t = startM; t < endM; t += 30) {
          slotsToRemove.push(`${toISODate(matchDate)}|${minutesToTime(t)}`);
        }
        slotsToRemove.forEach(s => currentSlots.delete(s));
        await this.saveUserGamePref(userId, Array.from(currentSlots), pref.gameIds || []);
      }
    }

    async joinGameMatch(matchId, userId) {
      const match = (this.data.gameMatches || []).find(m => m.id === matchId);
      if (!match) return;
      if (!match.userIds.includes(userId)) match.userIds.push(userId);
      if (!match.confirmedUserIds.includes(userId)) match.confirmedUserIds.push(userId);
      match.status = 'confirmed';
      await api('game-matches/' + matchId, {
        method: 'PATCH',
        body: JSON.stringify({
          userIds: match.userIds,
          confirmedUserIds: match.confirmedUserIds,
          status: match.status
        })
      });
      await this.refreshGameMatches();

      const pref = this.getUserGamePref(userId);
      const currentSlots = new Set(normalizeSlotList(pref.slots || []));
      const matchDate = dayKeyToDate(match.dayKey);
      if (matchDate) {
        const startM = timeToMinutes(match.startT);
        const endM = timeToMinutes(match.endT);
        for (let t = startM; t < endM; t += 30) {
          currentSlots.add(`${toISODate(matchDate)}|${minutesToTime(t)}`);
        }
        const gameIds = Array.from(new Set([...(pref.gameIds || []), match.gameId]));
        await this.saveUserGamePref(userId, Array.from(currentSlots), gameIds);
      }
    }

    getGameMatches() { return this.data.gameMatches || []; }

    getCarpoolProfile(userId) {
      return this.data.carpoolProfiles[userId] || {
        lat: 51.0447, lng: -114.0719, addressName: 'Downtown Calgary, AB',
        hasCar: false, workTime: '08:30', homeTime: '18:00', workStatus: ['seeking'], homeStatus: ['seeking']
      };
    }

    async saveCarpoolProfile(userId, profile) {
      this.data.carpoolProfiles[userId] = { ...profile };
      await api('carpool-profiles/' + userId, {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
    }

    calcDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round((R * c) * 10) / 10;
    }

    getCarpoolCandidates(currentUserId) {
      const myProfile = this.getCarpoolProfile(currentUserId);
      const matches = this.data.carpoolMatches || [];
      const candidates = [];
      this.data.users.forEach(user => {
        if (user.id === currentUserId) return;
        const profile = this.getCarpoolProfile(user.id);
        const wStat = profile.workStatus || [];
        const hStat = profile.homeStatus || [];
        if (wStat.length === 0 && hStat.length === 0) return;
        const dist = this.calcDistanceKm(myProfile.lat, myProfile.lng, profile.lat, profile.lng);
        const existingMatch = matches.find(m => (m.driverId === currentUserId && m.riderId === user.id) || (m.driverId === user.id && m.riderId === currentUserId));
        const isConnected = existingMatch && existingMatch.status === 'accepted';
        const isPending = existingMatch && existingMatch.status === 'pending';
        candidates.push({
          user: isConnected ? user : { id: user.id, name: `Anonymous Teammate #${user.id.slice(-3)}`, avatar: '👤' },
          fullUser: user, profile, distanceKm: dist,
          matchState: isConnected ? 'accepted' : (isPending ? 'pending' : 'none'),
          matchId: existingMatch ? existingMatch.id : null,
          requesterId: existingMatch ? existingMatch.requesterId : null
        });
      });
      candidates.sort((a, b) => a.distanceKm - b.distanceKm);
      return candidates;
    }

    async requestCarpool(requesterId, targetUserId) {
      const reqProfile = this.getCarpoolProfile(requesterId);
      const driverId = reqProfile.hasCar ? requesterId : targetUserId;
      const riderId = reqProfile.hasCar ? targetUserId : requesterId;
      const res = await api('carpool-matches', {
        method: 'POST',
        body: JSON.stringify({ driverId, riderId, requesterId, status: 'pending' })
      });
      if (!this.data.carpoolMatches) this.data.carpoolMatches = [];
      if (res.match) this.data.carpoolMatches.push(res.match);
      return res.match;
    }

    async acceptCarpool(matchId) {
      const match = (this.data.carpoolMatches || []).find(m => m.id === matchId);
      if (match) {
        match.status = 'accepted';
        await api('carpool-matches/' + matchId, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'accepted' })
        });
      }
    }

    async rejectCarpool(matchId) {
      this.data.carpoolMatches = (this.data.carpoolMatches || []).filter(m => m.id !== matchId);
      await api('carpool-matches/' + matchId, { method: 'DELETE' });
    }
  }

  function isNext30Min(t1, t2) { return add30Mins(t1) === t2; }
  function add30Mins(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    if (m === 0) return `${String(h).padStart(2, '0')}:30`;
    return `${String(h + 1).padStart(2, '0')}:00`;
  }

  const store = new Store();

  // --------------------------------------------------------------------------
  // 3. Auth Modal (BLANK INPUTS & Admin 'yqcw')
  // --------------------------------------------------------------------------
  function renderAuthModal(onLoginSuccess) {
    let modal = document.getElementById('authModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'authModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    // BLANK INPUT FIELDS
    modal.innerHTML = `
      <div class="glass-panel modal-box">
        <h2 style="font-size:22px;font-weight:800;margin-bottom:8px">${t('loginTitle')}</h2>
        <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">${t('loginSubtitle')}</p>
        <form id="loginForm">
          <div class="form-group">
            <label>${t('usernameLabel')}</label>
            <input type="text" id="loginName" class="form-input" value="" required placeholder="${t('loginNamePlaceholder')}">
          </div>
          <div class="form-group">
            <label>${t('passwordLabel')}</label>
            <input type="password" id="loginPass" class="form-input" value="" required placeholder="${t('passwordLabel')}">
          </div>
          <div id="loginError" style="color:var(--danger);font-size:13px;margin-bottom:14px;display:none"></div>
          <button type="submit" class="btn btn-primary" style="width:100%">${t('loginSubmit')}</button>
        </form>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('loginForm').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('loginName').value;
      const pass = document.getElementById('loginPass').value;
      const errEl = document.getElementById('loginError');
      errEl.style.display = 'none';
      try {
        const res = await store.login(name, pass);
        if (res.success) {
          modal.classList.remove('active');
          const loggedInUser = store.getCurrentUser();
          if (loggedInUser && (loggedInUser.permissions || []).includes('B')) {
            currentRoute = 'featB';
          }
          if (onLoginSuccess) onLoginSuccess();
        } else {
          errEl.textContent = t('invalidAuth');
          errEl.style.display = 'block';
        }
      } catch (err) {
        errEl.textContent = t('invalidAuth');
        errEl.style.display = 'block';
        console.error(err);
      }
    };
  }

  function isValidImageUrl(value) {
    const trimmed = String(value || '').trim();
    if (!trimmed) return true;
    if (trimmed.startsWith('data:image/')) return true;
    try {
      const url = new URL(trimmed);
      return ['http:', 'https:'].includes(url.protocol);
    } catch (err) {
      return false;
    }
  }

  function renderAvatarHtml(value, size = 32) {
    const fallback = String(value || '').trim();
    const safeSize = Number(size) || 32;
    if (!fallback || !/^https?:\/\//i.test(fallback) && !fallback.startsWith('data:image/')) {
      const icon = fallback || '👤';
      return `<span class="avatar-bubble" style="width:${safeSize}px;height:${safeSize}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);font-size:${Math.max(12, safeSize * 0.45)}px;line-height:1;">${icon}</span>`;
    }
    const safeSrc = fallback.replace(/"/g, '&quot;');
    return `<span class="avatar-bubble avatar-image-bubble" style="width:${safeSize}px;height:${safeSize}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);overflow:hidden;">
      <img src="${safeSrc}" alt="avatar" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'; this.parentElement.innerHTML='👤';" />
    </span>`;
  }

  function renderAdminConsole(onUpdate) {
    const users = store.getUsers();
    const feedback = store.getFeedback();
    const currentLocale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    const formatLastLogin = (value) => {
      if (!value) return currentLang === 'zh' ? '暂无记录' : 'No record';
      const dt = new Date(value);
      if (Number.isNaN(dt.getTime())) return value;
      return dt.toLocaleString(currentLocale);
    };
    const container = document.getElementById('appContent');
    if (!container) return;
    const googleMapsApiKey = store.getGoogleMapsApiKey();

    container.innerHTML = `
      <div class="admin-panel-shell">
        <div class="glass-panel admin-panel" style="padding:0;overflow:hidden;">
          <div class="admin-panel-header" style="padding:22px 24px;">
            <div class="admin-panel-badge">⚙️ Admin</div>
            <div>
              <h2 style="font-size:22px;font-weight:800;margin:0">${t('adminTitle')}</h2>
              <p style="color:var(--text-muted);font-size:13px;margin-top:6px">Users synced from D1 database</p>
            </div>
            <button class="btn btn-ghost btn-sm" id="closeAdminBtn">✕</button>
          </div>
          <div style="padding:20px 24px 0;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
            <div class="admin-panel-meta">Admin overview • ${users.length} users</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
              <button class="btn btn-secondary btn-sm" id="addNewUserBtn">${t('addUserBtn')}</button>
              <button class="btn btn-ghost btn-sm" id="adminVenueBtn">${t('manageVenuesBtn')}</button>
            </div>
          </div>
          <div style="padding:20px 24px 0">
            <div class="glass-panel" style="padding:16px;border:1px solid rgba(99,102,241,0.2);background:rgba(99,102,241,0.08)">
              <div style="font-size:12px;font-weight:800;color:#a5b4fc;margin-bottom:8px">${t('googleMapsApiKeyLabel')}</div>
              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                <input id="adminGoogleMapsKeyInput" class="form-input" type="text" value="${googleMapsApiKey}" placeholder="AIza..." style="min-width:260px;flex:1;max-width:480px">
                <button class="btn btn-secondary btn-sm" id="saveGoogleMapsKeyBtn">Save</button>
              </div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:8px">${t('googleMapsApiKeyHelp')}</div>
            </div>
          </div>
          <div style="padding:20px 24px 8px;overflow-x:auto;">
            <table class="data-table admin-table">
              <thead>
                <tr><th>${t('colName')}</th><th>${t('colRole')}</th><th>${t('colPerms')}</th><th>${t('colLastLogin')}</th><th>${t('colActions')}</th></tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td><div style="display:flex;align-items:center;gap:10px"><span>${renderAvatarHtml(u.avatar, 32)}</span><strong style="color:var(--text-main)">${u.name}</strong></div></td>
                    <td><span class="tag-pill" style="${u.role==='admin'?'color:var(--secondary);border-color:var(--secondary)':''}">${u.role}</span></td>
                    <td><div style="display:flex;gap:4px;flex-wrap:wrap">${['A', 'B', 'C'].map(p => `<span class="tag-pill" style="${(u.permissions || []).includes(p)?'background:var(--primary-light);color:#a5b4fc;border-color:var(--primary)':''}">Option ${p}</span>`).join('')}</div></td>
                    <td style="font-size:12px;color:var(--text-muted)">${formatLastLogin(u.lastLogin)}</td>
                    <td>
                      <button class="btn btn-ghost btn-sm edit-user-btn" data-id="${u.id}">${t('edit')}</button>
                      ${u.id !== 'u1' ? `<button class="btn btn-danger btn-sm del-user-btn" data-id="${u.id}">${t('delete')}</button>` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="padding:20px 24px 24px;border-top:1px solid var(--panel-border);margin-top:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <h3 style="font-size:18px;font-weight:800;margin:0">${t('feedbackTab')}</h3>
              <span class="tag-pill" style="border-color:var(--primary)">${feedback.length}</span>
            </div>
            ${feedback.length === 0 ? `<div class="feedback-list-item"><div class="meta">${t('feedbackEmpty')}</div></div>` : 
              feedback.map(item => `
                <div class="feedback-list-item">
                  <div class="meta">${item.userName || 'Anonymous'} · ${new Date(item.createdAt || Date.now()).toLocaleString()}</div>
                  <div style="margin-bottom:10px; color:var(--text-main)">${(item.message || '').replace(/</g, '&lt;')}</div>
                  <button class="btn btn-danger btn-sm delete-feedback-btn" data-id="${item.id}">${t('delete')}</button>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('closeAdminBtn');
    if (closeBtn) closeBtn.onclick = () => { currentRoute = 'home'; renderNavbar(); renderRoute(); };
    const addBtn = document.getElementById('addNewUserBtn');
    if (addBtn) addBtn.onclick = () => { renderUserEditModal(null, () => { renderAdminConsole(onUpdate); if (onUpdate) onUpdate(); }); };
    const venueBtn = document.getElementById('adminVenueBtn');
    if (venueBtn) venueBtn.onclick = () => renderActivityVenueModal(() => renderAdminConsole(onUpdate));
    const saveKeyBtn = document.getElementById('saveGoogleMapsKeyBtn');
    if (saveKeyBtn) {
      saveKeyBtn.onclick = async () => {
        const input = document.getElementById('adminGoogleMapsKeyInput');
        if (!input) return;
        try {
          const apiKey = await store.saveGoogleMapsApiKey(input.value);
          if (apiKey) {
            await loadGoogleMapsScript();
          }
          if (onUpdate) onUpdate();
        } catch (err) { alert(err.message); }
      };
    }
    container.querySelectorAll('.edit-user-btn').forEach(btn => {
      btn.onclick = () => {
        const userObj = users.find(u => u.id === btn.dataset.id);
        renderUserEditModal(userObj, () => { renderAdminConsole(onUpdate); if (onUpdate) onUpdate(); });
      };
    });
    container.querySelectorAll('.del-user-btn').forEach(btn => {
      btn.onclick = async () => {
        if (confirm(`Delete user ${btn.dataset.id}?`)) {
          try {
            await store.deleteUser(btn.dataset.id);
            renderAdminConsole(onUpdate);
            if (onUpdate) onUpdate();
          } catch (err) { alert(err.message); }
        }
      };
    });
    container.querySelectorAll('.delete-feedback-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.deleteFeedback(btn.dataset.id);
          renderAdminConsole(onUpdate);
        } catch (err) { alert(err.message); }
      };
    });
  }

  function renderFeedbackFab() {
    const currentUser = store.getCurrentUser();
    if (!currentUser) {
      const oldFab = document.getElementById('feedbackFab');
      const oldPanel = document.getElementById('feedbackPanel');
      if (oldFab) oldFab.remove();
      if (oldPanel) oldPanel.remove();
      return;
    }

    let fab = document.getElementById('feedbackFab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'feedbackFab';
      fab.className = 'feedback-fab';
      fab.type = 'button';
      fab.textContent = '💬';
      fab.setAttribute('aria-label', 'Open feedback');
      document.body.appendChild(fab);
    }

    let panel = document.getElementById('feedbackPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'feedbackPanel';
      panel.className = 'feedback-panel glass-panel';
      panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:10px;">
          <strong>${t('feedbackTitle')}</strong>
          <button class="btn btn-ghost btn-sm" type="button" id="closeFeedbackBtn">✕</button>
        </div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">${t('feedbackHint')}</p>
        <textarea id="feedbackInput" class="form-input" rows="4" placeholder="${t('feedbackPlaceholder')}"></textarea>
        <div style="display:flex;justify-content:flex-end;margin-top:10px;gap:10px">
          <button class="btn btn-primary btn-sm" type="button" id="sendFeedbackBtn">${t('feedbackSend')}</button>
        </div>
        <div id="feedbackSuccess" style="display:none;color:var(--success);font-size:12px;margin-top:10px">${t('feedbackThanks')}</div>
      `;
      document.body.appendChild(panel);
    }

    fab.onclick = () => panel.classList.toggle('open');
    panel.querySelector('#closeFeedbackBtn').onclick = () => panel.classList.remove('open');
    panel.querySelector('#sendFeedbackBtn').onclick = async () => {
      const val = panel.querySelector('#feedbackInput').value.trim();
      if (!val) return;
      try {
        await store.submitFeedback(currentUser.id, currentUser.name, val);
        panel.querySelector('#feedbackInput').value = '';
        const success = panel.querySelector('#feedbackSuccess');
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 2200);
      } catch (err) {
        alert(err.message);
      }
    };
  }

  function renderUserEditModal(userObj, onSaved) {
    let modal = document.getElementById('userEditModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'userEditModal'; modal.className = 'modal-overlay'; modal.style.zIndex = '2100'; document.body.appendChild(modal);
    }
    const isEdit = !!userObj;
    const perms = userObj ? userObj.permissions : ['B']; // Default Permission Option B
    const avatarValue = userObj && isValidImageUrl(userObj.avatar) ? userObj.avatar : '';
    const currentPassword = isEdit && typeof userObj.password === 'string' && userObj.password.trim() && userObj.password !== 'undefined' && userObj.password !== 'null' ? userObj.password : '';
    const passwordInputValue = isEdit ? '' : '123456';
    const passwordPlaceholder = isEdit ? 'Leave blank to keep current password' : '123456';
    modal.innerHTML = `
      <div class="glass-panel modal-box">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:20px">${t('modalUserTitle')}</h3>
        <form id="userEditForm">
          <div class="form-group"><label>${t('colName')}</label><input type="text" id="editName" class="form-input" value="${isEdit ? userObj.name : ''}" required placeholder="Username (name)"></div>
          <div class="form-group"><label>${t('passwordLabel')}</label><input type="text" id="editPassword" class="form-input" value="${passwordInputValue}" placeholder="${passwordPlaceholder}" ${isEdit ? '' : 'required'}></div>
          <div class="form-group">
            <label>Avatar Image URL</label>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
              <span>${renderAvatarHtml(userObj && userObj.avatar ? userObj.avatar : '', 42)}</span>
              <span style="color:var(--text-muted);font-size:12px">Paste a web image link</span>
            </div>
            <input type="text" id="editAvatar" class="form-input" value="${avatarValue}" placeholder="https://example.com/avatar.jpg" inputmode="url">
          </div>
          <div class="form-group">
            <label>${t('colPerms')}</label>
            <div class="perm-options">
              <label class="perm-checkbox"><input type="checkbox" name="perm" value="A" ${perms.includes('A') ? 'checked' : ''}><span>Option A (Grouping)</span></label>
              <label class="perm-checkbox"><input type="checkbox" name="perm" value="B" ${perms.includes('B') ? 'checked' : ''}><span>Option B (Activity Teamup)</span></label>
              <label class="perm-checkbox"><input type="checkbox" name="perm" value="C" ${perms.includes('C') ? 'checked' : ''}><span>Option C (Carpool)</span></label>
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
            <button type="button" class="btn btn-ghost" id="cancelEditUser">Cancel</button>
            <button type="submit" class="btn btn-primary">${t('saveUserBtn')}</button>
          </div>
        </form>
      </div>
    `;
    modal.classList.add('active');
    document.getElementById('cancelEditUser').onclick = () => modal.classList.remove('active');
    document.getElementById('userEditForm').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('editName').value;
      const inputPassword = document.getElementById('editPassword').value.trim();
      const sanitizedPassword = inputPassword && inputPassword !== 'undefined' && inputPassword !== 'null' ? inputPassword : '';
      const password = isEdit ? (sanitizedPassword || currentPassword || '123456') : (sanitizedPassword || '123456');
      const avatar = document.getElementById('editAvatar').value.trim();
      const checkedPerms = Array.from(modal.querySelectorAll('input[name="perm"]:checked')).map(el => el.value);
      if (avatar && !isValidImageUrl(avatar)) {
        alert('Please enter a valid image URL.');
        return;
      }
      try {
        if (isEdit) await store.updateUser({ id: userObj.id, name, password, permissions: checkedPerms, avatar: avatar || (userObj.avatar || '👤') });
        else await store.addUser({ name, password, permissions: checkedPerms, avatar: avatar || '👤' });
        modal.classList.remove('active');
        if (onSaved) onSaved();
      } catch (err) { alert(err.message); }
    };
  }

  function renderProfileModal(onSaved) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;
    let modal = document.getElementById('profileModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'profileModal'; modal.className = 'modal-overlay'; modal.style.zIndex = '2100'; document.body.appendChild(modal);
    }
    const avatarInputValue = isValidImageUrl(currentUser.avatar) ? currentUser.avatar : '';

    modal.innerHTML = `
      <div class="glass-panel modal-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
          <h3 style="font-size:20px;font-weight:800;margin:0">${getLang() === 'zh' ? '个人资料' : 'Profile'}</h3>
          <button type="button" class="btn btn-ghost btn-sm" id="closeProfileModal">✕</button>
        </div>
        <form id="profileForm">
          <div class="form-group">
            <label>${getLang() === 'zh' ? '头像图片链接' : 'Avatar Image URL'}</label>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
              <span>${renderAvatarHtml(currentUser.avatar, 52)}</span>
              <span style="color:var(--text-muted);font-size:12px">${getLang() === 'zh' ? '系统将展示为圆形头像' : 'The system will display a circular avatar'}</span>
            </div>
            <input type="text" id="profileAvatar" class="form-input" value="${avatarInputValue}" placeholder="https://example.com/avatar.jpg" inputmode="url">
          </div>
          <div class="form-group">
            <label>${getLang() === 'zh' ? '用户名' : 'Username'}</label>
            <input type="text" id="profileName" class="form-input" value="${currentUser.name || ''}" required>
          </div>
          <div class="form-group">
            <label>${getLang() === 'zh' ? '新密码' : 'New Password'}</label>
            <input type="text" id="profilePassword" class="form-input" value="" placeholder="${getLang() === 'zh' ? '留空则保持当前密码' : 'Leave blank to keep current password'}">
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
            <button type="button" class="btn btn-ghost" id="cancelProfileModal">${getLang() === 'zh' ? '取消' : 'Cancel'}</button>
            <button type="submit" class="btn btn-primary">${getLang() === 'zh' ? '保存' : 'Save'}</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    document.getElementById('closeProfileModal').onclick = () => modal.classList.remove('active');
    document.getElementById('cancelProfileModal').onclick = () => modal.classList.remove('active');
    document.getElementById('profileForm').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('profileName').value.trim();
      const inputPassword = document.getElementById('profilePassword').value.trim();
      const password = inputPassword || currentUser.password || '123456';
      const avatar = document.getElementById('profileAvatar').value.trim();
      if (!name) {
        alert(getLang() === 'zh' ? '用户名不能为空。' : 'Username cannot be empty.');
        return;
      }
      if (avatar && !isValidImageUrl(avatar)) {
        alert(getLang() === 'zh' ? '请输入有效的图片链接。' : 'Please enter a valid image URL.');
        return;
      }
      try {
        await store.updateUser({ ...currentUser, name, password, avatar: avatar || (currentUser.avatar || '👤'), permissions: currentUser.permissions || ['B'] });
        modal.classList.remove('active');
        if (onSaved) onSaved();
      } catch (err) {
        alert(err.message || (getLang() === 'zh' ? '保存失败' : 'Save failed'));
      }
    };
  }

  // --------------------------------------------------------------------------
  // 4. Feature A: Dynamic Grouping
  // --------------------------------------------------------------------------
  function renderFeatureA(container) {
    const lang = getLang();
    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="hero-badge" style="background:var(--primary-light);color:var(--primary);border-color:rgba(99,102,241,0.3)">⚡ Option A · MeetGo Grouping System</span>
        <h1 style="font-size:30px;font-weight:800;margin-top:8px">${lang === 'zh' ? '动态玩家分组配对系统' : 'Dynamic Player Grouping System'}</h1>
      </div>
      <div class="glass-panel" style="padding:12px;overflow:hidden">
        <iframe id="meetgoFrame" src="./meetgo/meetgo.html" style="width:100%;height:820px;border:none;border-radius:14px;background:#fff"></iframe>
      </div>
    `;
  }

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
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(dayKey))) return parseISODate(String(dayKey));
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
    const weekdayName = date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long' });
    const isoDate = toISODate(date);
    const dayName = lang === 'zh' ? weekdayName.replace('星期', '周') : weekdayName;
    const dayKey = String(m.dayKey || '');
    const relativeWeek = dayKey.startsWith('next-') ? t('tabNextWeek') : t('tabThisWeek');
    return `${relativeWeek} · ${dayName} · ${isoDate}`;
  }

  function renderCompactMatchCard(m, games, lang) {
    const gameObj = games.find(g => g.id === m.gameId) || { name: m.gameId, icon: '🎮' };
    const isConfirmed = m.status === 'confirmed';
    const allUsers = store.getUsers();
    const memberCount = (m.userIds || []).length;
    const confirmedCount = (m.confirmedUserIds || []).length;
    return `
      <div class="match-card ${isConfirmed ? 'confirmed' : ''}" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:12px">
            <span class="sport-icon-wrap" style="width:42px;height:42px;background:rgba(255,255,255,0.06);border-radius:12px">${renderSportIcon(gameObj, 24)}</span>
            <div>
              <h4 style="font-size:16px;font-weight:800;color:#fff;margin:0">${gameObj.name}</h4>
              <div style="color:var(--text-muted);font-size:12px;display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
                <span>📅 ${formatMatchDateLabel(m, lang)}</span>
              </div>
            </div>
          </div>
          <span class="status-badge ${isConfirmed ? 'confirmed' : 'pending'}" style="font-size:11px;padding:5px 8px">${isConfirmed ? t('statusConfirmed') : t('statusPending')}</span>
        </div>
        <div style="color:var(--text-main);font-weight:700;font-size:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px">
          <span>⏰ ${m.startT} - ${m.endT}</span>
          <span style="color:var(--text-muted)">•</span>
          <span>${memberCount} ${lang === 'zh' ? '成员' : 'members'}</span>
          <span style="color:${confirmedCount === memberCount ? 'var(--success)' : 'var(--text-muted)'}">• ✓ ${confirmedCount}/${memberCount}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${(m.userIds || []).slice(0, 4).map(uId => {
            const u = allUsers.find(item => item.id === uId) || { name: uId, avatar: '👤' };
            const hasConf = (m.confirmedUserIds || []).includes(uId);
            return `<span style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;background:${hasConf ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)'};border:1px solid ${hasConf ? 'rgba(16,185,129,0.45)' : 'rgba(255,255,255,0.12)'};font-size:11px;font-weight:700;color:var(--text-main)">${renderAvatarHtml(u.avatar, 18)} ${u.name}${hasConf ? ' ✓' : ''}</span>`;
          }).join('')}
          ${(m.userIds || []).length > 4 ? `<span style="padding:5px 10px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);font-size:11px;font-weight:700;color:var(--text-main)">+${(m.userIds || []).length - 4}</span>` : ''}
        </div>
      </div>
    `;
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
                <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:${hasConf?'var(--success-bg)':'rgba(255,255,255,0.06)'};border:1px solid ${hasConf?'var(--success)':'rgba(255,255,255,0.1)'};font-size:13px;font-weight:600">
                  <span>${renderAvatarHtml(u.avatar, 20)}</span>
                  <span>${u.name}</span>
                  ${hasConf ? '<span style="color:var(--success)">✓</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
        ${(!past && (m.userIds || []).includes(currentUser.id)) ? `
          <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap">
            <button class="btn btn-ghost btn-sm opt-out-btn" data-id="${m.id}">${lang === 'zh' ? '退出该场' : 'Exit This Match'}</button>
            <button class="btn ${userHasConfirmed ? 'btn-secondary' : 'btn-primary'} btn-sm confirm-btn" data-id="${m.id}" ${userHasConfirmed ? 'disabled' : ''}>
              ${userHasConfirmed ? '✓ Confirmed' : t('confirmSession')}
            </button>
          </div>
        ` : (!past ? `
          <div style="display:flex;justify-content:flex-end">
            <button class="btn btn-primary btn-sm join-match-btn" data-id="${m.id}">${lang === 'zh' ? '加入该场' : 'Join This Match'}</button>
          </div>
        ` : '')}
      </div>
    `;
  }

  function normalizeSlotKey(raw) {
    const s = String(raw || '').trim();
    if (!s) return null;
    if (/^\d{4}-\d{2}-\d{2}\|\d{2}:\d{2}$/.test(s)) return s;
    const match = s.match(/^(this|next)-([A-Za-z]{3})-(\d{2}:\d{2})$/);
    if (!match) return null;
    const [, week, dayId, time] = match;
    const monday = getMonday(new Date());
    const target = new Date(monday);
    const info = DAYS.find(d => d.id === dayId);
    if (!info) return null;
    const offset = info.dow === 0 ? 6 : info.dow - 1;
    target.setDate(monday.getDate() + offset + (week === 'next' ? 7 : 0));
    return `${toISODate(target)}|${time}`;
  }

  function slotKeyForDate(dateObj, timeSlot) {
    return `${toISODate(dateObj)}|${timeSlot}`;
  }

  function normalizeSlotList(slots) {
    return Array.from(new Set((slots || []).map(normalizeSlotKey).filter(Boolean)));
  }

  function timeToMinutes(timeStr) {
    const [h, m] = String(timeStr).split(':').map(Number);
    return h * 60 + m;
  }

  function minutesToTime(value) {
    const mins = Number(value) || 0;
    const hours = Math.floor(mins / 60) % 24;
    const minutes = mins % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  function getVenueById(venueId) {
    return (store.getActivityVenues() || []).find(v => v.id === venueId) || null;
  }

  function isVenueGameSupported(venueId, gameId) {
    if (!venueId) return true;
    const venue = getVenueById(venueId);
    if (!venue) return true;
    const support = Array.isArray(venue.supportedGameIds) ? venue.supportedGameIds : [];
    return support.length === 0 || support.includes(gameId);
  }

  function renderVenueMapEmbed(venue, sizeLabel) {
    if (!venue || !venue.address) return '<span style="color:var(--text-muted)">📍 No venue mapped</span>';
    const query = encodeURIComponent(`${venue.name || venue.address} ${venue.address}`);
    return `
      <div style="margin-top:12px;border:1px solid rgba(255,255,255,0.12);border-radius:12px;overflow:hidden;background:rgba(255,255,255,0.02)">
        <div style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:var(--text-muted)">
          📍 ${venue.name} · ${venue.address}
        </div>
        <iframe
          title="${venue.name} map"
          src="https://www.google.com/maps?q=${query}&output=embed"
          style="width:100%;height:${sizeLabel === 'compact' ? '150px' : '220px'};border:0;display:block;filter:grayscale(0.2) contrast(1.1);"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    `;
  }

  function renderFeatureB(container) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;

    if (!calendarRange) ensureCalendarRangeForWeek(activeWeek);

    const userPref = store.getUserGamePref(currentUser.id);
    const games = store.getGames();
    const venues = store.getActivityVenues();
    const matches = store.getGameMatches();
    const lang = getLang();

    const selectedSlots = new Set(normalizeSlotList(userPref.slots || []));
    const selectedGames = new Set(Array.from(new Set(userPref.gameIds || [])));
    const selectedVenueId = userPref.venueId || '';
    const visibleGames = selectedVenueId ? games.filter(g => isVenueGameSupported(selectedVenueId, g.id)) : games;

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
              </div>
            </div>
                  <div class="calendar-toolbar-row">
              <span style="font-size:12px;color:var(--text-muted);font-weight:700">${t('quickPresets')}</span>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekdays"> <span>${t('presetWeekdays')}</span></label>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekends"> <span>${t('presetWeekends')}</span></label>
              <span style="font-size:12px;color:var(--text-muted)">${t('startTimeLabel')}:</span>
              <input type="time" id="rangeStart" class="form-input" style="width:110px;padding:6px 10px" value="17:00" step="1800">
              <span style="font-size:12px;color:var(--text-muted)">${t('endTimeLabel')}:</span>
              <input type="time" id="rangeEnd" class="form-input" style="width:110px;padding:6px 10px" value="18:00" step="1800">
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
                        const slotKey = slotKeyForDate(dateObj, tSlot);
                        const isSelected = selectedSlots.has(slotKey);
                        return `<button class="slot-btn ${isSelected ? 'selected' : ''}" data-slot="${slotKey}">${tSlot} - ${add30Mins(tSlot)}</button>`;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div style="margin-bottom:20px">
            <label class="form-group label">${t('venueSelectLabel')}</label>
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
              <select id="venueSelect" class="form-select" style="min-width:260px">
                <option value="">${t('noVenueSelected')}</option>
                ${venues.map(v => `<option value="${v.id}" ${selectedVenueId === v.id ? 'selected' : ''}>${v.name} · ${v.address}</option>`).join('')}
              </select>
              ${currentUser.role === 'admin' ? `<button class="btn btn-ghost btn-sm" id="manageVenuesBtn">${t('manageVenuesBtn')}</button>` : ''}
            </div>
          </div>

          <div style="margin-bottom:24px">
            <label class="form-group label">${t('selectGamesLabel')}</label>
            <div class="game-picker-grid">
              ${visibleGames.map(g => {
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

          ${selectedVenueId ? `
            <div style="margin-bottom:20px">
              <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:8px">${t('venueMapLabel')}</div>
              ${renderVenueMapEmbed(getVenueById(selectedVenueId), 'wide')}
            </div>
          ` : ''}

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
              ${pastMatches.map(m => {
                const venue = getVenueById(m.venueId || selectedVenueId || '');
                return `
                  <div class="match-card-wrap">
                    ${renderMatchCard(m, games, currentUser, lang)}
                    ${venue ? renderVenueMapEmbed(venue, 'compact') : ''}
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    const tabB1 = container.querySelector('#tabB1');
    const tabB2 = container.querySelector('#tabB2');
    tabB1.onclick = () => { activeSubTabB = 'viewB1'; renderFeatureB(container); };
    tabB2.onclick = () => { activeSubTabB = 'viewB2'; renderFeatureB(container); };

    const venueSelect = container.querySelector('#venueSelect');
    if (venueSelect) {
      venueSelect.onchange = async () => {
        const nextVenueId = venueSelect.value || null;
        const nextGames = Array.from(selectedGames).filter(gid => isVenueGameSupported(nextVenueId, gid));
        selectedGames.clear();
        nextGames.forEach(gid => selectedGames.add(gid));
        try {
          await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames), nextVenueId);
          renderFeatureB(container);
        } catch (err) { alert(err.message); }
      };
    }

    const manageVenuesBtn = container.querySelector('#manageVenuesBtn');
    if (manageVenuesBtn) {
      manageVenuesBtn.onclick = () => renderActivityVenueModal(() => renderFeatureB(container));
    }

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

    const calFromInput = container.querySelector('#calFrom');
    const calToInput = container.querySelector('#calTo');
    const applyCalendarRange = () => {
      const from = calFromInput.value;
      const to = calToInput.value;
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
    if (calFromInput) calFromInput.onchange = applyCalendarRange;
    if (calToInput) calToInput.onchange = applyCalendarRange;

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

      if (!startT || !endT || startT >= endT) {
        alert('Please choose a valid 24-hour time range where start time is earlier than end time.');
        return;
      }

      const targetDows = new Set();
      if (isWeekdays) [1, 2, 3, 4, 5].forEach(d => targetDows.add(d));
      if (isWeekends) { targetDows.add(6); targetDows.add(0); }
      if (targetDows.size === 0) [1, 2, 3, 4, 5].forEach(d => targetDows.add(d));

      eachDateInclusive(calendarRange.from, calendarRange.to).forEach(dateObj => {
        if (!targetDows.has(dateObj.getDay())) return;
        TIME_SLOTS.forEach(tSlot => {
          if (tSlot >= startT && tSlot < endT) {
            selectedSlots.add(slotKeyForDate(dateObj, tSlot));
          }
        });
      });
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames), selectedVenueId || null);
        renderFeatureB(container);
      } catch (err) { alert(err.message); }
    };

    container.querySelector('#clearSlotsBtn').onclick = async () => {
      eachDateInclusive(calendarRange.from, calendarRange.to).forEach(dateObj => {
        TIME_SLOTS.forEach(tSlot => {
          selectedSlots.delete(slotKeyForDate(dateObj, tSlot));
        });
      });
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames), selectedVenueId || null);
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
          await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames), selectedVenueId || null);
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
          await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames), selectedVenueId || null);
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelector('#savePrefBtn').onclick = async () => {
      const filteredGames = Array.from(selectedGames).filter(gid => isVenueGameSupported(selectedVenueId, gid));
      if (!filteredGames || filteredGames.length === 0) {
        alert('Please select at least one activity category before saving your availability.');
        return;
      }
      try {
        await store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), filteredGames, selectedVenueId || null);
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
        const msg = lang === 'zh'
          ? '确认退出该场？请通知其他组员，以免他们等待你。'
          : 'Leave this match? Please notify the other players so they know you are stepping out.';
        if (!window.confirm(msg)) return;
        try {
          await store.optOutGameMatch(btn.dataset.id, currentUser.id);
          activeSubTabB = 'viewB2';
          renderFeatureB(container);
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelectorAll('.join-match-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.joinGameMatch(btn.dataset.id, currentUser.id);
          activeSubTabB = 'viewB2';
          renderFeatureB(container);
        } catch (err) { alert(err.message); }
      };
    });

    const manageBtn = container.querySelector('#manageCategoriesBtn');
    if (manageBtn) manageBtn.onclick = () => renderGameCategoryModal(() => renderFeatureB(container));
  }

  function renderActivityVenueModal(onSaved) {
    let modal = document.getElementById('activityVenueModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'activityVenueModal'; modal.className = 'modal-overlay'; document.body.appendChild(modal);
    }
    const venues = store.getActivityVenues();
    const games = store.getGames();
    modal.innerHTML = `
      <div class="glass-panel modal-box" style="width:min(100%, 860px)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 style="font-size:20px;font-weight:800">${t('manageVenuesBtn')}</h3>
          <button class="btn btn-ghost btn-sm" id="closeVenueModalBtn">✕</button>
        </div>
        <div style="margin-bottom:18px;max-height:220px;overflow-y:auto;display:grid;gap:10px">
          ${venues.map(v => `
            <div style="padding:12px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:rgba(255,255,255,0.03)">
              <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
                <div>
                  <strong>${v.name}</strong>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px">📍 ${v.address}</div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px">📍 ${Number(v.lat || 0).toFixed(4)}, ${Number(v.lng || 0).toFixed(4)}</div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px">🧩 ${((v.supportedGameIds || []).map(id => (games.find(g => g.id === id) || { name: id }).name).join(', ') || '—')}</div>
                </div>
                <button class="btn btn-danger btn-sm del-venue-btn" data-id="${v.id}">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
        <form id="addVenueForm" style="border-top:1px dashed var(--panel-border);padding-top:18px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <input type="text" id="venueName" class="form-input" placeholder="Venue Name" required>
            <input type="text" id="venueAddress" class="form-input" placeholder="Search address or pick on map" required>
          </div>
          <div style="margin-bottom:12px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;">
            <div id="venueMapPreview" style="width:100%;height:200px;background:rgba(255,255,255,0.02)"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <input type="number" step="0.0001" id="venueLat" class="form-input" placeholder="Latitude">
            <input type="number" step="0.0001" id="venueLng" class="form-input" placeholder="Longitude">
          </div>
          <div style="margin-bottom:14px">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:8px">Supported Activity Categories</div>
            <div class="perm-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px">
              ${games.map(g => `
                <label class="perm-checkbox" style="padding:6px 10px;">
                  <input type="checkbox" name="venueGame" value="${g.id}">
                  <span>${g.name}</span>
                </label>
              `).join('')}
            </div>
          </div>
          <button type="submit" class="btn btn-secondary" style="width:100%">Add Venue</button>
        </form>
      </div>
    `;

    const setLatLng = (lat, lng) => {
      const latValue = Number(lat);
      const lngValue = Number(lng);
      const latInput = modal.querySelector('#venueLat');
      const lngInput = modal.querySelector('#venueLng');
      if (latInput) latInput.value = Number.isFinite(latValue) ? latValue.toFixed(5) : '';
      if (lngInput) lngInput.value = Number.isFinite(lngValue) ? lngValue.toFixed(5) : '';
    };

    const attachVenueMapPicker = async () => {
      const mapEl = modal.querySelector('#venueMapPreview');
      const addressInput = modal.querySelector('#venueAddress');
      const latInput = modal.querySelector('#venueLat');
      const lngInput = modal.querySelector('#venueLng');
      if (!mapEl || !addressInput || !latInput || !lngInput) return;
      try {
        await loadGoogleMapsScript();
        await waitForGooglePlacesReady();
      } catch (err) {
        console.warn('Google Maps unavailable for venue picker:', err);
        const warn = document.createElement('div');
        warn.textContent = err.message || 'Places autocomplete is disabled. Enable Places API (New) and Maps JavaScript API in Google Cloud, then refresh the page.';
        warn.style.cssText = 'padding:8px 10px;font-size:12px;color:#fca5a5;background:rgba(127,29,29,0.45);border:1px solid rgba(248,113,113,0.45);border-radius:8px;margin-top:8px;';
        if (mapEl && mapEl.parentElement) mapEl.parentElement.appendChild(warn);
        return;
      }

      const defaultCenter = { lat: 51.0447, lng: -114.0719 };
      const map = new google.maps.Map(mapEl, {
        center: defaultCenter,
        zoom: 11,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      const marker = new google.maps.Marker({
        map,
        draggable: true,
        position: defaultCenter
      });

      const syncFromCoords = (lat, lng) => {
        const nextLat = Number(lat);
        const nextLng = Number(lng);
        if (!Number.isFinite(nextLat) || !Number.isFinite(nextLng)) return;
        const pos = { lat: nextLat, lng: nextLng };
        marker.setPosition(pos);
        map.panTo(pos);
        map.setZoom(15);
        setLatLng(nextLat, nextLng);
      };

      google.maps.event.addListener(marker, 'dragend', () => {
        const pos = marker.getPosition();
        if (pos) syncFromCoords(pos.lat(), pos.lng());
      });
      google.maps.event.addListener(map, 'click', (event) => {
        if (event && event.latLng) syncFromCoords(event.latLng.lat(), event.latLng.lng());
      });

      const geocodeAddress = async () => {
        const q = addressInput.value.trim();
        if (!q) return;

        try {
          const result = await geocodeAddressToLatLng(q, {
            componentRestrictions: { country: 'CA' },
            region: 'CA'
          });
          addressInput.value = result.formattedAddress || addressInput.value;
          syncFromCoords(result.lat, result.lng);
        } catch (err) {
          console.warn('Address geocode failed:', err);
        }
      };

      addressInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          await geocodeAddress();
        }
      });
      addressInput.addEventListener('blur', async () => {
        if (addressInput.value.trim()) {
          await geocodeAddress();
        }
      });

      const existingLat = Number(latInput.value || 0);
      const existingLng = Number(lngInput.value || 0);
      if (Number.isFinite(existingLat) && Number.isFinite(existingLng)) {
        syncFromCoords(existingLat, existingLng);
      }
    };

    modal.classList.add('active');
    attachVenueMapPicker();
    document.getElementById('closeVenueModalBtn').onclick = () => modal.classList.remove('active');
    modal.querySelectorAll('.del-venue-btn').forEach(btn => {
      btn.onclick = async () => {
        await store.deleteActivityVenue(btn.dataset.id);
        renderActivityVenueModal(onSaved);
        if (onSaved) onSaved();
      };
    });
    document.getElementById('addVenueForm').onsubmit = async (e) => {
      e.preventDefault();
      const selected = Array.from(modal.querySelectorAll('input[name="venueGame"]:checked')).map(el => el.value);
      await store.addActivityVenue({
        name: document.getElementById('venueName').value.trim(),
        address: document.getElementById('venueAddress').value.trim(),
        lat: Number(document.getElementById('venueLat').value || 0),
        lng: Number(document.getElementById('venueLng').value || 0),
        supportedGameIds: selected
      });
      renderActivityVenueModal(onSaved);
      if (onSaved) onSaved();
    };
  }

  function renderGameCategoryModal(onSaved) {
    let modal = document.getElementById('categoryModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'categoryModal'; modal.className = 'modal-overlay'; document.body.appendChild(modal);
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
              <div style="display:flex;align-items:center;gap:10px"><span class="sport-icon-wrap">${renderSportIcon(g, 22)}</span><span><strong>${g.name}</strong></span></div>
              <button class="btn btn-danger btn-sm del-cat-btn" data-id="${g.id}">Delete</button>
            </div>
          `).join('')}
        </div>
        <form id="addCatForm" style="border-top:1px dashed var(--panel-border);padding-top:20px">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">+ ${t('addCategoryBtn')}</h4>
          <div style="display:grid;grid-template-columns:1fr auto;gap:10px;margin-bottom:14px">
            <input type="text" id="catName" class="form-input" placeholder="${t('catName')}" required>
            <input type="text" id="catIcon" class="form-input" value="🎯" style="width:60px;text-align:center">
          </div>
          <button type="submit" class="btn btn-secondary btn-sm" style="width:100%">${t('addCategoryBtn')}</button>
        </form>
      </div>
    `;
    modal.classList.add('active');
    document.getElementById('closeCatBtn').onclick = () => modal.classList.remove('active');
    modal.querySelectorAll('.del-cat-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.deleteGame(btn.dataset.id);
          renderGameCategoryModal(onSaved);
          if (onSaved) onSaved();
        } catch (err) { alert(err.message); }
      };
    });
    document.getElementById('addCatForm').onsubmit = async (e) => {
      e.preventDefault();
      try {
        await store.addGame({ name: document.getElementById('catName').value, icon: document.getElementById('catIcon').value });
        renderGameCategoryModal(onSaved);
        if (onSaved) onSaved();
      } catch (err) { alert(err.message); }
    };
  }

  // --------------------------------------------------------------------------
  // 6. Feature C: Carpooling System
  // --------------------------------------------------------------------------
  let gMapInstance = null;
  let activeSubTabC = 'viewC2';

  let googleMapsLoadPromise = null;

  function loadGoogleMapsScript() {
    const apiKey = store.getGoogleMapsApiKey();
    if (!apiKey) return Promise.resolve();
    if (window.google && window.google.maps) return Promise.resolve();
    if (googleMapsLoadPromise) return googleMapsLoadPromise;

    const legacyScripts = Array.from(document.querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]'));
    legacyScripts.forEach(script => script.remove());

    googleMapsLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'googleMapsScript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps script failed to load. Please confirm the API key is valid and the Maps JavaScript API + Places API are enabled in Google Cloud.'));
      document.head.appendChild(script);
    });

    return googleMapsLoadPromise;
  }

  function getCalgaryCenterFallback() {
    return { lat: 51.0447, lng: -114.0719 };
  }

  function normalizeLatLng(latLng) {
    const lat = Number(latLng && latLng.lat);
    const lng = Number(latLng && latLng.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { lat, lng };
    }
    return getCalgaryCenterFallback();
  }

  async function geocodeAddressToLatLng(query, options = {}) {
    const cleanedQuery = String(query || '').trim();
    if (!cleanedQuery) {
      throw new Error('Address is empty.');
    }
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      throw new Error('Google Maps Geocoder is unavailable.');
    }

    return await new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const request = { address: cleanedQuery, ...options };
      geocoder.geocode(request, (results, status) => {
        if (status !== 'OK' || !results || !results.length) {
          reject(new Error(status || 'Address lookup failed.'));
          return;
        }
        const place = results[0];
        const location = place.geometry && place.geometry.location;
        if (!location) {
          reject(new Error('No geometry returned for this address.'));
          return;
        }
        resolve({
          lat: Number(location.lat()),
          lng: Number(location.lng()),
          formattedAddress: place.formatted_address || cleanedQuery
        });
      });
    });
  }

  function createMapMarker(options) {
    if (window.google && window.google.maps && window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
      const { map, position, title, icon } = options;
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title
      });
      if (icon && icon.url && marker.element) {
        const badge = marker.element.querySelector('.google-material-symbols');
        if (badge) badge.style.display = 'none';
        const img = document.createElement('img');
        img.src = icon.url;
        img.alt = title || 'Map marker';
        img.style.cssText = 'width:20px;height:20px;display:block;border-radius:50%;';
        marker.element.style.display = 'flex';
        marker.element.style.alignItems = 'center';
        marker.element.style.justifyContent = 'center';
        marker.element.innerHTML = '';
        marker.element.appendChild(img);
      }
      return marker;
    }
    return new google.maps.Marker(options);
  }

  async function waitForGooglePlacesReady(timeoutMs = 15000) {
    const start = Date.now();
    while (!(window.google && window.google.maps && (window.google.maps.places || window.google.maps.places && window.google.maps.places.PlaceAutocompleteElement))) {
      if (Date.now() - start > timeoutMs) {
        throw new Error('Places autocomplete is disabled. Enable Places API (New) and Maps JavaScript API in Google Cloud, then refresh the page.');
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  function initVenueAutocomplete(inputId, setLatLng) {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    const autocomplete = new google.maps.places.Autocomplete(inputEl, {
      componentRestrictions: { country: 'ca' },
      fields: ['geometry', 'name', 'formatted_address']
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        if (typeof setLatLng === 'function') setLatLng(lat, lng);
      }
    });
  }

  function renderFeatureC(container) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;

    const myProfile = store.getCarpoolProfile(currentUser.id);
    const candidates = store.getCarpoolCandidates(currentUser.id);
    const lang = getLang();

    const wStat = Array.isArray(myProfile.workStatus) ? myProfile.workStatus : [myProfile.workStatus || 'seeking'];
    const hStat = Array.isArray(myProfile.homeStatus) ? myProfile.homeStatus : [myProfile.homeStatus || 'seeking'];

    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="hero-badge" style="background:rgba(249,115,22,0.15);color:var(--accent-orange);border-color:rgba(249,115,22,0.3)">🚗 Option C · Carpool Mobility</span>
        <h1 style="font-size:30px;font-weight:800;margin-top:8px">${t('featCTitle')}</h1>
      </div>
      <div class="sub-tabs">
        <button class="sub-tab-btn ${activeSubTabC==='viewC2'?'active':''}" id="tabC2">${t('c2Title')}</button>
        <button class="sub-tab-btn ${activeSubTabC==='viewC1'?'active':''}" id="tabC1">${t('c1Title')}</button>
      </div>

      <!-- View C2 -->
      <div id="viewC2" style="${activeSubTabC==='viewC2'?'display:block':'display:none'}">
        <div class="anonymity-alert"><span>${t('privacyNote')}</span></div>
        <div class="glass-panel" style="padding:16px;margin-bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 8px">
            <span style="font-weight:800;font-size:15px;color:#a5b4fc">📍 Google Maps · Destination: 7019 8 St NE, Calgary, AB T2E 8A2</span>
            <span style="font-size:12px;color:var(--text-muted)">Showing ${candidates.length} nearby commuters</span>
          </div>
          <div id="carpoolMap"></div>
        </div>

        <div class="glass-panel" style="padding:24px">
          <h3 style="font-size:20px;font-weight:800;margin-bottom:6px">${t('c2Title')}</h3>
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('c2Sub')}</p>
          ${candidates.length === 0 ? `
            <div style="text-align:center;padding:40px;color:var(--text-muted)"><p style="font-size:40px">🚙</p><p>No available carpool candidates right now.</p></div>
          ` : `
            <div style="display:grid;gap:14px">
              ${candidates.map(item => {
                const isMatched = item.matchState === 'accepted';
                const isPending = item.matchState === 'pending';
                const isIncomingReq = isPending && item.requesterId !== currentUser.id;
                const isMyOutReq = isPending && item.requesterId === currentUser.id;

                const candW = Array.isArray(item.profile.workStatus) ? item.profile.workStatus.join(', ') : item.profile.workStatus;
                const candH = Array.isArray(item.profile.homeStatus) ? item.profile.homeStatus.join(', ') : item.profile.homeStatus;

                return `
                  <div class="glass-card" style="padding:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;border-left:4px solid ${isMatched?'var(--success)':(item.profile.hasCar?'var(--primary)':'var(--accent-orange)')}">
                    <div style="display:flex;align-items:center;gap:16px">
                      <span style="font-size:36px;background:rgba(255,255,255,0.06);padding:10px;border-radius:16px">${isMatched ? (item.fullUser.avatar || '👤') : '👤'}</span>
                      <div>
                        <div style="display:flex;align-items:center;gap:10px">
                          <h4 style="font-size:18px;font-weight:800">${isMatched ? `${item.fullUser.name} (${item.fullUser.phone})` : item.user.name}</h4>
                          <span class="tag-pill" style="${item.profile.hasCar?'color:var(--primary);border-color:var(--primary)':'color:var(--accent-orange);border-color:var(--accent-orange)'}">${item.profile.hasCar ? '🚘 Driver (Car Owner)' : '🎒 Rider'}</span>
                        </div>
                        <div style="font-size:13px;color:var(--text-muted);margin-top:6px;display:flex;gap:14px;flex-wrap:wrap">
                          <span>📍 ${item.profile.addressName}</span>
                          <strong style="color:var(--secondary)">📏 ${item.distanceKm} ${t('distanceKm')}</strong>
                          <span>🌅 Work: ${item.profile.workTime} (${candW})</span>
                          <span>🌃 Home: ${item.profile.homeTime} (${candH})</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      ${isMatched ? `<span class="status-badge confirmed">✓ ${t('matchedStatus')}</span>` :
                        isIncomingReq ? `<div style="display:flex;gap:8px"><button class="btn btn-danger btn-sm reject-cp-btn" data-id="${item.matchId}">${t('rejectCarpool')}</button><button class="btn btn-secondary btn-sm accept-cp-btn" data-id="${item.matchId}">✓ ${t('acceptCarpool')}</button></div>` :
                        isMyOutReq ? `<span class="status-badge pending">⏳ ${t('awaitingConsent')}</span>` :
                        `<button class="btn ${myProfile.hasCar ? 'btn-secondary' : 'btn-orange'} btn-sm req-cp-btn" data-target="${item.fullUser.id}">${myProfile.hasCar ? t('offerPickup') : t('requestJoin')}</button>`
                      }
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- View C1 -->
      <div id="viewC1" style="${activeSubTabC==='viewC1'?'display:block':'display:none'}">
        <div class="glass-panel" style="padding:24px">
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('c1Sub')}</p>
          <form id="carpoolProfileForm">
            <div style="background:rgba(99,102,241,0.12);padding:14px 18px;border-radius:var(--radius-md);border:1px solid rgba(99,102,241,0.25);margin-bottom:20px;color:#a5b4fc;font-weight:700;font-size:14px">🏢 ${t('destinationFixed')}</div>

            <div class="form-group">
              <label>${t('hasCarLabel')}</label>
              <select class="form-select" id="cpHasCar">
                <option value="false" ${!myProfile.hasCar ? 'selected' : ''}>${t('riderOption')}</option>
                <option value="true" ${myProfile.hasCar ? 'selected' : ''}>${t('driverOption')}</option>
              </select>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
              <div class="form-group">
                <label>${t('workStatusLabel')}</label>
                <div class="perm-options">
                  <label class="perm-checkbox" style="font-size:13px;padding:6px 12px">
                    <input type="checkbox" name="workStat" value="offering" ${wStat.includes('offering') ? 'checked' : ''}>
                    <span>${t('statusOffering')}</span>
                  </label>
                  <label class="perm-checkbox" style="font-size:13px;padding:6px 12px">
                    <input type="checkbox" name="workStat" value="seeking" ${wStat.includes('seeking') ? 'checked' : ''}>
                    <span>${t('statusSeeking')}</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>${t('homeStatusLabel')}</label>
                <div class="perm-options">
                  <label class="perm-checkbox" style="font-size:13px;padding:6px 12px">
                    <input type="checkbox" name="homeStat" value="offering" ${hStat.includes('offering') ? 'checked' : ''}>
                    <span>${t('statusOffering')}</span>
                  </label>
                  <label class="perm-checkbox" style="font-size:13px;padding:6px 12px">
                    <input type="checkbox" name="homeStat" value="seeking" ${hStat.includes('seeking') ? 'checked' : ''}>
                    <span>${t('statusSeeking')}</span>
                  </label>
                </div>
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
              <input type="text" id="cpAddressName" class="form-input" value="${myProfile.addressName || ''}" placeholder="Type location in Calgary (e.g., Downtown Calgary, AB)">
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
              <div class="form-group">
                <label>Auto-Generated Latitude (Lat)</label>
                <input type="number" step="0.0001" id="cpLat" class="form-input" value="${myProfile.lat}">
              </div>
              <div class="form-group">
                <label>Auto-Generated Longitude (Lng)</label>
                <input type="number" step="0.0001" id="cpLng" class="form-input" value="${myProfile.lng}">
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px">
              <span id="saveFeedbackC" style="color:var(--success);font-weight:700;font-size:14px;display:none">✓ ${t('successMsg')}</span>
              <button type="submit" class="btn btn-secondary">💾 ${t('saveCarpoolBtn')}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const tabC1 = container.querySelector('#tabC1');
    const tabC2 = container.querySelector('#tabC2');
    tabC2.onclick = () => { activeSubTabC = 'viewC2'; renderFeatureC(container); };
    tabC1.onclick = () => {
      activeSubTabC = 'viewC1';
      renderFeatureC(container);
      initGooglePlacesAutocomplete();
    };

    container.querySelectorAll('.req-cp-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.requestCarpool(currentUser.id, btn.dataset.target);
          renderFeatureC(container);
        } catch (err) { alert(err.message); }
      };
    });
    container.querySelectorAll('.accept-cp-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.acceptCarpool(btn.dataset.id);
          renderFeatureC(container);
        } catch (err) { alert(err.message); }
      };
    });
    container.querySelectorAll('.reject-cp-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await store.rejectCarpool(btn.dataset.id);
          renderFeatureC(container);
        } catch (err) { alert(err.message); }
      };
    });

    container.querySelector('#carpoolProfileForm').onsubmit = async (e) => {
      e.preventDefault();
      const selectedWorkStat = Array.from(container.querySelectorAll('input[name="workStat"]:checked')).map(el => el.value);
      const selectedHomeStat = Array.from(container.querySelectorAll('input[name="homeStat"]:checked')).map(el => el.value);

      try {
        await store.saveCarpoolProfile(currentUser.id, {
          hasCar: document.getElementById('cpHasCar').value === 'true',
          workStatus: selectedWorkStat,
          homeStatus: selectedHomeStat,
          workTime: document.getElementById('cpWorkTime').value,
          homeTime: document.getElementById('cpHomeTime').value,
          addressName: document.getElementById('cpAddressName').value,
          lat: parseFloat(document.getElementById('cpLat').value),
          lng: parseFloat(document.getElementById('cpLng').value)
        });

        const fb = container.querySelector('#saveFeedbackC');
        if (fb) {
          fb.style.display = 'inline-block';
          setTimeout(() => { fb.style.display = 'none'; }, 2500);
        }
      } catch (err) { alert(err.message); }
    };

    if (activeSubTabC === 'viewC2') {
      initGoogleMap(myProfile, candidates);
    }
  }

  function initGooglePlacesAutocomplete() {
    setTimeout(async () => {
      const inputEl = document.getElementById('cpAddressName');
      if (!inputEl) return;
      try {
        await loadGoogleMapsScript();
      } catch (err) {
        console.warn(err);
        return;
      }
      if (!window.google || !window.google.maps || !window.google.maps.places) return;
      const autocomplete = new google.maps.places.Autocomplete(inputEl, {
        componentRestrictions: { country: 'ca' },
        fields: ['geometry', 'name', 'formatted_address']
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          document.getElementById('cpLat').value = lat.toFixed(4);
          document.getElementById('cpLng').value = lng.toFixed(4);
        }
      });
    }, 200);
  }

  function initGoogleMap(myProfile, candidates) {
    setTimeout(() => {
      const mapEl = document.getElementById('carpoolMap');
      if (!mapEl || !window.google || !window.google.maps) return;

      const normalizedProfile = normalizeLatLng({ lat: myProfile && myProfile.lat, lng: myProfile && myProfile.lng });
      const mapOptions = {
        zoom: 11,
        center: normalizedProfile,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] }
        ]
      };

      gMapInstance = new google.maps.Map(mapEl, mapOptions);

      createMapMarker({
        position: { lat: CALGARY_HQ.lat, lng: CALGARY_HQ.lng },
        map: gMapInstance,
        title: CALGARY_HQ.name,
        icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
      });

      if (Number.isFinite(Number(myProfile && myProfile.lat)) && Number.isFinite(Number(myProfile && myProfile.lng))) {
        createMapMarker({
          position: { lat: Number(myProfile.lat), lng: Number(myProfile.lng) },
          map: gMapInstance,
          title: 'My Departure Location',
          icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
        });
      }

      candidates.forEach(cand => {
        const lat = Number(cand && cand.profile && cand.profile.lat);
        const lng = Number(cand && cand.profile && cand.profile.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        const isMatched = cand.matchState === 'accepted';
        const iconUrl = isMatched ?
          'https://maps.google.com/mapfiles/ms/icons/green-dot.png' :
          (cand.profile.hasCar ? 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');

        createMapMarker({
          position: { lat, lng },
          map: gMapInstance,
          title: cand.user.name,
          icon: { url: iconUrl }
        });
      });
    }, 150);
  }

  // --------------------------------------------------------------------------
  // 7. Main Controller & Router
  // --------------------------------------------------------------------------
  let currentRoute = 'home';

  async function initApp() {
    const navEl = document.getElementById('mainNavbar');
    const contentEl = document.getElementById('appContent');
    if (navEl) {
      navEl.innerHTML = `
        <a class="nav-brand">
          <div class="brand-icon">⚡</div>
          <span class="brand-title">${t('appName')}</span>
        </a>
      `;
    }
    if (contentEl) {
      contentEl.innerHTML = `<div class="glass-panel" style="padding:24px;text-align:center;color:var(--text-muted)">Loading from D1…</div>`;
    }

    try {
      await store.hydrate();
    } catch (err) {
      console.error(err);
      if (contentEl) {
        contentEl.innerHTML = `
          <div class="glass-panel" style="padding:24px">
            <h2 style="font-size:20px;font-weight:800;margin-bottom:8px">Database connection failed</h2>
            <p style="color:var(--text-muted);font-size:14px;margin-bottom:12px">${err.message}</p>
            <p style="color:var(--text-muted);font-size:13px">
              Confirm Cloudflare Pages binding Variable name is <code>DB</code>, and that <code>schema.sql</code> has been executed on D1.
            </p>
          </div>
        `;
      }
      return;
    }

    renderNavbar();
    renderRoute();
  }

  function isAdminUser(user) {
    if (!user) return false;
    const role = String((user && user.role) || '').toLowerCase();
    return role === 'admin' || user.id === 'u1';
  }

  function renderNavbar() {
    const navEl = document.getElementById('mainNavbar');
    if (!navEl) return;
    const currentUser = store.getCurrentUser();
    const isAdmin = isAdminUser(currentUser);
    
    if (!currentUser) {
      navEl.innerHTML = `
        <a class="nav-brand">
          <div class="brand-icon">⚡</div>
          <span class="brand-title">${t('appName')}</span>
        </a>
        <div class="nav-user-area">
          <button class="btn btn-secondary btn-sm" id="loginBtn">🔐 ${t('loginBtn')}</button>
        </div>
      `;
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.onclick = () => renderAuthModal(() => {
          renderNavbar();
          renderRoute();
        });
      }
      renderFeedbackFab();
      return;
    }

    const perms = currentUser.permissions || [];
    const lang = getLang();

    navEl.innerHTML = `
      <a class="nav-brand" id="brandBtn">
        <div class="brand-icon">⚡</div>
        <div>
          <span class="brand-title">${t('appName')}</span>
        </div>
      </a>
      <div class="nav-menu">
        <button class="nav-btn ${currentRoute === 'home' ? 'active' : ''}" id="navHomeBtn">🏠 ${t('navHome')}</button>
        ${perms.includes('A') ? `<button class="nav-btn ${currentRoute === 'featA' ? 'active' : ''}" id="navFeatABtn">⚡ ${t('navFeatA')}</button>` : ''}
        ${perms.includes('B') ? `<button class="nav-btn ${currentRoute === 'featB' ? 'active' : ''}" id="navFeatBBtn">🎮 ${t('navFeatB')}</button>` : ''}
        ${perms.includes('C') ? `<button class="nav-btn ${currentRoute === 'featC' ? 'active' : ''}" id="navFeatCBtn">🚗 ${t('navFeatC')}</button>` : ''}
      </div>
      <div class="nav-user-area">
        ${isAdmin ? `<button type="button" class="btn btn-ghost btn-sm" id="navAdminBtn" style="border-color:var(--secondary);color:var(--secondary)">⚙️ ${t('navAdmin')}</button>` : ''}
        <div class="user-chip">
          <div class="user-avatar">${renderAvatarHtml(currentUser.avatar, 28)}</div>
          <div><strong style="display:block;line-height:1">${currentUser.name}</strong></div>
        </div>
        <button class="btn btn-ghost btn-sm" id="profileBtn">👤 ${lang === 'zh' ? '资料' : 'Profile'}</button>
        <button class="btn-lang" id="toggleLangBtn">🌐 ${lang === 'en' ? '中文' : 'English'}</button>
        <button class="btn btn-ghost btn-sm" id="logoutBtn">🚪 ${t('logoutBtn')}</button>
      </div>
    `;

    document.getElementById('brandBtn').onclick = () => navigate('home');
    document.getElementById('navHomeBtn').onclick = () => navigate('home');
    if (perms.includes('A')) document.getElementById('navFeatABtn').onclick = () => navigate('featA');
    if (perms.includes('B')) document.getElementById('navFeatBBtn').onclick = () => navigate('featB');
    if (perms.includes('C')) document.getElementById('navFeatCBtn').onclick = () => navigate('featC');
    
    const adminBtn = document.getElementById('navAdminBtn');
    if (adminBtn) {
      adminBtn.type = 'button';
      adminBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentRoute = 'admin';
        renderNavbar();
        renderRoute();
      };
    }

    document.getElementById('toggleLangBtn').onclick = () => { setLang(getLang() === 'en' ? 'zh' : 'en'); renderNavbar(); renderRoute(); };
    document.getElementById('profileBtn').onclick = () => {
      renderProfileModal(() => { renderNavbar(); renderRoute(); });
    };

    renderFeedbackFab();

    document.getElementById('logoutBtn').onclick = () => {
      store.logout();
      currentRoute = 'home';
      renderFeedbackFab();
      renderNavbar();
      renderRoute();
    };
  }

  function navigate(route) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;
    const perms = currentUser.permissions || [];
    if (route === 'admin' && !isAdminUser(currentUser)) { alert(t('accessDenied')); return; }
    if (route === 'featA' && !perms.includes('A')) { alert(t('accessDenied')); return; }
    if (route === 'featB' && !perms.includes('B')) { alert(t('accessDenied')); return; }
    if (route === 'featC' && !perms.includes('C')) { alert(t('accessDenied')); return; }
    currentRoute = route;
    renderNavbar();
    renderRoute();
  }

  function renderRoute() {
    const container = document.getElementById('appContent');
    if (!container) return;
    const currentUser = store.getCurrentUser();

    if (!currentUser && currentRoute !== 'home') {
      currentRoute = 'home';
    }

    if (currentRoute === 'home') renderHomePortal(container);
    else if (currentRoute === 'admin') renderAdminConsole();
    else if (currentRoute === 'featA') renderFeatureA(container);
    else if (currentRoute === 'featB') renderFeatureB(container);
    else if (currentRoute === 'featC') renderFeatureC(container);
  }

  function renderHomePortal(container) {
    const currentUser = store.getCurrentUser();
    const isGuest = !currentUser;
    const perms = currentUser ? (currentUser.permissions || []) : [];
    const lang = getLang();
    const allMatches = store.getGameMatches() || [];
    const upcomingMatches = allMatches.filter(m => !isMatchPast(m));
    const nextMatch = upcomingMatches.slice().sort((a, b) => (dayKeyToDate(a.dayKey) || new Date(0)) - (dayKeyToDate(b.dayKey) || new Date(0)))[0] || null;
    const previewMatches = upcomingMatches.slice(0, 2);

    const moduleCards = [
      {
        key: 'A',
        route: 'featA',
        icon: '⚡',
        title: t('featATitle'),
        desc: t('featADesc'),
        guide: isGuest
          ? 'Find your vibe. Match your time.'
          : 'Match people by vibe, timing, and preference.'
      },
      {
        key: 'B',
        route: 'featB',
        icon: '🏓',
        title: t('featBTitle'),
        desc: t('featBDesc'),
        guide: isGuest
          ? 'Pick your slots. Let the crew find you.'
          : 'Set your free blocks and let the app build your next game crew.'
      },
      {
        key: 'C',
        route: 'featC',
        icon: '🚗',
        title: t('featCTitle'),
        desc: t('featCDesc'),
        guide: isGuest
          ? 'Plan the ride. Share the trip.'
          : 'Set your commute and match with the right travel crew.'
      }
    ];
    const visibleCards = isGuest ? moduleCards.filter(card => card.key === 'B') : moduleCards.filter(card => perms.includes(card.key));

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800;letter-spacing:-0.02em">
          ${lang === 'zh' ? '🏠 首页' : '🏠 Home'}
        </h2>
        <p style="color:var(--text-muted);font-size:14px;margin-top:4px">
          ${isGuest
            ? (lang === 'zh' ? '看看功能，登录后就能轻松组队和出行。' : 'Explore the tools, then jump in when you are ready.')
            : (lang === 'zh' ? `欢迎，${currentUser.name}！今天想玩什么？` : `Welcome, ${currentUser.name}! What are we doing today?`)}
        </p>
      </div>

      <div class="feature-grid">
        ${visibleCards.map(card => {
          const buttonText = lang === 'zh' ? '进入' : 'Enter';
          const hubSummary = card.key === 'B' ? (
            previewMatches.length === 0
              ? (lang === 'zh' ? '暂无组局' : 'No groups yet')
              : previewMatches.map((m, idx) => `
                  <div style="margin-top:${idx === 0 ? '12px' : '10px'};">
                    ${renderCompactMatchCard(m, store.getGames(), lang)}
                  </div>
                `).join('')
          ) : '';
          return `
            <div class="glass-panel feature-card">
              <div class="card-top">
                <div class="card-header-icon" style="background:${card.key === 'A' ? 'var(--primary-light)' : card.key === 'B' ? 'var(--secondary-light)' : 'rgba(249,115,22,0.15)'};color:${card.key === 'A' ? 'var(--primary)' : card.key === 'B' ? 'var(--secondary)' : 'var(--accent-orange)'}">${card.icon}</div>
                <div class="card-title">${card.title}</div>
                <p class="card-desc">${card.desc}</p>
                <p style="margin-top:12px;color:var(--text-muted);font-size:12px;line-height:1.6">${card.guide}</p>
                ${hubSummary ? `<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px">${hubSummary}</div>` : ''}
              </div>
              <div>
                <button class="btn ${card.key === 'A' ? 'btn-primary' : card.key === 'B' ? 'btn-secondary' : 'btn-orange'} launch-card-btn" data-route="${card.route}" style="width:100%">${buttonText}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.launch-card-btn').forEach(btn => {
      btn.onclick = () => {
        if (!currentUser) {
          renderAuthModal(() => {
            renderNavbar();
            renderRoute();
          });
          return;
        }
        navigate(btn.dataset.route);
      };
    });
  }

  window.SocialPairApp = { initApp };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
