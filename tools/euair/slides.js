// Europe’s most on-time airlines 2025 (Cirium), bright editorial style (A2)
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/airlines/';
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
.h{font:900 80px/1 Fraunces;margin-top:34px}
.row{display:flex;gap:24px;align-items:flex-start}
.dot{flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces}
.rk{display:flex;align-items:center;gap:26px;border-radius:26px;padding:22px 30px}
.rk .n{flex:none;width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 40px Fraunces}
.rk .a{flex:1;font:800 38px/1.15 Inter}
.rk .s{font:500 26px Inter;margin-top:4px}
.rk .p{flex:none;font:900 52px Fraunces}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;
const items = (list, o) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? o.gap : 0}px"><div class="dot" style="background:${o.dotBg(i)};color:${o.dotFg(i)}">${o.mark(i)}</div>
  <div><div style="font:800 ${o.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${o.b}px/1.36 Inter;margin-top:4px;color:${o.sub}">${t[1]}</div>` : ''}</div></div>`).join('');
const fmt = n => n.toLocaleString('en-GB');
const rank = (list, o) => list.map((r, i) => `
  <div class="rk" style="margin-top:${i ? o.gap : 0}px;background:${o.bg(i)};color:${o.fg(i)}${o.shadow ? `;box-shadow:0 8px 0 ${o.shadow}` : ''}">
    <div class="n" style="background:${o.nBg(i)};color:${o.nFg(i)}">${r[0]}</div>
    <div class="a">${r[1]}<div class="s" style="color:${o.sub(i)}">${r[2]} · ${fmt(r[4])} flights</div></div>
    <div class="p">${r[3]}%</div></div>`).join('');

// original illustration: a big clock with a plane flying around it
const ticks = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, r1 = 250, r2 = i % 3 ? 225 : 200;
  return `<line x1="${540 + r1 * Math.sin(a)}" y1="${470 - r1 * Math.cos(a)}" x2="${540 + r2 * Math.sin(a)}" y2="${470 - r2 * Math.cos(a)}" stroke="${INK}" stroke-width="${i % 3 ? 8 : 14}" stroke-linecap="round"/>`; }).join('');
const plane = (x, y, rot, s, col) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" fill="${col}">
  <path d="M0,-70 C8,-70 12,-58 12,-45 L12,-12 L70,18 L70,32 L12,14 L12,42 L30,56 L30,66 L0,58 L-30,66 L-30,56 L-12,42 L-12,14 L-70,32 L-70,18 L-12,-12 L-12,-45 C-12,-58 -8,-70 0,-70Z"/></g>`;
const COVER = `<svg width="1080" height="1350" style="position:absolute;left:0;top:0">
 <rect width="1080" height="1350" fill="${AEGEAN}"/>
 <circle cx="540" cy="470" r="400" fill="none" stroke="${SUN}" stroke-width="6" stroke-dasharray="4 26" stroke-linecap="round"/>
 <circle cx="540" cy="470" r="290" fill="${CREAM}" stroke="${INK}" stroke-width="16"/>
 ${ticks}
 <line x1="540" y1="470" x2="540" y2="290" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
 <line x1="540" y1="470" x2="645" y2="530" stroke="${CORAL}" stroke-width="18" stroke-linecap="round"/>
 <circle cx="540" cy="470" r="22" fill="${INK}"/>
 ${plane(540 + 400 * Math.sin(1.0), 470 - 400 * Math.cos(1.0), 147, 1.15, SUN)}
 <path d="M ${540 + 400 * Math.sin(0.25)} ${470 - 400 * Math.cos(0.25)} A 400 400 0 0 1 ${540 + 400 * Math.sin(0.88)} ${470 - 400 * Math.cos(0.88)}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/>
</svg>`;

const S = {
  'eu-1': `${COVER}
  <div style="position:absolute;left:72px;top:72px;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px;z-index:5">EUROPE · 2025 DATA</div>
  ${ctr(1, 'rgba(255,255,255,.92)', AEGEAN)}
  <div style="position:absolute;left:0;right:0;bottom:0;height:470px;background:${INK};border-top:10px solid ${SUN}"></div>
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 100px/0.98 Fraunces;letter-spacing:-2px">Europe’s most <span style="color:${SUN};white-space:nowrap">on&#8209;time</span> airlines</div>
    <div style="font:500 34px/1.34 Inter;margin-top:22px;color:#DCE9FF">The full-year 2025 top 10 from flight data company Cirium, plus the best airports.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'eu-2': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  ${ctr(2, AEGEAN, '#fff')}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">THE RULES</div><div class="h">What “on time” means</div></div>
  <div style="position:absolute;left:72px;right:72px;top:300px;background:${SUN};border-radius:30px;padding:36px 40px;box-shadow:0 12px 0 ${INK};text-align:center">
    <div style="font:800 26px Inter;letter-spacing:3px;color:${INK}">AN ON-TIME FLIGHT ARRIVES</div>
    <div style="font:900 120px/1.05 Fraunces;margin-top:6px">&lt; 15 min</div>
    <div style="font:700 34px/1.3 Inter;margin-top:4px">after its scheduled arrival at the gate</div>
    <div style="font:500 28px/1.4 Inter;margin-top:10px;color:#3B4660">Cirium’s exact limit is 14 minutes 59 seconds.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:740px">
  ${items([
    ['A full year of flights', 'Flights from January to December 2025, published on 2&nbsp;January&nbsp;2026.'],
    ['Over 600 data sources', 'Airlines, airports, booking systems and aviation authorities.'],
    ['Airports are measured differently', 'They count on-time departures, not arrivals.'],
  ], { gap: 36, h: 37, b: 30, sub: '#3B4660', mark: i => i + 1, dotBg: i => [AEGEAN, CORAL, AEGEAN][i], dotFg: () => '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'eu-3': `<div style="position:absolute;inset:0;background:${CORAL}"></div>
  ${ctr(3, '#fff', CORAL)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${INK}">EUROPE 2025 · 1 TO 5</div><div class="h">The top five</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px">
  ${rank([
    [1, 'Iberia Express', 'Spain', '88.94', 37119],
    [2, 'SAS', 'Scandinavia', '86.09', 249674],
    [3, 'Austrian', 'Austria', '83.74', 124457],
    [4, 'Iberia', 'Spain', '83.52', 188447],
    [5, 'Virgin Atlantic', 'UK', '83.45', 26359],
  ], { gap: 22, bg: i => i ? CREAM : SUN, fg: () => INK, sub: () => '#3B4660', nBg: i => i ? INK : CORAL, nFg: i => i ? SUN : '#fff', shadow: INK })}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:1130px;text-align:center;color:#fff;font:600 28px/1.4 Inter">% = share of flights that arrived on time</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'eu-4': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  ${ctr(4, '#fff', TEAL)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">EUROPE 2025 · 6 TO 10</div><div class="h">The rest of the top 10</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px">
  ${rank([
    [6, 'Icelandair', 'Iceland', '83.23', 39425],
    [7, 'Vueling', 'Spain', '82.20', 228611],
    [8, 'Turkish Airlines', 'Türkiye', '81.41', 421090],
    [9, 'Norwegian', 'Norway', '80.96', 150784],
    [10, 'Finnair', 'Finland', '79.67', 116652],
  ], { gap: 22, bg: () => CREAM, fg: () => INK, sub: () => '#3B4660', nBg: () => INK, nFg: () => SUN, shadow: INK })}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:1130px;text-align:center;color:#fff;font:600 28px/1.4 Inter">Turkish Airlines flew the most flights in this top 10.</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'eu-5': `<div style="position:absolute;inset:0;background:${PLUM}"></div>
  ${ctr(5, '#fff', PLUM)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">GOOD TO KNOW</div><div class="h">The stories behind it</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px;color:#fff">
  ${items([
    ['Iberia Express: top again', 'Number 1 in Europe for the third year in a row, says Euronews. It is the low-cost airline of the Iberia group.'],
    ['SAS: 3rd in the whole world', 'The best European airline in Cirium’s global top 10, with almost 250,000 flights.'],
    ['Virgin Atlantic: most improved', 'It rose from 74.02% in 2024 to 83.45% in 2025. This was Cirium’s first year with this award.'],
    ['Based on 2025 only', 'Past results don’t guarantee your next flight will be on&nbsp;time.'],
  ], { gap: 58, h: 38, b: 30, sub: '#E9E3F5', mark: () => '★', dotBg: i => [SUN, CORAL, SUN, CORAL][i], dotFg: i => [INK, '#fff', INK, '#fff'][i] })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'eu-6': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(6, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">ON-TIME DEPARTURES 2025</div><div class="h">Europe’s best airports</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px">
  ${rank([
    ['4', 'Stavanger', 'Norway · small airports', '89.55', 38894],
    ['5', 'Oslo Gardermoen', 'Norway · large airports', '86.00', 204882],
    ['8', 'Copenhagen', 'Denmark · large airports', '84.72', 236903],
    ['10', 'Stockholm Arlanda', 'Sweden · large airports', '83.59', 181238],
  ], { gap: 22, bg: () => '#fff', fg: () => INK, sub: () => '#3B4660', nBg: () => AEGEAN, nFg: () => '#fff', shadow: INK })}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:990px;text-align:center;font:600 28px/1.4 Inter;color:#3B4660">European airports in Cirium’s world top 10 for their size.<br>The number is the world rank.</div>
  <div style="position:absolute;left:72px;right:72px;top:1120px;text-align:center;font:900 46px/1.2 Fraunces">Which airline do you fly most?</div>
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
