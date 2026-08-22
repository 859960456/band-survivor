// 文字肉鸽 RPG - 基础数据模块
// 后续所有新怪物/区域/升级都可以在这里扩展

export const AREAS = [
  {
    id: 'forest',
    name: '迷雾森林',
    desc: '树木遮天蔽日，远处传来低沉的咆哮声。',
    monsters: ['slime', 'wolf', 'goblin', 'mushroom', 'boar'],
    boss: 'bear_king',
    effect: { hp: 0.9, atk: 0.95, gold: 1.1, exp: 1.0 },
    effDesc: '林间走兽更脆弱，但金币更多'
  },
  {
    id: 'cave',
    name: '幽暗洞穴',
    desc: '洞壁潮湿，脚下的碎石发出细碎的声响。',
    monsters: ['bat', 'skeleton', 'goblin', 'spider'],
    boss: 'cave_guard',
    effect: { hp: 1.15, atk: 1.05, gold: 1.0, exp: 1.15 },
    effDesc: '洞穴生物更坚韧，经验更多'
  },
  {
    id: 'ruins',
    name: '古遗迹',
    desc: '残破的石柱间萦绕着古老的气息。',
    monsters: ['skeleton', 'ghost', 'orc', 'wraith'],
    boss: 'ruin_golem',
    effect: { hp: 1.1, atk: 1.15, gold: 1.2, exp: 1.2 },
    effDesc: '遗物守卫攻高防厚，奖励丰厚'
  },
  {
    id: 'abyss',
    name: '深渊入口',
    desc: '黑暗仿佛有生命，正注视着你。',
    monsters: ['ghost', 'orc', 'demon', 'imp'],
    boss: 'abyss_lord',
    effect: { hp: 1.25, atk: 1.3, gold: 1.35, exp: 1.35 },
    effDesc: '深渊之力侵蚀，敌人极强，回报极高'
  }
];

export const MONSTERS = {
  slime:      { name: '史莱姆', hp: 22, atk: 4, gold: 3,  exp: 10 },
  wolf:       { name: '野狼',   hp: 28, atk: 6, gold: 5,  exp: 14 },
  goblin:     { name: '哥布林', hp: 32, atk: 7, gold: 7,  exp: 16 },
  bat:        { name: '洞穴蝙蝠', hp: 26, atk: 5, gold: 4, exp: 12 },
  skeleton:   { name: '骷髅',   hp: 38, atk: 8, gold: 8,  exp: 20 },
  ghost:      { name: '幽灵',   hp: 34, atk: 9, gold: 9,  exp: 22 },
  orc:        { name: '兽人',   hp: 46, atk: 11, gold: 12, exp: 26 },
  demon:      { name: '恶魔',   hp: 55, atk: 14, gold: 16, exp: 32 },
  bear_king:  { name: '熊王',   hp: 80, atk: 12, gold: 40, exp: 60 },
  cave_guard: { name: '洞窟守卫', hp: 95, atk: 14, gold: 50, exp: 75 },
  ruin_golem: { name: '遗迹巨像', hp: 110, atk: 16, gold: 60, exp: 90 },
  abyss_lord: { name: '深渊领主', hp: 150, atk: 20, gold: 100, exp: 150 },
  mushroom:   { name: '毒菇怪',   hp: 24, atk: 5,  gold: 4,  exp: 12 },
  boar:       { name: '野猪',     hp: 40, atk: 9,  gold: 9,  exp: 22 },
  spider:     { name: '洞穴蜘蛛', hp: 34, atk: 8,  gold: 7,  exp: 19 },
  wraith:     { name: '怨灵',     hp: 42, atk: 11, gold: 11, exp: 26 },
  imp:        { name: '小恶魔',   hp: 50, atk: 13, gold: 14, exp: 30 }
};

export const UPGRADES = [
  { id: 'atk',     name: '攻击 +4',      desc: '伤害永久提高',        rarity: 'common' },
  { id: 'hp',      name: '生命 +25',     desc: '上限提升并回复',      rarity: 'common' },
  { id: 'potion',  name: '药水 +1',      desc: '获得一瓶药水',        rarity: 'common' },
  { id: 'heal',    name: '回复 40',      desc: '立即恢复生命',        rarity: 'common' },
  { id: 'gold',    name: '金币 +15',     desc: '立即获得金币',        rarity: 'common' },
  { id: 'goldmul', name: '财运 +15%',    desc: '金币获取提高',        rarity: 'rare'   },
  { id: 'expmul',  name: '悟性 +15%',    desc: '经验获取提高',        rarity: 'rare'   },
  { id: 'crit',    name: '暴击 +8%',     desc: '攻击有几率暴击',      rarity: 'rare'   },
  { id: 'critdmg', name: '暴伤 +30%',    desc: '提升暴击伤害',        rarity: 'rare'   },
  { id: 'lifesteal', name: '吸血 +2',    desc: '攻击时回复生命',      rarity: 'rare'   },
  { id: 'burn',    name: '焚灼',         desc: '攻击有几率点燃怪物',  rarity: 'rare'   },
  { id: 'cd',      name: '冷却 -0.3s',   desc: '技能冷却缩短',        rarity: 'epic'   },
  { id: 'omni',    name: '全能 +5%',     desc: '攻击+2 并小幅强化',   rarity: 'epic'   }
];

export const RARITY_COLOR = {
  common: '#c8c8d0',
  rare: '#7aa2ff',
  epic: '#ffd75e'
};

export const BASE_PLAYER = {
  hp: 100,
  maxHp: 100,
  atk: 10,
  level: 1,
  exp: 0,
  expNext: 20,
  gold: 0,
  potions: 2
};

export const SKILL_CD = 3;
export const HEAL_AMOUNT = 30;

export const WEAPONS = [
  { name: '铁短剑', atk: 3 },
  { name: '猎刀', atk: 4 },
  { name: '十字剑', atk: 6 },
  { name: '火焰之刃', atk: 9 },
  { name: '暗影法杖', atk: 12 },
  { name: '短弓', atk: 4 },
  { name: '战锤', atk: 7 },
  { name: '冰霜法杖', atk: 10 },
  { name: '圣剑', atk: 14 }
];

export const ARMORS = [
  { name: '布甲', def: 2 },
  { name: '皮甲', def: 4 },
  { name: '锁子甲', def: 7 },
  { name: '板甲', def: 10 },
  { name: '鳞甲', def: 8 },
  { name: '秘银甲', def: 12 }
];

export const SHOP_ITEMS = [
  { id: 'potion', type: 'potion', name: '药水',     desc: '回复 30 生命', price: 10 },
  { id: 'sword',  type: 'weapon', name: '铁短剑',   desc: '攻击 +3',     price: 20 },
  { id: 'knife',  type: 'weapon', name: '猎刀',     desc: '攻击 +4',     price: 35 },
  { id: 'cross',  type: 'weapon', name: '十字剑',   desc: '攻击 +6',     price: 60 },
  { id: 'flame',  type: 'weapon', name: '火焰之刃', desc: '攻击 +9',     price: 100 },
  { id: 'cloth',  type: 'armor',  name: '布甲',     desc: '防御 +2',     price: 15 },
  { id: 'leather',type: 'armor',  name: '皮甲',     desc: '防御 +4',     price: 30 },
  { id: 'chain',  type: 'armor',  name: '锁子甲',   desc: '防御 +7',     price: 55 },
  { id: 'plate',  type: 'armor',  name: '板甲',     desc: '防御 +10',    price: 90 }
];

export const QUALITIES = [
  { id: 'white',  name: '普通', color: '#c8c8d0', mult: 1.0 },
  { id: 'green',  name: '精良', color: '#5fd068', mult: 1.18 },
  { id: 'blue',   name: '稀有', color: '#5a9cf8', mult: 1.4 },
  { id: 'purple', name: '史诗', color: '#b46ef5', mult: 1.7 }
];

export const WEAPON_AFFIXES = [
  { name: '锋锐', atk: 2 },
  { name: '破甲', atk: 3 },
  { name: '猎杀', atk: 5 }
];

export const ARMOR_AFFIXES = [
  { name: '坚韧', def: 2 },
  { name: '厚重', def: 3 },
  { name: '庇护', def: 5 }
];

export const ACHIEVEMENTS = [
  { id: 'first_kill',   name: '初次击杀',   desc: '击杀第 1 个怪物' },
  { id: 'floor_5',      name: '深入五层',   desc: '到达第 5 层' },
  { id: 'floor_10',     name: '深渊十层',   desc: '到达第 10 层' },
  { id: 'level_10',     name: '战意昂扬',   desc: '等级达到 10' },
  { id: 'boss_slayer',  name: '屠戮首领',   desc: '击败 1 个 BOSS' },
  { id: 'rich',         name: '腰缠万贯',   desc: '持有 100 金币' },
  { id: 'potion_master',name: '药剂师',     desc: '同时持有 3 瓶药水' }
];
