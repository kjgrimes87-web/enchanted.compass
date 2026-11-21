// Iceland ice caves post, bright editorial style (A2)
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/icecave/';
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

let seed = 9; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
// original illustration: looking out of a blue ice cave
const arch = (cx, by, w, h) => `M${cx - w / 2},${by} C${cx - w / 2},${by - h * 1.1} ${cx + w / 2},${by - h * 1.1} ${cx + w / 2},${by} Z`;
const scallops = (n, x0, x1, y0, y1, col) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), r = 26 + rnd() * 40; s += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.6}" fill="none" stroke="${col}" stroke-width="4" opacity=".35"/>`; } return s; };
const COVER = `<svg width="1080" height="1350" style="position:absolute;left:0;top:0">
 <defs><linearGradient id="out" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE3F2"/><stop offset="1" stop-color="#F4FBFF"/></linearGradient>
 <radialGradient id="ice" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#7FE0FF"/><stop offset=".55" stop-color="#1E8FD8"/><stop offset="1" stop-color="#0B2E6B"/></radialGradient></defs>
 <rect width="1080" height="1350" fill="url(#ice)"/>
 ${scallops(22, 0, 1080, 0, 260, '#E6F8FF')}
 <path d="${arch(540, 900, 980, 820)}" fill="#2FA7E6"/>
 <path d="${arch(540, 900, 820, 680)}" fill="#59C3F0"/>
 <path d="${arch(540, 900, 640, 540)}" fill="#8FDCF7"/>
 <path d="${arch(540, 900, 470, 400)}" fill="url(#out)"/>
 <path d="M305,900 L380,770 L440,820 L520,700 L600,800 L660,760 L775,900Z" fill="#A9C6D8"/>
 <path d="M520,700 L548,740 L530,736 L505,760 L498,730Z" fill="#fff"/>
 <path d="M305,900 Q540,860 775,900Z" fill="#2B3440"/>
</svg>`;

const S = {
  'i-1': `${COVER}
  <div style="position:absolute;left:72px;top:72px;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px;z-index:5">ICELAND · WINTER</div>
  ${ctr(1, 'rgba(255,255,255,.92)', AEGEAN)}
  <div style="position:absolute;left:0;right:0;bottom:0;height:450px;background:${INK};border-top:10px solid ${SUN}"></div>
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 96px/0.98 Fraunces;letter-spacing:-2px">The <span style="color:#7FE0FF">blue caves</span> that only exist in winter</div>
    <div style="font:500 34px/1.34 Inter;margin-top:22px;color:#DCE9FF">Season, safety rules and prices for Iceland's ice caves.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'i-2': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  ${ctr(2, AEGEAN, '#fff')}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">THE STORY</div><div class="h">What they are</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px">
  ${items([
    ['Caves inside a glacier', 'Most tours go into Breiðamerkurjökull, part of the Vatnajökull ice cap, near the Jökulsárlón glacier lagoon.'],
    ['Different every year', 'The caves melt and change shape. Guides look for new ones each August and September.'],
    ['Only in the cold months', 'Summer warmth makes them unstable and dangerous, so tours stop from May to September.'],
    ['One year-round option', 'The Katla ice cave is in a different glacier (Mýrdalsjökull). Tours start from Vík.'],
  ], { gap: 46, h: 40, b: 32, sub: '#3B4660', mark: i => i + 1, dotBg: i => [AEGEAN, CORAL, AEGEAN, CORAL][i], dotFg: () => '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'i-3': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  ${ctr(3, '#fff', TEAL)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">WHEN TO GO</div><div class="h">The season</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px;display:flex;align-items:center;justify-content:space-between;color:#fff">
    <div style="text-align:center;width:390px;background:rgba(255,255,255,.14);border-radius:30px;padding:34px 0"><div style="font:800 28px Inter;letter-spacing:3px;color:${SUN}">STARTS</div><div style="font:900 80px/1 Fraunces;margin-top:8px">October</div></div>
    <div style="font:900 80px Fraunces;color:${SUN}">→</div>
    <div style="text-align:center;width:390px;background:rgba(255,255,255,.14);border-radius:30px;padding:34px 0"><div style="font:800 28px Inter;letter-spacing:3px;color:${SUN}">ENDS</div><div style="font:900 80px/1 Fraunces;margin-top:8px">April</div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:530px;text-align:center;color:#E6FAF7;font:500 30px/1.4 Inter">Exact dates differ by cave and by company. Some stop in March.</div>
  <div style="position:absolute;left:72px;right:72px;top:680px;color:#fff">
  ${items([
    ['Northern lights: September to April', 'The same trip can include an aurora hunt.'],
    ['Very short days', 'Reykjavík gets about 4 hours of daylight around 21 December.'],
    ['Diamond Beach is next door', 'Ice on black sand, a 5–10 minute walk across the road from Jökulsárlón.'],
  ], { gap: 44, h: 38, b: 31, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'i-4': `<div style="position:absolute;inset:0;background:${PLUM}"></div>
  ${ctr(4, '#fff', PLUM)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">READ THIS FIRST</div><div class="h">Never go alone</div></div>
  <div style="position:absolute;left:72px;right:72px;top:270px;background:${CREAM};border-radius:30px;padding:36px 42px;box-shadow:0 12px 0 ${CORAL}">
    <div style="display:flex;align-items:center;gap:22px"><div style="flex:none;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px">AUGUST 2024</div><div style="font:900 44px Fraunces">A fatal collapse</div></div>
    <div style="font:500 32px/1.4 Inter;margin-top:16px;color:#3B4660">Ice fell during a guided summer tour at Breiðamerkurjökull. One visitor died and another was hurt.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:640px;color:#fff">
    <div style="font:800 30px Inter;letter-spacing:3px;color:${SUN};margin-bottom:26px">THE RULES NOW</div>
  ${items([
    ['Only licensed companies', 'They need a contract with the national park. 30 of 34 that applied got one for 2025–26.'],
    ['Trained guides, small groups', 'Each guide takes 8 to 16 guests. The caves are checked every day.'],
    ['Tours can be cancelled', 'Weather or ice conditions can stop a tour on the day.'],
  ], { gap: 36, h: 37, b: 31, sub: '#E9E3F5', mark: () => '!', dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'i-5': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(5, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">PRICE + GETTING THERE</div><div class="h">Plan it</div></div>
  <div style="position:absolute;left:72px;right:72px;top:270px;background:#fff;border-radius:30px;padding:34px 40px;box-shadow:0 12px 0 ${INK};text-align:center">
    <div style="font:800 26px Inter;letter-spacing:3px;color:${CORAL}">STANDARD 3-HOUR TOUR</div>
    <div style="font:900 92px/1.05 Fraunces;margin-top:8px;color:${AEGEAN}">21,500–23,500</div>
    <div style="font:800 34px Inter;margin-top:4px">Icelandic krónur (ISK) per adult</div>
    <div style="font:500 28px/1.4 Inter;margin-top:12px;color:#3B4660">Starting prices from two tour companies, Nov 2026.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:700px">
  ${items([
    ['Meet at Jökulsárlón or Skaftafell', 'They are about 45 minutes apart by car.'],
    ['About 5 hours from Reykjavík', 'Roughly 380 km by road, without stops. Plan to stay overnight nearby.'],
    ['Minimum age: 6 to 10', 'It depends on the company.'],
  ], { gap: 40, h: 38, b: 31, sub: '#3B4660', mark: i => i + 1, dotBg: () => INK, dotFg: () => SUN })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'i-6': `<div style="position:absolute;inset:0;background:${AEGEAN}"></div>
  ${ctr(6, '#fff', AEGEAN)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">TIPS</div><div class="h">Before you go</div></div>
  <div style="position:absolute;left:72px;right:72px;top:270px;color:#fff">
  ${items([
    ['Wear warm layers, not cotton', 'Wool or synthetic layers, waterproof jacket and trousers, gloves and a hat.'],
    ['Boots that cover your ankles', 'The company gives you a helmet and crampons.'],
    ['Keep a spare day', 'If your tour is cancelled, you can usually move it or get a refund.'],
  ], { gap: 44, h: 38, b: 31, sub: '#E3EEFF', mark: () => '★', dotBg: i => [SUN, CORAL, SUN][i], dotFg: i => [INK, '#fff', INK][i] })}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:800px;background:${CREAM};border-radius:28px;padding:30px 36px;box-shadow:0 10px 0 ${INK}">
    <div style="font:800 26px Inter;letter-spacing:3px;color:${CORAL}">TRAVEL ADVICE</div>
    <div style="font:500 31px/1.4 Inter;margin-top:10px">The UK notes recent volcanic eruptions on the Reykjanes peninsula, in the southwest, far from the ice caves. Check your own government's advice.</div></div>
  <div class="hd" style="color:#fff;bottom:40px">@enchanted.compass</div>`,
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
