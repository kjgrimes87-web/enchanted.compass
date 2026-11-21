// Lesser-known Christmas markets post, bright editorial style (A2)
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/xmas/';
const FS = '/home/claude/ig/design/node_modules/@fontsource/';
const b64 = (p, t) => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const font = (fam, pkg, file, w, st = 'normal') =>
  `@font-face{font-family:'${fam}';src:url(${b64(FS + pkg + '/files/' + file, 'font/woff2')}) format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS = [
  font('Fraunces', 'fraunces', 'fraunces-latin-400-normal.woff2', 400),
  font('Fraunces', 'fraunces', 'fraunces-latin-700-normal.woff2', 700),
  font('Fraunces', 'fraunces', 'fraunces-latin-900-normal.woff2', 900),
].join('');
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8', JADE = '#127A5E', PLUM = '#3A2A5C', AEGEAN = '#1F5FBF';
const N = 6;
const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
div{text-wrap:pretty}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px;z-index:5}
.hd{position:absolute;left:72px;bottom:48px;font:700 28px Inter}
.sw{position:absolute;right:72px;bottom:48px;font:800 28px Inter}
.kick{font:800 28px Inter;letter-spacing:4px}
.h{font:900 80px/1 Fraunces;margin-top:10px}
.row{display:flex;gap:24px;align-items:flex-start}
.dot{flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces}
.date{border-radius:30px;padding:30px 36px;box-shadow:0 12px 0 ${INK}}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;
const items = (list, o) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? o.gap : 0}px"><div class="dot" style="background:${o.dotBg(i)};color:${o.dotFg(i)}">${o.mark(i)}</div>
  <div><div style="font:800 ${o.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${o.b}px/1.36 Inter;margin-top:4px;color:${o.sub}">${t[1]}</div>` : ''}</div></div>`).join('');

// ---- original illustration helpers ----
let seed = 5; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const snow = (n, y0, y1, col = '#fff') => { let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${rnd() * 1080}" cy="${y0 + rnd() * (y1 - y0)}" r="${2 + rnd() * 5}" fill="${col}" opacity="${0.5 + rnd() * 0.5}"/>`; return s; };
// wooden market chalet: x = left, base = ground y, w width
const chalet = (x, base, w, wall, roof) => {
  const h = w * 0.62, rh = w * 0.42;
  return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${wall}"/>
  ${[0.25, 0.5, 0.75].map(f => `<line x1="${x}" y1="${base - h * f}" x2="${x + w}" y2="${base - h * f}" stroke="rgba(0,0,0,.18)" stroke-width="3"/>`).join('')}
  <rect x="${x + w * 0.12}" y="${base - h * 0.78}" width="${w * 0.76}" height="${h * 0.42}" rx="6" fill="#FFD77A"/>
  <rect x="${x + w * 0.12}" y="${base - h * 0.78}" width="${w * 0.76}" height="${h * 0.42}" rx="6" fill="url(#glow)"/>
  <rect x="${x + w * 0.06}" y="${base - h * 0.38}" width="${w * 0.88}" height="${h * 0.08}" fill="#5A3418"/>
  <polygon points="${x - w * 0.1},${base - h} ${x + w / 2},${base - h - rh} ${x + w * 1.1},${base - h}" fill="${roof}"/>
  <polygon points="${x - w * 0.1},${base - h} ${x + w / 2},${base - h - rh} ${x + w * 1.1},${base - h} ${x + w * 0.98},${base - h - 8} ${x + w / 2},${base - h - rh + 14} ${x + w * 0.02},${base - h - 8}" fill="#fff"/>`;
};
const tree = (x, base, h) => { let s = ''; for (let k = 0; k < 4; k++) { const top = base - h + k * h * 0.2, bot = top + h * 0.36, ww = h * 0.42 * (0.45 + k * 0.22); s += `<polygon points="${x},${top} ${x - ww / 2},${bot} ${x + ww / 2},${bot}" fill="#1E7A55"/>`; }
  const balls = [[0.32, -0.06, CORAL], [0.45, 0.1, SUN], [0.58, -0.12, '#fff'], [0.7, 0.08, CORAL], [0.82, -0.04, SUN], [0.62, 0.16, '#fff'], [0.5, -0.14, CORAL]];
  s += balls.map(b => `<circle cx="${x + b[1] * h}" cy="${base - h + b[0] * h}" r="${h * 0.022}" fill="${b[2]}"/>`).join('');
  return s + `<rect x="${x - h * 0.03}" y="${base - h * 0.2}" width="${h * 0.06}" height="${h * 0.2}" fill="#5A3418"/><polygon points="${x},${base - h - 34} ${x + 10},${base - h - 8} ${x + 34},${base - h - 6} ${x + 14},${base - h + 8} ${x + 22},${base - h + 32} ${x},${base - h + 18} ${x - 22},${base - h + 32} ${x - 14},${base - h + 8} ${x - 34},${base - h - 6} ${x - 10},${base - h - 8}" fill="${SUN}"/>`; };
// string of lights between two points with sag
const lights = (x1, y1, x2, y2, sag, n) => { const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + sag * 2; let s = `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" stroke="#2A1E3F" stroke-width="3" fill="none"/>`;
  const cols = [SUN, CORAL, '#7FE3D8', '#fff']; for (let i = 1; i < n; i++) { const t = i / n, x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2, y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2; s += `<circle cx="${x}" cy="${y + 9}" r="16" fill="${cols[i % 4]}" opacity=".25"/><circle cx="${x}" cy="${y + 9}" r="8" fill="${cols[i % 4]}"/>`; } return s; };
// small icons
const star = (x, y, r, c) => { let p = ''; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; p += `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)} `; } return `<polygon points="${p}" fill="${c}"/>`; };

const COVER = `<svg width="1080" height="1350" style="position:absolute;left:0;top:0">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B1540"/><stop offset=".6" stop-color="${PLUM}"/><stop offset="1" stop-color="#6B3E6E"/></linearGradient>
  <radialGradient id="glow"><stop offset="0" stop-color="#FFF3C4"/><stop offset="1" stop-color="#FFB347" stop-opacity=".2"/></radialGradient></defs>
  <rect width="1080" height="1350" fill="url(#sky)"/>
  ${snow(80, 0, 560)}
  <circle cx="860" cy="250" r="70" fill="#FFF1C9"/><circle cx="890" cy="232" r="64" fill="#2A1E50"/>
  ${lights(-20, 430, 520, 400, 60, 11)}${lights(520, 400, 1100, 440, 60, 11)}
  <g transform="translate(0,-150)"><path d="M0,820 Q300,760 560,800 T1080,780 L1080,1500 L0,1500Z" fill="#E9EEF8"/>
  ${tree(540, 820, 330)}
  ${chalet(60, 840, 200, '#9C5A2C', '#7A3E1C')}${chalet(800, 840, 210, '#A8642F', '#7A3E1C')}
  ${chalet(-60, 900, 170, '#B06A33', '#6E3818')}${chalet(950, 905, 170, '#93522A', '#6E3818')}
  </g>
</svg>`;

const S = {
  'x-1': `${COVER}
  <div style="position:absolute;left:72px;top:72px;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px;z-index:5">EUROPE · WINTER</div>
  ${ctr(1, 'rgba(255,255,255,.92)', PLUM)}
  <div style="position:absolute;left:0;right:0;bottom:0;height:580px;background:#1D1740;border-top:10px solid ${SUN}"></div>
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 100px/0.98 Fraunces;letter-spacing:-2px">Christmas markets <span style="color:${SUN}">beyond</span> the famous ones</div>
    <div style="font:500 36px/1.34 Inter;margin-top:24px;color:#ECE6FA">4 lovely markets most people skip, with their 2026 dates and what to know.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'x-2': `<div style="position:absolute;inset:0;background:${AEGEAN}"></div>
  <svg width="1080" height="1350" style="position:absolute;left:0;top:0"><path d="M0,1350 L0,1250 L200,1170 L330,1215 L500,1150 L660,1210 L840,1160 L1080,1240 L1080,1350Z" fill="#2E6FD0"/><path d="M0,1350 L0,1250 Q540,1200 1080,1250 L1080,1350Z" fill="#174E9E"/></svg>
  ${ctr(2, '#fff', AEGEAN)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">1 · SWITZERLAND</div><div class="h">Montreux Noël</div>
  <div style="font:500 34px/1.36 Inter;margin-top:16px;color:#E3EEFF">A Christmas market by Lake Geneva.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:390px;display:flex;justify-content:center"><div class="date" style="background:${SUN};text-align:center;width:100%">
    <div style="font:800 26px Inter;letter-spacing:3px;color:${INK}">2026 DATES</div><div style="font:900 84px/1.05 Fraunces;margin-top:6px">20 Nov – 24 Dec</div></div></div>
  <div style="position:absolute;left:72px;right:72px;top:640px;color:#fff">
  ${items([
    ['Santa flies over the town', 'A flying Santa show over Montreux. You can also visit Santa\u2019s house at the top of Rochers-de-Naye.'],
    ['Open every day', 'Craft stalls from about 10 or 11 AM until 8 to 10 PM, depending on the day. 24 Dec: until 5 PM.'],
    ['Entry: no published price', 'The Montreux Riviera Card gives free public transport.'],
  ], { gap: 40, h: 38, b: 31, sub: '#E3EEFF', mark: () => '★', dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'x-3': `<div style="position:absolute;inset:0;background:${JADE}"></div>
  ${ctr(3, '#fff', JADE)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">2 · ESTONIA</div><div class="h">Tallinn</div>
  <div style="font:500 34px/1.36 Inter;margin-top:16px;color:#DDF3EA">Town Hall Square, in the middle of a medieval old town.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:390px"><div class="date" style="background:${CREAM};text-align:center">
    <div style="font:800 26px Inter;letter-spacing:3px;color:${CORAL}">DATES</div><div style="font:900 72px/1.1 Fraunces;margin-top:6px">20 Nov 2026 –<br>6 Jan 2027</div></div></div>
  <div style="position:absolute;left:72px;right:72px;top:770px;display:flex;align-items:center;gap:36px;background:${SUN};border-radius:30px;padding:34px 40px;box-shadow:0 12px 0 ${INK}">
    <div style="flex:none;font:900 108px/0.9 Fraunces;color:${CORAL}">1441</div>
    <div style="font:500 31px/1.38 Inter">Estonia's tourism board says a Christmas tree has stood on this square since <b>1441</b>, the first in Europe.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:1090px;text-align:center;color:#fff;font:600 31px/1.4 Inter">Longest season of the four: open into January.<br>Hours and prices: not published.</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'x-4': `<div style="position:absolute;inset:0;background:${CORAL}"></div>
  <svg width="1080" height="1350" style="position:absolute;left:0;top:0"><path d="M640,0 L1080,0 L1080,360 Q960,250 860,320 Q760,390 640,300Z" fill="rgba(0,0,0,.12)"/></svg>
  ${ctr(4, '#fff', CORAL)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">3 · NETHERLANDS</div><div class="h">Valkenburg</div>
  <div style="font:500 34px/1.36 Inter;margin-top:16px;color:#FFF0EA">Christmas stalls inside underground caves.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:380px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    <div class="date" style="background:${CREAM};text-align:center;padding:30px 20px"><div style="font:800 24px Inter;letter-spacing:3px;color:${CORAL}">CHRISTMAS TOWN</div><div style="font:900 50px/1.12 Fraunces;margin-top:10px">13 Nov 2026 –<br>3 Jan 2027</div></div>
    <div class="date" style="background:${SUN};text-align:center;padding:30px 20px"><div style="font:800 24px Inter;letter-spacing:3px;color:${INK}">CAVE MARKETS</div><div style="font:900 50px/1.12 Fraunces;margin-top:10px">13 Nov –<br>30 Dec 2026</div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:700px;color:#fff">
  ${items([
    ['Two caves: Gemeentegrot and Fluweelengrot', 'Cave markets are closed on 25 December.'],
    ['Cave hours', 'Mon–Thu 11 AM–7 PM · Fri 12–8 PM · Sat–Sun 10 AM–7 PM'],
    ['Paid entry, book online', 'No published price. Weekends are very busy, so try a weekday.'],
  ], { gap: 40, h: 38, b: 31, sub: '#FFF0EA', mark: i => i + 1, dotBg: () => INK, dotFg: () => '#fff' })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${INK}">SWIPE →</div>`,

  'x-5': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  ${ctr(5, '#fff', TEAL)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">4 · FRANCE (ALSACE)</div><div class="h">Kaysersberg</div>
  <div style="font:500 34px/1.36 Inter;margin-top:16px;color:#E6FAF7">About 30 wooden chalets selling handmade crafts.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:380px;background:${CREAM};border-radius:30px;padding:32px 36px;box-shadow:0 12px 0 ${INK}">
    <div style="text-align:center;font:800 26px Inter;letter-spacing:3px;color:${CORAL}">WEEKENDS ONLY · FRI–SUN · 2026</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px">
    ${['27–29 Nov', '4–6 Dec', '11–13 Dec', '18–20 Dec'].map((d, i) => `<div style="text-align:center;background:${[SUN, '#FFD9CF', '#CFF1EE', SUN][i]};border-radius:20px;padding:18px 0;font:900 52px/1 Fraunces">${d}</div>`).join('')}</div></div>
  <div style="position:absolute;left:72px;right:72px;top:790px;color:#fff">
  ${items([
    ['10 AM to 8 PM · free entry', 'A local producers’ market runs on the same dates.'],
    ['Christmas shuttle from Colmar', '€17 per person per day. Sold online only, in limited numbers.'],
  ], { gap: 40, h: 38, b: 31, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'x-6': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  <svg width="1080" height="1350" style="position:absolute;left:0;top:0">${star(900, 190, 70, CORAL)}${star(800, 120, 30, '#fff')}${star(990, 300, 26, INK)}</svg>
  ${ctr(6, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">QUICK PICK</div><div class="h">Which one<br>is for you?</div></div>
  <div style="position:absolute;left:72px;right:72px;top:360px">
  ${[['Lake and mountain views', 'Montreux', AEGEAN], ['Open into January', 'Tallinn', JADE], ['Shopping underground', 'Valkenburg', CORAL], ['Small and handmade', 'Kaysersberg', TEAL]].map((r, i) => `
    <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:26px;padding:26px 34px;margin-top:${i ? 22 : 0}px;box-shadow:0 8px 0 ${INK}">
      <div style="font:700 34px Inter">${r[0]}</div><div style="flex:none;background:${r[2]};color:#fff;font:900 38px Fraunces;padding:10px 24px;border-radius:999px">${r[1]}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:1000px;background:${INK};color:#fff;border-radius:28px;padding:30px 36px;font:500 31px/1.4 Inter">
    <b style="color:${SUN}">These dates are for 2026 only.</b> They change every year, so check the official website before you book.</div>
  <div class="hd" style="bottom:40px">@enchanted.compass</div>`,
};

(async () => {
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of Object.entries(S)) {
    await p.setContent(`<html><head><style>${FONTS}${CSS}</style></head><body>${body}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: D + n + '.png' });
  }
  await br.close();
})();
