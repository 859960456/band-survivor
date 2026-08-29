# 暗渊行者 · 详细实施计划（v0.1）

> 状态：详细计划草案。**不实现，仅规划**。
> 对应总览：`docs/FEATURE_PLAN.md`。
> 铁律：每批改动前仍需单独确认。

---

## 0. 总体原则

- 所有新内容先进 `src/common/game-data.js` 数据表。
- 效果逻辑集中在 `game-core.js`（纯函数）与 `index.ux` 的少量 apply 函数中，避免 index.ux 无限膨胀。
- 每次改动保持可独立真机验证，分批提交。
- 热梗元素以“命名/文案/成就/事件”为主，不牺牲可读性与 UI 稳定性。

---

## 1. 数据驱动重构（P0 前置）

### 1.1 目标
把散落在 `index.ux` 里的效果映射表移入独立模块，让“加一个升级项/天赋/遗物”不再改主文件。

### 1.2 具体改动
| 文件 | 改动 |
|---|---|
| `src/common/game-core.js` | 新增 `export const UPGRADE_EFFECTS = { ... }`（把 index.ux 现有 87 项表整体搬入） |
| `src/common/game-core.js` | 新增 `export const TALENT_EFFECTS = { ... }`、`export const RELIC_EFFECTS = { ... }`，分别从 index.ux 的 `_applyTalent` / `_gainRelic` 提炼 |
| `src/pages/index/index.ux` | 删除本地 `UPGRADE_EFFECTS` 定义，改为 `import { UPGRADE_EFFECTS, TALENT_EFFECTS, RELIC_EFFECTS }` |
| `src/pages/index/index.ux` | `chooseUpgrade` / `buyTalent` / `_gainRelic` 改为查表调用 |
| `src/common/game-data.js` | 为所有 id 与效果表建立对照校验脚本（文档记录，不一定要进仓库） |

### 1.3 验收
- `node --check` 全部通过。
- `npm run build` 成功。
- 升级/天赋/遗物行为与重构前一致（抽样 20 项对比）。

---

## 2. 内容扩展：武器（P0）

### 2.1 新增 20 把
| 名称 | 攻击 | 类型 | 热梗/说明 |
|---|---|---|---|
| 毒鸡汤 | 8 | 法杖 | 攻击附带中毒率 +3% |
| 摸鱼铲 | 12 | 锤 | 经验 +5% |
| 卷王键盘 | 16 | 拳 | 连击上限 +0.1 |
| 躺平枕头 | 10 | 伞 | 格挡率 +5% |
| 老板画的饼 | 14 | 锤 | 金币 +10% |
| 黄金精神之剑 | 20 | 剑 | 暴击 +2% |
| 韭菜盒子 | 13 | 刀 | 吸血 +1 |
| 芜湖起飞器 | 22 | 法杖 | 技能伤害 +0.3 |
| 六六六 | 18 | 拳 | 连击 +2 |
| 栓Q | 15 | 剑 | 攻击附带眩晕 |
| 绝绝子 | 17 | 刀 | 暴击伤害 +20% |
| 我不李姐 | 19 | 法杖 | 格挡 +15% |
| 破防锤 | 21 | 锤 | 无视 20% 防御 |
| 绷不住了 | 6 | 伞 | 低攻高回复：每击回血 2 |
| 退退退 | 11 | 剑 | 闪避 +5% |
| 拿来吧你 | 23 | 刀 | 金币 +15% |
| 奥利给巨剑 | 25 | 剑 | 暴击 +5% |
| 皮皮虾我们走 | 24 | 锤 | 移动速度 +1 |
| 好家伙 | 20 | 法杖 | 技能 CD -0.2s |
| 有无搞错 | 26 | 拳 | 连击上限 +0.2 |

### 2.2 实现方式
- `WEAPONS` 数组增加 8 项（`name/atk`），并在 `game-data.js` 顶部注释标注“新武器效果通过品质/词缀或后续武器类型系统承载”。
- 现有 `rollWeapon` 自动生效，无需改逻辑。
- 若需要“武器自带附加效果”，新增 `bonus` 字段，并在 `_equipRolled` / `_pickItem` 装备时合并到玩家属性。

### 2.3 验收
- 商店/掉落能刷出新武器。
- 装备后攻击正确。

---

## 3. 内容扩展：防具（P0）

### 3.1 新增 20 件
| 名称 | 防御 | 附加 |
|---|---|---|
| 社畜工牌 | 5 | 金币 +5% |
| 摆烂睡袋 | 8 | 每层回血 +4 |
| 防卷铠甲 | 11 | 格挡 +10% |
| 老板的饼盾 | 9 | 护盾 +10 |
| 锦鲤马甲 | 13 | 暴击 +3% |
| 祖安护符 | 12 | 反伤 +2 |
| 韭菜根甲 | 15 | 吸血 +1 |
| 欧皇背心 | 18 | 闪避 +3% |
| 鸽子毛披风 | 6 | 闪避 +5%，经验 +3% |
| 杠精反甲 | 14 | 反伤 +4 |
| 划水救生衣 | 10 | 每层回血 +5 |
| 内卷头盔 | 16 | 攻击 +2 |
| 躺平拖鞋 | 7 | 生命 +15 |
| 摸鱼眼镜 | 12 | 经验 +5% |
| 锦鲤之鳞 | 17 | 暴击 +5% |
| 韭菜护腿 | 14 | 金币 +8% |
| 键盘护腕 | 15 | 连击 +1 |
| 老板的皮座椅 | 19 | 减伤 +3 |
| 欧皇光环 | 20 | 全属性 +1 |
| 女娲补天披风 | 22 | 死亡重生一次 25% 血 |

### 3.2 实现
- `ARMORS` 增加 8 项。
- 现有 `rollArmor` 自动生效。
- 如需附加效果，同武器方案：加 `bonus` 字段并在装备时应用。

---

## 4. 内容扩展：天赋（P0）

### 4.1 新增 25 项
| id | 名称 | 描述 | stat | value |
|---|---|---|---|---|
| t_meow | 摸鱼 | 每层回复 2 生命 | floorHeal | 2 |
| t_juan | 内卷 | 攻击 +2 | atk | 2 |
| t_tangping | 躺平 | 生命 +20 | hp | 20 |
| t_rich | 氪金 | 金币获取 +8% | goldMul | 0.08 |
| t_exp2 | 卷王 | 经验获取 +8% | expMul | 0.08 |
| t_dodge2 | 欧皇 | 闪避 +3% | dodge | 3 |
| t_crit2 | 锦鲤 | 暴击 +3% | critChance | 0.03 |
| t_shield2 | 乌龟壳 | 开局护盾 +10 | shield | 10 |
| t_lifesteal2 | 吸血鬼 | 吸血 +1 | lifesteal | 1 |
| t_combo2 | 连击王 | 连击上限 +0.1 | combo | 0.1 |
| t_burn2 | 火娃 | 点燃几率 +5% | burnChance | 0.05 |
| t_freeze2 | 冰娃 | 冰冻几率 +5% | freezeChance | 0.05 |
| t_stun | 电娃 | 眩晕几率 +5% | stunChance | 0.05 |
| t_thunder | 雷公 | 雷击几率 +5% | thunderChance | 0.05 |
| t_block2 | 铁壁 | 格挡 +10% | blockChance | 0.1 |
| t_thorns2 | 刺猬 | 反伤 +2 | thorns | 2 |
| t_healboost | 奶妈 | 药水回复 +10 | healBoost | 10 |
| t_skillpower | 学霸 | 技能伤害 +0.3 | skillPowerAdd | 0.3 |
| t_cdkill | 杀手 | 击杀后冷却 -1 | cdkill | 1 |
| t_bloodlust | 狂战士 | 每击杀攻击 +1 | bloodlust | 1 |
| t_goldsteal | 扒手 | 击杀额外 +3 金币 | goldSteal | 3 |
| t_material | 拾荒者 | 材料掉落 +1 | materialBonus | 1 |
| t_opening | 先手 | 战斗开始先手 8 伤害 | openingStrike | 8 |
| t_warcry | 战吼 | 战斗开始攻击 +2 | warcry | 2 |
| t_startcombo | 起手式 | 战斗开始 +2 连击 | startCombo | 2 |

### 4.2 实现
- `TALENTS` 增加 10 项。
- `_applyTalent` 现有分支已支持 `atk/hp/goldMul/expMul/lifesteal/burnChance/shield/haste/combo`，新增的 `floorHeal/dodge/critChance` 需要补分支。
- 注意：`floorHeal` 对应 `_floorHeal`，`dodge` 直接 `this.dodge += value`，`critChance` 直接 `this.critChance += value`。

---

## 5. 内容扩展：遗物（P0）

### 5.1 新增 16 个
| id | 名称 | 描述 | stat | value |
|---|---|---|---|---|
| leek | 韭菜盒子 | 攻击 +2 | atk | 2 |
| koi | 锦鲤 | 暴击 +3% | critChance | 0.03 |
| african | 非洲酋长面具 | 金币 +10%，闪避 -2% | goldMul | 0.1 |
| pigeon | 鸽子蛋 | 每层回复 3 生命 | floorHeal | 3 |
| zuan | 祖安之魂 | 反伤 +3 | thorns | 3 |
| lott | 彩票 | 击杀概率 +5 金币 | goldSteal | 5 |
| shield2 | 反甲 | 格挡 +15% | blockChance | 0.15 |
| revive | 复活币 | 死亡重生一次 20% 血 | revive | 1 |
| wuhu | 芜湖火箭 | 技能伤害 +0.5 | skillPowerAdd | 0.5 |
| six | 六六大顺 | 连击上限 +0.2 | combo | 0.2 |
| yyds | 永远滴神 | 全属性 +2% | omni | 0.02 |
| bbq | 芭比Q | 击杀爆炸：范围伤害 5 | killHeal | 5 |
| shrek | 栓Q | 吸血 +2 | lifesteal | 2 |
| juan | 卷王戒指 | 每层攻击 +1 | bloodlust | 1 |
| tangping | 躺平护身符 | 每层回复 5 生命 | floorHeal | 5 |
| coder | 码农护腕 | 冷却 -0.3s | cd | 0.3 |

### 5.2 实现
- `RELICS` 增加 8 项。
- `_gainRelic` 现有分支需补 `critChance / floorHeal / thorns / goldSteal / blockChance / revive`。
- 注意负面遗物（非洲酋长面具）：`value` 只支持单向，若要做双效果需扩展数据结构（`stats: [{stat,value},...]`）。

---

## 6. 内容扩展：怪物（P0）

### 6.1 新增 20 只
| id | 名称 | HP | 攻 | 金币 | 经验 | 备注 |
|---|---|---|---|---|---|---|
| juan_wang | 卷王 | 42 | 10 | 10 | 22 | 攻击时概率连击 |
| gezi | 鸽子精 | 36 | 8 | 12 | 20 | 有概率跳过回合 |
| gangjing | 杠精 | 44 | 11 | 11 | 24 | 反弹 2 伤害 |
| mofayu | 摸鱼怪 | 30 | 6 | 6 | 14 | 低攻击，高金币 |
| jianpanxia | 键盘侠 | 50 | 13 | 14 | 30 | 远程攻击 |
| 00hou | 00后整顿者 | 58 | 15 | 18 | 36 | 精英向 |
| shangdi | 上帝之手 | 66 | 17 | 22 | 42 | BOSS 级 |
| xi_guazi | 吃瓜群众 | 34 | 7 | 9 | 18 | 围观，低威胁 |
| pengci | 碰瓷怪 | 40 | 9 | 15 | 26 | 反伤 3 |
| laoban | 老板 | 70 | 16 | 25 | 45 | 精英，画饼 |
| tuhao | 土豪 | 60 | 14 | 30 | 35 | 金币多，较弱 |
| shui_jun | 水军 | 38 | 8 | 8 | 16 | 群体攻击（连击低） |
| zhuanqian | 赚钱机器 | 48 | 12 | 20 | 28 | 偷金币 |
| yuzhou | 营销号 | 52 | 13 | 18 | 32 | 复制能力 |
| kuaizi | 筷子精 | 34 | 6 | 5 | 12 | 低威胁，双倍掉率 |
| bing_xiang | 冰箱精 | 62 | 16 | 20 | 40 | 冰冻攻击 |
| dianshi | 电视精 | 54 | 14 | 16 | 34 | 眩晕攻击 |
| zhihu | 知乎大神 | 56 | 15 | 22 | 38 | 知识就是力量 |
| xiaohongshu | 小红书精 | 64 | 17 | 24 | 44 | 种草：回复血量 |
| douyin | 抖音精 | 68 | 18 | 28 | 48 | 刷屏：连击 |

### 6.2 实现
- `MONSTERS` 增加 10 项。
- 在对应 `AREA.monsters` 中引用新怪。
- 如需新技能/行为（连击、跳过回合、远程），需在 `_monsterAttack` 增加 id 分支。

---

## 7. 内容扩展：区域（P0）

### 7.1 新增 3 个区域
| id | 名称 | 怪物 | boss | effect |
|---|---|---|---|---|
| cyber | 赛博都市 | 键盘侠、卷王、摸鱼怪、水军、营销号 | 老板 | hp 1.35 / atk 1.25 / gold 1.5 / exp 1.5 |
| watermelon | 西瓜宇宙 | 吃瓜群众、摸鱼怪、鸽子精、00后整顿者、碰瓷怪 | 上帝之手 | hp 1.45 / atk 1.35 / gold 1.6 / exp 1.6 |
| internet | 互联网深渊 | 知乎大神、小红书精、抖音精、土豪、赚钱机器、筷子精 | 冰箱精 | hp 1.5 / atk 1.4 / gold 1.7 / exp 1.7 |

### 7.2 实现
- `AREAS` 增加 2 项，`AREA_LORE` 增加对应 intro/boss 文案。

---

## 8. 内容扩展：成就（P0）

### 8.1 新增 15 项
| id | 名称 | 描述 |
|---|---|---|
| meme_666 | 六六大顺 | 连击达到 66 |
| meme_ou | 欧皇附体 | 一次赌博开出传说品质 |
| meme_fei | 非酋本酋 | 连续 10 次赌博未出货 |
| meme_pigeon | 鸽子王 | 累计鸽掉 3 次事件 |
| meme_tangping | 躺平大师 | 休息 10 次 |
| meme_juan | 卷王之王 | 一局内击杀 30 只怪 |
| meme_meow | 摸鱼达人 | 连续 3 回合不杀怪 |
| meme_6 | 溜了溜了 | 一局移动 100 步 |
| meme_rich | 富可敌国 | 持有 1000 金币 |
| meme_poor | 一贫如洗 | 金币为 0 时通关 |
| meme_gezi | 鸽子精 | 累计跳过 5 次事件 |
| meme_bbq | 芭比Q | 一局内被击杀 3 次 |
| meme_wuhu | 芜湖起飞 | 一局内连续 5 次升级 |
| meme_leek | 韭菜 | 累计被偷金币 10 次 |
| meme_dog | 单走一个6 | 连击达到 6 |

### 8.2 实现
- `ACHIEVEMENTS` 增加 5 项。
- `_checkAchievements` 增加对应判断（需要额外计数器：`_gambleCount`、`_gambleMissCount`、`_skipEventCount`、`_restCount`）。

---

## 9. 新系统：主动技能槽 + 技能书（P1）

### 9.1 设计
- 玩家拥有 1 个主动技能槽，初始为职业基础技能。
- 可装备第二技能（2 槽），通过技能书解锁。
- 技能书作为物品掉落/商店购买，使用后替换当前技能。

### 9.2 数据结构
```js
// game-data.js
export const SKILLS = [
  { id:'omg_slash', name:'奥利给斩', type:'burst', mult:3.0, cd:3, desc:'对单体造成 3 倍伤害' },
  { id:'wuhu', name:'芜湖起飞', type:'dash', mult:1.5, cd:4, desc:'穿透攻击，无视 30% 防御' },
  { id:'bbq', name:'芭比Q', type:'aoe', mult:1.8, cd:5, desc:'对全场敌人造成 1.8 倍伤害' },
  { id:'liuliu', name:'六六六连击', type:'combo', mult:1.0, cd:4, desc:'连击 +6，随后普攻' },
  { id:'wobuli', name:'我不李姐盾', type:'shield', mult:0, cd:5, desc:'获得护盾并嘲讽' }
]
```

### 9.3 实现
- `index.ux` 增加 `skill1Id` / `skill2Id` 字段。
- `doSkill` 改为读取当前技能配置。
- 战斗 UI 增加第二技能按钮（若装备）。
- 存档 `serializeRun` 增加技能 id。

---

## 10. 新系统：附魔 / 宝石（P1）

### 10.1 附魔
- 消耗材料 + 金币，给当前武器/防具附加 1 条随机词条。
- 词条池：攻击、暴击、吸血、金币、经验、反伤、格挡、闪避。
- 每次附魔覆盖旧词条（防无限堆叠）。

### 10.2 宝石
- 武器/防具各 1 孔。
- 宝石类型：红=攻击+2、蓝=生命+10、绿=闪避+2%、黄=金币+5%、钻=全能+1。
- 宝石通过事件/商店/掉落获得。

### 10.3 数据结构
```js
// game-data.js
export const GEMS = [
  { id:'ruby', name:'红宝石', stat:'atk', value:2 },
  { id:'sapphire', name:'蓝宝石', stat:'hp', value:10 },
  { id:'emerald', name:'绿宝石', stat:'dodge', value:2 },
  { id:'gold_gem', name:'黄宝石', stat:'goldMul', value:0.05 },
  { id:'diamond', name:'钻石', stat:'omni', value:1 }
]
```

---

## 11. 新系统：召唤（P1）

### 11.1 设计
- 召唤物作为战斗中的“第三格”：玩家召唤后每回合替玩家承担一次伤害或造成一次攻击。
- 一场战斗最多 1 个召唤物，继承玩家 50% 攻击/生命。

### 11.2 数据
```js
export const SUMMONS = [
  { id:'slime', name:'史莱姆', atkRatio:0.5, hpRatio:0.5 },
  { id:'shadow', name:'影分身', atkRatio:0.8, hpRatio:0.3 },
  { id:'fire_el', name:'火元素', atkRatio:0.7, hpRatio:0.4 }
]
```

---

## 12. 新系统：状态/元素反应（P1）

### 12.1 新增状态
- 感电：受击时概率额外伤害
- 诅咒：降低怪物攻击
- 流血：每回合掉血
- 恐惧：怪物跳过回合

### 12.2 反应
- 火+毒 = 爆炸（额外伤害）
- 冰+电 = 麻痹（跳过回合）
- 简化实现：在 `_playerAction` 与 `_monsterAttack` 增加状态计数与触发判断。

---

## 13. 平衡数值（P3）

### 13.1 统一公式
- 把 `computeMonsterStats`、`_playerAction` 伤害、`_monsterAttack` 伤害全部抽到 `game-core.js`。
- 公式参数集中在 `game-data.js` 的 `BALANCE` 对象：
```js
export const BALANCE = {
  monsterHpScale: 0.06,
  monsterAtkScale: 0.4,
  monsterGoldScale: 2,
  monsterExpScale: 3,
  playerDmgVariance: [0.9, 1.1],
  critBase: 2,
  comboBase: 0.03,
  ngPlusScale: 0.3
}
```

### 13.2 难度曲线
- 普通难度目标：12~15 层通关一局。
- 无尽模式：每层怪物成长 0.09，但玩家装备成长按 0.12 匹配。

### 13.3 经济
- 商店价格 = 基础价 × (1 + 层数×0.02)。
- 材料掉落：普通怪 1~2，精英 +3，BOSS +5。
- 灵魂产出：每日 8 + 周常 30 + 成就 5/个。

---

## 14. 热梗/趣味整合（贯穿 P0~P2）

### 14.1 命名池
奥利给、芜湖起飞、yyds、栓Q、芭比Q、6、我不李姐、绝绝子、躺平、内卷、摸鱼、鸽了、破防、绷不住了、退退退、这是另外的价钱、拿来吧你。

### 14.2 应用位置
- 武器/防具/怪物/遗物/天赋命名。
- 击杀/拾取/升级/死亡随机文案（`KILL_FLAVORS`、`PICK_FLAVORS` 扩展）。
- 事件选项。
- 成就名称/描述。
- 新增“结算梗统计”。

---

## 15. 任务拆分与依赖

| 任务 | 依赖 | 预计改动文件 |
|---|---|---|
| 1. 数据驱动重构 | 无 | game-core.js, index.ux |
| 2. 武器/防具数据 | 1（可选） | game-data.js |
| 3. 天赋/遗物数据 + 效果分支 | 1 | game-data.js, index.ux |
| 4. 怪物/区域/成就数据 | 2/3 | game-data.js, index.ux |
| 5. 主动技能槽 | 1 | game-data.js, index.ux, game-save.js |
| 6. 附魔/宝石 | 5 | game-data.js, index.ux, game-save.js |
| 7. 召唤 | 5 | game-data.js, index.ux |
| 8. 状态/元素 | 5 | game-core.js, index.ux |
| 9. 平衡重标定 | 全部 | game-core.js, game-data.js |

---

## 16. 风险与约束
- 手环 UI 尺寸：技能按钮、宝石孔等新界面需保持 212px 内可点。
- 数据量增加可能影响 `index.ux` 编译体积：优先把逻辑移出。
- 热梗文案需避免敏感/过时梗，采用通用网络梗。
- 每次新系统需真机回归，避免滚动/点击失效（参考第四轮修复）。

---

## 17. 待确认（最终开工前）
1. 是否按“数据驱动重构 → 武器/防具 → 天赋/遗物 → 怪物/区域/成就 → 新系统”
2. 新职业（召唤师/赌徒）放第几批？
3. 热梗尺度确认。
4. 附魔/宝石/召唤这些系统是否要一次性全做，还是先做 1~2 个看效果？

---

## 18. 第一批（P0）具体交付物清单

### 18.1 重构
- [ ] `UPGRADE_EFFECTS` 从 index.ux 移入 `game-core.js` 并 export。
- [ ] `TALENT_EFFECTS` / `RELIC_EFFECTS` 提炼并接入。
- [ ] index.ux 删除本地表，改为 import。

### 18.2 武器（+20）
- [ ] `game-data.js` WEAPONS 增加：毒鸡汤/摸鱼铲/卷王键盘/躺平枕头/老板画的饼/黄金精神之剑/韭菜盒子/芜湖起飞器。
- [ ] 真机验证掉落/商店可出。

### 18.3 防具（+20）
- [ ] `game-data.js` ARMORS 增加：社畜工牌/摆烂睡袋/防卷铠甲/老板的饼盾/锦鲤马甲/祖安护符/韭菜根甲/欧皇背心。
- [ ] 真机验证。

### 18.4 天赋（+25）
- [ ] `game-data.js` TALENTS 增加 10 项。
- [ ] `index.ux` `_applyTalent` 补 `floorHeal/dodge/critChance` 分支。

### 18.5 遗物（+16）
- [ ] `game-data.js` RELICS 增加 8 项。
- [ ] `index.ux` `_gainRelic` 补 `critChance/floorHeal/thorns/goldSteal/blockChance/revive` 分支。

### 18.6 怪物（+20）
- [ ] `game-data.js` MONSTERS 增加 10 只。
- [ ] 新区域引用新怪。

### 18.7 区域（+3）
- [ ] `game-data.js` AREAS / AREA_LORE 增加赛博都市、西瓜宇宙。

### 18.8 成就（+15）
- [ ] `game-data.js` ACHIEVEMENTS 增加 5 项。
- [ ] `index.ux` 增加对应计数器与 `_checkAchievements` 判断。

### 18.9 热梗文案
- [ ] `KILL_FLAVORS` / `PICK_FLAVORS` / `EVENT_FLAVORS` / `BOSS_QUOTES` 扩展 5~10 条。
