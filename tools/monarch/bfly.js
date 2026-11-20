// Vector monarch butterfly (original illustration)
const FW = 'M3,-6 C30,-55 105,-108 172,-104 C186,-96 184,-74 172,-48 C160,-24 146,-8 128,2 C92,14 44,14 3,8 Z';
const HW = 'M3,10 C46,12 104,18 128,40 C146,62 140,104 112,126 C88,142 58,134 40,112 C22,90 10,60 3,26 Z';
const veinsF = [[8,0,150,-90],[8,0,166,-62],[8,2,150,-30],[8,4,124,0],[30,-20,110,-80],[40,6,96,-40]];
const veinsH = [[6,14,120,44],[6,18,124,80],[6,20,104,118],[6,22,70,126],[6,24,40,110]];
const dots = (path) => '';
function half(id) {
  const vf = veinsF.map(v => `<line x1="${v[0]}" y1="${v[1]}" x2="${v[2]}" y2="${v[3]}"/>`).join('');
  const vh = veinsH.map(v => `<line x1="${v[0]}" y1="${v[1]}" x2="${v[2]}" y2="${v[3]}"/>`).join('');
  const dF = [[150,-100,4],[166,-98,4],[178,-84,4],[178,-66,4],[170,-46,4],[158,-30,3.5],[143,-14,3.5],[128,-2,3.5],[178,-94,3],[160,-88,3.5],[170,-72,3]];
  const dH = [[132,50,4],[136,68,4],[134,88,4],[126,106,4],[112,120,4],[94,130,4],[74,130,4],[56,122,4],[124,60,3],[124,96,3],[100,120,3]];
  const c = (a) => a.map(d => `<circle cx="${d[0]}" cy="${d[1]}" r="${d[2]}"/>`).join('');
  return `<clipPath id="cf${id}"><path d="${FW}"/></clipPath><clipPath id="ch${id}"><path d="${HW}"/></clipPath>
  <g><path d="${HW}" fill="#F08A1C"/><g clip-path="url(#ch${id})" stroke="#1A120B" stroke-width="4" stroke-linecap="round">${vh}</g>
  <path d="${HW}" fill="none" stroke="#1A120B" stroke-width="18" stroke-linejoin="round" clip-path="url(#ch${id})"/>
  <path d="${FW}" fill="#E9741A"/><g clip-path="url(#cf${id})" stroke="#1A120B" stroke-width="4" stroke-linecap="round">${vf}</g>
  <path d="M100,-104 C140,-110 186,-100 172,-48 L150,-60 C160,-80 140,-96 100,-96Z" fill="#1A120B" clip-path="url(#cf${id})"/>
  <path d="${FW}" fill="none" stroke="#1A120B" stroke-width="18" stroke-linejoin="round" clip-path="url(#cf${id})"/>
  <g fill="#FFF7E8">${c(dF)}${c(dH)}</g></g>`;
}
let n = 0;
// returns an SVG string of one butterfly; w = width px; open: 0..1 wing opening (scaleX)
function bfly(w, { rot = 0, open = 1, x = 0, y = 0, op = 1, abs = true } = {}) {
  const id = 'b' + (n++);
  const L = half(id + 'L'), R = half(id + 'R');
  const h = w * 0.82;
  return `<svg viewBox="-200 -125 400 300" width="${w}" height="${w * 0.75}" style="${abs ? `position:absolute;left:${x}px;top:${y}px;` : ''}transform:rotate(${rot}deg);opacity:${op};overflow:visible">
  <g transform="scale(${open},1)"><g transform="scale(-1,1)">${L}</g>${R}</g>
  <ellipse cx="0" cy="18" rx="7" ry="44" fill="#1A120B"/><circle cx="0" cy="-30" r="9" fill="#1A120B"/>
  <path d="M-3,-36 C-14,-60 -24,-74 -34,-82 M3,-36 C14,-60 24,-74 34,-82" stroke="#1A120B" stroke-width="3" fill="none"/>
  <circle cx="-34" cy="-82" r="4" fill="#1A120B"/><circle cx="34" cy="-82" r="4" fill="#1A120B"/>
  <g fill="#FFF7E8"><circle cx="-3" cy="-30" r="2"/><circle cx="3" cy="-24" r="2"/><circle cx="-3" cy="-6" r="1.8"/><circle cx="3" cy="4" r="1.8"/></g></svg>`;
}
module.exports = { bfly };
