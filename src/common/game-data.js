// 文字肉鸽 RPG - 基础数据模块
// 后续所有新怪物/区域/升级都可以在这里扩展

export const AREAS = [
  {
    id: 'forest',
    name: '迷雾森林',
    desc: '树木遮天蔽日，远处传来低沉的咆哮声。',
    monsters: ['slime', 'wolf', 'goblin', 'mushroom', 'boar', 'treant'],
    boss: 'bear_king',
    effect: { hp: 0.9, atk: 0.95, gold: 1.1, exp: 1.0 },
    effDesc: '林间走兽更脆弱，但金币更多'
  },
  {
    id: 'cave',
    name: '幽暗洞穴',
    desc: '洞壁潮湿，脚下的碎石发出细碎的声响。',
    monsters: ['bat', 'skeleton', 'goblin', 'spider', 'cave_rat'],
    boss: 'cave_guard',
    effect: { hp: 1.15, atk: 1.05, gold: 1.0, exp: 1.15 },
    effDesc: '洞穴生物更坚韧，经验更多'
  },
  {
    id: 'ruins',
    name: '古遗迹',
    desc: '残破的石柱间萦绕着古老的气息。',
    monsters: ['skeleton', 'ghost', 'orc', 'wraith', 'cursed_knight'],
    boss: 'ruin_golem',
    effect: { hp: 1.1, atk: 1.15, gold: 1.2, exp: 1.2 },
    effDesc: '遗物守卫攻高防厚，奖励丰厚'
  },
  {
    id: 'abyss',
    name: '深渊入口',
    desc: '黑暗仿佛有生命，正注视着你。',
    monsters: ['ghost', 'orc', 'demon', 'imp', 'void_walker'],
    boss: 'abyss_lord',
    effect: { hp: 1.25, atk: 1.3, gold: 1.35, exp: 1.35 },
    effDesc: '深渊之力侵蚀，敌人极强，回报极高'
  },
  {
    id: 'tundra',
    name: '极寒雪原',
    desc: '风雪呼啸，白骨在冰原上若隐若现。',
    monsters: ['wolf', 'skeleton', 'wraith', 'yeti', 'frost_wolf'],
    boss: 'frost_king',
    effect: { hp: 1.3, atk: 1.15, gold: 1.4, exp: 1.4 },
    effDesc: '雪原生物坚韧且凶猛，回报极高'
  },
  {
    id: 'lava',
    name: '熔岩炼狱',
    desc: '灼热空气扭曲视线，岩浆在脚下翻滚。',
    monsters: ['imp', 'demon', 'lava_golem', 'fire_imp', 'magma_spider'],
    boss: 'inferno_lord',
    effect: { hp: 1.4, atk: 1.35, gold: 1.5, exp: 1.5 },
    effDesc: '炼狱生物攻击骇人，奖励极为丰厚'
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
  imp:        { name: '小恶魔',   hp: 50, atk: 13, gold: 14, exp: 30 },
  yeti:       { name: '雪怪',     hp: 58, atk: 15, gold: 18, exp: 36 },
  ice_wolf:   { name: '冰原狼',   hp: 46, atk: 12, gold: 14, exp: 30 },
  frost_king: { name: '霜冻王',   hp: 180, atk: 24, gold: 130, exp: 200 },
  lava_golem: { name: '熔岩巨像', hp: 64, atk: 17, gold: 20, exp: 42 },
  fire_imp:   { name: '炎魔',     hp: 54, atk: 15, gold: 16, exp: 34 },
  inferno_lord: { name: '炼狱领主', hp: 210, atk: 28, gold: 160, exp: 260 },
  treant:       { name: '树人',     hp: 44, atk: 8,  gold: 8,  exp: 20 },
  cave_rat:     { name: '洞穴鼠',   hp: 30, atk: 7,  gold: 6,  exp: 16 },
  cursed_knight:{ name: '受诅骑士', hp: 52, atk: 13, gold: 14, exp: 30 },
  void_walker:  { name: '虚空行者', hp: 62, atk: 16, gold: 18, exp: 38 },
  frost_wolf:   { name: '冰原狼',   hp: 56, atk: 15, gold: 17, exp: 36 },
  magma_spider: { name: '熔岩蛛',   hp: 60, atk: 17, gold: 19, exp: 40 }
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
  { id: 'omni',    name: '全能 +5%',     desc: '攻击+2 并小幅强化',   rarity: 'epic'   },
  { id: 'shield',  name: '护盾',         desc: '获得 15 点临时护盾', rarity: 'rare'   },
  { id: 'haste',   name: '迅捷',         desc: '移动不触发怪物回合(1 次)', rarity: 'epic'   },
  { id: 'dodgeup', name: '闪避 +3%',     desc: '提高闪避几率',        rarity: 'rare'   },
  { id: 'hppct',   name: '生命 +10%',    desc: '提升最大生命',        rarity: 'epic'   },
  { id: 'materials', name: '材料 +3',     desc: '立即获得制作材料',     rarity: 'common' },
  { id: 'gold100',  name: '金币 +20',     desc: '立即获得金币',         rarity: 'common' },
  { id: 'regen',   name: '再生',         desc: '每步回复 2 生命',        rarity: 'rare'   },
  { id: 'thorns',  name: '荆棘',         desc: '受击反弹 3 伤害',        rarity: 'rare'   },
  { id: 'holy',    name: '神圣',         desc: '击杀回复 5 生命',        rarity: 'epic'   },
  { id: 'loot',    name: '敛财',         desc: '每击杀额外 +3 金币',      rarity: 'rare'   },
  { id: 'skillpower', name: '熟练',       desc: '技能伤害 +0.5 倍',        rarity: 'epic'   },
  { id: 'freeze',   name: '冰冻',         desc: '攻击有几率削弱怪物攻击', rarity: 'rare'   },
  { id: 'block',   name: '格挡',         desc: '受击有几率减半伤害',      rarity: 'rare'   },
  { id: 'barrier', name: '壁垒',         desc: '每层开始获得 8 护盾',      rarity: 'epic'   },
  { id: 'berserk', name: '狂怒',         desc: '生命越低伤害越高',        rarity: 'epic'   },
  { id: 'skillcombo', name: '连击涌',     desc: '技能额外 +2 连击',        rarity: 'rare'   },
  { id: 'vision',   name: '远见',         desc: '探索视野 +1 格',          rarity: 'rare'   },
  { id: 'combocap', name: '连环',         desc: '连击上限 +0.2',           rarity: 'rare'   },
  { id: 'treasure', name: '寻宝',         desc: '每层物品 +1',             rarity: 'rare'   },
  { id: 'vigor',   name: '活力',         desc: '每层回复 8 生命',          rarity: 'common' },
  { id: 'ironhide', name: '铁肤',         desc: '固定减伤 +2',             rarity: 'rare'   },
  { id: 'bloodlust', name: '血怒',        desc: '每击杀攻击 +1',           rarity: 'epic'   },
  { id: 'gale',    name: '疾风',         desc: '每场战斗开始 +1 迅捷',    rarity: 'rare'   },
  { id: 'lootmat', name: '掠夺',         desc: '材料掉落 +1',             rarity: 'rare'   },
  { id: 'healboost', name: '疗愈',       desc: '药水回复 +10',            rarity: 'common' },
  { id: 'intimidate', name: '威吓',      desc: '战斗开始降低敌攻 20%',    rarity: 'epic'   },
  { id: 'resolve',  name: '坚毅',       desc: '低血时复苏一次 +20',      rarity: 'epic'   },
  { id: 'stun',    name: '电击',         desc: '攻击有几率眩晕怪物',      rarity: 'rare'   },
  { id: 'execute', name: '处决',         desc: '对低血怪物伤害 +50%',     rarity: 'epic'   },
  { id: 'artisan', name: '工匠',         desc: '打造/赌博费用 -20%',      rarity: 'rare'   },
  { id: 'cdkill',  name: '杀招',         desc: '击杀后技能冷却 -1',        rarity: 'rare'   },
  { id: 'clean',   name: '净化',         desc: '几率免疫中毒伤害',        rarity: 'rare'   },
  { id: 'opening', name: '先机',         desc: '战斗开始先手 8 伤害',      rarity: 'rare'   },
  { id: 'thunder', name: '雷霆',         desc: '几率追加雷击 40% 伤害',    rarity: 'rare'   },
  { id: 'guarded', name: '守护',         desc: '受击有几率获得护盾',       rarity: 'rare'   },
  { id: 'critgold', name: '敛锋',        desc: '暴击时 +5 金币',           rarity: 'rare'   },
  { id: 'comboHit', name: '韧性',        desc: '受击有几率 +1 连击',        rarity: 'rare'   },
  { id: 'haggle',  name: '议价',         desc: '商店价格 -15%',            rarity: 'common' },
  { id: 'potionShield', name: '圣水',     desc: '使用药水获得护盾',        rarity: 'rare'   },
  { id: 'potionCombo', name: '聚气',     desc: '使用药水获得连击',        rarity: 'rare'   },
  { id: 'critCombo', name: '猎杀',     desc: '暴击时 +1 连击',           rarity: 'rare'   }
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
  { name: '圣剑', atk: 14 },
  { name: '寒冰弓', atk: 11 },
  { name: '雷神锤', atk: 16 },
  { name: '熔岩之刃', atk: 18 },
  { name: '龙牙枪', atk: 20 },
  { name: '裁决之刃', atk: 22 },
  { name: '苍穹法杖', atk: 19 }
];

export const ARMORS = [
  { name: '布甲', def: 2 },
  { name: '皮甲', def: 4 },
  { name: '锁子甲', def: 7 },
  { name: '板甲', def: 10 },
  { name: '鳞甲', def: 8 },
  { name: '秘银甲', def: 12 },
  { name: '龙骨甲', def: 14 },
  { name: '冰晶甲', def: 11 },
  { name: '熔岩甲', def: 13 },
  { name: '龙鳞甲', def: 16 },
  { name: '神谕甲', def: 18 },
  { name: '星界甲', def: 15 }
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
  { id: 'potion_master',name: '药剂师',     desc: '同时持有 3 瓶药水' },
  { id: 'kill_50',    name: '万夫莫敌',   desc: '击杀 50 个怪物' },
  { id: 'floor_15',   name: '深渊行者',   desc: '到达第 15 层' },
  { id: 'rich_500',   name: '富可敌国',   desc: '持有 500 金币' },
  { id: 'boss_5',     name: '屠龙者',     desc: '击败 5 个 BOSS' },
  { id: 'codex_master', name: '图鉴大师',   desc: '集齐所有怪物图鉴' },
  { id: 'equip_master', name: '武器收藏家', desc: '集齐所有装备图鉴' },
  { id: 'relic_master', name: '遗物收藏家', desc: '集齐所有遗物图鉴' }
];

export const RELICS = [
  { id: 'berserk',  name: '狂暴之心', desc: '攻击 +3',     stat: 'atk',      value: 3 },
  { id: 'vitality', name: '生命之泉', desc: '生命上限 +20', stat: 'hp',       value: 20 },
  { id: 'greed',    name: '贪婪之戒', desc: '金币获取 +10%', stat: 'goldMul', value: 0.1 },
  { id: 'wisdom',   name: '智慧之书', desc: '经验获取 +10%', stat: 'expMul',  value: 0.1 },
  { id: 'swift',    name: '疾风靴',   desc: '技能冷却 -0.4s', stat: 'cd',     value: 0.4 },
  { id: 'iron',     name: '铁壁',     desc: '获得 20 点护盾',   stat: 'shield', value: 20 },
  { id: 'haste',    name: '疾行者',   desc: '获得 1 迅捷次数',  stat: 'haste',  value: 1 },
  { id: 'combo',    name: '连击之心', desc: '连击上限 +0.2',    stat: 'combo',  value: 0.2 }
];

export const TALENTS = [
  { id: 't_atk',      name: '武力', desc: '攻击 +2',        stat: 'atk',        value: 2 },
  { id: 't_hp',       name: '强健', desc: '生命上限 +15',    stat: 'hp',         value: 15 },
  { id: 't_gold',     name: '敛财', desc: '金币获取 +5%',    stat: 'goldMul',    value: 0.05 },
  { id: 't_exp',      name: '求知', desc: '经验获取 +5%',    stat: 'expMul',     value: 0.05 },
  { id: 't_lifesteal',name: '嗜血', desc: '吸血 +1',         stat: 'lifesteal',  value: 1 },
  { id: 't_burn',     name: '焚心', desc: '点燃几率 +5%',    stat: 'burnChance', value: 0.05 },
  { id: 't_shield',   name: '铁躯', desc: '获得 10 点护盾',   stat: 'shield',    value: 10 },
  { id: 't_haste',    name: '轻灵', desc: '获得 1 迅捷次数',  stat: 'haste',     value: 1 },
  { id: 't_combo',    name: '连击', desc: '连击上限 +0.1',    stat: 'combo',     value: 0.1 }
];

export const CLASSES = [
  { id: 'warrior', name: '战士', desc: '高血高攻', hp: 125, atk: 12, potions: 2, dodge: 0,  crit: 0 },
  { id: 'ranger',  name: '游侠', desc: '高闪避',   hp: 95,  atk: 11, potions: 3, dodge: 6,  crit: 0 },
  { id: 'mage',    name: '法师', desc: '高暴击',   hp: 85,  atk: 13, potions: 2, dodge: 0,  crit: 0.15 }
];

export const CHALLENGE_MODS = [
  { id: 'glass', name: '玻璃大炮', desc: '攻击+30% 生命-30%', atkMul: 1.3, hpMul: 0.7 },
  { id: 'iron',  name: '铁血',     desc: '攻击+5 生命+20',     atkAdd: 5,  hpAdd: 20 },
  { id: 'greed', name: '贪婪',     desc: '金币+30% 经验-20%', goldMul: 1.3, expMul: 0.8 }
];
