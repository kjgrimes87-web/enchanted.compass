// Shared helpers for REAL-PHOTO carousels (A2 style). No illustrations allowed (PLAYBOOK rule 8).
const { chromium } = require('playwright');
const fs = require('fs');
const FS = '/home/claude/ig/design/node_modules/@fontsource/';
const b64 = (p, t) => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const font = (file, w) => `@font-face{font-family:'Fraunces';src:url(${b64(FS + 'fraunces/files/' + file, 'font/woff2')}) format('woff2');font-weight:${w}}`;
const FONTS = font('fraunces-latin-700-normal.woff2', 700) + font('fraunces-latin-900-normal.woff2', 900);
const C = { SUN: '#FFC93C', CORAL: '#FF5A3C', TEAL: '#0FA3A3', INK: '#16213A', CREAM: '#FFF7E8', AEGEAN: '#1F5FBF', PLUM: '#3A2A5C', JADE: '#127A5E' };
const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${C.INK}}
div{text-wrap:pretty}
.ph{position:absolute;left:0;right:0;background-size:cover;background-repeat:no-repeat}
.cr{position:absolute;right:20px;font:500 19px Inter;color:#fff;background:rgba(0,0,0,.55);padding:6px 12px;border-radius:999px;z-index:6}
.ctr{position:absolute;right:72px;top:60px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px;z-index:7;background:rgba(255,255,255,.94)}
.tag{position:absolute;left:72px;top:60px;font:800 26px Inter;letter-spacing:4px;padding:12px 22px;border-radius:999px;z-index:7;color:#fff}
.hd{position:absolute;left:72px;bottom:44px;font:700 28px Inter}
.sw{position:absolute;right:72px;bottom:44px;font:800 28px Inter}
.kick{font:800 26px Inter;letter-spacing:4px}
.h{font:900 72px/1.02 Fraunces;margin-top:10px}
.row{display:flex;gap:22px;align-items:flex-start}
.dot{flex:none;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 28px Fraunces}
`;
const pics = {};
const pic = f => (pics[f] ||= b64('/home/claude/ig/pics/' + f, 'image/jpeg'));
// photo block: top/h in px, pos = background-position (e.g. '50% 40%')
const photo = (f, top, h, pos, credit, extra = '') => `<div class="ph" style="top:${top}px;height:${h}px;background-image:url(${pic(f)});background-position:${pos}">${extra}</div>
  ${credit ? `<div class="cr" style="top:${top + h - 46}px${credit.startsWith('L:') ? ';right:auto;left:20px' : ''}">${credit.replace(/^L:/, '')}</div>` : ''}`;
const ctr = (i, n, fg) => `<div class="ctr" style="color:${fg}">${i}/${n}</div>`;
const items = (list, o) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? o.gap : 0}px"><div class="dot" style="background:${o.dotBg(i)};color:${o.dotFg(i)}">${o.mark(i)}</div>
  <div><div style="font:800 ${o.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${o.b}px/1.34 Inter;margin-top:4px;color:${o.sub}">${t[1]}</div>` : ''}</div></div>`).join('');
async function render(S, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of Object.entries(S)) {
    await p.setContent(`<html><head><style>${FONTS}${CSS}</style></head><body>${body}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    await p.screenshot({ path: outDir + n + '.png' });
  }
  await br.close();
}
const panel = (bg, top = 620, line = C.SUN) => `<div style="position:absolute;left:0;right:0;top:${top}px;bottom:0;background:${bg};border-top:10px solid ${line}"></div>`;
const chip = (t, bg, fg) => `<span style="display:inline-block;background:${bg};color:${fg};font:800 30px Inter;padding:10px 22px;border-radius:999px;margin-top:18px">${t}</span>`;
const head = (k, h, kc, hc, top = 665) => `<div style="position:absolute;left:72px;right:72px;top:${top}px;color:${hc}"><div class="kick" style="color:${kc}">${k}</div><div class="h">${h}</div>`;
const cover = (f, pos, credit, tag, tagBg, n, ctrFg, title, sub) => `${photo(f, 0, 1350, pos, '')}
  <div style="position:absolute;left:0;right:0;bottom:0;height:780px;background:linear-gradient(rgba(22,33,58,0),rgba(22,33,58,.9) 42%,${C.INK})"></div>
  <div class="tag" style="background:${tagBg}">${tag}</div>${ctr(1, n, ctrFg)}
  <div style="position:absolute;left:72px;right:72px;bottom:190px;color:#fff">
    <div style="font:900 100px/0.98 Fraunces;letter-spacing:-2px">${title}</div>
    <div style="font:500 34px/1.34 Inter;margin-top:22px;color:#ECE6FA">${sub}</div></div>
  <div class="cr" style="top:1228px;right:72px">${credit}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${C.SUN}">SWIPE →</div>`;
module.exports = { C, photo, ctr, items, render, panel, chip, head, cover };
