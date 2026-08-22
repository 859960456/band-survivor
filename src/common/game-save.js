import storage from '@system.storage';

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
    exp: vm.exp, expNext: vm.expNext, potions: vm.potions,
    mh: vm._height, mw: vm._width,
    pr: vm._playerR, pc: vm._playerC,
    sr: vm._stairsR, sc: vm._stairsC,
    grid: vm._grid, visited: vm._visited,
    relics: vm.relics, visitedAreas: vm.visitedAreas,
    materials: vm.materials, talentPoints: vm.talentPoints,
    talents: vm.talents, monsters: vm._monsters, items: vm._items
  };
}

export function saveRun(vm) {
  if (vm.phase !== 'grid' || !vm._grid || vm._grid.length === 0) return;
  vm._recordBest();
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
      try { s = JSON.parse(data); } catch(e) { return; }
      if (!s || !s.grid || s.grid.length === 0) { vm.hasSave = false; return; }
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
      storage.set({ key: 'BAND_SURVIVOR_SAVE', value: data });
      that._continueRun();
    }
  });
}

export function saveMeta(vm) {
  storage.set({
    key: 'BAND_SURVIVOR_META',
    value: JSON.stringify({
      soul: vm.soul, metaHp: vm.metaHp, metaPotion: vm.metaPotion,
      metaAtk: vm.metaAtk, bestWeaponAtk: vm.bestWeaponAtk,
      bestArmorDef: vm.bestArmorDef, relicCodex: vm.relicCodex,
      equipCodex: vm.equipCodex
    })
  });
}
