/* ==========================================================================
   Internationalization (i18n) Engine - Default English
   ========================================================================== */

export const translations = {
  en: {
    // Brand & Nav
    appName: "SocialPair Hub",
    navHome: "Home Portal",
    navFeatA: "Grouping (A)",
    navFeatB: "Game Match (B)",
    navFeatC: "Carpool (C)",
    navAdmin: "Admin Console",
    loginBtn: "Sign In",
    logoutBtn: "Sign Out",
    demoLogin: "Demo Switch",
    accessDenied: "Access Denied: You do not have permission for this module. Contact administrator.",
    
    // Auth & Users
    loginTitle: "Sign In to SocialPair Hub",
    loginSubtitle: "Default Admin: yqcw@qq.com / 123456",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    quickDemoUser: "Quick Switch Demo Account",
    loginSubmit: "Sign In Now",
    invalidAuth: "Invalid email or password.",

    // Admin Console
    adminTitle: "User & Permission Management Console",
    addUserBtn: "+ Add New User",
    colName: "User Name",
    colEmail: "Email",
    colRole: "Role",
    colPerms: "Module Permissions (A/B/C)",
    colActions: "Actions",
    editPerms: "Edit Permissions",
    resetPass: "Reset Password",
    deleteUser: "Delete User",
    modalUserTitle: "Manage User Info & Permissions",
    saveUserBtn: "Save User Settings",

    // Home Portal
    heroBadge: "Multi-Module Pairing & Mobility Platform",
    heroTitle: "Smart Matchmaking for Groups, Sports & Carpool",
    heroDesc: "All-in-one community hub. Group members effortlessly, organize game sessions with double-confirmation, and find carpool teammates with privacy protection.",
    selectModule: "Select Module to Launch",

    // Feature A Card
    featATitle: "Dynamic Player Grouping (A)",
    featADesc: "Advanced pairing algorithm with leader candidate options, preference/avoid constraints, dynamic cycle adjustments, and repeat-meeting heatmap analytics.",
    enterFeatA: "Launch Grouping System",

    // Feature B Card
    featBTitle: "Game & Sports Matching (B)",
    featBDesc: "Weekly & next-week time slot scheduler (30-min interval), multi-sport categories selection, auto pre-matching & member double-confirmation for confirmed sessions.",
    enterFeatB: "Launch Game Matching",

    // Feature C Card
    featCTitle: "Smart Carpool Matcher (C)",
    featCDesc: "Interactive map distance-based carpool system to TCG Machines HQ. Offering vs Seeking ride matching, multi-passenger capacity, and anonymous privacy protection.",
    enterFeatC: "Launch Carpool System",

    // Feature B Details
    b1Title: "Time & Game Preferences",
    b1Sub: "Configure your available 30-min time slots for this week & next week, and select games you want to play.",
    tabThisWeek: "This Week",
    tabNextWeek: "Next Week",
    quickPresets: "Quick Time Presets:",
    presetWeekdayEve: "Weekday Evenings (17:00-19:00)",
    presetWeekendAft: "Weekend Afternoon (13:00-18:00)",
    clearSlots: "Clear All Slots",
    selectGamesLabel: "Select Game Categories (Multiple):",
    manageCategoriesBtn: "Manage Game Categories (Admin)",
    savePrefBtn: "Save My Availability & Game Choices",
    
    b2Title: "Game Matching Hub",
    b2Sub: "Auto pre-matched groups based on identical time slots and sports preferences.",
    preMatchedCount: "Pre-Matched Sessions",
    confirmedCount: "Confirmed Sessions",
    confirmSession: "Confirm Attendance (2nd Step)",
    optOutSession: "Opt-Out",
    statusPending: "Pre-Matched (Pending Confirmation)",
    statusConfirmed: "Session Match Confirmed! 🎉",
    membersLabel: "Members:",
    
    // Category Modal
    catModalTitle: "Manage Game & Sport Categories",
    catNameEn: "Game Name (English)",
    catNameZh: "Game Name (Chinese)",
    catIcon: "Emoji Icon",
    addCategoryBtn: "Add Category",

    // Feature C Details
    c1Title: "My Carpool Profile & Location",
    c1Sub: "Set your commute departure point (Destination: TCG Machines HQ), car status, and ride willingness.",
    destinationFixed: "Fixed Destination: TCG Machines HQ (100 Tech Park Way)",
    hasCarLabel: "Vehicle Ownership:",
    driverOption: "Driver (Have Car)",
    riderOption: "Rider (No Car)",
    workTimeLabel: "Morning Departure Time (To Work):",
    homeTimeLabel: "Evening Departure Time (To Home):",
    rideStatusLabel: "Carpool Willingness Status:",
    statusSeeking: "Seeking Ride (Want to Join)",
    statusOffering: "Offering Ride (Want to Pick Up)",
    statusNone: "Not Active in Carpool",
    originAddrLabel: "Departure Location Coordinates & Name:",
    saveCarpoolBtn: "Update Carpool Profile",

    c2Title: "Matched Teammates & Map View",
    c2Sub: "Sorted from nearest to farthest distance. Click marker or list to send ride invite/request.",
    privacyNote: "🔒 Privacy Protection Active: Usernames are anonymous (#ID) before match confirmation to avoid social awkwardness. Names and phone numbers are unlocked once both parties accept.",
    distanceKm: "km away from you",
    requestJoin: "Request to Join Carpool",
    offerPickup: "Invite / Pick Up Rider",
    matchedStatus: "Match Confirmed (Connected)",
    awaitingConsent: "Awaiting Dual Confirmation...",
    acceptCarpool: "Accept Ride Request",
    rejectCarpool: "Decline",
    myCarpoolTeams: "My Active Carpool Groups",

    // Common
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    successMsg: "Settings saved successfully!"
  },
  
  zh: {
    // Brand & Nav
    appName: "SocialPair 匹配调度平台",
    navHome: "系统首页",
    navFeatA: "动态分组 (A)",
    navFeatB: "游戏匹配 (B)",
    navFeatC: "拼车系统 (C)",
    navAdmin: "管理员后台",
    loginBtn: "登录",
    logoutBtn: "退出登录",
    demoLogin: "演示身份",
    accessDenied: "访问受限：您没有该功能的访问权限，请联系管理员赋权。",
    
    // Auth & Users
    loginTitle: "登录 SocialPair 匹配调度平台",
    loginSubtitle: "默认管理员账号：yqcw@qq.com / 密码：123456",
    emailLabel: "邮箱地址",
    passwordLabel: "密码",
    quickDemoUser: "快捷演示账号切换",
    loginSubmit: "立即登录",
    invalidAuth: "邮箱或密码错误。",

    // Admin Console
    adminTitle: "用户与系统选项权限管理中心",
    addUserBtn: "+ 添加新用户",
    colName: "用户名",
    colEmail: "邮箱",
    colRole: "角色",
    colPerms: "可进入系统选项 (A/B/C)",
    colActions: "操作",
    editPerms: "编辑权限",
    resetPass: "重置密码",
    deleteUser: "删除用户",
    modalUserTitle: "管理用户信息与系统选项权限",
    saveUserBtn: "保存用户配置",

    // Home Portal
    heroBadge: "多功能社群匹配与协同平台",
    heroTitle: "智能高效的组队分组、运动游戏匹配与拼车系统",
    heroDesc: "一站式社群匹配协同。支持无缝动态分组、30分钟粒度游戏运动匹配二次确认，以及基于地理位置与隐私防护的同路拼车。",
    selectModule: "请选择要启用的功能模块",

    // Feature A Card
    featATitle: "动态玩家分组系统 (功能 A)",
    featADesc: "高效算法分组，支持组长候选、希望/回避集合约束、周期动态重算与相遇热力矩阵分析。",
    enterFeatA: "进入动态分组系统",

    // Feature B Card
    featBTitle: "游戏匹配系统 (功能 B)",
    featBDesc: "本周及下周 30 分钟空余段快速配置，支持匹克球/乒乓球/台球/桌游/羽毛球等多项目，系统自动预匹配与成员二次确认组局。",
    enterFeatB: "进入游戏匹配系统",

    // Feature C Card
    featCTitle: "拼车系统 (功能 C)",
    featCDesc: "基于地图交互的同事拼车匹配（终点 TCG Machines）。支持有车/无车、上下班时间选择、距离排序、双向确认以及匹配前用户名隐私隐匿防护。",
    enterFeatC: "进入拼车匹配系统",

    // Feature B Details
    b1Title: "空余时间段与游戏偏好设置 (B1)",
    b1Sub: "请设置您本周及下周预计的空余时间段（30分钟/段）并勾选喜爱的游戏/运动类型。",
    tabThisWeek: "本周 (This Week)",
    tabNextWeek: "下周 (Next Week)",
    quickPresets: "快速周期设置：",
    presetWeekdayEve: "工作日傍晚 (17:00-19:00)",
    presetWeekendAft: "周末下午 (13:00-18:00)",
    clearSlots: "清空当前已选",
    selectGamesLabel: "选择打球/游戏种类（可多选）：",
    manageCategoriesBtn: "管理游戏种类 (管理员专用)",
    savePrefBtn: "保存我的时间与运动设置",
    
    b2Title: "游戏匹配主页大厅 (B2)",
    b2Sub: "系统自动匹配出在相同时间段选择相同游戏分类的小组。",
    preMatchedCount: "预匹配场次",
    confirmedCount: "已组局成功场次",
    confirmSession: "二次确认参加 (2nd Step)",
    optOutSession: "退出该场",
    statusPending: "预匹配中（等待二次确认）",
    statusConfirmed: "🎉 组局成功！",
    membersLabel: "已加成员：",
    
    // Category Modal
    catModalTitle: "管理游戏/运动分类列表",
    catNameEn: "英文名称 (English)",
    catNameZh: "中文名称 (Chinese)",
    catIcon: "Emoji 图标",
    addCategoryBtn: "新增分类",

    // Feature C Details
    c1Title: "我的拼车状态与出发位置设置 (C1)",
    c1Sub: "设置您的上下班出发点（终点固定为 TCG Machines ）、有无车辆及接载意愿。",
    destinationFixed: "固定终点：TCG Machines 公司 HQ (100 Tech Park Way)",
    hasCarLabel: "车辆设置：",
    driverOption: "有车 / 司机 (Driver)",
    riderOption: "无车 / 乘客 (Rider)",
    workTimeLabel: "上班出发时间 (Morning):",
    homeTimeLabel: "下班出发时间 (Evening):",
    rideStatusLabel: "拼车状态与意愿：",
    statusSeeking: "愿意加入拼车 (Seeking Ride)",
    statusOffering: "愿意载客 (Offering Ride)",
    statusNone: "暂不参与拼车",
    originAddrLabel: "出发位置坐标与地名设置：",
    saveCarpoolBtn: "更新我的拼车资料",

    c2Title: "匹配用户列表与地图位置 (C2)",
    c2Sub: "已按距离由近到远自动排序。点击地图 Marker 或列表即可申请加入或邀约接载。",
    privacyNote: "🔒 隐私防护提示：在匹配成功前，为了避免尴尬，地图与列表中只能看到对方位置、车况与时间，看不到用户名（显示为匿名代号 #ID）。双方同时确认匹配成功后，解封真实姓名与联系电话！",
    distanceKm: "公里 (距您的出发点)",
    requestJoin: "申请加入该车拼车",
    offerPickup: "邀约接载该乘客",
    matchedStatus: "已组队成功 (组员互可见)",
    awaitingConsent: "等待对方确认中...",
    acceptCarpool: "同意接受组队",
    rejectCarpool: "拒绝",
    myCarpoolTeams: "我的拼车组队大厅",

    // Common
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    close: "关闭",
    successMsg: "配置保存成功！"
  }
};

let currentLang = 'en';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
}

export function t(key) {
  const dict = translations[currentLang] || translations.en;
  return dict[key] || translations.en[key] || key;
}
