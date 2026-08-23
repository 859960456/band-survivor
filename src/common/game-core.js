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

export function achievementName(achievements, id) {
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].id === id) {
      return achievements[i].name;
    }
  }
  return id;
}

// 种子生长地牢生成算法
// 从起始房间向外随机方向生长，每局产生完全不同的布局
export function growDungeon(width, height, floor, roomTypeAssigner) {
  var rooms = [];

  // 起始房间在地图中央附近
  var sw = 3 + Math.floor(Math.random() * 3);
  var sh = 3 + Math.floor(Math.random() * 3);
  var sx = Math.max(2, Math.floor(width / 2) - (sw >> 1));
  var sy = Math.max(2, Math.floor(height / 2) - (sh >> 1));
  sx = Math.min(sx, width - sw - 1); sy = Math.min(sy, height - sh - 1);
  var first = { x: sx, y: sy, w: sw, h: sh, cx: 0, cy: 0, type: 'start', cleared: false, dist: 0 };
  first.cx = first.x + (first.w >> 1);
  first.cy = first.y + (first.h >> 1);
  rooms.push(first);

  // 从现有房间向外生长
  var target = 4 + Math.floor(Math.random() * 5);
  var tries = 80;
  var dirs = [[0,-1],[0,1],[-1,0],[1,0]];

  while (rooms.length < target && tries > 0) {
    tries--;
    var parent = rooms[Math.floor(Math.random() * rooms.length)];
    var dir = dirs[Math.floor(Math.random() * 4)];
    var rw = 2 + Math.floor(Math.random() * 6);
    var rhh = 2 + Math.floor(Math.random() * 6);
    var rx, ry;

    if (dir[1] === -1) {
      rx = parent.x + Math.floor(Math.random() * parent.w) - (rw >> 1);
      ry = parent.y - rhh - 1;
    } else if (dir[0] === 1) {
      rx = parent.x + parent.w + 1;
      ry = parent.y + Math.floor(Math.random() * parent.h) - (rhh >> 1);
    } else if (dir[1] === 1) {
      rx = parent.x + Math.floor(Math.random() * parent.w) - (rw >> 1);
      ry = parent.y + parent.h + 1;
    } else {
      rx = parent.x - rw - 1;
      ry = parent.y + Math.floor(Math.random() * parent.h) - (rhh >> 1);
    }
    if (rx < 1 || ry < 1 || rx + rw > width - 1 || ry + rhh > height - 1) continue;
    var ok = true;
    for (var k = 0; k < rooms.length; k++) {
      if (rx < rooms[k].x + rooms[k].w && rx + rw > rooms[k].x &&
          ry < rooms[k].y + rooms[k].h && ry + rhh > rooms[k].y) { ok = false; break; }
    }
    if (!ok) continue;
    var nr = { x: rx, y: ry, w: rw, h: rhh, cx: rx+(rw>>1), cy: ry+(rhh>>1),
               type: 'combat', cleared: false, dist: 0 };
    rooms.push(nr);
  }

  // 保底至少3个
  if (rooms.length < 3) {
    for (var fi = 0; fi < 4 && rooms.length < 3; fi++) {
      var fd = dirs[fi];
      var fx = rooms[0].cx + fd[0] * (rooms[0].w + 2);
      var fy = rooms[0].cy + fd[1] * (rooms[0].h + 2);
      fx = Math.max(1, Math.min(fx, width - 4)); fy = Math.max(1, Math.min(fy, height - 4));
      var fok = true;
      for (var fk = 0; fk < rooms.length; fk++) {
        if (fx < rooms[fk].x + rooms[fk].w && fx + 3 > rooms[fk].x && fy < rooms[fk].y + rooms[fk].h && fy + 3 > rooms[fk].y) { fok = false; break; }
      }
      if (fok) {
        var nr2 = { x: fx, y: fy, w: 3, h: 3, cx: fx+1, cy: fy+1,
                    type: 'combat', cleared: false, dist: 0 };
        rooms.push(nr2);
      }
    }
  }

  // 计算距离并分配房间类型
  for (var i = 0; i < rooms.length; i++) {
    rooms[i].dist = Math.sqrt((rooms[i].cx-rooms[0].cx)*(rooms[i].cx-rooms[0].cx)+(rooms[i].cy-rooms[0].cy)*(rooms[i].cy-rooms[0].cy));
  }
  var sorted = rooms.slice().sort(function(a,b){return a.dist-b.dist;});
  sorted[0].type = 'start';
  var farthest = sorted[sorted.length-1];
  if (roomTypeAssigner) roomTypeAssigner(farthest, sorted);

  return rooms;
}


