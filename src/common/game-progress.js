import storage from '@system.storage';
import { ACHIEVEMENTS, MONSTERS, RELICS } from './game-data.js';

export function todayStr() {
  var d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

// --- Daily Sign-in ---
export function checkDaily(vm) {
  storage.get({
    key: 'BAND_SURVIVOR_DAILY',
    success: function(data) { vm.canClaimDaily = data !== todayStr(); }
  });
}

export function claimDaily(vm) {
  if (!vm.canClaimDaily) return;
  vm.soul += 8;
  vm.canClaimDaily = false;
  storage.set({ key: 'BAND_SURVIVOR_DAILY', value: todayStr() });
}

// --- Daily Task ---
export function initDailyTask(vm) {
  storage.get({
    key: 'BAND_SURVIVOR_DAILYTASK',
    success: function(data) {
      try {
        var d = JSON.parse(data);
        if (d && d.date === todayStr()) {
          vm.dailyType = d.type; vm.dailyTarget = d.target;
          vm.dailyProgress = d.progress || 0; vm.dailyDone = d.done || false;
          vm.dailyClaimed = d.claimed || false;
          refreshDailyLabel(vm); return;
        }
      } catch(e) {}
      newDailyTask(vm);
    },
    fail: function() { newDailyTask(vm); }
  });
}

export function newDailyTask(vm) {
  var types = ['kill', 'floor', 'boss', 'level'];
  vm.dailyType = types[Math.floor(Math.random() * types.length)];
  var labels = { kill: [5,'击杀 5 个怪物'], floor: [3,'到达第 3 层'], boss: [1,'击败 1 个 BOSS'], level: [5,'达到 Lv.5'] };
  var cfg = labels[vm.dailyType] || labels.kill;
  vm.dailyTarget = cfg[0]; vm.dailyLabel = cfg[1];
  vm.dailyProgress = 0; vm.dailyDone = false; vm.dailyClaimed = false;
  save(vm);
}

function save(vm) {
  storage.set({ key: 'BAND_SURVIVOR_DAILYTASK', value: JSON.stringify({
    date: todayStr(), type: vm.dailyType, target: vm.dailyTarget,
    progress: vm.dailyProgress, done: vm.dailyDone, claimed: vm.dailyClaimed || false
  })});
}

export function refreshDailyLabel(vm) {
  var labels = { kill: '击杀 5 个怪物', floor: '到达第 3 层', boss: '击败 1 个 BOSS', level: '达到 Lv.5' };
  vm.dailyLabel = labels[vm.dailyType] || labels.kill;
}

export function advanceDaily(vm, amount) {
  if (vm.dailyDone) return;
  vm.dailyProgress += amount || 0;
  if (vm.dailyProgress >= vm.dailyTarget) { vm.dailyProgress = vm.dailyTarget; vm.dailyDone = true; }
  save(vm);
}

export function claimDailyTask(vm) {
  if (!vm.dailyDone || vm.dailyClaimed) return;
  vm.soul += 10; vm._saveMeta();
  vm.dailyClaimed = true;
  save(vm);
}

// --- Achievements ---
export function updateAchievementCount(vm) {
  vm.achievementTotal = ACHIEVEMENTS.length;
  vm.achievementCount = vm.unlockedAchievements.length;
  vm.achievementList = ACHIEVEMENTS.map(function(a) {
    return { id: a.id, name: a.name, desc: a.desc, done: vm.unlockedAchievements.indexOf(a.id) >= 0 };
  });
  var n = vm.achievementCount;
  if (n >= 6) vm.title = '传说'; else if (n >= 3) vm.title = '精英'; else if (n >= 1) vm.title = '勇者'; else vm.title = '初行者';
  if (vm.codexCount >= vm.codexTotal && vm.codexTotal > 0) unlockAchievement(vm, 'codex_master');
}

export function achievementName(achievements, id) {
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].id === id) return achievements[i].name;
  }
  return id;
}

export function unlockAchievement(vm, id) {
  if (vm.unlockedAchievements.indexOf(id) >= 0) return;
  vm.unlockedAchievements.push(id);
  vm._saveProfile();
  vm.soul += 5; vm._saveMeta();
  updateAchievementCount(vm);
  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    if (ACHIEVEMENTS[i].id === id) { vm._addLog('成就达成：' + ACHIEVEMENTS[i].name + '（灵魂 +5）'); return; }
  }
}

// --- Codex ---
export function updateCodexCount(vm) {
  vm.codexTotal = Object.keys(MONSTERS).length;
  vm.codexCount = vm.codex.length;
  vm.codexList = Object.keys(MONSTERS).map(function(id) {
    return { id: id, name: MONSTERS[id].name, found: vm.codex.indexOf(id) >= 0 };
  });
  if (vm.codexCount >= vm.codexTotal && vm.codexTotal > 0) {
    unlockAchievement(vm, 'codex_master');
  }
}

export function discoverMonster(vm, id) {
  if (!id || vm.codex.indexOf(id) >= 0) return;
  vm.codex.push(id);
  vm._saveProfile();
  updateCodexCount(vm);
}
