// 纯计算逻辑模块（不依赖组件状态，便于复用与测试）
import { BALANCE } from './game-data.js';

export function difficultyMul(difficulty, challengeMode) {
  if (challengeMode) {
    if (difficulty === 0) { return { hp: 0.9, atk: 0.95, exp: 1.1, gold: 1.1 }; }
    if (difficulty === 2) { return { hp: 1.45, atk: 1.3, exp: 1.35, gold: 1.25 }; }
    return { hp: 1.1, atk: 1.1, exp: 1.2, gold: 1.15 };
  }
  if (difficulty === 0) { return { hp: 0.8, atk: 0.85, exp: 1.0, gold: 1.0 }; }
  if (difficulty === 2) { return { hp: 1.35, atk: 1.2, exp: 1.25, gold: 1.15 }; }
  return { hp: 1.0, atk: 1.0, exp: 1.0, gold: 1.0 };
}

export function computeMonsterStats(base, floor, mul, endless, areaEffect) {
  var ae = areaEffect || { hp: 1, atk: 1, gold: 1, exp: 1 };
  var scale = 1 + floor * (endless ? BALANCE.monsterHpScaleEndless : BALANCE.monsterHpScale);
  var atkAdd = floor * (endless ? BALANCE.monsterAtkScaleEndless : BALANCE.monsterAtkBase);
  return {
    name: base.name,
    hp: Math.round(base.hp * scale * mul.hp * ae.hp),
    atk: Math.round((base.atk + atkAdd) * mul.atk * ae.atk),
    gold: Math.round((base.gold + floor * BALANCE.monsterGoldBase) * mul.gold * ae.gold),
    exp: Math.round((base.exp + floor * BALANCE.monsterExpBase) * mul.exp * ae.exp)
  };
}

export function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function areaByFloor(floor, areas, every) {
  var index = Math.floor((floor - 1) / every) % areas.length;
  return areas[index];
}

export function isBossFloor(floor, every) {
  return floor % every === 0;
}

export function healAmount(maxHp, baseHeal) {
  return baseHeal + Math.round(maxHp * 0.05);
}

export function skillName(weaponAtk) {
  if (weaponAtk >= 14) { return '圣光斩'; }
  if (weaponAtk >= 10) { return '烈焰斩'; }
  if (weaponAtk >= 6) { return '剑气'; }
  return '重击';
}

export function skillMult(weaponAtk) {
  return 2.5 + Math.min(1.5, weaponAtk * 0.04);
}

export function moveThreshold(sensitivity) {
  return sensitivity === 0 ? 20 : (sensitivity === 2 ? 6 : 12);
}

export function sensLabel(sensitivity) {
  return sensitivity === 0 ? '低' : (sensitivity === 2 ? '高' : '中');
}

export function classById(classes, id) {
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === id) {
      return classes[i];
    }
  }
  return classes[0];
}

export function bestKey(difficulty) {
  return 'BAND_SURVIVOR_BEST_' + difficulty;
}

export function rollWeapon(weapons, qualities, affixes, floor) {
  var base = weapons[Math.floor(Math.random() * weapons.length)];
  var qIndex = Math.floor(Math.min(0.999, Math.random() + (floor || 0) * 0.02) * qualities.length);
  var q = qualities[qIndex];
  var affix = affixes[Math.floor(Math.random() * affixes.length)];
  var atk = Math.round(base.atk * q.mult) + affix.atk;
  return { name: q.name + '·' + base.name + '(' + affix.name + ')', atk: atk, q: q, baseName: base.name };
}

export function rollArmor(armors, qualities, affixes, floor) {
  var base = armors[Math.floor(Math.random() * armors.length)];
  var qIndex = Math.floor(Math.min(0.999, Math.random() + (floor || 0) * 0.02) * qualities.length);
  var q = qualities[qIndex];
  var affix = affixes[Math.floor(Math.random() * affixes.length)];
  var def = Math.round(base.def * q.mult) + affix.def;
  var dodge = Math.round(q.mult * 3);
  return { name: q.name + '·' + base.name + '(' + affix.name + ')', def: def, dodge: dodge, q: q, baseName: base.name };
}

export function randPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export var UPGRADE_EFFECTS = {
  'atk': function(vm) {
      vm.baseAtk += 4;
      vm.atk = vm.baseAtk + vm.weaponAtk;
  },
  'hp': function(vm) {
      vm.maxHp += 25;
      vm.hp = Math.min(vm.maxHp, vm.hp + 25);
  },
  'potion': function(vm) {
      vm.potions += 1;
  },
  'heal': function(vm) {
      vm.hp = Math.min(vm.maxHp, vm.hp + 40);
  },
  'gold': function(vm) {
      vm.gold += 15;
  },
  'goldmul': function(vm) {
      vm.goldMul += 0.15;
  },
  'expmul': function(vm) {
      vm.expMul += 0.15;
  },
  'crit': function(vm) {
      vm.critChance += 0.08;
  },
  'critdmg': function(vm) {
      vm.critMult += 0.3;
  },
  'lifesteal': function(vm) {
      vm.lifesteal += 2;
  },
  'burn': function(vm) {
      vm.burnChance += 0.1;
  },
  'cd': function(vm) {
      vm.skillCdMax = Math.max(1, vm.skillCdMax - 0.3);
  },
  'omni': function(vm) {
      vm.baseAtk += 2;
      vm.atk = vm.baseAtk + vm.weaponAtk;
      vm.goldMul += 0.05;
      vm.expMul += 0.05;
  },
  'shield': function(vm) {
      vm._shield += 15;
  },
  'haste': function(vm) {
      vm._hasteCharges += 1;
  },
  'dodgeup': function(vm) {
      vm.dodge += 3;
  },
  'materials': function(vm) {
      vm.materials += 3;
  },
  'gold100': function(vm) {
      vm.gold += 20;
  },
  'regen': function(vm) {
      vm._regen += 2;
  },
  'thorns': function(vm) {
      vm._thorns += 3;
  },
  'holy': function(vm) {
      vm._killHeal += 5;
  },
  'loot': function(vm) {
      vm._goldSteal += 3;
  },
  'skillpower': function(vm) {
      vm._skillPowerAdd += 0.5;
  },
  'freeze': function(vm) {
      vm._freezeChance += 0.15;
  },
  'block': function(vm) {
      vm._blockChance += 0.2;
  },
  'barrier': function(vm) {
      vm._barrier += 8;
  },
  'berserk': function(vm) {
      vm._berserk = true;
  },
  'skillcombo': function(vm) {
      vm._skillCombo += 2;
  },
  'vision': function(vm) {
      vm._revealBonus += 1;
  },
  'combocap': function(vm) {
      vm._comboMaxAdd += 0.2;
  },
  'treasure': function(vm) {
      vm._treasureBonus += 1;
  },
  'vigor': function(vm) {
      vm._floorHeal += 8;
  },
  'ironhide': function(vm) {
      vm._bonusDef += 2;
  },
  'bloodlust': function(vm) {
      vm._bloodlust = 1;
  },
  'gale': function(vm) {
      vm._startHaste += 1;
  },
  'lootmat': function(vm) {
      vm._materialBonus += 1;
  },
  'healboost': function(vm) {
      vm._healBoost += 10;
  },
  'intimidate': function(vm) {
      vm._intimidate = true;
  },
  'resolve': function(vm) {
      vm._resolve = true;
  },
  'stun': function(vm) {
      vm._stunChance += 0.15;
  },
  'execute': function(vm) {
      vm._execute = true;
  },
  'artisan': function(vm) {
      vm._craftDiscount += 0.2;
  },
  'cdkill': function(vm) {
      vm._cdkill = 1;
  },
  'clean': function(vm) {
      vm._cleanChance += 0.25;
  },
  'opening': function(vm) {
      vm._openingStrike += 8;
  },
  'thunder': function(vm) {
      vm._thunderChance += 0.2;
  },
  'guarded': function(vm) {
      vm._shieldGainChance += 0.25;
      vm._shieldGainAmt += 4;
  },
  'critgold': function(vm) {
      vm._critGold += 5;
  },
  'comboHit': function(vm) {
      vm._comboOnHit += 0.2;
  },
  'haggle': function(vm) {
      vm._haggle += 0.15;
  },
  'potionShield': function(vm) {
      vm._potionShield += 8;
  },
  'potionCombo': function(vm) {
      vm._potionCombo += 2;
  },
  'critCombo': function(vm) {
      vm._critCombo += 1;
  },
  'soulKill': function(vm) {
      vm._soulOnKillChance += 0.2;
  },
  'stairvision': function(vm) {
      vm._stairVision = true;
  },
  'startCombo': function(vm) {
      vm._startCombo += 2;
  },
  'comboHeal': function(vm) {
      vm._comboHeal += 4;
  },
  'levelShield': function(vm) {
      vm._levelShield += 10;
  },
  'warcry': function(vm) {
      vm._warcry += 3;
  },
  'startShield': function(vm) {
      vm._startShield += 10;
  },
  'fullvision': function(vm) {
      vm._fullVision = true;
  },
  'forgeMaster': function(vm) {
      vm._forgeBonus += 1;
  },
  'critMaster': function(vm) {
      vm.critMult += 0.3;
  },
  'lifesteal2': function(vm) {
      vm.lifesteal += 2;
  },
  'cd2': function(vm) {
      vm.skillCdMax = Math.max(1, vm.skillCdMax - 0.3);
  },
  'goldMaster': function(vm) {
      vm.goldMul += 0.15;
  },
  'expMaster': function(vm) {
      vm.expMul += 0.15;
  },
  'luck': function(vm) {
      vm._luck += 1;
  },
  'shieldReflect': function(vm) {
      vm._shieldReflect += 0.5;
  },
  'revive': function(vm) {
      vm._revive = true;
  },
  'comboPower': function(vm) {
      vm._comboPerStack += 0.01;
  },
  'keenEye': function(vm) {
      vm.critChance += 0.05;
  },
  'dodge2': function(vm) {
      vm.dodge += 3;
  },
  'thorns2': function(vm) {
      vm._thorns += 3;
  },
  'shieldgain2': function(vm) {
      vm._shieldGainAmt += 4;
  },
  'burn2': function(vm) {
      vm.burnChance += 0.05;
  },
  'thunder2': function(vm) {
      vm._thunderChance += 0.2;
  },
  'freeze2': function(vm) {
      vm._freezeChance += 0.15;
  },
  'stun2': function(vm) {
      vm._stunChance += 0.15;
  },
  'block2': function(vm) {
      vm._blockChance += 0.2;
  },
  'clean2': function(vm) {
      vm._cleanChance += 0.25;
  },
  'healboost2': function(vm) {
      vm._healBoost += 10;
  },
  'material2': function(vm) {
      vm._materialBonus += 1;
  },
  'skillpower2': function(vm) {
      vm._skillPowerAdd += 0.5;
  },
  'omni2': function(vm) {
      vm.baseAtk += 1;
      vm.atk = vm.baseAtk + vm.weaponAtk;
      vm.maxHp += 5;
      vm.goldMul += 0.02;
      vm.expMul += 0.02;
  },
  'levelhp': function(vm) {
      vm._levelHp += 5;
  },
  'hppct': function(vm) {
      var gain = Math.round(vm.maxHp * 0.1);
      vm.maxHp += gain;
      vm.hp = Math.min(vm.maxHp, vm.hp + gain);
  }
};

// 天赋效果表：stat -> 应用函数
export var TALENT_EFFECTS = {
  atk: function(vm, v) { vm.baseAtk += v; vm.atk = vm.baseAtk + vm.weaponAtk; },
  hp: function(vm, v) { vm.maxHp += v; },
  goldMul: function(vm, v) { vm.goldMul += v; },
  expMul: function(vm, v) { vm.expMul += v; },
  lifesteal: function(vm, v) { vm.lifesteal += v; },
  burnChance: function(vm, v) { vm.burnChance += v; },
  shield: function(vm, v) { vm._shield += v; },
  haste: function(vm, v) { vm._hasteCharges += v; },
  combo: function(vm, v) { vm._comboMaxAdd += v; },
  floorHeal: function(vm, v) { vm._floorHeal += v; },
  dodge: function(vm, v) { vm.dodge += v; },
  critChance: function(vm, v) { vm.critChance += v; },
  freezeChance: function(vm, v) { vm._freezeChance += v; },
  stunChance: function(vm, v) { vm._stunChance += v; },
  thunderChance: function(vm, v) { vm._thunderChance += v; },
  blockChance: function(vm, v) { vm._blockChance += v; },
  thorns: function(vm, v) { vm._thorns += v; },
  healBoost: function(vm, v) { vm._healBoost += v; },
  skillPowerAdd: function(vm, v) { vm._skillPowerAdd += v; },
  cdkill: function(vm, v) { vm._cdkill += v; },
  bloodlust: function(vm, v) { vm._bloodlust += v; },
  goldSteal: function(vm, v) { vm._goldSteal += v; },
  materialBonus: function(vm, v) { vm._materialBonus += v; },
  openingStrike: function(vm, v) { vm._openingStrike += v; },
  warcry: function(vm, v) { vm._warcry += v; },
  startCombo: function(vm, v) { vm._startCombo += v; }
};

// 遗物效果表：stat -> 应用函数
export var RELIC_EFFECTS = {
  atk: function(vm, v) { vm.baseAtk += v; vm.atk = vm.baseAtk + vm.weaponAtk; },
  hp: function(vm, v) { vm.maxHp += v; },
  goldMul: function(vm, v) { vm.goldMul += v; },
  expMul: function(vm, v) { vm.expMul += v; },
  cd: function(vm, v) { vm.skillCdMax = Math.max(1, vm.skillCdMax - v); },
  shield: function(vm, v) { vm._shield += v; },
  haste: function(vm, v) { vm._hasteCharges += v; },
  combo: function(vm, v) { vm._comboMaxAdd += v; },
  critChance: function(vm, v) { vm.critChance += v; },
  floorHeal: function(vm, v) { vm._floorHeal += v; },
  thorns: function(vm, v) { vm._thorns += v; },
  goldSteal: function(vm, v) { vm._goldSteal += v; },
  blockChance: function(vm, v) { vm._blockChance += v; },
  revive: function(vm) { vm._revive = true; vm._reviveUsed = false; },
  skillPowerAdd: function(vm, v) { vm._skillPowerAdd += v; },
  killHeal: function(vm, v) { vm._killHeal += v; },
  lifesteal: function(vm, v) { vm.lifesteal += v; },
  bloodlust: function(vm, v) { vm._bloodlust += v; },
  omni: function(vm, v) { var flat = Math.round(v * 100); vm.baseAtk += flat; vm.atk = vm.baseAtk + vm.weaponAtk; vm.maxHp += flat * 5; vm.goldMul += v; vm.expMul += v; }
};
