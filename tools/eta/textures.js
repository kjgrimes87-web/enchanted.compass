// Textures for the passport / boarding pass / phone render (generic, no real branding)
const { chromium } = require('playwright');
const fs = require('fs');
const FS = '/home/claude/ig/design/node_modules/@fontsource/';
const b64 = (p, t) => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const font = (fam, pkg, file, w) => `@font-face{font-family:'${fam}';src:url(${b64(FS + pkg + '/files/' + file, 'font/woff2')}) format('woff2');font-weight:${w}}`;
const FONTS = font('Fraunces', 'fraunces', 'fraunces-latin-700-normal.woff2', 700) + font('Grotesk', 'space-grotesk', 'space-grotesk-latin-700-normal.woff2', 700) + font('Grotesk', 'space-grotesk', 'space-grotesk-latin-500-normal.woff2', 500);
const OUT = '/home/claude/ig/eta/';
const compass = `<svg width="300" height="300" viewBox="-150 -150 300 300"><circle r="120" fill="none" stroke="#D8B464" stroke-width="7"/><circle r="96" fill="none" stroke="#D8B464" stroke-width="3"/>
<path d="M0,-112 L18,-18 L112,0 L18,18 L0,112 L-18,18 L-112,0 L-18,-18Z" fill="#D8B464"/><path d="M0,-60 L10,-10 L60,0 L10,10 L0,60 L-10,10 L-60,0 L-10,-10Z" fill="#14254A" transform="rotate(45)"/><circle r="10" fill="#14254A"/></svg>`;
const bars = Array.from({ length: 70 }, (_, i) => `<div style="width:${[3, 6, 2, 4, 8, 3, 5][i % 7]}px;height:100%;background:#1A1F2B;margin-right:${[4, 3, 5, 2, 4][i % 5]}px"></div>`).join('');
const T = {
  passport: [900, 1260, `<div style="width:900px;height:1260px;background:#14254A;display:flex;flex-direction:column;align-items:center;font-family:Fraunces;color:#D8B464">
    <div style="margin-top:200px;font-size:84px;letter-spacing:12px">PASSPORT</div><div style="margin-top:150px">${compass}</div>
    <div style="margin-top:160px;width:140px;height:90px;border:6px solid #D8B464;border-radius:14px;opacity:.9"></div></div>`],
  pass: [1600, 640, `<div style="width:1600px;height:640px;background:#FBFAF6;display:flex;font-family:Grotesk;color:#1A1F2B">
    <div style="width:1150px;padding:50px 60px;border-right:6px dashed #C9C4B8">
      <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:46px;letter-spacing:6px;color:#0FA3A3">BOARDING PASS</div><div style="font-size:34px;color:#888">ECONOMY</div></div>
      <div style="display:flex;align-items:center;gap:60px;margin-top:50px"><div><div style="font-size:30px;color:#888">FROM</div><div style="font-size:150px;line-height:1">HKG</div></div>
      <div style="font-size:90px;color:#FF5A3C">✈</div><div><div style="font-size:30px;color:#888">TO</div><div style="font-size:150px;line-height:1">LHR</div></div></div>
      <div style="display:flex;gap:80px;margin-top:50px;font-size:30px;color:#888"><div>GATE<div style="font-size:56px;color:#1A1F2B">23</div></div><div>SEAT<div style="font-size:56px;color:#1A1F2B">34A</div></div><div>BOARDING<div style="font-size:56px;color:#1A1F2B">22:40</div></div></div></div>
    <div style="flex:1;padding:50px 40px"><div style="font-size:30px;color:#888">SEAT</div><div style="font-size:90px">34A</div><div style="height:220px;display:flex;margin-top:60px">${bars.slice(0, 2600)}</div></div></div>`],
  phone: [700, 1440, `<div style="width:700px;height:1440px;background:linear-gradient(180deg,#E8F7F5,#FFFFFF 40%);font-family:Grotesk;color:#16213A;display:flex;flex-direction:column;align-items:center">
    <div style="margin-top:90px;width:100%;display:flex;justify-content:space-between;padding:0 50px;font-size:32px"><span>9:41</span><span>●●●</span></div>
    <div style="margin-top:220px;width:300px;height:300px;border-radius:50%;background:#1DB37E;display:flex;align-items:center;justify-content:center;font-size:190px;color:#fff">✓</div>
    <div style="margin-top:70px;font-size:76px">Approved</div>
    <div style="margin-top:30px;font-size:38px;color:#5A6478;font-weight:500;text-align:center;line-height:1.35">Your travel<br>authorisation<br>is ready</div>
    <div style="margin-top:110px;width:520px;height:110px;border-radius:55px;background:#16213A;color:#fff;display:flex;align-items:center;justify-content:center;font-size:38px">Done</div></div>`],
};
(async () => {
  const br = await chromium.launch();
  for (const [n, [w, h, body]] of Object.entries(T)) {
    const p = await br.newPage({ viewport: { width: w, height: h } });
    await p.setContent(`<html><head><style>${FONTS}*{margin:0;padding:0;box-sizing:border-box}</style></head><body>${body}</body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: OUT + 'tex_' + n + '.png' });
  }
  await br.close();
})();
