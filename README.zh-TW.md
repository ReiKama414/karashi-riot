# KARASHI RIOT

[English](./README.md) · **繁體中文**

> **虛構的東京街頭拉麵頁**：四杯、辛度選擇、捲動動態。這裡不是真的店

> **開源：** 這個倉庫採用 **[MIT License](./LICENSE)**。這是明確改為開源的例外，不是預設的保留所有權利

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-FFD323?style=flat-square" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-F21820?style=flat-square" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-101010?style=flat-square" />
</p>

<p align="center">
  <a href="https://github.com/ReiKama414/karashi-riot">Star</a>
  ·
  <a href="https://reikama414.vercel.app/">個人網站</a>
  ·
  <a href="#快速開始">快速開始</a>
  ·
  <a href="#授權">授權</a>
</p>

---

## 為什麼做

辛度要能自己選，而不是照片底下的一行字。四杯各走一個方向：紅、黑、起司、味噌

---

## 亮點

- **菜單** — 四杯。選中的那杯會抬起，摘要列跟著改
- **辛度** — 1 到 5 會改碗、火焰、量表和說明
- **暴走** — 第 5 級會在區塊上蓋出 MAX HEAT
- **捲動** — 標題、卡片、故事背景跟著頁面移動
- **現場畫** — 碗和火是 canvas，沒有照片素材

---

## 技術棧

| 層級 | 選用 |
| --- | --- |
| 介面 | React 19 · Vite |
| 動態 | GSAP · ScrollTrigger |
| 繪製 | Canvas 2D（`ramen-bowl`、`fire-field`） |
| 字體 | [Dela Gothic One](https://fonts.google.com/specimen/Dela+Gothic+One) · [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New) · [Space Mono](https://fonts.google.com/specimen/Space+Mono) |

---

## 快速開始

```bash
npm install
npm run dev
```

打開 Vite 印出的本機網址

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 開發伺服器 |
| `npm run build` | 正式建置 |
| `npm run preview` | 預覽建置結果 |

沒有環境變數

---

## 操作

| 動作 | 結果 |
| --- | --- |
| 點一杯 | 那張卡標成選取，下方列出名稱和價格 |
| 點一個辛度 | 碗、火焰、量表和說明跟著改 |
| 第 5 級 | 出現 MAX HEAT，按鈕持續震動 |
| MENU／辛さ選択／STORY | 捲到該段，停在導覽列下方 |

預設寫在 `src/data.js` 的 `CONFIG`：主打的一杯、起始辛度、動態速度、夜間首屏

---

## 專案結構

```
karashi-riot/
├── src/
│   ├── canvas/            # 拉麵碗與火焰
│   ├── components/        # 導覽、首屏、菜單、辛度、故事、頁尾
│   ├── hooks/useScrollFx.js
│   ├── data.js            # 四杯、辛度、CONFIG
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── LICENSE
├── README.md
└── README.zh-TW.md
```

| 路徑 | 角色 |
| --- | --- |
| `src/components/Menu.jsx` | 四杯與選取摘要 |
| `src/components/Heat.jsx` | 辛度、量表、MAX HEAT |
| `src/canvas/ramen-art.js` | 俯視拉麵碗 |
| `src/canvas/fire-field.js` | 火焰、火星、辣椒 |
| `src/hooks/useScrollFx.js` | 跟著捲動的動態 |

---

## 聲明

KARASHI RIOT、地址、營業時間和價格都是虛構。這個頁面不接受訂單

---

## 第三方出處

這份 MIT 只涵蓋專案原始碼，不改下面這些東西的授權

| 項目 | 條款 |
| --- | --- |
| React · React DOM · Vite | MIT |
| GSAP · ScrollTrigger | [標準免授權費條款](https://gsap.com/standard-license/) |
| Dela Gothic One · Zen Kaku Gothic New · Space Mono | 由 Google Fonts 載入，各字體維持自己的授權 |

---

## 連結

| | |
| --- | --- |
| 倉庫 | [karashi-riot](https://github.com/ReiKama414/karashi-riot) |
| 作者 | [ReiKama414](https://github.com/ReiKama414) |
| 個人網站 | [作品集](https://reikama414.vercel.app/) |
| 授權全文 | [LICENSE](./LICENSE) |

---

## 授權

**MIT。** 這個倉庫是刻意開源。同一作者的其他專案，若沒有另外寫明，仍是保留所有權利

Copyright (c) 2026 ReiKama414

可以依 [MIT License](./LICENSE) 使用、複製、修改、散布。副本請保留著作權聲明與許可聲明

- [GitHub](https://github.com/ReiKama414/karashi-riot)
- [個人網站](https://reikama414.vercel.app/)
- [授權全文](./LICENSE)

---

<sub>KARASHI RIOT · ReiKama414 · MIT</sub>
