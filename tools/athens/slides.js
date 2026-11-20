// Acropolis post in the bright editorial style
const { chromium } = require('playwright');
const fs = require('fs');
const D = '/home/claude/ig/athens/';
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
const T = (n) => b64(D + 'tile_' + n + '.jpg', 'image/jpeg');
const C = (n) => b64(D + 'c_' + n + '.jpg', 'image/jpeg');
const P = (n) => b64(D + 'sm_' + n + '.jpg', 'image/jpeg');
const SUN = '#FFC93C', CORAL = '#FF5A3C', TEAL = '#0FA3A3', INK = '#16213A', CREAM = '#FFF7E8', AEGEAN = '#1F5FBF';
const N = 6;

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter;color:${INK}}
.ph{position:absolute;background-size:cover;background-position:center}
.ctr{position:absolute;right:72px;top:72px;font:800 28px Inter;letter-spacing:2px;padding:10px 18px;border-radius:999px}
.hd{position:absolute;left:72px;bottom:52px;font:700 28px Inter}
.kick{font:800 28px Inter;letter-spacing:4px}
.sticker{position:absolute;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;box-shadow:0 10px 24px rgba(0,0,0,.2)}
.hand{font-family:Caveat;font-weight:700}
.row{display:flex;gap:26px;align-items:flex-start}
.dot{flex:none;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 34px Fraunces}
.src{position:absolute;right:72px;bottom:52px;font:500 22px Inter;text-align:right;opacity:.85}
`;
const ctr = (i, bg, fg) => `<div class="ctr" style="background:${bg};color:${fg}">${i}/${N}</div>`;

const S = {
  // 1. Cover
  'a-1': `<div class="ph" style="inset:0;background-image:url(${P('erechtheion-north-porch-portrait')});background-position:50% 30%;filter:saturate(1.15) brightness(1.05)"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,33,58,0) 42%,rgba(22,33,58,.62) 60%,rgba(22,33,58,.9) 80%)"></div>
  <div style="position:absolute;left:72px;top:72px;background:${TEAL};color:#fff;font:800 26px Inter;letter-spacing:4px;padding:14px 24px;border-radius:999px">GREECE · ATHENS</div>
  ${ctr(1, 'rgba(255,255,255,.92)', INK)}
  
  <div style="position:absolute;left:72px;right:72px;bottom:150px;color:#fff">
    <div style="font:900 118px/0.95 Fraunces;letter-spacing:-3px;text-shadow:0 4px 24px rgba(0,0,0,.45)">Before you climb the <span style="color:${SUN}">Acropolis</span></div>
    <div style="font:500 40px/1.3 Inter;margin-top:24px;color:#EAF0FF">Tickets, timing and the neighborhood below it.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div style="position:absolute;right:72px;bottom:52px;font:800 28px Inter;color:${SUN}">SWIPE →</div>`,

  // 2. What you'll see
  'a-2': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(2, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">ON THE ACROPOLIS</div>
  <div style="font:900 84px/1 Fraunces;margin-top:10px">What you'll see</div></div>
  <div style="position:absolute;left:72px;right:72px;top:218px;display:grid;grid-template-columns:1fr 1fr;gap:26px 30px">
  ${[['propylaea', 'Propylaea', 'The marble gateway you climb through first.'],
     ['parthenon', 'Parthenon', "The temple of Athena, finished in 438 BC."],
     ['erechtheion', 'Erechtheion', 'The Caryatid statues here are copies. The originals are in the museum.'],
     ['odeon', 'Odeon of Herodes Atticus', 'Built in AD 161. Open inside only for summer shows.']].map((t, i) => `
    <div style="background:${CREAM};border-radius:28px;overflow:hidden;box-shadow:0 10px 0 ${INK};transform:rotate(${[-1.2, 1, 0.8, -1][i]}deg)">
      <img src="${T(t[0])}" style="display:block;width:100%;aspect-ratio:3/2;object-fit:cover">
      <div style="padding:16px 24px;height:180px"><div style="font:900 34px/1.1 Fraunces">${t[1]}</div><div style="font:500 27px/1.32 Inter;margin-top:8px">${t[2]}</div></div></div>`).join('')}
  </div>
  <div class="hd">@enchanted.compass</div><div style="position:absolute;right:72px;bottom:52px;font:800 28px Inter;color:${CORAL}">SWIPE →</div>`,

  // 3. Tickets
  'a-3': `<div style="position:absolute;inset:0;background:${TEAL}"></div>
  <div class="ph" style="right:-80px;top:-80px;width:430px;height:430px;border-radius:50%;background-image:url(${P('beule-gate-propylaea')});background-position:50% 70%;border:14px solid #fff"></div>
  <div class="ctr" style="background:#fff;color:${TEAL};right:auto;left:72px">3/${N}</div>
  <div style="position:absolute;left:72px;top:150px;color:#fff"><div class="kick" style="color:${SUN}">TICKETS</div>
  <div style="font:900 220px/0.85 Fraunces;letter-spacing:-8px;color:${SUN};margin-top:10px">€30</div>
  <div style="font:700 40px/1.15 Fraunces;margin-top:6px">per adult, all year</div></div>
  <div style="position:absolute;left:72px;right:72px;top:580px;color:#fff">
  ${[['1', 'Book a time slot first.', 'Entry is timed. Buy at hhticket.gr, the official site, with no booking fee.'],
     ['2', 'Under 25 with an EU passport?', 'Entry is free. Bring your ID.'],
     ['3', 'Leave big bags and food behind.', "They aren't allowed on the site."]].map((t, i) => `
    <div class="row" style="margin-top:${i ? 52 : 0}px"><div class="dot" style="background:${i === 1 ? CORAL : '#fff'};color:${i === 1 ? '#fff' : TEAL}">${t[0]}</div>
    <div><div style="font:800 42px/1.2 Inter">${t[1]}</div><div style="font:500 35px/1.35 Inter;color:#E6FAF7;margin-top:8px">${t[2]}</div></div></div>`).join('')}</div>
  <div style="position:absolute;left:72px;right:72px;bottom:52px;background:rgba(255,255,255,.14);border-radius:18px;padding:20px 26px;font:500 28px/1.35 Inter;color:#fff"><b style="color:${SUN}">The Acropolis Museum is separate:</b> €20 at etickets.theacropolismuseum.gr</div>`,

  // 4. When to go
  'a-4': `<div style="position:absolute;inset:0;background:${CREAM}"></div>
  <div class="ph" style="left:0;right:0;top:0;height:400px;background-image:url(${P('propylaea-columns-sun-parthenon')});background-position:50% 35%"></div>
  <div style="position:absolute;left:72px;top:330px;background:${CORAL};color:#fff;padding:18px 30px;border-radius:20px;box-shadow:0 8px 0 ${INK};transform:rotate(-2deg)"><span style="font:900 56px Fraunces">When to go</span></div>
  ${ctr(4, '#fff', INK)}
  <div style="position:absolute;left:72px;right:72px;top:500px">
  ${[['☀', 'Take the 8:00 AM slot.', 'It opens at 8 daily. Mornings are cooler and calmer.'],
     ['⏱', 'Winter hours: 8:00 to 5:00.', 'Nov–Mar, last entry 4:30. Apr–Aug: until 8 PM.'],
     ['🔥', 'Heat waves close it midday.', 'Extreme heat can shut it from about 12 to 5 PM.'],
     ['★', 'Free days, every year:', 'Mar 6, Apr 18, May 18, Oct 28, the last weekend of Sept, and the first Sunday of each month, Nov–Mar.']].map((t, i) => `
    <div class="row" style="margin-top:${i ? 48 : 0}px"><div class="dot" style="background:${[SUN, TEAL, CORAL, AEGEAN][i]};color:${i ? '#fff' : INK};font:700 30px Inter">${t[0]}</div>
    <div><div style="font:800 41px/1.2 Inter">${t[1]}</div><div style="font:500 34px/1.38 Inter;color:#3B4660;margin-top:6px">${t[2]}</div></div></div>`).join('')}</div>
  <div style="position:absolute;left:72px;right:72px;bottom:44px;font:600 24px/1.4 Inter;color:#3B4660;text-align:center">Closed every year on Jan 1, Mar 25, May 1, Dec 25 and Dec 26,<br>plus Greek Orthodox Easter Sunday, which moves (May 2 in 2027)</div>`,

  // 5. Around the Acropolis
  'a-5': `<div style="position:absolute;inset:0;background:${AEGEAN}"></div>
  ${ctr(5, '#fff', AEGEAN)}
  <div style="position:absolute;left:72px;top:72px;color:#fff"><div class="kick" style="color:${SUN}">AFTER YOUR VISIT</div>
  <div style="font:900 72px/1 Fraunces;margin-top:10px">Around the Acropolis</div></div>
  <img src="${C('heph')}" style="position:absolute;left:72px;top:240px;width:936px;height:300px;object-fit:cover;border-radius:30px;border:10px solid #fff;transform:rotate(-1deg);box-sizing:border-box">
  <div class="hand" style="position:absolute;right:80px;top:548px;font-size:42px;color:${SUN};transform:rotate(-3deg)">↑ the Temple of Hephaestus, in the Ancient Agora</div>
  <div style="position:absolute;left:72px;right:72px;top:630px;color:#fff">
  ${[['Plaka', "Athens' oldest neighborhood, at the foot of the Acropolis."],
     ['Anafiotika', 'Tiny white houses built in the 1800s by builders from the island of Anafi. People live here, so keep it quiet.'],
     ['Areopagus Hill', 'A free rocky hill across from the Acropolis entrance. A local sunset spot.'],
     ['Ancient Agora', "The old city center, with one of the best-preserved Greek temples. It needs its own ticket."]].map((t, i) => `
    <div style="margin-top:${i ? 22 : 0}px"><span style="font:900 38px Fraunces;color:${SUN}">${t[0]}</span><div style="font:500 30px/1.33 Inter;margin-top:2px;color:#EAF0FF">${t[1]}</div></div>`).join('')}</div>
  <div class="hd" style="color:#fff;bottom:44px">@enchanted.compass</div><div style="position:absolute;right:72px;bottom:44px;font:800 28px Inter;color:${SUN}">SWIPE →</div>`,

  // 7. Eat, drink, look up
  'a-6': `<div style="position:absolute;inset:0;background:${SUN}"></div>
  ${ctr(6, INK, SUN)}
  <div style="position:absolute;left:72px;top:72px"><div class="kick" style="color:${CORAL}">EAT &amp; DRINK</div>
  <div style="font:900 80px/1 Fraunces;margin-top:10px">With a view</div></div>
  <img src="${P('rooftop-cocktail-acropolis-view')}" style="position:absolute;left:72px;top:240px;width:936px;height:480px;object-fit:cover;object-position:50% 35%;border-radius:30px;border:10px solid #fff;box-sizing:border-box;transform:rotate(-1deg);box-shadow:0 12px 0 ${INK}">
  <div style="position:absolute;left:72px;right:72px;top:760px">
    <div style="font:800 38px/1.25 Inter">Several bars and restaurants look straight at the Acropolis.</div>
    <div style="font:500 31px/1.36 Inter;margin-top:8px;color:#3B4660">A drink with that view was one of the best parts of my trip.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:935px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
  ${[['kook', 'Little Kook', 'A fairy-tale dessert café in Psyrri.', -1.2], ['yog', 'Greek frozen yogurt', "Amazing, but a bit pricey.", 1.2]].map(t => `
    <div style="background:${CREAM};border-radius:24px;overflow:hidden;box-shadow:0 8px 0 ${INK};transform:rotate(${t[3]}deg)">
      <img src="${C(t[0])}" style="display:block;width:100%;height:170px;object-fit:cover">
      <div style="padding:16px 22px 18px;height:118px"><div style="font:900 30px/1.1 Fraunces;color:${CORAL}">${t[1]}</div><div style="font:500 24px/1.32 Inter;margin-top:6px">${t[2]}</div></div></div>`).join('')}</div>
  <div class="hd" style="bottom:36px">@enchanted.compass</div>`,
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
