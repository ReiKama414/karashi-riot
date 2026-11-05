# KARASHI RIOT

**English** · [繁體中文](./README.zh-TW.md)

> A **fictional Tokyo street-ramen page**: four bowls, a heat selector, and scroll motion. Nothing here is a real shop.

> **Open source:** this repository is released under the **[MIT License](./LICENSE)**. That is an explicit exception to the usual all-rights-reserved default.

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-FFD323?style=flat-square" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-F21820?style=flat-square" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-101010?style=flat-square" />
</p>

<p align="center">
  <a href="https://github.com/ReiKama414/karashi-riot">Star</a>
  ·
  <a href="https://reikama414.vercel.app/">Portfolio</a>
  ·
  <a href="#quick-start">Quick start</a>
  ·
  <a href="#license">License</a>
</p>

---

## Why

The heat should be something you pick, not a line of copy under a photo. Each bowl has its own direction: red, black, cheese, or miso.

---

## Highlights

- **Menu** — Four bowls. The selected one lifts and fills the summary bar
- **Heat** — Levels 1–5 change the bowl, the flames, the gauge, and the line of copy
- **Riot max** — Level 5 stamps MAX HEAT across the section
- **Scroll** — Headlines, cards, and the story background move with the page
- **Drawn here** — The bowls and the fire are canvas. No photo assets

---

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 · Vite |
| Motion | GSAP · ScrollTrigger |
| Draw | Canvas 2D (`ramen-bowl`, `fire-field`) |
| Type | [Dela Gothic One](https://fonts.google.com/specimen/Dela+Gothic+One) · [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New) · [Space Mono](https://fonts.google.com/specimen/Space+Mono) |

---

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |

No environment variables.

---

## Usage

| Action | What happens |
| --- | --- |
| Pick a bowl | That card is marked selected. The bar shows its name and price |
| Pick a heat level | The bowl, flames, gauge, and description follow the level |
| Level 5 | MAX HEAT appears. The button keeps shaking |
| MENU / 辛さ選択 / STORY | The page scrolls to that section, under the nav |

Defaults live in `src/data.js` as `CONFIG`: featured bowl, starting heat, motion speed, and the night hero.

---

## Project structure

```
karashi-riot/
├── src/
│   ├── canvas/            # Bowl and fire-field drawing
│   ├── components/        # Nav, hero, menu, heat, story, footer
│   ├── hooks/useScrollFx.js
│   ├── data.js            # Bowls, levels, CONFIG
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── LICENSE
├── README.md
└── README.zh-TW.md
```

| Path | Role |
| --- | --- |
| `src/components/Menu.jsx` | Four bowls and the selection bar |
| `src/components/Heat.jsx` | Levels, gauge, MAX HEAT |
| `src/canvas/ramen-art.js` | Top-down bowl |
| `src/canvas/fire-field.js` | Flames, embers, chilies |
| `src/hooks/useScrollFx.js` | Scroll-linked motion |

---

## Notice

KARASHI RIOT, the address, the hours, and the prices are fiction. The page does not take orders.

---

## Third-party notices

This MIT grant covers the project source. It does not relicense the pieces below.

| Piece | Terms |
| --- | --- |
| React · React DOM · Vite | MIT |
| GSAP · ScrollTrigger | [Standard no-charge license](https://gsap.com/standard-license/) |
| Dela Gothic One · Zen Kaku Gothic New · Space Mono | Loaded from Google Fonts. Each face keeps its own license |

---

## Links

| | |
| --- | --- |
| Repository | [karashi-riot](https://github.com/ReiKama414/karashi-riot) |
| Author | [ReiKama414](https://github.com/ReiKama414) |
| Portfolio | [Personal site](https://reikama414.vercel.app/) |
| Full license text | [LICENSE](./LICENSE) |

---

## License

**MIT.** This repository is open source on purpose. Other projects by the same author stay all rights reserved unless they say otherwise.

Copyright (c) 2026 ReiKama414

You may use, copy, modify, and distribute this project under the [MIT License](./LICENSE). Keep the copyright notice and this permission notice with any copy.

- [GitHub](https://github.com/ReiKama414/karashi-riot)
- [Portfolio](https://reikama414.vercel.app/)
- [Full license text](./LICENSE)

---

<sub>KARASHI RIOT · ReiKama414 · MIT</sub>
