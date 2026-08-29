import storage from '@system.storage';

// ===== 存档压缩：grid/visited 由嵌套数组转为行字符串（体积约省 60%）=====
function compressGrid(grid) {
  var rows = [];
  for (var i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(''));
  }
  return rows;
}

function compressVisited(visited) {
  var rows = [];
  for (var i = 0; i < visited.length; i++) {
    var row = visited[i] || [];
    var chars = '';
    for (var j = 0; j < row.length; j++) {
      chars += row[j] ? '1' : '0';
    }
    rows.push(chars);
  }
  return rows;
}

// 兼容读取：新版行字符串（gridS/visitedS）与旧版嵌套数组（grid/visited）
export function parseSavedRun(s) {
  var grid = null, visited = null, i, j, row, out;
  if (s.gridS && s.gridS.length) {
    grid = [];
    for (i = 0; i < s.gridS.length; i++) {
      grid.push(s.gridS[i].split(''));
    }
  } else if (s.grid && s.grid.length) {
    grid = s.grid;
  }
  if (s.visitedS && s.visitedS.length) {
    visited = [];
    for (i = 0; i < s.visitedS.length; i++) {
      row = s.visitedS[i].split('');
      out = [];
      for (j = 0; j < row.length; j++) {
        out.push(row[j] === '1');
      }
      visited.push(out);
    }
  } else if (s.visited && s.visited.length) {
    visited = s.visited;
  }
  return { grid: grid, visited: visited };
}

export function serializeRun(vm) {
  return {
    floor: vm.floor, gold: vm.gold, kills: vm.kills, level: vm.level,
    baseAtk: vm.baseAtk, weaponAtk: vm.weaponAtk, weaponName: vm.weaponName,
    armorDef: vm.armorDef, armorName: vm.armorName, atk: vm.atk,
    critChance: vm.critChance, critMult: vm.critMult, lifesteal: vm.lifesteal,
    goldMul: vm.goldMul, expMul: vm.expMul, skillCdMax: vm.skillCdMax,
    burnChance: vm.burnChance, dodge: vm.dodge, skillName: vm.skillName,
    shield: vm._shield, hasteCharges: vm._hasteCharges,
    comboMaxAdd: vm._comboMaxAdd, challengeMod: vm.challengeMod,
    regen: vm._regen, thorns: vm._thorns, killHeal: vm._killHeal,
    goldSteal: vm._goldSteal, skillPowerAdd: vm._skillPowerAdd,
    freezeChance: vm._freezeChance, blockChance: vm._blockChance,
    barrier: vm._barrier, berserk: vm._berserk,
    skillCombo: vm._skillCombo, revealBonus: vm._revealBonus,
    treasureBonus: vm._treasureBonus, floorHeal: vm._floorHeal,
    bonusDef: vm._bonusDef, bloodlust: vm._bloodlust,
    startHaste: vm._startHaste, materialBonus: vm._materialBonus,
    healBoost: vm._healBoost, intimidate: vm._intimidate,
    resolve: vm._resolve, stunChance: vm._stunChance,
    execute: vm._execute, craftDiscount: vm._craftDiscount,
    cdkill: vm._cdkill, cleanChance: vm._cleanChance,
    openingStrike: vm._openingStrike, thunderChance: vm._thunderChance,
    shieldGainChance: vm._shieldGainChance, shieldGainAmt: vm._shieldGainAmt,
    critGold: vm._critGold, comboOnHit: vm._comboOnHit,
    haggle: vm._haggle, potionShield: vm._potionShield,
    potionCombo: vm._potionCombo, critCombo: vm._critCombo,
    soulOnKillChance: vm._soulOnKillChance, stairVision: vm._stairVision,
    startCombo: vm._startCombo, comboHeal: vm._comboHeal,
    levelShield: vm._levelShield, warcry: vm._warcry,
    startShield: vm._startShield, fullVision: vm._fullVision,
    forgeBonus: vm._forgeBonus, luck: vm._luck,
    shieldReflect: vm._shieldReflect, revive: vm._revive,
    reviveUsed: vm._reviveUsed, comboPerStack: vm._comboPerStack,
    levelHp: vm._levelHp,
    hp: vm.hp, maxHp: vm.maxHp,
    exp: vm.exp, expNext: vm.expNext, potions: vm.potions,
    skillId: vm.skillId,
    mh: vm._height, mw: vm._width,
    pr: vm._playerR, pc: vm._playerC,
    sr: vm._stairsR, sc: vm._stairsC,
    gridS: compressGrid(vm._grid), visitedS: compressVisited(vm._visited),
    promoted: vm.promoted, promoteName: vm.promoteName,
    relics: vm.relics, visitedAreas: vm.visitedAreas,
    materials: vm.materials, talentPoints: vm.talentPoints,
    talents: vm.talents, monsters: vm._monsters, items: vm._items
  };
}

// 高频路径（走格子）节流：8 秒内不重复全量写盘；关键节点用 force 强制落盘
var SAVE_THROTTLE_MS = 8000;

export function saveRun(vm, force) {
  if (vm.phase !== 'grid' || !vm._grid || vm._grid.length === 0) return;
  vm._recordBest();
  var now = Date.now();
  if (!force && vm._lastSaveAt && now - vm._lastSaveAt < SAVE_THROTTLE_MS) {
    return;
  }
  vm._lastSaveAt = now;
  storage.set({ key: 'BAND_SURVIVOR_SAVE', value: JSON.stringify(serializeRun(vm)) });
  vm.hasSave = true;
  vm.saveFloor = vm.floor;
  vm.saveLevel = vm.level;
}

export function clearSave(vm) {
  storage.set({ key: 'BAND_SURVIVOR_SAVE', value: '' });
  vm.hasSave = false;
  vm.saveFloor = 0;
  vm.saveLevel = 0;
}

export function loadAndContinue(vm, callback) {
  storage.get({
    key: 'BAND_SURVIVOR_SAVE',
    success: function(data) {
      var s;
      try { s = JSON.parse(data); } catch(e) { vm.hasSave = false; return; }
      var hasMap = (s && s.gridS && s.gridS.length) || (s && s.grid && s.grid.length > 0);
      if (!s || !hasMap) { vm.hasSave = false; return; }
      callback(s);
    }
  });
}

export function saveBackup(vm) {
  if (vm.phase !== 'grid' || !vm._grid || vm._grid.length === 0) return;
  storage.set({ key: 'BAND_SURVIVOR_SAVE_2', value: JSON.stringify(serializeRun(vm)) });
  vm._addLog('已备份存档');
}

export function restoreBackup(vm) {
  var that = vm;
  storage.get({
    key: 'BAND_SURVIVOR_SAVE_2',
    success: function(data) {
      if (!data) { that._addLog('暂无备份存档'); return; }
      var s;
      try { s = JSON.parse(data); } catch (e) { that._addLog('备份存档已损坏'); return; }
      var hasMap = (s && s.gridS && s.gridS.length) || (s && s.grid && s.grid.length);
      if (!s || !hasMap) { that._addLog('备份存档无效'); return; }
      // 等写入成功后再读回，避免慢设备上 set/get 竞态
      storage.set({
        key: 'BAND_SURVIVOR_SAVE', value: data,
        success: function() { that._continueRun(); },
        fail: function() { that._addLog('恢复失败，请重试'); }
      });
    }
  });
}
