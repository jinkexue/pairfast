/* ==========================================================================
   State Management & Mock DB Engine (LocalStorage Powered)
   ========================================================================== */

const STORAGE_KEY = 'socialpair_hub_db_v2';

// Default TCG Machines HQ Location
export const TCG_HQ = {
  name: 'TCG Machines HQ',
  lat: 37.7749,
  lng: -122.4194,
  address: '100 Tech Park Way, TCG Machines HQ'
};

// Initial Mock Seed Data
const initialSeed = {
  lang: 'en',
  currentUserId: 'u1', // Default Admin yqcw@qq.com
  
  users: [
    {
      id: 'u1',
      name: 'YQCW Admin',
      email: 'yqcw@qq.com',
      password: '123456',
      role: 'admin',
      permissions: ['A', 'B', 'C'],
      avatar: '👑',
      phone: '+1 (555) 999-0001'
    },
    {
      id: 'u2',
      name: 'Alice Zhang',
      email: 'alice@company.com',
      password: '123456',
      role: 'user',
      permissions: ['A', 'B', 'C'],
      avatar: '👩‍💻',
      phone: '+1 (555) 012-3456'
    },
    {
      id: 'u3',
      name: 'Bob Smith',
      email: 'bob@company.com',
      password: '123456',
      role: 'user',
      permissions: ['A', 'B'],
      avatar: '👨‍🎨',
      phone: '+1 (555) 014-7890'
    },
    {
      id: 'u4',
      name: 'Charlie Chen',
      email: 'charlie@company.com',
      password: '123456',
      role: 'user',
      permissions: ['B', 'C'],
      avatar: '👨‍💻',
      phone: '+1 (555) 018-4321'
    },
    {
      id: 'u5',
      name: 'Diana Prince',
      email: 'diana@company.com',
      password: '123456',
      role: 'user',
      permissions: ['A', 'C'],
      avatar: '👩‍🔬',
      phone: '+1 (555) 016-5544'
    }
  ],

  // Default 5 Game Categories (Admin editable)
  games: [
    { id: 'g1', nameEn: 'Pickleball', nameZh: '匹克球', icon: '🏓', color: '#11b8a6' },
    { id: 'g2', nameEn: 'Table Tennis', nameZh: '乒乓球', icon: '🏓', color: '#6557ff' },
    { id: 'g3', nameEn: 'Billiards', nameZh: '台球', icon: '🎱', color: '#ff7a59' },
    { id: 'g4', nameEn: 'Board Game', nameZh: '桌游', icon: '🎲', color: '#8f7cff' },
    { id: 'g5', nameEn: 'Badminton', nameZh: '羽毛球', icon: '🏸', color: '#06b6d4' }
  ],

  // User Game Preferences { userId: { slots: [...], gameIds: [...] } }
  userGamePreferences: {
    'u1': {
      slots: ['this-Mon-17:00', 'this-Mon-17:30', 'this-Wed-18:00', 'this-Fri-17:30'],
      gameIds: ['g1', 'g2', 'g4']
    },
    'u2': {
      slots: ['this-Mon-17:00', 'this-Mon-17:30', 'this-Wed-18:00'],
      gameIds: ['g1', 'g3']
    },
    'u3': {
      slots: ['this-Mon-17:00', 'this-Mon-17:30', 'this-Fri-17:30'],
      gameIds: ['g1', 'g2']
    },
    'u4': {
      slots: ['this-Wed-18:00', 'this-Fri-17:30'],
      gameIds: ['g2', 'g4']
    }
  },

  // Game Matches Array
  gameMatches: [],

  // User Carpool Profiles
  carpoolProfiles: {
    'u1': {
      lat: 37.7833,
      lng: -122.4167,
      addressName: 'Market St & 5th, SF',
      hasCar: true,
      workTime: '08:30',
      homeTime: '18:00',
      status: 'offering' // offering, seeking, none
    },
    'u2': {
      lat: 37.7690,
      lng: -122.4480,
      addressName: 'Haight Ashbury, SF',
      hasCar: false,
      workTime: '08:30',
      homeTime: '18:00',
      status: 'seeking'
    },
    'u3': {
      lat: 37.7550,
      lng: -122.4200,
      addressName: 'Mission District, SF',
      hasCar: false,
      workTime: '08:30',
      homeTime: '18:00',
      status: 'seeking'
    },
    'u4': {
      lat: 37.7900,
      lng: -122.4000,
      addressName: 'Financial District, SF',
      hasCar: true,
      workTime: '08:30',
      homeTime: '18:00',
      status: 'offering'
    },
    'u5': {
      lat: 37.7600,
      lng: -122.4350,
      addressName: 'Castro District, SF',
      hasCar: false,
      workTime: '09:00',
      homeTime: '18:30',
      status: 'seeking'
    }
  },

  // Carpool Matches
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
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse state from LocalStorage:', e);
    }
    return JSON.parse(JSON.stringify(initialSeed));
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  // User Auth & Session
  getCurrentUser() {
    return this.data.users.find(u => u.id === this.data.currentUserId) || this.data.users[0];
  }

  setCurrentUser(userId) {
    this.data.currentUserId = userId;
    this.save();
  }

  login(email, password) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = this.data.users.find(u => String((u && u.email) || '').toLowerCase() === normalizedEmail && u.password === password);
    if (user) {
      this.data.currentUserId = user.id;
      this.save();
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  // Admin User CRUD
  getUsers() {
    return this.data.users;
  }

  addUser(userObj) {
    const newUser = {
      id: 'u_' + Date.now().toString(36),
      name: userObj.name || 'New User',
      email: userObj.email,
      password: userObj.password || '123456',
      role: 'user',
      permissions: userObj.permissions || ['A'],
      avatar: userObj.avatar || '👤',
      phone: userObj.phone || '+1 (555) 000-0000'
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(updated) {
    const idx = this.data.users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updated };
      this.save();
    }
  }

  deleteUser(userId) {
    if (userId === 'u1') return; // Cannot delete primary admin
    this.data.users = this.data.users.filter(u => u.id !== userId);
    this.save();
  }

  // Feature B: Games CRUD
  getGames() {
    return this.data.games;
  }

  addGame(gameObj) {
    const newGame = {
      id: 'g_' + Date.now().toString(36),
      nameEn: gameObj.nameEn,
      nameZh: gameObj.nameZh,
      icon: gameObj.icon || '🎮',
      color: gameObj.color || '#6557ff'
    };
    this.data.games.push(newGame);
    this.save();
    this.autoGenerateGameMatches();
    return newGame;
  }

  deleteGame(gameId) {
    this.data.games = this.data.games.filter(g => g.id !== gameId);
    this.save();
    this.autoGenerateGameMatches();
  }

  // Feature B: User Preferences & Matching Algorithm
  getUserGamePref(userId) {
    return this.data.userGamePreferences[userId] || { slots: [], gameIds: [] };
  }

  saveUserGamePref(userId, slots, gameIds) {
    this.data.userGamePreferences[userId] = { slots, gameIds };
    this.save();
    this.autoGenerateGameMatches();
  }

  autoGenerateGameMatches() {
    // Group users by (slot + gameId)
    const groupings = {}; // key: "slot___gameId" -> array of userIds

    Object.entries(this.data.userGamePreferences).forEach(([userId, pref]) => {
      const { slots = [], gameIds = [] } = pref;
      slots.forEach(slot => {
        gameIds.forEach(gId => {
          const key = `${slot}___${gId}`;
          if (!groupings[key]) groupings[key] = [];
          groupings[key].push(userId);
        });
      });
    });

    // Generate or update matches
    const newMatches = [];
    Object.entries(groupings).forEach(([key, userIds]) => {
      if (userIds.length >= 2) {
        const [slot, gameId] = key.split('___');
        
        // Preserve existing confirmations if match existed
        const existing = (this.data.gameMatches || []).find(m => m.slot === slot && m.gameId === gameId);
        const confirmedUserIds = existing ? existing.confirmedUserIds.filter(id => userIds.includes(id)) : [];

        newMatches.push({
          id: existing ? existing.id : 'm_' + Math.random().toString(36).slice(2, 8),
          slot,
          gameId,
          userIds,
          confirmedUserIds,
          status: confirmedUserIds.length >= userIds.length ? 'confirmed' : 'pending'
        });
      }
    });

    this.data.gameMatches = newMatches;
    this.save();
  }

  confirmGameMatch(matchId, userId) {
    const match = (this.data.gameMatches || []).find(m => m.id === matchId);
    if (match && match.userIds.includes(userId)) {
      if (!match.confirmedUserIds.includes(userId)) {
        match.confirmedUserIds.push(userId);
      }
      if (match.confirmedUserIds.length >= match.userIds.length) {
        match.status = 'confirmed';
      }
      this.save();
    }
  }

  optOutGameMatch(matchId, userId) {
    const match = (this.data.gameMatches || []).find(m => m.id === matchId);
    if (match) {
      match.userIds = match.userIds.filter(id => id !== userId);
      match.confirmedUserIds = match.confirmedUserIds.filter(id => id !== userId);
      if (match.userIds.length < 2) {
        this.data.gameMatches = this.data.gameMatches.filter(m => m.id !== matchId);
      } else if (match.confirmedUserIds.length >= match.userIds.length) {
        match.status = 'confirmed';
      }
      this.save();
    }
  }

  getGameMatches() {
    return this.data.gameMatches || [];
  }

  // Feature C: Carpool Distance & Matching Engine
  getCarpoolProfile(userId) {
    return this.data.carpoolProfiles[userId] || {
      lat: 37.7749,
      lng: -122.4194,
      addressName: 'Default Location',
      hasCar: false,
      workTime: '08:30',
      homeTime: '18:00',
      status: 'none'
    };
  }

  saveCarpoolProfile(userId, profile) {
    this.data.carpoolProfiles[userId] = { ...profile };
    this.save();
  }

  // Distance calculation (Haversine formula in KM)
  calcDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round((R * c) * 10) / 10; // 1 decimal place
  }

  getCarpoolCandidates(currentUserId) {
    const myProfile = this.getCarpoolProfile(currentUserId);
    const matches = this.data.carpoolMatches || [];

    const candidates = [];

    this.data.users.forEach(user => {
      if (user.id === currentUserId) return;
      const profile = this.getCarpoolProfile(user.id);
      
      // Filter candidates who are active
      if (profile.status === 'none') return;

      const dist = this.calcDistanceKm(myProfile.lat, myProfile.lng, profile.lat, profile.lng);

      // Check match status between currentUserId & candidate user
      const existingMatch = matches.find(m => 
        (m.driverId === currentUserId && m.riderId === user.id) ||
        (m.driverId === user.id && m.riderId === currentUserId)
      );

      const isConnected = existingMatch && existingMatch.status === 'accepted';
      const isPending = existingMatch && existingMatch.status === 'pending';

      candidates.push({
        user: isConnected ? user : { id: user.id, name: `Anonymous Teammate #${user.id.slice(-3)}`, avatar: '👤' },
        fullUser: user,
        profile,
        distanceKm: dist,
        matchState: isConnected ? 'accepted' : (isPending ? 'pending' : 'none'),
        matchId: existingMatch ? existingMatch.id : null,
        requesterId: existingMatch ? existingMatch.requesterId : null
      });
    });

    // Sort by distance ASC (nearest to farthest)
    candidates.sort((a, b) => a.distanceKm - b.distanceKm);
    return candidates;
  }

  requestCarpool(requesterId, targetUserId) {
    const reqProfile = this.getCarpoolProfile(requesterId);
    const tarProfile = this.getCarpoolProfile(targetUserId);

    const driverId = reqProfile.hasCar ? requesterId : targetUserId;
    const riderId = reqProfile.hasCar ? targetUserId : requesterId;

    const newMatch = {
      id: 'cp_' + Date.now().toString(36),
      driverId,
      riderId,
      requesterId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (!this.data.carpoolMatches) this.data.carpoolMatches = [];
    this.data.carpoolMatches.push(newMatch);
    this.save();
    return newMatch;
  }

  acceptCarpool(matchId) {
    const match = (this.data.carpoolMatches || []).find(m => m.id === matchId);
    if (match) {
      match.status = 'accepted';
      this.save();
    }
  }

  rejectCarpool(matchId) {
    this.data.carpoolMatches = (this.data.carpoolMatches || []).filter(m => m.id !== matchId);
    this.save();
  }
}

export const store = new Store();
