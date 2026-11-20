// Direction A, round 2: bigger type, brighter colour, more playful
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/home/claude/ig/design/';
const FS = '/home/claude/ig/design/node_modules/@fontsource/';
const b64 = (p, t) => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const font = (fam, pkg, file, w, st = 'normal') =>
  `@font-face{font-family:'${fam}';src:url(${b64(FS + pkg + '/files/' + file, 'font/woff2')}) format('woff2');font-weight:${w};font-style:${st}}`;
const FONTS = [
  font('Fraunces', 'fraunces', 'fraunces-latin-400-normal.woff2', 400),
  font('Fraunces', 'fraunces', 'fraunces-latin-700-normal.woff2', 700),
  font('Fraunces', 'fraunces', 'fraunces-latin-900-normal.woff2', 900),
  font('Fraunces', 'fraunces', 'fraunces-latin-400-italic.woff2', 400, 'italic'),
  font('Caveat', 'caveat', 'caveat-latin-700-normal.woff2', 700),
].join('');
const WING = b64('/home/claude/ig/cover_wing.png', 'image/png');

// palette
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8';

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
.ph{position:absolute;background-size:cover;background-position:center;filter:brightness(1.12) saturate(1.45) contrast(1.05)}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px}
.hd{position:absolute;left:72px;bottom:56px;font:700 28px Inter}
.sticker{position:absolute;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;box-shadow:0 10px 24px rgba(0,0,0,.18)}
.hl{background:linear-gradient(transparent 58%, ${SUN} 58%, ${SUN} 92%, transparent 92%);padding:0 6px}
.hand{font-family:Caveat;font-weight:700}
`;
const squiggle = (w, c) => `<svg width="${w}" height="28" viewBox="0 0 ${w} 28"><path d="M4 16 ${Array.from({ length: Math.floor(w / 40) }, (_, i) => `Q ${i * 40 + 24} ${i % 2 ? 26 : 4} ${i * 40 + 44} 16`).join(' ')}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/></svg>`;

const AIR = [['Philippine Airlines', 83.12], ['Air New Zealand', 79.29], ['ANA', 78.88], ['Singapore Airlines', 78.58], ['Japan Airlines', 78.25], ['IndiGo', 78.12], ['Cathay Pacific', 76.78], ['Virgin Australia', 76.54], ['Qantas', 76.51], ['Korean Air', 75.34]];

const S = {
  'A2-1': `<div class="ph" style="inset:0;background-image:url(${WING})"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,33,58,0) 40%,rgba(22,33,58,.78) 100%)"></div>
  <div style="position:absolute;left:72px;top:72px;background:${TEAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px">✈ ASIA-PACIFIC AIRLINES</div>
  <div class="ctr" style="background:rgba(255,255,255,.9);color:${INK}">1/3</div>
  <div class="sticker" style="right:80px;top:250px;width:230px;height:230px;background:${CORAL};color:#fff;transform:rotate(12deg)"><span style="font:900 64px/1 Fraunces">2025</span><span style="font:800 22px/1.15 Inter;letter-spacing:3px">REAL<br>DATA</span></div>
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 330px/0.8 Fraunces;letter-spacing:-12px;color:${SUN};text-shadow:0 6px 30px rgba(0,0,0,.25)">1 in 5</div>
    <div style="font:700 72px/1.08 Fraunces;margin-top:34px;text-shadow:0 2px 16px rgba(0,0,0,.35)">flights on the region's most punctual airlines <i style="font-weight:400;color:${SUN}">still</i> land late.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div style="position:absolute;right:72px;bottom:56px;font:800 28px Inter;color:${SUN}">SWIPE →</div>`,

  'A2-2': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  <div class="ph" style="right:-60px;top:-60px;width:470px;height:470px;border-radius:50%;background-image:url(${WING});border:14px solid #fff"></div>
  <div class="ctr" style="background:${INK};color:${SUN};right:auto;left:72px">2/3</div>
  <div style="position:absolute;left:72px;top:150px">
    <div style="font:800 28px Inter;letter-spacing:4px;color:${CORAL}">ON-TIME ARRIVALS · 2025</div>
    <div style="font:900 300px/0.82 Fraunces;letter-spacing:-12px;color:${CORAL};margin-top:14px">83<span style="font-size:.45em;letter-spacing:-2px">%</span></div>
    <div style="font:700 50px/1.1 Fraunces;margin-top:12px">Philippine Airlines <span class="hand" style="font-size:52px;color:${TEAL}">← No. 1!</span></div></div>
  <div style="position:absolute;left:72px;right:72px;top:615px;background:${CREAM};border-radius:34px;padding:22px 40px;box-shadow:0 14px 0 ${INK}">
  ${AIR.slice(1).map((a, i) => `<div style="display:flex;align-items:center;height:64px;${i ? 'border-top:2px dashed rgba(22,33,58,.18)' : ''}">
    <span style="width:70px;font:900 40px Fraunces;color:${CORAL}">${i + 2}</span>
    <span style="flex:1;font:600 36px Inter">${a[0]}</span>
    <span style="font:800 36px Inter">${a[1].toFixed(1)}%</span></div>`).join('')}</div>
  <div style="position:absolute;left:72px;right:72px;bottom:44px;font:500 23px Inter;color:${INK};opacity:.75">On time = within 15 min of schedule · Source: Cirium 2025</div>`,

  'A2-3': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  <div style="position:absolute;right:-150px;bottom:-230px;width:430px;height:430px;border-radius:50%;background:${SUN}"></div>
  <div class="ctr" style="background:#fff;color:${TEAL}">3/3</div>
  <div style="position:absolute;left:72px;right:72px;top:80px;color:#fff">
    <div style="font:800 28px Inter;letter-spacing:4px;color:${SUN}">WHY IT MATTERS</div>
    <div style="font:900 118px/0.98 Fraunces;margin-top:16px">Protect your<br><i style="font-weight:400">connection</i></div>
    <div style="margin:6px 0 0 6px">${squiggle(560, SUN)}</div></div>
  <div style="position:absolute;left:72px;right:72px;top:460px">
  ${[['One ticket', 'Miss the 2nd flight? The airline puts you on the next one at no extra cost.'], ['Separate tickets', 'Miss it and you pay for a new flight, and may have to re-check bags. Leave hours, not minutes.'], ['Similar fares', 'Short connection? Pick the more punctual airline.']].map((t, i) => `
    <div style="display:flex;gap:30px;align-items:flex-start;margin-top:${i ? 34 : 0}px">
      <div style="flex:none;width:96px;height:96px;border-radius:50%;background:${i === 1 ? CORAL : '#fff'};color:${i === 1 ? '#fff' : TEAL};display:flex;align-items:center;justify-content:center;font:900 56px Fraunces">${i + 1}</div>
      <div style="color:#fff"><div style="font:800 44px Inter">${t[0]}</div><div style="font:500 36px/1.35 Inter;margin-top:6px;color:#E6FAF7">${t[1]}</div></div></div>`).join('')}</div>
  <div style="position:absolute;left:72px;width:640px;top:1060px;background:#fff;color:${INK};border-radius:24px;padding:24px 30px;font:500 31px/1.35 Inter;transform:rotate(-2deg);box-shadow:0 10px 0 ${INK}"><b style="color:${CORAL}">Before you book:</b> check your flight's recent record on FlightAware.</div>
  <div class="hd" style="color:#fff;bottom:44px">@enchanted.compass</div>`,
};

(async () => {
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of Object.entries(S)) {
    await p.setContent(`<html><head><style>${FONTS}${CSS}</style></head><body>${body}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: OUT + n + '.png' });
  }
  await br.close();
})();
