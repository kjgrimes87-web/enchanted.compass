// Monarch butterfly sanctuaries, Mexico: REAL PHOTOS (Wikimedia Commons, credited)
const { C, photo, ctr, items, render, panel, chip, head, cover } = require('./lib');
const { SUN, CORAL, TEAL, INK, CREAM, AEGEAN, PLUM, JADE } = C; const N = 6;
const S = {
 'm-1': cover('mo37.jpg', '50% 30%', 'Photo: U.S. Fish and Wildlife Service · public domain', 'MEXICO · NATURE', CORAL, N, INK,
   'The forest that turns <span style="color:#FFC93C">orange</span>', 'Millions of monarch butterflies spend the winter in Mexico’s mountains. Dates, prices and safety.'),

 'm-2': `${photo('mo26.jpg', 0, 620, '50% 35%', 'El Rosario · Photo: hspauldi · CC BY-SA 2.0')}${ctr(2, N, CORAL)}${panel(CREAM, 620, CORAL)}
  ${head('THE STORY', 'What you’ll see', CORAL, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:860px">
  ${items([
    ['They fly south from Canada and the US', 'To a few mountain forests west of Mexico City.'],
    ['They hang in huge clusters', 'Look closely above: the dark bunches on the oyamel firs are butterflies, at about 3,000 m.'],
    ['A UNESCO World Heritage Site', 'The Monarch Butterfly Biosphere Reserve, listed in 2008.'],
  ], { gap: 22, h: 32, b: 27, sub: '#3B4660', mark: i => i + 1, dotBg: i => [INK, CORAL, INK][i], dotFg: () => '#fff' })}</div>
  <div class="hd" style="bottom:30px">@enchanted.compass</div><div class="sw" style="color:${CORAL};bottom:30px">SWIPE →</div>`,

 'm-3': `${photo('mo27.jpg', 0, 620, '50% 40%', 'El Rosario · Photo: hspauldi · CC BY-SA 2.0')}${ctr(3, N, TEAL)}${panel(TEAL)}
  ${head('WHEN TO GO', 'This season', SUN, '#fff')}${chip('Open 20 Nov 2026 – 31 Mar 2027', SUN, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:925px;color:#fff">
  ${items([
    ['Best: December to February', 'The colonies are fullest from January to February.'],
    ['Midday on a sunny day', 'Cold butterflies sit still. Once they warm up, they fly.'],
    ['Open daily, about 8 AM to 5 PM', 'The walk up to the colonies takes time.'],
  ], { gap: 18, h: 31, b: 26, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff;bottom:30px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:30px">SWIPE →</div>`,

 'm-4': `${photo('mo10.jpg', 0, 560, '50% 55%', 'El Rosario · Photo: Juan Carlos Fonseca Mata · CC BY-SA 4.0')}${ctr(4, N, CORAL)}${panel(CORAL, 560, SUN)}
  ${head('6 SANCTUARIES · 2 STATES', 'Where to go', INK, '#fff', 600)}</div>
  <div style="position:absolute;left:72px;right:72px;top:785px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div style="background:${CREAM};border-radius:22px;padding:18px 24px"><div style="font:800 22px Inter;letter-spacing:2px;color:${CORAL}">STATE OF MEXICO</div><div style="font:700 28px/1.35 Inter;margin-top:6px">Piedra Herrada<br>La Mesa<br>El Capulín</div></div>
    <div style="background:${CREAM};border-radius:22px;padding:18px 24px"><div style="font:800 22px Inter;letter-spacing:2px;color:${CORAL}">MICHOACÁN</div><div style="font:700 28px/1.35 Inter;margin-top:6px">El Rosario<br>Sierra Chincua<br>Senguio</div></div></div>
  <div style="position:absolute;left:72px;right:72px;top:1025px;display:flex;gap:16px">
    ${[['150 pesos', 'Adults'], ['100 pesos', 'Ages 6–12'], ['Free', 'Under 5']].map(t => `<div style="flex:1;background:${SUN};border-radius:20px;padding:12px 0;text-align:center"><div style="font:900 36px Fraunces">${t[0]}</div><div style="font:700 22px Inter">${t[1]}</div></div>`).join('')}</div>
  <div style="position:absolute;left:72px;right:72px;top:1160px;color:#fff;font:500 22px/1.35 Inter;text-align:center">2026–27 prices at El Rosario, Sierra Chincua, Senguio and La Mesa. Piedra Herrada charged the same last season. El Capulín: no published price.</div>
  <div class="hd" style="color:#fff;bottom:24px">@enchanted.compass</div><div class="sw" style="color:${INK};bottom:24px">SWIPE →</div>`,

 'm-5': `${photo('mo20.jpg', 0, 520, '50% 50%', 'El Rosario · Photo: Maricint · CC BY-SA 4.0')}${ctr(5, N, PLUM)}${panel(PLUM, 520, CORAL)}
  ${head('READ THIS FIRST', 'Safety advice', SUN, '#fff', 560)}</div>
  <div style="position:absolute;left:72px;right:72px;top:745px;background:${CREAM};border-radius:22px;padding:20px 28px;box-shadow:0 8px 0 ${CORAL}">
    <div style="font:800 24px Inter;letter-spacing:2px;color:${CORAL}">HIGH RISK · MICHOACÁN</div>
    <div style="font:500 26px/1.36 Inter;margin-top:6px"><b>US:</b> Level 4, “Do not travel.” US government staff may not visit the reserve’s Michoacán side. <b>UK:</b> advises against all but essential travel (except Morelia, Pátzcuaro and some toll roads).</div></div>
  <div style="position:absolute;left:72px;right:72px;top:985px;background:#fff;border-radius:22px;padding:18px 28px;box-shadow:0 8px 0 ${TEAL}">
    <div style="font:800 24px Inter;letter-spacing:2px;color:${TEAL}">LOWER RISK · STATE OF MEXICO</div>
    <div style="font:500 26px/1.36 Inter;margin-top:6px"><b>US:</b> Level 2, “Exercise increased caution.” <b>UK:</b> no extra warning.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:1190px;text-align:center;color:#fff;font:600 26px Inter">Check your own government’s advice first.</div>
  <div class="hd" style="color:#fff;bottom:22px;font-size:24px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:22px;font-size:24px">SWIPE →</div>`,

 'm-6': `${photo('mo37.jpg', 0, 520, '50% 75%', 'Photo: U.S. Fish and Wildlife Service · public domain')}${ctr(6, N, JADE)}${panel(JADE, 520)}
  ${head('GOOD NEWS + TIPS', 'Before you go', SUN, '#fff', 560)}</div>
  <div style="position:absolute;left:72px;right:72px;top:740px;display:flex;align-items:center;gap:26px;background:${SUN};border-radius:22px;padding:18px 26px">
    <div style="flex:none;font:900 66px/1 Fraunces;color:${CORAL}">+64%</div>
    <div style="font:500 24px/1.34 Inter">Last winter the colonies covered 2.93 hectares, up from 1.79. Scientists say about 6 ha is needed to keep the migration safe.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:925px;color:#fff">
  ${items([
    ['Easiest trip: Piedra Herrada', 'About 2 hours by car from Mexico City.'],
    ['Wear layers, walk slowly', 'You’ll be near 3,000 m and the trails go uphill.'],
    ['Stay quiet and on the trail', 'Don’t touch or pick up the butterflies.'],
  ], { gap: 14, h: 29, b: 25, sub: '#DDF3EA', mark: () => '★', dotBg: i => [SUN, CORAL, SUN][i], dotFg: i => [INK, '#fff', INK][i] })}</div>
  <div class="hd" style="color:#fff;bottom:22px;font-size:24px">@enchanted.compass</div>`,
};
render(S, '/home/claude/ig/out/monarch/');
