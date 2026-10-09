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
      loginSubtitle: "Admin Username: yqcw / Password: 123456",
      usernameLabel: "Username (name)",
      passwordLabel: "Password",
      loginSubmit: "Sign In Now",
      invalidAuth: "Invalid username or password.",
      adminTitle: "User & Permission Management Console",
      addUserBtn: "+ Add New User",
      colName: "Username (name)",
      colRole: "Role",
      colPerms: "Module Permissions (A/B/C)",
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
      b1Title: "Time & Activity Preferences",
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
      manageCategoriesBtn: "Manage Categories (Admin)",
      savePrefBtn: "Save Availability & Activity Choices",
      b2Title: "Activity Teamup Hub",
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
      loginSubtitle: "管理员用户名：yqcw / 密码：123456",
      usernameLabel: "用户名 (name)",
      passwordLabel: "密码",
      loginSubmit: "立即登录",
      invalidAuth: "用户名或密码错误。",
      adminTitle: "用户与系统选项权限管理中心",
      addUserBtn: "+ 添加新用户",
      colName: "用户名 (name)",
      colRole: "角色",
      colPerms: "可进入系统选项 (A/B/C)",
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
      b1Title: "时间段与活动偏好设置 (B1)",
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
      manageCategoriesBtn: "管理活动种类 (管理员专用)",
      savePrefBtn: "保存我的时间与活动设置",
      b2Title: "活动组队主页大厅 (B2)",
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
  // 2. Core Store Engine (Cloudflare D1 Database API + Local Sync)
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'socialpair_hub_db_v6';
  
  // Cloudflare D1 Database Configuration
  const D1_CONFIG = {
    dbName: 'pairfast',
    database_id: 'b123a88e-4ea9-43c8-8960-3d83241c28de'
  };

  const CALGARY_HQ = {
    name: 'TCG Machines Calgary Office',
    address: '7019 8 St NE, Calgary, AB T2E 8A2',
    lat: 51.1172,
    lng: -114.0436
  };

  // Seed Data: Admin 'yqcw' + 3 Users (Default Permission: Option B Activity Teamup)
  // Default Availability: Thursday 17:00-18:00 (this-Thu-17:00 & this-Thu-17:30)
  const initialSeed = {
    lang: 'en',
    currentUserId: null,
    isLoggedIn: false, // DEFAULT SIGNED OUT
    users: [
      { id: 'u1', name: 'yqcw', password: '123456', role: 'admin', permissions: ['A', 'B', 'C'], avatar: '👑', phone: '+1 (403) 999-0001' },
      { id: 'u2', name: 'Ghai', password: '123456', role: 'user', permissions: ['B'], avatar: '👨‍💻', phone: '+1 (403) 012-3456' },
      { id: 'u3', name: 'CJ', password: '123456', role: 'user', permissions: ['B'], avatar: '👨‍🎨', phone: '+1 (403) 014-7890' },
      { id: 'u4', name: 'Joshua', password: '123456', role: 'user', permissions: ['B'], avatar: '👨‍💻', phone: '+1 (403) 018-4321' }
    ],
    games: [
      { id: 'g1', name: 'Pickleball (匹克球)', icon: '🏓', color: '#11b8a6' },
      { id: 'g2', name: 'Table Tennis (乒乓球)', icon: '🏓', color: '#6557ff' },
      { id: 'g3', name: 'Billiards (台球)', icon: '🎱', color: '#ff7a59' },
      { id: 'g4', name: 'Board Game (桌游)', icon: '🎲', color: '#8f7cff' },
      { id: 'g5', name: 'Badminton (羽毛球)', icon: '🏸', color: '#06b6d4' }
    ],
    userGamePreferences: {
      'u1': { slots: ['this-Thu-17:00', 'this-Thu-17:30'], gameIds: ['g1', 'g2'] },
      'u2': { slots: ['this-Thu-17:00', 'this-Thu-17:30'], gameIds: ['g1', 'g3'] },
      'u3': { slots: ['this-Thu-17:00', 'this-Thu-17:30'], gameIds: ['g1', 'g2'] },
      'u4': { slots: ['this-Thu-17:00', 'this-Thu-17:30'], gameIds: ['g2', 'g4'] }
    },
    gameMatches: [],
    carpoolProfiles: {
      'u1': { lat: 51.0447, lng: -114.0719, addressName: 'Downtown Calgary, AB', hasCar: true, workTime: '08:30', homeTime: '18:00', workStatus: ['offering'], homeStatus: ['offering'] },
      'u2': { lat: 51.0550, lng: -114.0850, addressName: 'Sunnyside, Calgary, AB', hasCar: false, workTime: '08:30', homeTime: '18:00', workStatus: ['seeking'], homeStatus: ['seeking'] },
      'u3': { lat: 51.0350, lng: -114.0500, addressName: 'Beltline, Calgary, AB', hasCar: true, workTime: '08:30', homeTime: '18:00', workStatus: ['offering', 'seeking'], homeStatus: ['seeking'] },
      'u4': { lat: 51.0800, lng: -114.0600, addressName: 'Mount Pleasant, Calgary, AB', hasCar: true, workTime: '08:30', homeTime: '18:00', workStatus: ['offering'], homeStatus: ['seeking'] }
    },
    carpoolMatches: []
  };

  class Store {
    constructor() {
      this.data = this.load();
      this.autoGenerateGameMatches();
    }
    load() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.users && parsed.users.length > 0) {
            return parsed;
          }
        }
      } catch (e) { console.warn(e); }
      return JSON.parse(JSON.stringify(initialSeed));
    }
    save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); }
    getCurrentUser() {
      if (!this.data.isLoggedIn || !this.data.currentUserId) return null;
      return this.data.users.find(u => u.id === this.data.currentUserId) || null;
    }
    setCurrentUser(userId) { this.data.currentUserId = userId; this.data.isLoggedIn = true; this.save(); }
    
    login(name, password) {
      const user = this.data.users.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase() && u.password === password);
      if (user) { this.data.currentUserId = user.id; this.data.isLoggedIn = true; this.save(); return { success: true, user }; }
      return { success: false };
    }
    logout() {
      this.data.isLoggedIn = false;
      this.data.currentUserId = null;
      this.save();
    }
    getUsers() { return this.data.users; }
    addUser(userObj) {
      const newUser = { id: 'u_' + Date.now().toString(36), name: userObj.name || 'New User', password: userObj.password || '123456', role: 'user', permissions: userObj.permissions || ['B'], avatar: userObj.avatar || '👤', phone: userObj.phone || '+1 (403) 000-0000' };
      this.data.users.push(newUser); this.save(); return newUser;
    }
    updateUser(updated) {
      const idx = this.data.users.findIndex(u => u.id === updated.id);
      if (idx !== -1) { this.data.users[idx] = { ...this.data.users[idx], ...updated }; this.save(); }
    }
    deleteUser(userId) { if (userId === 'u1') return; this.data.users = this.data.users.filter(u => u.id !== userId); this.save(); }
    getGames() { return this.data.games; }
    addGame(gameObj) {
      const newGame = { id: 'g_' + Date.now().toString(36), name: gameObj.name, icon: gameObj.icon || '🎯', color: gameObj.color || '#6557ff' };
      this.data.games.push(newGame); this.save(); this.autoGenerateGameMatches(); return newGame;
    }
    deleteGame(gameId) { this.data.games = this.data.games.filter(g => g.id !== gameId); this.save(); this.autoGenerateGameMatches(); }
    getUserGamePref(userId) { return this.data.userGamePreferences[userId] || { slots: [], gameIds: [] }; }
    saveUserGamePref(userId, slots, gameIds) { this.data.userGamePreferences[userId] = { slots, gameIds }; this.save(); this.autoGenerateGameMatches(); }
    
    autoGenerateGameMatches() {
      const dayGameMap = {};
      Object.entries(this.data.userGamePreferences).forEach(([userId, pref]) => {
        (pref.slots || []).forEach(slotStr => {
          const parts = slotStr.split('-');
          if (parts.length === 3) {
            const dayKey = `${parts[0]}-${parts[1]}`;
            const timeStr = parts[2];
            (pref.gameIds || []).forEach(gId => {
              const mapKey = `${dayKey}___${gId}`;
              if (!dayGameMap[mapKey]) dayGameMap[mapKey] = {};
              if (!dayGameMap[mapKey][userId]) dayGameMap[mapKey][userId] = new Set();
              dayGameMap[mapKey][userId].add(timeStr);
            });
          }
        });
      });

      const newMatches = [];

      Object.entries(dayGameMap).forEach(([mapKey, userTimeSets]) => {
        const userIds = Object.keys(userTimeSets);
        if (userIds.length < 2) return;
        const [dayKey, gameId] = mapKey.split('___');

        for (let i = 0; i < userIds.length; i++) {
          for (let j = i + 1; j < userIds.length; j++) {
            const uA = userIds[i];
            const uB = userIds[j];
            const matchedUserGroup = userIds.filter(u => Array.from(userTimeSets[uA]).some(t => userTimeSets[u].has(t)));
            if (matchedUserGroup.length < 2) continue;

            const commonTimes = Array.from(userTimeSets[uA]).filter(tStr => matchedUserGroup.every(u => userTimeSets[u].has(tStr)));
            if (commonTimes.length === 0) continue;
            commonTimes.sort();

            const continuousBlocks = [];
            let currentBlock = [commonTimes[0]];
            for (let k = 1; k < commonTimes.length; k++) {
              if (isNext30Min(currentBlock[currentBlock.length - 1], commonTimes[k])) {
                currentBlock.push(commonTimes[k]);
              } else {
                continuousBlocks.push(currentBlock);
                currentBlock = [commonTimes[k]];
              }
            }
            if (currentBlock.length > 0) continuousBlocks.push(currentBlock);

            continuousBlocks.forEach(block => {
              const startT = block[0];
              const endT = add30Mins(block[block.length - 1]);
              const durationMins = block.length * 30;
              const matchSlotKey = `${dayKey}___${startT}-${endT}___${gameId}___${matchedUserGroup.sort().join('_')}`;
              const existing = (this.data.gameMatches || []).find(m => m.matchSlotKey === matchSlotKey);
              const confirmedUserIds = existing ? existing.confirmedUserIds.filter(id => matchedUserGroup.includes(id)) : [];

              newMatches.push({
                id: existing ? existing.id : 'm_' + Math.random().toString(36).slice(2, 8),
                matchSlotKey,
                dayKey,
                startT,
                endT,
                durationMins,
                gameId,
                userIds: matchedUserGroup,
                confirmedUserIds,
                status: confirmedUserIds.length >= matchedUserGroup.length ? 'confirmed' : 'pending'
              });
            });
          }
        }
      });

      const uniqueMatches = [];
      const seenKeys = new Set();
      newMatches.forEach(m => {
        if (!seenKeys.has(m.matchSlotKey)) {
          seenKeys.add(m.matchSlotKey);
          uniqueMatches.push(m);
        }
      });
      this.data.gameMatches = uniqueMatches;
      this.save();
    }

    confirmGameMatch(matchId, userId) {
      const match = (this.data.gameMatches || []).find(m => m.id === matchId);
      if (match && match.userIds.includes(userId)) {
        if (!match.confirmedUserIds.includes(userId)) match.confirmedUserIds.push(userId);
        if (match.confirmedUserIds.length >= match.userIds.length) match.status = 'confirmed';
        this.save();
      }
    }
    optOutGameMatch(matchId, userId) {
      const match = (this.data.gameMatches || []).find(m => m.id === matchId);
      if (match) {
        match.userIds = match.userIds.filter(id => id !== userId);
        match.confirmedUserIds = match.confirmedUserIds.filter(id => id !== userId);
        if (match.userIds.length < 2) this.data.gameMatches = this.data.gameMatches.filter(m => m.id !== matchId);
        else if (match.confirmedUserIds.length >= match.userIds.length) match.status = 'confirmed';
        this.save();
      }
    }
    getGameMatches() { return this.data.gameMatches || []; }
    getCarpoolProfile(userId) {
      return this.data.carpoolProfiles[userId] || {
        lat: 51.0447, lng: -114.0719, addressName: 'Downtown Calgary, AB',
        hasCar: false, workTime: '08:30', homeTime: '18:00', workStatus: ['seeking'], homeStatus: ['seeking']
      };
    }
    saveCarpoolProfile(userId, profile) { this.data.carpoolProfiles[userId] = { ...profile }; this.save(); }
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
    requestCarpool(requesterId, targetUserId) {
      const reqProfile = this.getCarpoolProfile(requesterId);
      const driverId = reqProfile.hasCar ? requesterId : targetUserId;
      const riderId = reqProfile.hasCar ? targetUserId : requesterId;
      const newMatch = { id: 'cp_' + Date.now().toString(36), driverId, riderId, requesterId, status: 'pending', createdAt: new Date().toISOString() };
      if (!this.data.carpoolMatches) this.data.carpoolMatches = [];
      this.data.carpoolMatches.push(newMatch); this.save(); return newMatch;
    }
    acceptCarpool(matchId) {
      const match = (this.data.carpoolMatches || []).find(m => m.id === matchId);
      if (match) { match.status = 'accepted'; this.save(); }
    }
    rejectCarpool(matchId) {
      this.data.carpoolMatches = (this.data.carpoolMatches || []).filter(m => m.id !== matchId);
      this.save();
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
            <input type="text" id="loginName" class="form-input" value="" required placeholder="e.g. yqcw / Ghai / CJ">
          </div>
          <div class="form-group">
            <label>${t('passwordLabel')}</label>
            <input type="password" id="loginPass" class="form-input" value="" required placeholder="Password">
          </div>
          <div id="loginError" style="color:var(--danger);font-size:13px;margin-bottom:14px;display:none"></div>
          <button type="submit" class="btn btn-primary" style="width:100%">${t('loginSubmit')}</button>
        </form>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('loginForm').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('loginName').value;
      const pass = document.getElementById('loginPass').value;
      const res = store.login(name, pass);
      if (res.success) {
        modal.classList.remove('active');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        const errEl = document.getElementById('loginError');
        errEl.textContent = t('invalidAuth');
        errEl.style.display = 'block';
      }
    };
  }

  function renderAdminConsole(onUpdate) {
    let modal = document.getElementById('adminModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'adminModal'; modal.className = 'modal-overlay'; document.body.appendChild(modal);
    }
    const users = store.getUsers();
    modal.innerHTML = `
      <div class="glass-panel modal-box" style="width:min(100%, 820px)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <div><h2 style="font-size:22px;font-weight:800">${t('adminTitle')}</h2><p style="color:var(--text-muted);font-size:13px">Default Admin: yqcw (Full Control)</p></div>
          <button class="btn btn-ghost btn-sm" id="closeAdminBtn">✕</button>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px"><button class="btn btn-secondary btn-sm" id="addNewUserBtn">${t('addUserBtn')}</button></div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr><th>${t('colName')}</th><th>${t('colRole')}</th><th>${t('colPerms')}</th><th>${t('colActions')}</th></tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td><div style="display:flex;align-items:center;gap:8px"><span>${u.avatar || '👤'}</span><strong style="color:var(--text-main)">${u.name}</strong></div></td>
                  <td><span class="tag-pill" style="${u.role==='admin'?'color:var(--secondary);border-color:var(--secondary)':''}">${u.role}</span></td>
                  <td><div style="display:flex;gap:4px">${['A', 'B', 'C'].map(p => `<span class="tag-pill" style="${u.permissions.includes(p)?'background:var(--primary-light);color:#a5b4fc;border-color:var(--primary)':''}">Option ${p}</span>`).join('')}</div></td>
                  <td>
                    <button class="btn btn-ghost btn-sm edit-user-btn" data-id="${u.id}">${t('edit')}</button>
                    ${u.id !== 'u1' ? `<button class="btn btn-danger btn-sm del-user-btn" data-id="${u.id}">${t('delete')}</button>` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    modal.classList.add('active');
    document.getElementById('closeAdminBtn').onclick = () => modal.classList.remove('active');
    document.getElementById('addNewUserBtn').onclick = () => { renderUserEditModal(null, () => { renderAdminConsole(onUpdate); if (onUpdate) onUpdate(); }); };
    modal.querySelectorAll('.edit-user-btn').forEach(btn => {
      btn.onclick = () => {
        const userObj = users.find(u => u.id === btn.dataset.id);
        renderUserEditModal(userObj, () => { renderAdminConsole(onUpdate); if (onUpdate) onUpdate(); });
      };
    });
    modal.querySelectorAll('.del-user-btn').forEach(btn => {
      btn.onclick = () => {
        if (confirm(`Delete user ${btn.dataset.id}?`)) { store.deleteUser(btn.dataset.id); renderAdminConsole(onUpdate); if (onUpdate) onUpdate(); }
      };
    });
  }

  function renderUserEditModal(userObj, onSaved) {
    let modal = document.getElementById('userEditModal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'userEditModal'; modal.className = 'modal-overlay'; modal.style.zIndex = '2100'; document.body.appendChild(modal);
    }
    const isEdit = !!userObj;
    const perms = userObj ? userObj.permissions : ['B']; // Default Permission Option B
    modal.innerHTML = `
      <div class="glass-panel modal-box">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:20px">${t('modalUserTitle')}</h3>
        <form id="userEditForm">
          <div class="form-group"><label>${t('colName')}</label><input type="text" id="editName" class="form-input" value="${isEdit ? userObj.name : ''}" required placeholder="Username (name)"></div>
          <div class="form-group"><label>${t('passwordLabel')}</label><input type="text" id="editPassword" class="form-input" value="${isEdit ? userObj.password : '123456'}" required></div>
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
    document.getElementById('userEditForm').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('editName').value;
      const password = document.getElementById('editPassword').value;
      const checkedPerms = Array.from(modal.querySelectorAll('input[name="perm"]:checked')).map(el => el.value);
      if (isEdit) store.updateUser({ id: userObj.id, name, password, permissions: checkedPerms });
      else store.addUser({ name, password, permissions: checkedPerms });
      modal.classList.remove('active');
      if (onSaved) onSaved();
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
    { id: 'Mon', en: 'Monday', zh: '周一' }, { id: 'Tue', en: 'Tuesday', zh: '周二' },
    { id: 'Wed', en: 'Wednesday', zh: '周三' }, { id: 'Thu', en: 'Thursday', zh: '周四' },
    { id: 'Fri', en: 'Friday', zh: '周五' }, { id: 'Sat', en: 'Saturday', zh: '周六' }, { id: 'Sun', en: 'Sunday', zh: '周日' }
  ];
  const TIME_SLOTS = [];
  for (let h = 12; h <= 21; h++) {
    const hStr = String(h).padStart(2, '0');
    TIME_SLOTS.push(`${hStr}:00`); TIME_SLOTS.push(`${hStr}:30`);
  }
  let activeWeek = 'this';
  let activeSubTabB = 'viewB1';

  function renderFeatureB(container) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;

    const userPref = store.getUserGamePref(currentUser.id);
    const games = store.getGames();
    const matches = store.getGameMatches();
    const lang = getLang();

    let selectedSlots = new Set(userPref.slots || []);
    let selectedGames = new Set(userPref.gameIds || []);

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
        <button class="sub-tab-btn ${activeSubTabB==='viewB2'?'active':''}" id="tabB2">${t('b2Title')} (${matches.length})</button>
      </div>

      <!-- View B1 -->
      <div id="viewB1" style="${activeSubTabB==='viewB1'?'display:block':'display:none'}">
        <div class="glass-panel" style="padding:24px;margin-bottom:32px">
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px">${t('b1Sub')}</p>
          
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:20px;background:rgba(0,0,0,0.2);padding:14px;border-radius:var(--radius-md)">
            <div style="display:flex;gap:8px">
              <button class="btn btn-sm ${activeWeek==='this'?'btn-secondary':'btn-ghost'}" id="setThisWeekBtn">${t('tabThisWeek')}</button>
              <button class="btn btn-sm ${activeWeek==='next'?'btn-secondary':'btn-ghost'}" id="setNextWeekBtn">${t('tabNextWeek')}</button>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span style="font-size:12px;color:var(--text-muted);font-weight:700">${t('quickPresets')}</span>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekdays"> <span>${t('presetWeekdays')}</span></label>
              <label class="perm-checkbox" style="padding:4px 10px;font-size:12px"><input type="checkbox" id="chkWeekends"> <span>${t('presetWeekends')}</span></label>
              <span style="font-size:12px;color:var(--text-muted)">Time:</span>
              <input type="time" id="rangeStart" class="form-input" style="width:110px;padding:6px 10px" value="17:00">
              <span style="font-size:12px;color:var(--text-muted)">to</span>
              <input type="time" id="rangeEnd" class="form-input" style="width:110px;padding:6px 10px" value="19:00">
              <button class="btn btn-secondary btn-sm" id="applyRangeBtn">${t('applyTimeRangeBtn')}</button>
              <button class="btn btn-danger btn-sm" id="clearSlotsBtn">${t('clearSlots')}</button>
            </div>
          </div>

          <div style="margin-bottom:28px">
            <label class="form-group label">${activeWeek === 'this' ? 'THIS WEEK' : 'NEXT WEEK'} AVAILABILITY MATRIX (30-MIN INTERVALS)</label>
            <div style="display:grid;gap:14px">
              ${DAYS.map(day => `
                <div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.05)">
                  <div style="font-weight:700;font-size:14px;margin-bottom:8px;color:#a5b4fc">📅 ${lang === 'zh' ? day.zh : day.en}</div>
                  <div class="time-slot-grid">
                    ${TIME_SLOTS.map(tSlot => {
                      const slotKey = `${activeWeek}-${day.id}-${tSlot}`;
                      const isSelected = selectedSlots.has(slotKey);
                      return `<button class="slot-btn ${isSelected ? 'selected' : ''}" data-slot="${slotKey}">${tSlot} - ${add30Mins(tSlot)}</button>`;
                    }).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom:24px">
            <label class="form-group label">${t('selectGamesLabel')}</label>
            <div class="game-picker-grid">
              ${games.map(g => {
                const isSel = selectedGames.has(g.id);
                return `
                  <div class="game-item-card ${isSel ? 'selected' : ''}" data-id="${g.id}">
                    <span style="font-size:24px">${g.icon}</span>
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
          ${matches.length === 0 ? `
            <div style="text-align:center;padding:48px 20px;color:var(--text-muted)">
              <p style="font-size:48px;margin-bottom:12px">🎾</p>
              <p style="font-size:16px">No continuous pre-matched sessions yet.</p>
              <p style="font-size:13px">Set your availability in B1 to auto-match continuous intersection sessions!</p>
            </div>
          ` : `
            <div>
              ${matches.map(m => {
                const gameObj = games.find(g => g.id === m.gameId) || { name: m.gameId, icon: '🎮' };
                const allUsers = store.getUsers();
                const isConfirmed = m.status === 'confirmed';
                const userHasConfirmed = m.confirmedUserIds.includes(currentUser.id);
                const [w, d] = m.dayKey.split('-');
                const dayObj = DAYS.find(item => item.id === d) || { en: d, zh: d };
                return `
                  <div class="match-card ${isConfirmed ? 'confirmed' : ''}">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px">
                      <div style="display:flex;align-items:center;gap:12px">
                        <span style="font-size:32px;background:rgba(255,255,255,0.06);padding:8px 14px;border-radius:14px">${gameObj.icon}</span>
                        <div>
                          <h4 style="font-size:18px;font-weight:800;color:#fff">${gameObj.name}</h4>
                          <div style="color:var(--text-muted);font-size:13px;display:flex;align-items:center;gap:8px;margin-top:4px">
                            <span>📅 ${w === 'this' ? 'This Week' : 'Next Week'} (${lang === 'zh' ? dayObj.zh : dayObj.en})</span>
                            <strong style="color:var(--secondary)">⏰ Continuous Intersection: ${m.startT} - ${m.endT} (${m.durationMins} mins)</strong>
                          </div>
                        </div>
                      </div>
                      <span class="status-badge ${isConfirmed ? 'confirmed' : 'pending'}">${isConfirmed ? t('statusConfirmed') : t('statusPending')}</span>
                    </div>
                    <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:12px;margin-bottom:16px">
                      <span style="font-size:12px;color:var(--text-muted);font-weight:700;display:block;margin-bottom:8px">${t('membersLabel')} (${m.confirmedUserIds.length}/${m.userIds.length} Confirmed)</span>
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
                    ${m.userIds.includes(currentUser.id) ? `
                      <div style="display:flex;gap:10px;justify-content:flex-end">
                        <button class="btn btn-ghost btn-sm opt-out-btn" data-id="${m.id}">${t('optOutSession')}</button>
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

    const tabB1 = container.querySelector('#tabB1');
    const tabB2 = container.querySelector('#tabB2');
    tabB1.onclick = () => { activeSubTabB = 'viewB1'; renderFeatureB(container); };
    tabB2.onclick = () => { activeSubTabB = 'viewB2'; renderFeatureB(container); };
    container.querySelector('#setThisWeekBtn').onclick = () => { activeWeek = 'this'; renderFeatureB(container); };
    container.querySelector('#setNextWeekBtn').onclick = () => { activeWeek = 'next'; renderFeatureB(container); };
    
    container.querySelector('#applyRangeBtn').onclick = () => {
      const isWeekdays = container.querySelector('#chkWeekdays').checked;
      const isWeekends = container.querySelector('#chkWeekends').checked;
      const startT = container.querySelector('#rangeStart').value;
      const endT = container.querySelector('#rangeEnd').value;
      
      const targetDays = [];
      if (isWeekdays) targetDays.push('Mon', 'Tue', 'Wed', 'Thu', 'Fri');
      if (isWeekends) targetDays.push('Sat', 'Sun');
      if (targetDays.length === 0) targetDays.push('Mon', 'Tue', 'Wed', 'Thu', 'Fri');

      targetDays.forEach(day => {
        TIME_SLOTS.forEach(tSlot => {
          if (tSlot >= startT && tSlot < endT) {
            selectedSlots.add(`${activeWeek}-${day}-${tSlot}`);
          }
        });
      });
      store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
      renderFeatureB(container);
    };

    container.querySelector('#clearSlotsBtn').onclick = () => {
      selectedSlots.clear();
      store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
      renderFeatureB(container);
    };

    container.querySelectorAll('.slot-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const slotKey = btn.dataset.slot;
        if (selectedSlots.has(slotKey)) {
          selectedSlots.delete(slotKey);
          btn.classList.remove('selected');
        } else {
          selectedSlots.add(slotKey);
          btn.classList.add('selected');
        }
        store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
      };
    });

    container.querySelectorAll('.game-item-card').forEach(card => {
      card.onclick = (e) => {
        e.preventDefault();
        const gId = card.dataset.id;
        if (selectedGames.has(gId)) {
          selectedGames.delete(gId);
          card.classList.remove('selected');
        } else {
          selectedGames.add(gId);
          card.classList.add('selected');
        }
        store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
      };
    });

    container.querySelector('#savePrefBtn').onclick = () => {
      store.saveUserGamePref(currentUser.id, Array.from(selectedSlots), Array.from(selectedGames));
      const fb = container.querySelector('#saveFeedbackB');
      if (fb) {
        fb.style.display = 'inline-block';
        setTimeout(() => { fb.style.display = 'none'; }, 2500);
      }
    };

    container.querySelectorAll('.confirm-btn').forEach(btn => {
      btn.onclick = () => {
        store.confirmGameMatch(btn.dataset.id, currentUser.id);
        activeSubTabB = 'viewB2';
        renderFeatureB(container);
      };
    });

    container.querySelectorAll('.opt-out-btn').forEach(btn => {
      btn.onclick = () => {
        store.optOutGameMatch(btn.dataset.id, currentUser.id);
        activeSubTabB = 'viewB2';
        renderFeatureB(container);
      };
    });

    const manageBtn = container.querySelector('#manageCategoriesBtn');
    if (manageBtn) manageBtn.onclick = () => renderGameCategoryModal(() => renderFeatureB(container));
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
              <div style="display:flex;align-items:center;gap:10px"><span style="font-size:20px">${g.icon}</span><span><strong>${g.name}</strong></span></div>
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
    modal.querySelectorAll('.del-cat-btn').forEach(btn => { btn.onclick = () => { store.deleteGame(btn.dataset.id); renderGameCategoryModal(onSaved); }; });
    document.getElementById('addCatForm').onsubmit = (e) => {
      e.preventDefault();
      store.addGame({ name: document.getElementById('catName').value, icon: document.getElementById('catIcon').value });
      renderGameCategoryModal(onSaved);
      if (onSaved) onSaved();
    };
  }

  // --------------------------------------------------------------------------
  // 6. Feature C: Carpooling System
  // --------------------------------------------------------------------------
  let gMapInstance = null;
  let activeSubTabC = 'viewC2';

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

    container.querySelectorAll('.req-cp-btn').forEach(btn => { btn.onclick = () => { store.requestCarpool(currentUser.id, btn.dataset.target); renderFeatureC(container); }; });
    container.querySelectorAll('.accept-cp-btn').forEach(btn => { btn.onclick = () => { store.acceptCarpool(btn.dataset.id); renderFeatureC(container); }; });
    container.querySelectorAll('.reject-cp-btn').forEach(btn => { btn.onclick = () => { store.rejectCarpool(btn.dataset.id); renderFeatureC(container); }; });

    container.querySelector('#carpoolProfileForm').onsubmit = (e) => {
      e.preventDefault();
      const selectedWorkStat = Array.from(container.querySelectorAll('input[name="workStat"]:checked')).map(el => el.value);
      const selectedHomeStat = Array.from(container.querySelectorAll('input[name="homeStat"]:checked')).map(el => el.value);

      store.saveCarpoolProfile(currentUser.id, {
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
    };

    if (activeSubTabC === 'viewC2') {
      initGoogleMap(myProfile, candidates);
    }
  }

  function initGooglePlacesAutocomplete() {
    setTimeout(() => {
      const inputEl = document.getElementById('cpAddressName');
      if (!inputEl || !window.google || !window.google.maps || !window.google.maps.places) return;

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

      const mapOptions = {
        zoom: 11,
        center: { lat: myProfile.lat || CALGARY_HQ.lat, lng: myProfile.lng || CALGARY_HQ.lng },
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] }
        ]
      };

      gMapInstance = new google.maps.Map(mapEl, mapOptions);

      new google.maps.Marker({
        position: { lat: CALGARY_HQ.lat, lng: CALGARY_HQ.lng },
        map: gMapInstance,
        title: CALGARY_HQ.name,
        icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
      });

      new google.maps.Marker({
        position: { lat: myProfile.lat, lng: myProfile.lng },
        map: gMapInstance,
        title: 'My Departure Location',
        icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
      });

      candidates.forEach(cand => {
        const isMatched = cand.matchState === 'accepted';
        const iconUrl = isMatched ?
          'https://maps.google.com/mapfiles/ms/icons/green-dot.png' :
          (cand.profile.hasCar ? 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');

        new google.maps.Marker({
          position: { lat: cand.profile.lat, lng: cand.profile.lng },
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

  function initApp() {
    const currentUser = store.getCurrentUser();
    if (!currentUser) {
      renderNavbar();
      renderAuthModal(() => {
        renderNavbar();
        renderRoute();
      });
    } else {
      renderNavbar();
      renderRoute();
    }
  }

  function renderNavbar() {
    const navEl = document.getElementById('mainNavbar');
    if (!navEl) return;
    const currentUser = store.getCurrentUser();
    
    if (!currentUser) {
      navEl.innerHTML = `
        <a class="nav-brand">
          <div class="brand-icon">⚡</div>
          <span class="brand-title">${t('appName')}</span>
        </a>
      `;
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
        ${currentUser.role === 'admin' ? `<button class="btn btn-ghost btn-sm" id="navAdminBtn" style="border-color:var(--secondary);color:var(--secondary)">⚙️ ${t('navAdmin')}</button>` : ''}
        <div class="user-chip">
          <div class="user-avatar">${currentUser.avatar || '👤'}</div>
          <div><strong style="display:block;line-height:1">${currentUser.name}</strong></div>
        </div>
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
    if (adminBtn) adminBtn.onclick = () => renderAdminConsole(() => renderNavbar());

    document.getElementById('toggleLangBtn').onclick = () => { setLang(getLang() === 'en' ? 'zh' : 'en'); renderNavbar(); renderRoute(); };

    document.getElementById('logoutBtn').onclick = () => {
      store.logout();
      renderNavbar();
      renderAuthModal(() => {
        renderNavbar();
        renderRoute();
      });
    };
  }

  function navigate(route) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;
    const perms = currentUser.permissions || [];
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
    if (!currentUser) {
      container.innerHTML = '';
      return;
    }

    if (currentRoute === 'home') renderHomePortal(container);
    else if (currentRoute === 'featA') renderFeatureA(container);
    else if (currentRoute === 'featB') renderFeatureB(container);
    else if (currentRoute === 'featC') renderFeatureC(container);
  }

  function renderHomePortal(container) {
    const currentUser = store.getCurrentUser();
    if (!currentUser) return;

    const perms = currentUser.permissions || [];
    const lang = getLang();

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h2 style="font-size:24px;font-weight:800;letter-spacing:-0.02em">
          ${lang === 'zh' ? '系统功能模块 (System Modules)' : 'Available System Modules'}
        </h2>
        <p style="color:var(--text-muted);font-size:14px;margin-top:4px">
          ${lang === 'zh' ? `欢迎，${currentUser.name}！请选择下方为您解锁的功能进入：` : `Welcome, ${currentUser.name}! Launch unlocked modules below:`}
        </p>
      </div>

      <div class="feature-grid">
        ${perms.includes('A') ? `
          <div class="glass-panel feature-card">
            <div class="card-top">
              <div class="card-header-icon" style="background:var(--primary-light);color:var(--primary)">⚡</div>
              <div class="card-title">${t('featATitle')}</div>
              <p class="card-desc">${t('featADesc')}</p>
            </div>
            <div>
              <button class="btn btn-primary launch-card-btn" data-route="featA" style="width:100%">${t('enterFeatA')}</button>
            </div>
          </div>
        ` : ''}

        ${perms.includes('B') ? `
          <div class="glass-panel feature-card">
            <div class="card-top">
              <div class="card-header-icon" style="background:var(--secondary-light);color:var(--secondary)">🎮</div>
              <div class="card-title">${t('featBTitle')}</div>
              <p class="card-desc">${t('featBDesc')}</p>
            </div>
            <div>
              <button class="btn btn-secondary launch-card-btn" data-route="featB" style="width:100%">${t('enterFeatB')}</button>
            </div>
          </div>
        ` : ''}

        ${perms.includes('C') ? `
          <div class="glass-panel feature-card">
            <div class="card-top">
              <div class="card-header-icon" style="background:rgba(249,115,22,0.15);color:var(--accent-orange)">🚗</div>
              <div class="card-title">${t('featCTitle')}</div>
              <p class="card-desc">${t('featCDesc')}</p>
            </div>
            <div>
              <button class="btn btn-orange launch-card-btn" data-route="featC" style="width:100%">${t('enterFeatC')}</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    container.querySelectorAll('.launch-card-btn').forEach(btn => {
      btn.onclick = () => navigate(btn.dataset.route);
    });
  }

  window.SocialPairApp = { initApp };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
