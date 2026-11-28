// Europe's most on-time airlines 2025 (Cirium): REAL PHOTOS (Wikimedia Commons, credited)
const { C, photo, ctr, items, render, panel, chip, head } = require('./lib');
const { SUN, CORAL, TEAL, INK, CREAM, AEGEAN, PLUM, JADE } = C; const N = 6;
const fmt = n => n.toLocaleString('en-GB');
const rank = (list, o) => list.map((r, i) => `
  <div style="display:flex;align-items:center;gap:20px;border-radius:20px;padding:12px 24px;margin-top:${i ? 12 : 0}px;background:${o.bg(i)};box-shadow:0 6px 0 ${INK}">
    <div style="flex:none;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 30px Fraunces;background:${o.nBg(i)};color:${o.nFg(i)}">${r[0]}</div>
    <div style="flex:1;font:800 31px/1.1 Inter">${r[1]}<div style="font:500 22px Inter;margin-top:3px;color:#3B4660">${r[2]} · ${fmt(r[4])} flights</div></div>
    <div style="flex:none;font:900 44px Fraunces">${r[3]}%</div></div>`).join('');
const S = {
 'eu-1': `${photo('a10.jpg', 0, 600, '50% 50%', 'Iberia Express · Photo: MarcelX42 · CC BY-SA 4.0')}
  <div class="tag" style="background:${CORAL}">EUROPE · 2025 DATA</div>${ctr(1, N, AEGEAN)}
  <div style="position:absolute;left:0;right:0;top:600px;bottom:0;background:${INK};border-top:10px solid ${SUN}"></div>
  <div style="position:absolute;left:72px;right:72px;top:760px;color:#fff">
    <div style="font:900 104px/0.98 Fraunces;letter-spacing:-2px">Europe’s most <span style="color:${SUN};white-space:nowrap">on&#8209;time</span> airlines</div>
    <div style="font:500 34px/1.34 Inter;margin-top:24px;color:#DCE9FF">The full-year 2025 top 10 from flight data company Cirium, plus the best airports.</div></div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'eu-2': `${photo('a12.jpg', 0, 560, '50% 55%', 'Madrid · Photo: Bene Riobó · CC BY-SA 4.0')}${ctr(2, N, AEGEAN)}${panel(CREAM, 560, AEGEAN)}
  ${head('THE RULES', 'What “on time” means', CORAL, INK, 600)}</div>
  <div style="position:absolute;left:72px;right:72px;top:790px;background:${SUN};border-radius:24px;padding:16px 30px;box-shadow:0 8px 0 ${INK};text-align:center">
    <div style="font:900 84px/1.05 Fraunces">&lt; 15 min</div>
    <div style="font:700 29px/1.3 Inter">late at the arrival gate (exactly: 14 min 59 s)</div></div>
  <div style="position:absolute;left:72px;right:72px;top:1010px">
  ${items([
    ['All flights of 2025', 'Published by Cirium on 2&nbsp;January&nbsp;2026, from over 600 data sources.'],
    ['Airports are measured differently', 'They count on-time departures, not arrivals.'],
  ], { gap: 16, h: 30, b: 26, sub: '#3B4660', mark: i => i + 1, dotBg: i => [AEGEAN, CORAL][i], dotFg: () => '#fff' })}</div>
  <div class="hd" style="bottom:26px">@enchanted.compass</div><div class="sw" style="color:${CORAL};bottom:26px">SWIPE →</div>`,

 'eu-3': `${photo('a15.jpg', 0, 440, '50% 22%', 'L:Photo: Bene Riobó · CC BY-SA 4.0')}${ctr(3, N, CORAL)}${panel(CORAL, 440, SUN)}
  ${head('EUROPE 2025 · 1 TO 5', 'The top five', INK, '#fff', 478)}</div>
  <div style="position:absolute;left:72px;right:72px;top:650px">
  ${rank([[1, 'Iberia Express', 'Spain', '88.94', 37119], [2, 'SAS', 'Scandinavia', '86.09', 249674], [3, 'Austrian', 'Austria', '83.74', 124457], [4, 'Iberia', 'Spain', '83.52', 188447], [5, 'Virgin Atlantic', 'UK', '83.45', 26359]],
    { bg: i => i ? CREAM : SUN, nBg: i => i ? INK : CORAL, nFg: i => i ? SUN : '#fff' })}</div>
  <div style="position:absolute;left:72px;right:72px;top:1240px;text-align:center;color:#fff;font:600 24px Inter">% = share of flights that arrived on time</div>
  <div class="hd" style="color:#fff;bottom:22px;font-size:24px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:22px;font-size:24px">SWIPE →</div>`,

 'eu-4': `${photo('a21.jpg', 0, 440, '50% 45%', 'SAS · Photo: BriYYZ · CC BY-SA 2.0')}${ctr(4, N, TEAL)}${panel(TEAL, 440)}
  ${head('EUROPE 2025 · 6 TO 10', 'The rest of the top 10', SUN, '#fff', 478)}</div>
  <div style="position:absolute;left:72px;right:72px;top:650px">
  ${rank([[6, 'Icelandair', 'Iceland', '83.23', 39425], [7, 'Vueling', 'Spain', '82.20', 228611], [8, 'Turkish Airlines', 'Türkiye', '81.41', 421090], [9, 'Norwegian', 'Norway', '80.96', 150784], [10, 'Finnair', 'Finland', '79.67', 116652]],
    { bg: () => CREAM, nBg: () => INK, nFg: () => SUN })}</div>
  <div style="position:absolute;left:72px;right:72px;top:1240px;text-align:center;color:#fff;font:600 24px Inter">Turkish Airlines flew the most flights in this top 10.</div>
  <div class="hd" style="color:#fff;bottom:22px;font-size:24px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:22px;font-size:24px">SWIPE →</div>`,

 'eu-5': `${photo('a27.jpg', 0, 560, '50% 55%', 'Oslo Gardermoen · Photo: Bahnfrend · CC BY-SA 4.0')}${ctr(5, N, PLUM)}${panel(PLUM, 560)}
  ${head('GOOD TO KNOW', 'The stories behind it', SUN, '#fff', 600)}</div>
  <div style="position:absolute;left:72px;right:72px;top:790px;color:#fff">
  ${items([
    ['Iberia Express: top again', 'Europe’s number 1 for the third year in a row, says Euronews.'],
    ['SAS: 3rd in the whole world', 'The best European airline in Cirium’s global top 10.'],
    ['Virgin Atlantic: most improved', 'From 74.02% in 2024 to 83.45% in 2025.'],
    ['Based on 2025 only', 'Past results don’t guarantee your next flight.'],
  ], { gap: 16, h: 30, b: 26, sub: '#E9E3F5', mark: () => '★', dotBg: i => [SUN, CORAL, SUN, CORAL][i], dotFg: i => [INK, '#fff', INK, '#fff'][i] })}</div>
  <div class="hd" style="color:#fff;bottom:24px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:24px">SWIPE →</div>`,

 'eu-6': `${photo('a35.jpg', 0, 440, '50% 45%', 'Oslo Gardermoen · Photo: Wiki.cullin · CC0')}${ctr(6, N, INK)}${panel(SUN, 440, AEGEAN)}
  ${head('ON-TIME DEPARTURES 2025', 'Europe’s best airports', CORAL, INK, 478)}</div>
  <div style="position:absolute;left:72px;right:72px;top:650px">
  ${rank([['4', 'Stavanger', 'Norway · small', '89.55', 38894], ['5', 'Oslo Gardermoen', 'Norway · large', '86.00', 204882], ['8', 'Copenhagen', 'Denmark · large', '84.72', 236903], ['10', 'Stockholm Arlanda', 'Sweden · large', '83.59', 181238]],
    { bg: () => '#fff', nBg: () => AEGEAN, nFg: () => '#fff' })}</div>
  <div style="position:absolute;left:72px;right:72px;top:1060px;text-align:center;font:600 24px/1.35 Inter;color:#3B4660">The number is the world rank in Cirium’s list for that airport size.</div>
  <div style="position:absolute;left:72px;right:72px;top:1150px;text-align:center;font:900 44px/1.2 Fraunces">Which airline do you fly most?</div>
  <div class="hd" style="bottom:26px">@enchanted.compass</div>`,
};
render(S, '/home/claude/ig/out/air/');
