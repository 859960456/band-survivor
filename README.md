# 肉鸽生存（小米手环 10 快应用）

一个基于 QuickApp / Vela 的轻量肉鸽生存游戏原型，风格参考《吸血鬼幸存者》。

- 目标平台：小米手环 10（Vela OS 快应用）
- 屏幕适配：212×520，DPR 2.0，`designWidth: 212`

## 当前玩法

- 启动后点击“开始游戏”
- 手指按住屏幕并拖动：虚拟摇杆控制角色移动
- 角色会自动向最近的怪物射击
- 击杀怪物获得经验，升级时三选一强化
- 撑得越久越好，死亡后显示纪录

## 目录

```
band-survivor/
├─ package.json
├─ src/
│  ├─ app.ux
│  ├─ manifest.json
│  ├─ common/icon.png
│  └─ pages/index/index.ux
└─ dist/com.bandbbs.survivor.debug.0.1.0.rpk
```

## 构建

在项目根目录执行：

```bash
../ebook-src/node_modules/.bin/aiot build --enable-custom-component
```

生成的 RPK 在 `dist/` 目录。
