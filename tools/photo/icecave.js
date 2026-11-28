// Iceland ice caves: REAL PHOTOS (Wikimedia Commons, credited)
const { C, photo, ctr, items, render, panel, chip, head, cover } = require('./lib');
const { SUN, CORAL, TEAL, INK, CREAM, AEGEAN, PLUM, JADE } = C; const N = 6;
const S = {
 'i-1': `${photo('ic75.jpg', 0, 760, '58% 50%', 'Photo: Davide Cantelli · CC0')}
  <div class="tag" style="background:${CORAL}">ICELAND · WINTER</div>${ctr(1, N, AEGEAN)}
  <div style="position:absolute;left:0;right:0;top:760px;bottom:0;background:${INK};border-top:10px solid ${SUN}"></div>
  <div style="position:absolute;left:72px;right:72px;top:880px;color:#fff">
    <div style="font:900 88px/0.98 Fraunces;letter-spacing:-2px">The <span style="color:#7FE0FF">blue caves</span> that only exist in winter</div>
    <div style="font:500 32px/1.34 Inter;margin-top:20px;color:#DCE9FF">Season, safety rules and prices for Iceland’s ice caves.</div></div>
  <div class="hd" style="color:#fff;bottom:36px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:36px">SWIPE →</div>`,

 'i-2': `${photo('ic77.jpg', 0, 620, '50% 50%', 'Vatnajökull · Photo: Jan (northlandscapes) · CC0')}${ctr(2, N, AEGEAN)}${panel(AEGEAN)}
  ${head('THE STORY', 'Caves inside a glacier', SUN, '#fff')}</div>
  <div style="position:absolute;left:72px;right:72px;top:860px;color:#fff">
  ${items([
    ['Most tours go into Breiðamerkurjökull', 'Part of the Vatnajökull ice cap, near the Jökulsárlón lagoon.'],
    ['Different every year', 'The caves melt and change. Guides look for new ones each Aug–Sep.'],
    ['Year-round option: Katla ice cave', 'In a different glacier (Mýrdalsjökull). Tours start from Vík.'],
  ], { gap: 26, h: 33, b: 28, sub: '#E3EEFF', mark: i => i + 1, dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'i-3': `${photo('ic42.jpg', 0, 620, '50% 40%', 'Diamond Beach · Photo: Richard Banton · CC BY 2.0')}${ctr(3, N, TEAL)}${panel(TEAL)}
  ${head('WHEN TO GO', 'October to April', SUN, '#fff')}<div style="font:500 29px/1.35 Inter;margin-top:12px;color:#E6FAF7">Exact dates differ by cave and company. Some stop in March. No tours May–Sep.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:925px;color:#fff">
  ${items([
    ['Northern lights: September to April', 'The same trip can include an aurora hunt.'],
    ['Diamond Beach is next door', 'Ice on black sand, a 5–10 minute walk from Jökulsárlón.'],
  ], { gap: 26, h: 33, b: 28, sub: '#E6FAF7', mark: () => '✓', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff">@enchanted.compass</div><div class="sw" style="color:${SUN}">SWIPE →</div>`,

 'i-4': `${photo('ic90.jpg', 0, 560, '50% 50%', 'Photo: Giuseppe Milo · CC BY 3.0')}${ctr(4, N, PLUM)}${panel(PLUM, 560, CORAL)}
  ${head('READ THIS FIRST', 'Never go alone', SUN, '#fff', 600)}</div>
  <div style="position:absolute;left:72px;right:72px;top:790px;background:${CREAM};border-radius:24px;padding:22px 30px;box-shadow:0 8px 0 ${CORAL}">
    <div style="font:800 24px Inter;letter-spacing:2px;color:${CORAL}">AUGUST 2024</div>
    <div style="font:500 28px/1.35 Inter;margin-top:6px">Ice fell during a guided summer tour at Breiðamerkurjökull. One visitor died.</div></div>
  <div style="position:absolute;left:72px;right:72px;top:1010px;color:#fff">
  ${items([
    ['Only licensed companies', '30 of 34 applicants got a national park contract for 2025–26.'],
    ['8–16 guests per guide, caves checked daily', 'Tours can be cancelled for weather or ice.'],
  ], { gap: 20, h: 30, b: 26, sub: '#E9E3F5', mark: () => '!', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div class="hd" style="color:#fff;bottom:30px">@enchanted.compass</div><div class="sw" style="color:${SUN};bottom:30px">SWIPE →</div>`,

 'i-5': `${photo('ic44.jpg', 0, 560, '45% 60%', 'Diamond Beach · Photo: Lydia Harper · CC0')}${ctr(5, N, INK)}${panel(SUN, 560, CORAL)}
  ${head('PRICE + GETTING THERE', 'Plan it', CORAL, INK, 600)}</div>
  <div style="position:absolute;left:72px;right:72px;top:780px;background:#fff;border-radius:24px;padding:20px 30px;box-shadow:0 8px 0 ${INK};text-align:center">
    <div style="font:800 24px Inter;letter-spacing:2px;color:${CORAL}">STANDARD 3-HOUR TOUR, PER ADULT</div>
    <div style="font:900 72px/1.1 Fraunces;color:${AEGEAN}">21,500–23,500 ISK</div>
    <div style="font:500 24px Inter;color:#3B4660">Starting prices from two companies, Nov 2026</div></div>
  <div style="position:absolute;left:72px;right:72px;top:1020px">
  ${items([
    ['Meet at Jökulsárlón or Skaftafell', 'About 5 hours (380 km) from Reykjavík. Stay nearby.'],
    ['Minimum age: 6 to 10', 'It depends on the company.'],
  ], { gap: 16, h: 30, b: 26, sub: '#3B4660', mark: i => i + 1, dotBg: () => INK, dotFg: () => SUN })}</div>
  <div class="hd" style="bottom:30px">@enchanted.compass</div><div class="sw" style="color:${CORAL};bottom:30px">SWIPE →</div>`,

 'i-6': `${photo('ic70.jpg', 0, 600, '45% 60%', 'Photo: Eric Kilby · CC BY-SA 2.0')}${ctr(6, N, AEGEAN)}${panel(AEGEAN, 600)}
  ${head('TIPS', 'Before you go', SUN, '#fff', 640)}</div>
  <div style="position:absolute;left:72px;right:72px;top:820px;color:#fff">
  ${items([
    ['Warm layers, not cotton', 'Waterproofs, gloves, a hat and ankle boots. Helmets and crampons are provided.'],
    ['Keep a spare day', 'If your tour is cancelled, you can usually move it or get a refund.'],
  ], { gap: 22, h: 32, b: 27, sub: '#E3EEFF', mark: () => '★', dotBg: () => SUN, dotFg: () => INK })}</div>
  <div style="position:absolute;left:72px;right:72px;top:1105px;background:${CREAM};border-radius:22px;padding:18px 26px;font:500 25px/1.35 Inter"><b style="color:${CORAL}">Travel advice:</b> the UK notes volcanic eruptions on the Reykjanes peninsula, far from the ice caves. Check your own government’s advice.</div>
  <div class="hd" style="color:#fff;bottom:24px">@enchanted.compass</div>`,
};
render(S, '/home/claude/ig/out/ice/');
