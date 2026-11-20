// UK ETA + Europe EES/ETIAS post, bright editorial style
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/eta/';
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
const R = b64(D + 'render_eta.png', 'image/png');
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8', AEGEAN = '#1F5FBF', PLUM = '#3A2A5C';
const N = 6;
const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px}
.hd{position:absolute;left:72px;bottom:48px;font:700 28px Inter}
.sw{position:absolute;right:72px;bottom:48px;font:800 28px Inter}
.kick{font:800 28px Inter;letter-spacing:4px}
.h{font:900 78px/1 Fraunces;margin-top:10px}
.row{display:flex;gap:24px;align-items:flex-start}
.dot{flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces}
.hand{font-family:Caveat;font-weight:700}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;
const items = (list, o) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? o.gap : 0}px"><div class="dot" style="background:${o.dotBg(i)};color:${o.dotFg(i)}">${o.mark(i)}</div>
  <div><div style="font:800 ${o.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${o.b}px/1.36 Inter;margin-top:4px;color:${o.sub}">${t[1]}</div>` : ''}</div></div>`).join('');
const finger = (c) => `<svg width="230" height="230" viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round">
<path d="M30 30 Q50 12 70 30"/><path d="M24 44 Q26 22 50 20 Q74 22 76 44"/><path d="M32 70 Q30 56 32 46 Q36 32 50 32 Q64 32 68 46 Q70 58 66 74"/>
<path d="M42 82 Q38 66 40 52 Q42 42 50 42 Q58 42 60 52 Q62 66 56 84"/><path d="M50 52 Q50 70 48 88"/><path d="M22 60 Q20 52 22 46"/><path d="M78 46 Q80 56 76 66"/></svg>`;

const S = {
  'e-1': `<img src="${R}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,33,58,0) 52%,rgba(22,33,58,.72) 68%,rgba(22,33,58,.94) 84%)"></div>
  <div style="position:absolute;left:72px;top:72px;background:${TEAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px">UK · EUROPE</div>
  ${ctr(1, 'rgba(255,255,255,.92)', INK)}
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 104px/0.98 Fraunces;letter-spacing:-2px">New rules for the <span style="color:${SUN}">UK and Europe</span></div>
    <div style="font:500 38px/1.32 Inter;margin-top:24px;color:#E6ECF8">What you need before you fly,<br>plus a scam to avoid.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'e-2': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  <img src="${R}" style="position:absolute;right:-70px;top:-70px;width:430px;height:430px;border-radius:50%;object-fit:cover;object-position:76% 30%;border:14px solid #fff">
  <div class="ctr" style="background:#fff;color:${TEAL};right:auto;left:72px">2/${N}</div>
  <div style="position:absolute;left:72px;top:150px;color:#fff"><div class="kick" style="color:${SUN}">UNITED KINGDOM</div>
  <div style="font:900 200px/0.85 Fraunces;letter-spacing:-8px;color:${SUN};margin-top:12px">£20</div>
  <div style="font:700 42px/1.15 Fraunces;margin-top:10px">for an ETA, per person</div></div>
  <div style="position:absolute;left:72px;right:72px;top:610px;color:#fff">
  ${items([
    ['Most visa-free visitors need one.', 'That includes people from the US, Canada, Australia and EU countries.'],
    ['No ETA, no boarding.', 'Since Feb 25, 2026, airlines refuse travelers without one.'],
    ['Babies and children too.', 'Every traveler needs their own.'],
  ], { gap: 54, h: 43, b: 35, sub: '#E6FAF7', mark: i => i + 1, dotBg: i => i === 1 ? CORAL : '#fff', dotFg: i => i === 1 ? '#fff' : TEAL })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'e-3': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  ${ctr(3, TEAL, '#fff')}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">UK ETA: THE DETAILS</div><div class="h">How it works</div></div>
  <div style="position:absolute;left:72px;right:72px;top:240px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
  ${[['2 yrs', 'valid, or until your passport expires'], ['6 mo', 'max stay per trip, as many trips as you like'], ['3 days', 'allow up to 3 working days for a decision']].map((t, i) => `
    <div style="background:${[SUN, TEAL, CORAL][i]};color:${i ? '#fff' : INK};border-radius:28px;padding:30px 24px;box-shadow:0 10px 0 ${INK};transform:rotate(${[-1.5, 1, -1][i]}deg);height:270px">
      <div style="font:900 70px/1 Fraunces">${t[0]}</div><div style="font:600 27px/1.32 Inter;margin-top:14px">${t[1]}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:590px">
  ${items([
    ['Apply on the UK ETA app or gov.uk/eta.', 'Other sites charge more than £20.'],
    ['Got a new passport?', 'You need a new ETA, since it\'s linked to your passport.'],
    ["Don't need one:", 'British or Irish citizens, and people with a UK visa or permission to live, work or study there.'],
    ['Changing planes?', "Staying airside at Heathrow or Manchester? No ETA, for now. Going through border control? You need one."],
  ], { gap: 38, h: 38, b: 32, sub: '#3B4660', mark: i => '✓', dotBg: i => [TEAL, SUN, CORAL, AEGEAN][i], dotFg: i => i === 1 ? INK : '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  'e-4': `<div style="position:absolute;inset:0;background:${AEGEAN}"></div>
  ${ctr(4, '#fff', AEGEAN)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">EUROPE · ENTRY/EXIT SYSTEM</div><div class="h">No more passport stamps</div></div>
  <div style="position:absolute;left:50%;top:310px;transform:translateX(-50%);width:320px;height:320px;border-radius:50%;background:${SUN};display:flex;align-items:center;justify-content:center;box-shadow:0 14px 0 ${INK}">${finger(INK)}</div>
  <div class="hand" style="position:absolute;right:70px;top:400px;font-size:44px;color:${SUN};transform:rotate(8deg)">nothing to<br>apply for</div>
  <div style="position:absolute;left:72px;right:72px;top:700px;color:#fff">
  ${items([
    ['Live since April 10, 2026', 'In the 29 countries that use it, for non-EU visitors on short stays.'],
    ['Your first entry: fingerprints and a photo', 'Under-12s give a photo only. Later entries are faster.'],
    ['Leave extra time at passport control', 'Lines can be longer than before.'],
  ], { gap: 50, h: 40, b: 33, sub: '#DCE6FA', mark: i => i + 1, dotBg: i => i === 1 ? CORAL : '#fff', dotFg: i => i === 1 ? '#fff' : AEGEAN })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'e-5': `<div style="position:absolute;inset:0;background:${PLUM}"></div>
  ${ctr(5, '#fff', PLUM)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">EUROPE · ETIAS</div><div class="h">It hasn't started yet</div></div>
  <div style="position:absolute;left:72px;right:72px;top:250px;background:${CREAM};border-radius:30px;padding:40px 44px;box-shadow:0 12px 0 ${CORAL};transform:rotate(-1deg)">
    <div style="display:flex;align-items:center;gap:30px"><div style="flex:none;width:120px;height:120px;border-radius:50%;background:${CORAL};display:flex;align-items:center;justify-content:center;font:900 76px Fraunces;color:#fff">!</div>
    <div><div style="font:900 50px/1.1 Fraunces;color:${INK}">Watch for scam sites</div><div style="font:500 32px/1.36 Inter;margin-top:10px;color:#3B4660">No one can apply for ETIAS yet. A site taking your money for it now is not the official one.</div></div></div>
  </div>
  <div style="position:absolute;left:72px;right:72px;top:640px;color:#fff">
  ${items([
    ['No start date yet', 'The EU says it will announce the date several months before launch.'],
    ['It will cost €20', "Free for anyone under 18 or over 70."],
    ['Only apply on a europa.eu site', 'That\'s how to spot the official EU pages.'],
  ], { gap: 38, h: 38, b: 32, sub: '#DCD3F0', mark: i => i + 1, dotBg: () => SUN, dotFg: () => INK })}
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  'e-6': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(6, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">SAVE THIS</div><div class="h">Before you fly</div></div>
  <div style="position:absolute;left:72px;right:72px;top:240px">
  ${[['UK', 'Get a £20 ETA on the UK ETA app or gov.uk/eta. Do it at least 3 working days before you fly.', TEAL, -1],
     ['Europe now', 'Nothing to apply for. Expect fingerprints and a photo at the border on your first entry.', AEGEAN, 1],
     ['Europe later', 'ETIAS is coming. Wait for the official europa.eu site to open.', PLUM, -0.6]].map((t, i) => `
    <div style="background:${CREAM};border-radius:28px;padding:52px 42px;margin-top:${i ? 70 : 0}px;box-shadow:0 10px 0 ${INK};transform:rotate(${t[3]}deg);display:flex;gap:30px;align-items:center">
      <div style="flex:none;width:210px;font:900 50px/1.05 Fraunces;color:${t[2]}">${t[0]}</div>
      <div style="font:500 34px/1.4 Inter">${t[1]}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:72px;right:72px;bottom:100px;font:500 23px/1.4 Inter;color:#3B4660">Sources: GOV.UK, European Commission, Council of the EU · Checked Nov 8, 2026</div>
  <div class="hd">@enchanted.compass</div>`,
};

(async () => {
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of Object.entries(S)) {
    await p.setContent(`<html><head><style>${FONTS}${CSS}</style></head><body>${body}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    await p.screenshot({ path: D + n + '.png' });
  }
  await br.close();
})();
