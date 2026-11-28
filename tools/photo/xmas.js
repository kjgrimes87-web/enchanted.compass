// Christmas markets beyond the famous ones: REAL PHOTOS (Wikimedia Commons, credited)
const { C, photo, ctr, items, render } = require('./lib');
const { SUN, CORAL, TEAL, INK, CREAM, AEGEAN, PLUM, JADE } = C; const N = 6;
const panel = (bg) => `<div style="position:absolute;left:0;right:0;top:620px;bottom:0;background:${bg};border-top:10px solid ${SUN}"></div>`;
const chip = (t, bg, fg) => `<span style="display:inline-block;background:${bg};color:${fg};font:800 30px Inter;padding:10px 22px;border-radius:999px;margin-top:18px">${t}</span>`;
const head = (k, h, kc, hc) => `<div style="position:absolute;left:72px;right:72px;top:665px;color:${hc}"><div class="kick" style="color:${kc}">${k}</div><div class="h">${h}</div>`;
const S = {
 'x-1': `${photo('xt0.jpg', 0, 1350, '64% 50%', '')}
  <div style="position:absolute;left:0;right:0;bottom:0;height:760px;background:linear-gradient(rgba(22,33,58,0),rgba(22,33,58,.92) 42%,${INK})"></div>
  <div class="tag" style="background:${CORAL}">EUROPE · WINTER</div>${ctr(1, N, PLUM)}
  <div style="position:absolute;left:72px;right:72px;bottom:190px;color:#fff">
    <div style="font:900 100px/0.98 Fraunces;letter-spacing:-2px">Christmas markets <span style="color:${SUN}">beyond</span> the famous ones</div>
    <div style="font:500 34px/1.34 Inter;margin-top:22px;color:#ECE6FA">4 lovely markets most people skip, with their 2026 dates.</div></div>
  <div class="cr" style="top:1228px;right:72px;bottom:auto">Tallinn · Photo: Marit &amp; Toomas Hinnosaar · CC BY 2.0</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'x-2': `${photo('xm30.jpg', 0, 620, '50% 50%', 'Photo: EconAmbiente · CC BY-SA 4.0')}${ctr(2, N, AEGEAN)}${panel(AEGEAN)}
  ${head('1 · SWITZERLAND', 'Montreux Noël', SUN, '#fff')}${chip('20 Nov – 24 Dec 2026 · every day', SUN, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:930px;color:#fff">
  ${items([
    ['By Lake Geneva, with a flying Santa show', 'Visit Santa’s house at the top of Rochers-de-Naye.'],
    ['Stalls about 10/11 AM to 8–10 PM', 'Depends on the day. 24 Dec until 5 PM. No published entry price.'],
  ], { gap: 30, h: 34, b: 29, sub: '#E3EEFF', mark: () => '★', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'x-3': `${photo('xt7.jpg', 0, 620, '50% 62%', 'Photo: Ypsilon from Finland · CC0')}${ctr(3, N, JADE)}${panel(JADE)}
  ${head('2 · ESTONIA', 'Tallinn', SUN, '#fff')}${chip('20 Nov 2026 – 6 Jan 2027', CREAM, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:930px;color:#fff">
  ${items([
    ['Town Hall Square, in the medieval old town', 'Estonia’s tourism board says a Christmas tree has stood here since 1441, the first in Europe.'],
    ['Open into January', 'Hours and prices are not published.'],
  ], { gap: 30, h: 34, b: 29, sub: '#DDF3EA', mark: () => '★', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'x-4': `${photo('xv40.jpg', 0, 620, '50% 50%', 'Gemeentegrot · Photo: Superbass · CC BY-SA 4.0')}${ctr(4, N, CORAL)}${panel(CORAL)}
  ${head('3 · NETHERLANDS', 'Valkenburg', INK, '#fff')}${chip('Cave markets: 13 Nov – 30 Dec 2026', CREAM, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:930px;color:#fff">
  ${items([
    ['Stalls inside two caves', 'Gemeentegrot and Fluweelengrot. Closed 25 Dec. Christmas Town runs to 3 Jan 2027.'],
    ['Paid entry, book online', 'No published price. Mon–Thu 11–7, Fri 12–8, Sat–Sun 10–7. Weekdays are quieter.'],
  ], { gap: 30, h: 34, b: 29, sub: '#FFF0EA', mark: i => i + 1, dotBg: () => INK, dotFg: () => '#fff' })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${INK}">SWIPE →</div>`,

 'x-5': `${photo('xk0.jpg', 0, 620, '50% 45%', 'Photo: Arnaud 25 · CC BY-SA 4.0')}${ctr(5, N, TEAL)}${panel(TEAL)}
  ${head('4 · FRANCE (ALSACE)', 'Kaysersberg', SUN, '#fff')}${chip('Fri–Sun · 27–29 Nov, 4–6, 11–13, 18–20 Dec', CREAM, INK)}</div>
  <div style="position:absolute;left:72px;right:72px;top:930px;color:#fff">
  ${items([
    ['10 AM to 8 PM, free entry', 'About 30 wooden chalets selling handmade crafts.'],
    ['Christmas shuttle from Colmar', '€17 per person per day. Sold online only, in limited numbers.'],
  ], { gap: 30, h: 34, b: 29, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'x-6': `${photo('xk4.jpg', 0, 560, '50% 55%', 'Kaysersberg · Photo: Arnaud 25 · CC BY-SA 4.0')}${ctr(6, N, INK)}
  <div style="position:absolute;left:0;right:0;top:560px;bottom:0;background:${SUN};border-top:10px solid ${CORAL}"></div>
  <div style="position:absolute;left:72px;right:72px;top:605px"><div class="kick" style="color:${CORAL}">QUICK PICK</div><div class="h" style="font-size:64px">Which one is for you?</div></div>
  <div style="position:absolute;left:72px;right:72px;top:790px">
  ${[['Lake and mountain views', 'Montreux', AEGEAN], ['Open into January', 'Tallinn', JADE], ['Shopping underground', 'Valkenburg', CORAL], ['Small and handmade', 'Kaysersberg', TEAL]].map((r, i) => `
    <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:22px;padding:14px 26px;margin-top:${i ? 14 : 0}px;box-shadow:0 6px 0 ${INK}">
      <div style="font:700 30px Inter">${r[0]}</div><div style="flex:none;background:${r[2]};color:#fff;font:900 32px Fraunces;padding:6px 20px;border-radius:999px">${r[1]}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:72px;right:72px;top:1160px;text-align:center;font:600 27px/1.35 Inter"><b>Dates are for 2026 only.</b> Check the official sites before you book.</div>
  <div class="hd" style="bottom:36px">@enchanted.compass</div>`,
};
render(S, '/home/claude/ig/out/xmas/');
