// Monarch butterfly sanctuaries post, bright editorial style (A2)
const { chromium } = require('playwright');
const fs = require('fs');
const { bfly } = require('./bfly.js');
const D = '/home/claude/ig/monarch/';
const FS = '/home/claude/ig/design/node_modules/@fontsource/';
const b64 = (p, t) => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const font = (fam, pkg, file, w, st = 'normal') =>
  `@font-face{font-family:'${fam}';src:url(${b64(FS + pkg + '/files/' + file, 'font/woff2')}) format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS = [
  font('Fraunces', 'fraunces', 'fraunces-latin-400-normal.woff2', 400),
  font('Fraunces', 'fraunces', 'fraunces-latin-700-normal.woff2', 700),
  font('Fraunces', 'fraunces', 'fraunces-latin-900-normal.woff2', 900),
  font('Fraunces', 'fraunces', 'fraunces-latin-400-italic.woff2', 400, 'italic'),
].join('');
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8', JADE = '#127A5E', PLUM = '#3A2A5C', AEGEAN = '#1F5FBF';
const N = 6;
const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px;z-index:5}
.hd{position:absolute;left:72px;bottom:48px;font:700 28px Inter}
.sw{position:absolute;right:72px;bottom:48px;font:800 28px Inter}
.kick{font:800 28px Inter;letter-spacing:4px}
.h{font:900 80px/1 Fraunces;margin-top:10px}
.row{display:flex;gap:24px;align-items:flex-start}
.dot{flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;
const items = (list, o) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? o.gap : 0}px"><div class="dot" style="background:${o.dotBg(i)};color:${o.dotFg(i)}">${o.mark(i)}</div>
  <div><div style="font:800 ${o.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${o.b}px/1.36 Inter;margin-top:4px;color:${o.sub}">${t[1]}</div>` : ''}</div></div>`).join('');
// fir tree silhouette
const fir = (x, base, h, col) => { const w = h * 0.42; let s = ''; for (let k = 0; k < 4; k++) { const top = base - h + k * h * 0.2, bot = top + h * 0.38; const ww = w * (0.45 + k * 0.2); s += `<polygon points="${x},${top} ${x - ww / 2},${bot} ${x + ww / 2},${bot}" fill="${col}"/>`; } return s + `<rect x="${x - h * 0.025}" y="${base - h * 0.2}" width="${h * 0.05}" height="${h * 0.2}" fill="${col}"/>`; };
const forest = (base, col, n, hmin, hmax, seed) => { let r = seed, s = ''; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < n; i++) { const x = -40 + i * (1160 / n) + rnd() * 30; s += fir(x, base + rnd() * 30, hmin + rnd() * (hmax - hmin), col); } return s; };
// swarm of butterflies
const swarm = (spec) => spec.map(s => bfly(s[2], { x: s[0], y: s[1], rot: s[3], open: s[4] ?? 1 })).join('');

const S = {
  'm-1': `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#2B6CB0 0%,#5BA3C9 38%,#F6C77A 70%,#F59E4C 100%)"></div>
  <svg width="1080" height="1350" style="position:absolute;left:0;top:0">${forest(1010, '#2F5D50', 9, 380, 520, 7)}${forest(1180, '#1E4038', 8, 460, 640, 21)}${forest(1350, '#11261F', 7, 520, 700, 3)}</svg>
  ${(()=>{let r=11,o='';const rnd=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<70;i++){const x=40+rnd()*1000,y=560+rnd()*300;o+=bfly(22+rnd()*20,{x,y,rot:-40+rnd()*80,open:0.25+rnd()*0.5});}return o;})()}
  ${swarm([[560,250,330,-12],[180,430,190,18,0.7],[820,520,170,-28,0.5],[700,700,120,22,0.85],[90,700,110,-20,0.4],[380,640,90,10,0.6],[930,330,100,30,0.75],[300,250,80,-35,0.5],[470,820,70,15,0.9],[880,800,85,-10,0.35],[60,300,70,25,0.8],[620,170,60,-5,0.6]])}
  <div style="position:absolute;left:72px;top:72px;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px;z-index:5">MEXICO · NATURE</div>
  ${ctr(1, 'rgba(255,255,255,.92)', INK)}
  <div style="position:absolute;left:0;right:0;bottom:0;height:560px;background:linear-gradient(180deg,rgba(10,26,22,0) 0%,rgba(10,26,22,.85) 40%,rgba(10,26,22,.95) 100%)"></div>
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 104px/0.96 Fraunces;letter-spacing:-2px">The forest that turns <span style="color:${SUN}">orange</span></div>
    <div style="font:500 38px/1.32 Inter;margin-top:24px;color:#E6F3EE">Millions of monarch butterflies spend the winter in Mexico's mountains. Season dates, prices and how to visit safely.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'm-2': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(2, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">THE STORY</div><div class="h">What you'll see</div></div>
  ${bfly(300, { x: 700, y: 170, rot: 14 })}
  <div style="position:absolute;left:72px;right:72px;top:440px">
  ${items([
    ['They fly south from Canada and the US', 'Every autumn, eastern monarchs head for a few mountain forests west of Mexico City.'],
    ['They hang in huge clusters', 'They cover the trunks and branches of oyamel fir trees, about 3,000 m above sea level.'],
    ['They stay all winter', 'On warm, sunny days they take off and fill the air. In March they head north again.'],
    ['A UNESCO World Heritage Site', 'The Monarch Butterfly Biosphere Reserve was listed in 2008.'],
  ], { gap: 44, h: 42, b: 34, sub: '#3B4660', mark: i => i + 1, dotBg: i => [INK, CORAL, INK, CORAL][i], dotFg: () => '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'm-3': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  ${ctr(3, '#fff', TEAL)}
  <div style="position:absolute;left:72px;right:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">WHEN TO GO</div><div class="h">This season</div></div>
  <div style="position:absolute;left:72px;right:72px;top:290px;display:flex;align-items:center;justify-content:space-between;color:#fff">
    <div style="text-align:center;width:390px;background:rgba(255,255,255,.14);border-radius:30px;padding:34px 0"><div style="font:800 28px Inter;letter-spacing:3px;color:${SUN}">OPENED</div><div style="font:900 96px/1 Fraunces;margin-top:8px">Nov 20</div><div style="font:700 34px Inter;margin-top:8px">2026</div></div>
    <div style="font:900 80px Fraunces;color:${SUN}">→</div>
    <div style="text-align:center;width:390px;background:rgba(255,255,255,.14);border-radius:30px;padding:34px 0"><div style="font:800 28px Inter;letter-spacing:3px;color:${SUN}">CLOSES</div><div style="font:900 96px/1 Fraunces;margin-top:8px">Mar 31</div><div style="font:700 34px Inter;margin-top:8px">2027</div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:680px;color:#fff">
  ${items([
    ['Best months: December to February', 'The colonies are fullest from January to February.'],
    ['Go around midday on a sunny day', 'Cold butterflies sit still. Once they warm up, they fly.'],
    ['Open daily, about 8 AM to 5 PM', 'The walk up to the colonies takes time.'],
  ], { gap: 48, h: 42, b: 34, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'm-4': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  ${ctr(4, CORAL, '#fff')}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">6 SANCTUARIES · 2 STATES</div><div class="h">Where to go</div></div>
  <div style="position:absolute;left:72px;right:72px;top:250px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    <div style="background:${JADE};color:#fff;border-radius:30px;padding:36px 36px;box-shadow:0 12px 0 ${INK}">
      <div style="font:800 26px Inter;letter-spacing:3px;color:${SUN}">STATE OF MEXICO</div>
      <div style="font:900 44px/1.25 Fraunces;margin-top:14px">Piedra Herrada<br>La Mesa<br>El Capulín</div></div>
    <div style="background:${PLUM};color:#fff;border-radius:30px;padding:36px 36px;box-shadow:0 12px 0 ${INK}">
      <div style="font:800 26px Inter;letter-spacing:3px;color:${SUN}">MICHOACÁN</div>
      <div style="font:900 44px/1.25 Fraunces;margin-top:14px">El Rosario<br>Sierra Chincua<br>Senguio</div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:640px;display:flex;justify-content:space-between;text-align:center">
    ${[['150', 'pesos', 'Adults'], ['100', 'pesos', 'Ages 6–12'], ['Free', '', 'Under 5']].map((t, i) => `
    <div style="width:290px;background:#fff;border-radius:28px;padding:28px 0;border:5px solid ${[CORAL, TEAL, SUN][i]}"><div style="font:900 84px/1 Fraunces;color:${[CORAL, TEAL, '#D99A00'][i]}">${t[0]}</div><div style="font:700 28px Inter;margin-top:6px;color:#3B4660;min-height:34px">${t[1]}</div><div style="font:800 32px Inter;margin-top:4px">${t[2]}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:960px;background:#fff;border-radius:26px;padding:30px 36px;font:500 33px/1.42 Inter;color:#3B4660;box-shadow:0 8px 0 ${INK}">
    <b style="color:${INK}">2026–27 entry prices</b> at El Rosario, Sierra Chincua, Senguio and La Mesa. Piedra Herrada charged the same last season. El Capulín has no published price.</div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'm-5': `<div style="position:absolute;inset:0;background:${PLUM}"></div>
  ${ctr(5, '#fff', PLUM)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">READ THIS FIRST</div><div class="h">Safety advice</div></div>
  <div style="position:absolute;left:72px;right:72px;top:280px">
    <div style="background:${CREAM};border-radius:30px;padding:40px 44px;box-shadow:0 12px 0 ${CORAL}">
      <div style="display:flex;align-items:center;gap:22px"><div style="flex:none;background:${CORAL};color:#fff;font:800 26px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px">HIGH RISK</div><div style="font:900 50px Fraunces">Michoacán</div></div>
      <div style="font:500 33px/1.4 Inter;margin-top:18px;color:#3B4660"><b style="color:${INK}">US:</b> Level 4, "Do not travel." US government staff may not visit the reserve's Michoacán side.<br><b style="color:${INK}">UK:</b> Advises against all but essential travel. Only Morelia, Pátzcuaro and some toll roads are excluded.</div></div>
    <div style="margin-top:56px;background:${CREAM};border-radius:30px;padding:40px 44px;box-shadow:0 12px 0 ${TEAL}">
      <div style="display:flex;align-items:center;gap:22px"><div style="flex:none;background:${TEAL};color:#fff;font:800 26px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px">LOWER RISK</div><div style="font:900 50px Fraunces">State of Mexico</div></div>
      <div style="font:500 33px/1.4 Inter;margin-top:18px;color:#3B4660"><b style="color:${INK}">US:</b> Level 2, "Exercise increased caution."<br><b style="color:${INK}">UK:</b> No extra warning for this state.</div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:1020px;text-align:center"><span style="display:inline-block;background:${SUN};color:${INK};font:800 32px/1.3 Inter;padding:22px 34px;border-radius:999px">Check your own government's advice first.</span></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'm-6': `<div style="position:absolute;inset:0;background:${JADE}"></div>
  ${ctr(6, '#fff', JADE)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">GOOD NEWS + TIPS</div><div class="h">Before you go</div></div>
  <div style="position:absolute;left:72px;right:72px;top:250px;background:${SUN};border-radius:30px;padding:34px 40px;box-shadow:0 12px 0 ${INK};display:flex;align-items:center;gap:34px">
    <div style="flex:none;text-align:center"><div style="font:900 110px/0.9 Fraunces;color:${CORAL}">+64%</div></div>
    <div style="font:500 30px/1.38 Inter">Last winter the colonies covered <b>2.93 hectares</b>, up from 1.79. Scientists say about <b>6 hectares</b> is needed to keep the migration safe.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:560px;color:#fff">
  ${items([
    ['Easiest trip: Piedra Herrada', 'About 2 hours by car from Mexico City, or 45 minutes from Valle de Bravo.'],
    ['Wear layers and walk slowly', "You'll be near 3,000 m. Mornings are cold and the trails go uphill."],
    ['Be quiet and stay on the trail', "Don't touch or pick up the butterflies."],
    ['Michoacán has no direct bus', 'Most visitors go on a tour from Mexico City.'],
  ], { gap: 40, h: 39, b: 32, sub: '#DDF3EA', mark: () => '★', dotBg: i => [SUN, CORAL, SUN, CORAL][i], dotFg: i => [INK, '#fff', INK, '#fff'][i] })}
  </div>
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
