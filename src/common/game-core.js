// 纯计算逻辑模块（不依赖组件状态，便于复用与测试）

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
  var scale = 1 + floor * (endless ? 0.09 : 0.06);
  return {
    name: base.name,
    hp: Math.round(base.hp * scale * mul.hp * ae.hp),
    atk: Math.round((base.atk + floor * 0.4) * mul.atk * ae.atk),
    gold: Math.round((base.gold + floor * 2) * mul.gold * ae.gold),
    exp: Math.round((base.exp + floor * 3) * mul.exp * ae.exp)
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

export function rollWeapon(weapons, qualities, affixes) {
  var base = weapons[Math.floor(Math.random() * weapons.length)];
  var q = qualities[Math.floor(Math.random() * qualities.length)];
  var affix = affixes[Math.floor(Math.random() * affixes.length)];
  var atk = Math.round(base.atk * q.mult) + affix.atk;
  return { name: q.name + '·' + base.name + '(' + affix.name + ')', atk: atk, q: q };
}

export function rollArmor(armors, qualities, affixes) {
  var base = armors[Math.floor(Math.random() * armors.length)];
  var q = qualities[Math.floor(Math.random() * qualities.length)];
  var affix = affixes[Math.floor(Math.random() * affixes.length)];
  var def = Math.round(base.def * q.mult) + affix.def;
  var dodge = Math.round(q.mult * 3);
  return { name: q.name + '·' + base.name + '(' + affix.name + ')', def: def, dodge: dodge, q: q };
}
