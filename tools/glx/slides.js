// Hezhong (GLX) Hot Spring post, bright editorial style
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/glx/';
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
const C = (n) => b64(D + 'c_' + n + '.jpg', 'image/jpeg');
const P = (n) => b64(D + 'sm_' + n + '.jpg', 'image/jpeg');
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8', JADE = '#127A5E', PLUM = '#3A2A5C';
const N = 6;

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px}
.hd{position:absolute;left:72px;bottom:48px;font:700 28px Inter}
.sw{position:absolute;right:72px;bottom:48px;font:800 28px Inter}
.kick{font:800 28px Inter;letter-spacing:4px}
.h{font:900 80px/1 Fraunces;margin-top:10px}
.frame{position:absolute;left:72px;width:936px;object-fit:cover;border-radius:30px;border:10px solid #fff}
.row{display:flex;gap:24px;align-items:flex-start}
.dot{flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces}
.hand{font-family:Caveat;font-weight:700}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;
const items = (list, opts) => list.map((t, i) => `
  <div class="row" style="margin-top:${i ? opts.gap : 0}px"><div class="dot" style="background:${opts.dotBg(i)};color:${opts.dotFg(i)}">${opts.mark(i)}</div>
  <div><div style="font:800 ${opts.h}px/1.2 Inter">${t[0]}</div>${t[1] ? `<div style="font:500 ${opts.b}px/1.36 Inter;margin-top:4px;color:${opts.sub}">${t[1]}</div>` : ''}</div></div>`).join('');

const S = {
  // 1. Cover
  'g-1': `<img src="${P('night-pond-lanterns-bridge')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,20,25,.25) 0%,rgba(10,20,25,0) 22%,rgba(10,20,25,0) 45%,rgba(10,20,25,.7) 64%,rgba(10,20,25,.92) 82%)"></div>
  <div style="position:absolute;left:72px;top:72px;background:${TEAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px">CHINA · QINGYUAN</div>
  ${ctr(1, 'rgba(255,255,255,.92)', INK)}
  <div style="position:absolute;left:72px;right:72px;bottom:140px;color:#fff">
    <div style="font:900 100px/0.98 Fraunces;letter-spacing:-2px">Spring-fed pools in a <span style="color:${SUN}">lantern garden</span></div>
    <div style="font:500 38px/1.32 Inter;margin-top:24px;color:#E3F2EE">My day at Hezhong Hot Spring in Qingyuan: what's included, what I loved and what I didn't.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  // 2. The spring
  'g-2': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(2, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">THE SOURCE</div><div class="h" style="font-size:58px;white-space:nowrap;margin-top:18px">Where the water comes from</div></div>
  <img class="frame" src="${C('sign')}" style="top:220px;height:380px;transform:rotate(-1deg);box-shadow:0 12px 0 ${INK}">
  <div style="position:absolute;left:72px;right:72px;top:655px">
  ${items([
    ['A natural spring under a riverbed', "Hot mineral water rises up through the bed of the Jinquan River in Sankeng Town. That's where the name comes from: Hezhong means \"in the river.\""],
    ['Up to 60°C, over 11,000 m³ a day', "And it's sulfur-free, so there's no rotten-egg smell."],
    ['Here since the 1990s', 'It opened as the Qingxin Hot Mineral Spring resort. Gulongxia (GLX) rebuilt it in 2022 and renamed it in 2024.'],
  ], { gap: 34, h: 38, b: 31, sub: '#3B4660', mark: i => i + 1, dotBg: i => i === 1 ? CORAL : INK, dotFg: () => '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  // 3. Ticket
  'g-3': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  ${ctr(3, '#fff', TEAL)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">MY DAY PASS</div>
  <div style="display:flex;align-items:flex-end;gap:24px;margin-top:6px"><div style="font:900 170px/0.85 Fraunces;letter-spacing:-6px;color:${SUN}">¥258</div>
  <div style="font:700 36px/1.2 Fraunces;padding-bottom:10px">for two people,<br>on a Meituan deal</div></div></div>
  <img class="frame" src="${C('path')}" style="top:290px;height:560px;transform:rotate(1deg);box-shadow:0 12px 0 ${INK}">
  <div style="position:absolute;left:72px;right:72px;top:905px;color:#fff">
    <div style="font:800 42px/1.2 Inter">Everything was included:</div>
    <div style="font:500 35px/1.45 Inter;margin-top:10px;color:#E6FAF7">every pool (even the fish spa), towels, slippers, lockers, shampoo and body wash, plus tea, water and snacks.</div>
    <div style="margin-top:44px;background:rgba(255,255,255,.16);border-radius:20px;padding:24px 30px;font:500 34px/1.38 Inter"><b style="color:${SUN}">Forgot a swimsuit?</b> Reception sells them.</div>
  </div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  // 4. Best parts
  'g-4': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  ${ctr(4, CORAL, '#fff')}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">WHAT I LOVED</div><div class="h">The best parts</div></div>
  <div style="position:absolute;left:72px;right:72px;top:240px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    <img src="${C('fish')}" style="display:block;width:100%;height:400px;object-fit:cover;border-radius:26px;border:8px solid #fff;box-shadow:0 10px 0 ${INK};transform:rotate(-1.5deg)">
    <img src="${C('pom')}" style="display:block;width:100%;height:400px;object-fit:cover;border-radius:26px;border:8px solid #fff;box-shadow:0 10px 0 ${INK};transform:rotate(1.5deg)">
  </div>
  <div style="position:absolute;left:72px;right:72px;top:720px">
  ${items([
    ['The fish foot spa', "So much fun, and you can stay as long as you like."],
    ['Four tiny private tubs', 'My favorite. You set the water temperature yourself.'],
    ['The gardens after dark', 'Lanterns come on and the pools get quiet.'],
  ], { gap: 36, h: 40, b: 33, sub: '#3B4660', mark: () => '★', dotBg: i => [SUN, TEAL, CORAL][i], dotFg: () => '#fff' })}
  </div>
  <div class="hd">@enchanted.compass</div><div class="sw" style="color:${CORAL}">SWIPE →</div>`,

  // 5. Downsides
  'g-5': `<div style="position:absolute;inset:0;background:${PLUM}"></div>
  ${ctr(5, '#fff', PLUM)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">BE HONEST</div><div class="h">What I didn't love</div></div>
  <div style="position:absolute;left:72px;right:72px;top:280px">
  ${[['🥒', 'A sad snack bar', 'Only cucumbers, oranges and guava, on half-empty trays.', -1.2],
     ['💧', 'One cloudy pool', 'Things were floating in it, so I skipped it.', 1],
     ['🎤', 'KTV: almost ¥900', "For 4 hours, and nothing was included."]].map((t, i) => `
    <div style="display:flex;align-items:center;gap:34px;background:${CREAM};border-radius:30px;padding:52px 44px;margin-top:${i ? 64 : 0}px;box-shadow:0 12px 0 ${CORAL};transform:rotate(${[-1.2, 1, -0.6][i]}deg)">
      <div style="flex:none;width:130px;height:130px;border-radius:50%;background:${[SUN, TEAL, CORAL][i]};display:flex;align-items:center;justify-content:center;font-size:66px">${t[0]}</div>
      <div><div style="font:900 50px/1.1 Fraunces;color:${INK}">${t[1]}</div><div style="font:500 34px/1.35 Inter;margin-top:12px;color:#3B4660">${t[2]}</div></div></div>`).join('')}
  </div>
  <div class="hd" style="color:#fff;bottom:48px">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

  // 6. Verdict
  'g-6': `<div style="position:absolute;inset:0;background:${JADE}"></div>
  ${ctr(6, '#fff', JADE)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">MY VERDICT</div><div class="h">Worth it once</div></div>
  <img class="frame" src="${C('bridge')}" style="top:240px;height:480px;transform:rotate(1deg);box-shadow:0 12px 0 ${INK}">
  <div style="position:absolute;left:72px;right:72px;top:770px;color:#fff">
    <div style="font:500 35px/1.42 Inter">I'm glad I went. The gardens are beautiful and the fish spa was a highlight. But it was about 3 hours each way for me, so I won't be back.</div>
    <div style="margin-top:34px;background:${CREAM};color:${INK};border-radius:24px;padding:24px 30px;box-shadow:0 8px 0 ${INK};transform:rotate(-1deg)">
      <div style="font:900 34px Fraunces;color:${CORAL}">My tips</div>
      <div style="font:500 31px/1.45 Inter;margin-top:6px">Arrive after lunch and stay past dark. Check Meituan for deals first. Signs are in English and Chinese.</div></div>
  </div>
  <div class="hd" style="color:#fff;bottom:40px">@enchanted.compass</div>`,
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
