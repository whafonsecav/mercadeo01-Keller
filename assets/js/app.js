/* =========================================================
   COLOMBINA · PIRÁMIDE DE KELLER — motor de la keynote
   Navegación: ← → / PageUp PageDown (clicker) / swipe / botones
   F = pantalla completa · O = índice · M = silencio
   El CONTENIDO editable (juegos, línea de tiempo, pirámide) está en data.js
   ========================================================= */
(() => {
'use strict';
const D = window.DATA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const stage = $('#stage');
const slides = $$('.slide', stage);
let cur = -1;

/* ---------- Escala 16:9 ---------- */
function fit() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `translate(-50%,-50%) scale(${s})`;
}
addEventListener('resize', fit); fit();

/* ---------- Imágenes de producto: usa assets/img/productos/<nombre>.png si existe ---------- */
const PROD = n => [`assets/img/productos/${n}.png`, `assets/img/${n}.webp`];
function setProd(img) {
  const [png, webp] = PROD(img.dataset.prod);
  const fail = () => {
    img.style.display = 'none';
    if (img.dataset.fb && !img.nextElementSibling?.classList.contains('prod-fb')) {
      const s = document.createElement('span'); s.className = 'prod-fb'; s.textContent = img.dataset.fb; img.after(s);
    }
  };
  img.onerror = () => { img.onerror = fail; img.src = webp; };
  img.src = png;
}
$$('img[data-prod]').forEach(setProd);
const PRODS = ['bonbonbum', 'coffee_delight', 'nucita', 'chocobreak', 'bridge'];
const loadProd = n => new Promise(res => {
  const i = new Image(); i.onload = () => res(i);
  i.onerror = () => { i.onerror = () => res(null); i.src = PROD(n)[1]; };
  i.src = PROD(n)[0];
});

/* ---------- Sonido (sintetizado, sin archivos) ---------- */
const sfx = (() => {
  let ctx = null, muted = false;
  const init = () => {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (ctx && ctx.state === 'suspended') ctx.resume();
  };
  function tone(f, dur = .15, type = 'sine', vol = .18, when = 0, to = 0) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + when, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + .03);
  }
  return {
    init, toggle() { muted = !muted; return muted; },
    pop() { tone(420 + Math.random() * 200, .12, 'sine', .2, 0, 1100); },
    tick() { tone(1200, .03, 'square', .03); },
    ok() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .28, 'triangle', .15, i * .08)); },
    bad() { tone(200, .32, 'sawtooth', .07, 0, 110); },
    swish() { tone(260, .3, 'sine', .035, 0, 700); },
    win() { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .4, 'triangle', .13, i * .09)); }
  };
})();

/* ---------- Confeti / lluvia de dulces ---------- */
const fx = (() => {
  const cv = $('#fx'), c = cv.getContext('2d');
  let W, H, Dp, parts = [], raf = null, imgs = [];
  Promise.all(PRODS.map(loadProd)).then(a => { imgs = a.filter(Boolean); });
  const COL = ['#E4002B', '#FFC72C', '#FF4F9A', '#7B3FE4', '#1FBF75', '#2E48B8', '#FF7A00', '#ffffff'];
  function size() { Dp = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * Dp; H = cv.height = innerHeight * Dp; }
  size(); addEventListener('resize', size);
  const add = p => { if (parts.length < 520) parts.push(p); if (!raf) raf = requestAnimationFrame(loop); };
  function burst(x, y, n = 80, o = {}) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = (4 + Math.random() * 11) * (o.power || 1) * Dp;
      add({ x: x * Dp, y: y * Dp, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 7 * Dp, g: .34 * Dp, r: Math.random() * 6.3,
        vr: (Math.random() - .5) * .3, s: (7 + Math.random() * 9) * Dp, c: COL[i % COL.length], sh: Math.random() < .5,
        life: 1.2, dec: .006 + Math.random() * .008, img: o.candy && imgs.length && Math.random() < .4 ? imgs[i % imgs.length] : null });
    }
  }
  function rain(n = 50) {
    if (!imgs.length) { burst(innerWidth / 2, innerHeight / 3, n * 2); return; }
    for (let i = 0; i < n; i++) add({ x: Math.random() * W, y: -Math.random() * H * .7 - 60 * Dp, vx: (Math.random() - .5) * 2 * Dp,
      vy: (1 + Math.random() * 3) * Dp, g: .14 * Dp, r: Math.random() * 6, vr: (Math.random() - .5) * .08, s: (34 + Math.random() * 34) * Dp,
      img: imgs[i % imgs.length], life: 1, dec: 0, floor: true });
  }
  function loop() {
    c.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.life > 0 && p.y < H + 300);
    for (const p of parts) {
      p.vy += p.g; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= p.dec;
      if (p.floor && p.y > H - p.s * .5) { p.y = H - p.s * .5; p.vy *= -.42; p.vx *= .8; p.vr *= .7; if (Math.abs(p.vy) < 1.2) p.dec = .012; }
      c.save(); c.globalAlpha = Math.max(0, Math.min(1, p.life)); c.translate(p.x, p.y); c.rotate(p.r);
      if (p.img) { const w = p.s * 1.5, h = w * p.img.naturalHeight / p.img.naturalWidth; c.drawImage(p.img, -w / 2, -h / 2, w, h); }
      else { c.fillStyle = p.c; if (p.sh) { c.beginPath(); c.arc(0, 0, p.s / 2, 0, 6.283); c.fill(); } else c.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); }
      c.restore();
    }
    raf = parts.length ? requestAnimationFrame(loop) : null;
  }
  return { burst, rain, at(el, n = 80, o) { const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n, o); } };
})();

function floatEmoji(ch, x, y) {
  const d = document.createElement('div');
  d.className = 'floatemo'; d.textContent = ch;
  d.style.left = (x - 32) + 'px'; d.style.top = (y - 40) + 'px';
  d.style.setProperty('--x', (Math.random() * 180 - 90) + 'px');
  d.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');
  document.body.appendChild(d); setTimeout(() => d.remove(), 1450);
}
const ptXY = (e, el) => { if (e && e.clientX) return [e.clientX, e.clientY]; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

/* ---------- Fondo: dulces flotando ---------- */
(() => {
  const box = $('#floaters');
  const spots = [[4, 12], [88, 8], [72, 70], [12, 78], [46, 90], [93, 44], [30, 4], [60, 18], [2, 46], [80, 92], [38, 55], [66, 44]];
  spots.forEach(([x, y], i) => {
    const im = new Image(); im.alt = ''; im.dataset.prod = PRODS[i % PRODS.length];
    const sz = 70 + (i * 37) % 110;
    Object.assign(im.style, { left: x + '%', top: y + '%', width: sz + 'px' });
    im.style.setProperty('--t', (16 + (i * 5) % 14) + 's');
    im.style.setProperty('--dl', (-i * 2.3) + 's');
    im.style.setProperty('--dx', ((i % 2 ? 1 : -1) * (30 + i * 6)) + 'px');
    im.style.setProperty('--dy', ((i % 3 ? -1 : 1) * (40 + i * 5)) + 'px');
    im.style.setProperty('--r0', (i * 29 % 60 - 30) + 'deg');
    im.style.setProperty('--r1', (i * 47 % 80 - 40) + 'deg');
    if (i % 3 === 0) im.classList.add('blur');
    box.appendChild(im); setProd(im);
  });
})();

/* ---------- Mascota Bumi: solo aparece en escenas con juego ---------- */
const bumi = $('#bumi'), bubble = $('#bumi .bubble');
function say(text, happy) {
  clearTimeout(say.t);
  if (!text) { bumi.classList.remove('show'); bubble.classList.add('hide'); return; }
  bumi.classList.add('show');
  bubble.classList.add('hide');
  say.t = setTimeout(() => { bubble.innerHTML = text; bubble.classList.remove('hide'); }, 240);
  if (happy) { bumi.classList.remove('happy'); void bumi.offsetWidth; bumi.classList.add('happy'); }
}
bumi.addEventListener('click', () => { sfx.pop(); say(slides[cur].dataset.bumi, true); });

/* ---------- Pirámide (SVG) ---------- */
const P = {
  rel: { n: 'Relevancia', c: ['#E4002B', '#FF4D6A'], pts: '119.8,658.5 880.2,658.5 1000,866 0,866', x: 500, y: 770, ys: 722, fs: 50, sy: [782, 818], sfs: 23 },
  des: { n: 'Desempeño', c: ['#2E48B8', '#5B7BFF'], pts: '244.8,442 491,442 491,640.5 130.2,640.5', x: 345, y: 548, ys: 500, fs: 40, sy: [548, 578, 608], sfs: 19 },
  img: { n: 'Imágenes', c: ['#FF7A00', '#FFA53D'], pts: '509,442 755.2,442 869.8,640.5 509,640.5', x: 655, y: 548, ys: 500, fs: 40, sy: [548, 578, 608], sfs: 19 },
  jui: { n: 'Juicios', c: ['#6A3FE0', '#9272FF'], pts: '369.8,225.5 491,225.5 491,424 255.2,424', x: 402, y: 335, ys: 318, fs: 32, sy: [358, 383, 407], sfs: 16 },
  sen: { n: 'Sentimientos', c: ['#FF4F9A', '#FF85BC'], pts: '509,225.5 630.2,225.5 744.8,424 509,424', x: 598, y: 338, ys: 318, fs: 25, sy: [358, 383, 407], sfs: 16 },
  res: { n: 'Resonancia', c: ['#FFB400', '#FFE27A'], pts: '500,0 619.8,207.5 380.2,207.5', x: 500, y: 158, ys: 186, fs: 27, ink: '#3A2200', sy: [96, 120, 144], sfs: 14.5 }
};
const ORDER = ['rel', 'des', 'img', 'jui', 'sen', 'res'];
const LEVEL_Y = [762, 541, 325, 128];         // centro vertical de cada nivel (1 = base … 4 = cima)
let uid = 0;
function buildPyr(el) {
  const set = s => new Set(s === 'all' ? ORDER : (s || '').split(',').map(t => t.trim()).filter(Boolean));
  const lit = set(el.dataset.lit), nw = set(el.dataset.new), sub = el.dataset.sub, id = 'p' + (uid++);
  let d = 0, s = `<svg viewBox="-14 -14 1028 894" role="img" aria-label="Pirámide de Keller"><defs>`;
  for (const k of ORDER) s += `<linearGradient id="${id}${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[k].c[1]}"/><stop offset="1" stop-color="${P[k].c[0]}"/></linearGradient>`;
  s += `</defs>`;
  for (const k of ORDER) {
    const b = P[k], on = lit.has(k) || nw.has(k), isNew = nw.has(k);
    let cls = 'blk'; if (!on) cls += ' ghost'; if (isNew) cls += ' new'; else if (on && nw.size && el.dataset.dim !== '0') cls += ' dim';
    const subs = on && sub ? D.PYR_SUB[sub][k] : null, ink = b.ink || '#fff';
    s += `<g class="${cls}" data-k="${k}" style="--d:${isNew ? (.3 + (d++) * .45) : 0}s">`;
    s += `<polygon points="${b.pts}" fill="url(#${id}${k})" stroke="${b.c[0]}"/>`;
    s += `<text x="${b.x}" y="${subs ? b.ys : b.y}" font-size="${b.fs}" style="fill:${on ? ink : ''}">${b.n}</text>`;
    if (subs) subs.forEach((t, i) => { s += `<text class="sub" x="${b.x}" y="${b.sy[i]}" font-size="${b.sfs}" style="fill:${ink}">${t}</text>`; });
    s += `</g>`;
  }
  el.innerHTML = s + '</svg>';
  if (el.classList.contains('tapable')) $$('.blk', el).forEach(g => g.addEventListener('click', () => {
    if (g.classList.contains('ghost')) return;
    el.dispatchEvent(new CustomEvent('blk', { detail: g.dataset.k }));
  }));
}
function selBlk(el, k) { $$('.blk', el).forEach(g => g.classList.toggle('sel', g.dataset.k === k)); }

/* Pirámide con etiquetas alineadas a cada nivel (izquierda / derecha) */
function buildAligned(el) {
  const W = +el.dataset.w, k = W / 1028, H = 894 * k, gap = 34, only = +el.dataset.only || 0;
  const pyr = document.createElement('div');
  pyr.className = 'pyr' + (el.dataset.tap ? ' tapable noswipe' : '');
  ['lit', 'sub', 'new'].forEach(a => { if (el.dataset[a]) pyr.dataset[a] = el.dataset[a]; });
  pyr.style.width = W + 'px';
  const col = side => {
    const c = document.createElement('div'); c.className = 'al-col ' + side; c.style.height = H + 'px';
    const items = D.ALIGN[el.dataset[side]] || [];
    items.forEach((html, i) => {
      if (!html || (only && i + 1 !== only)) return;
      const y = LEVEL_Y[i], edge = (side === 'left' ? 500 - .57737 * y : 500 + .57737 * y) + 14;
      const lab = document.createElement('div');
      lab.className = 'al-lab lv' + (i + 1) + (el.dataset.frag === side || el.dataset.frag === 'both' ? ' f' : '');
      lab.style.top = ((y + 14) * k) + 'px';
      lab.style.setProperty('--len', (gap + (side === 'left' ? edge * k : W - edge * k) - 12) + 'px');
      lab.innerHTML = html; c.appendChild(lab);
    });
    return c;
  };
  el.style.setProperty('--gap', gap + 'px');
  el.append(col('left'), pyr, col('right'));
  buildPyr(pyr);
}
$$('.pyr-al').forEach(buildAligned);
$$('.pyr').forEach(p => { if (!p.firstChild) buildPyr(p); });

/* ---------- Láminas de respuesta: puntos de cada bloque (data.js → BLOCKS) ---------- */
$$('.ans-cols').forEach(box => {
  const keys = box.dataset.blocks.split(','), split = box.hasAttribute('data-split');
  const item = (x, k, j) => `<div class="ai rise" style="--bc:${P[k].c[1]};--d:${(.3 + j * .06).toFixed(2)}s"><span class="ic">${x.i}</span><div><b>${x.t}</b><em class="tg">${x.tag}</em><span>${x.s}</span></div></div>`;
  const head = k => `<div class="acol-h rise" style="color:${P[k].c[1]};--d:.2s">${D.BLOCKS[k].h}</div>`;
  if (split) { const k = keys[0]; box.classList.add('split'); box.innerHTML = head(k) + D.BLOCKS[k].items.map((x, j) => item(x, k, j)).join(''); }
  else box.innerHTML = keys.map((k, c) => `<div class="acol">${head(k)}${D.BLOCKS[k].items.map((x, j) => item(x, k, j * 2 + c)).join('')}</div>`).join('');
});

/* ---------- Modal infográfico ---------- */
const modal = $('#modal');
function openModal(o) {
  modal.style.setProperty('--mc', o.color || '#FFC72C');
  $('.m-kicker', modal).innerHTML = o.kicker || '';
  $('.m-title', modal).innerHTML = o.title || '';
  $('.m-body', modal).innerHTML = o.html || '';
  $('.m-body', modal).scrollTop = 0;
  modal.classList.remove('open'); void modal.offsetWidth; modal.classList.add('open'); sfx.pop();
}
const closeModal = () => modal.classList.remove('open');
const modalOpen = () => modal.classList.contains('open');
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.mx')) closeModal(); });
function richHTML(n) {
  let h = '';
  if (n.lead) h += `<p class="m-lead">${n.lead}</p>`;
  if (n.tiles) h += `<div class="m-tiles">${n.tiles.map((t, i) => `<div class="m-tile" style="--i:${i}"><div class="mi">${t.i}</div><b>${t.b}</b><span>${t.s}</span></div>`).join('')}</div>`;
  if (n.people) h += `<div class="m-tree">${n.people.map((p, i) => `${i ? '<span class="arrow">→</span>' : ''}<div class="person${p.hl ? ' hl' : ''}" style="--i:${i}"><div class="av">${p.i}</div><b>${p.n}</b><span>${p.r}</span></div>`).join('')}</div>`;
  if (n.gloss) h += `<div class="m-gloss">${n.gloss.map((g, i) => `<div style="--i:${i}"><b>${g.t}</b><span>${g.d}</span></div>`).join('')}</div>`;
  if (n.body) h += `<div class="m-text">${n.body}</div>`;
  if (n.why) h += `<div class="m-why"><b>¿Por qué importa para la marca?</b> ${n.why}</div>`;
  if (n.src) h += `<div class="m-src">Fuente: ${n.src}</div>`;
  return h;
}

/* ---------- Ruleta: ¿quién responde? (sin repetir) ---------- */
const picker = $('#picker');
(() => {
  const opts = D.PICKER, n = opts.length, a = 360 / n, R = 250, KEY = 'colombina-ruleta-v2';
  const cols = ['#E4002B', '#FFC72C', '#2E48B8', '#FF4F9A', '#7B3FE4', '#FF7A00', '#1FBF75', '#00A6D6', '#B06A2C', '#5B7BFF'];
  let s = `<svg viewBox="-262 -262 524 524" class="wheel-svg"><g class="wheel">`;
  opts.forEach((o, i) => {
    const a0 = (i * a - 90) * Math.PI / 180, a1 = ((i + 1) * a - 90) * Math.PI / 180;
    s += `<g class="seg" data-i="${i}"><path d="M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 0 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z" fill="${cols[i % cols.length]}" stroke="#fff" stroke-width="4"/>`;
    s += `<g transform="rotate(${i * a + a / 2})"><text x="0" y="-165" text-anchor="middle" dominant-baseline="middle" font-size="48">${o.e}</text></g></g>`;
  });
  s += `</g><circle r="46" fill="#fff" stroke="#081240" stroke-width="4"/><text y="4" text-anchor="middle" dominant-baseline="middle" font-size="42">🎲</text></svg>`;
  $('.wheel-box', picker).insertAdjacentHTML('afterbegin', s);
  let used = new Set();
  try { used = new Set(JSON.parse(localStorage.getItem(KEY) || '[]').filter(i => i < n)); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...used])); } catch (e) {} };
  const paint = () => {
    $$('.seg', picker).forEach(g => g.classList.toggle('used', used.has(+g.dataset.i)));
    $('.pk-left', picker).textContent = `Quedan ${n - used.size} de ${n} sin salir`;
  };
  paint();
  let rot = 0, busy = false;
  const wheel = $('.wheel', picker), out = $('.pk-out', picker);
  $('.pk-spin', picker).addEventListener('click', () => {
    if (busy) return; busy = true; out.classList.remove('on');
    let pool = opts.map((_, i) => i).filter(i => !used.has(i));
    if (!pool.length) { used.clear(); paint(); pool = opts.map((_, i) => i); }
    const target = pick(pool);
    const want = (360 - (target * a + a / 2) + (Math.random() - .5) * a * .6 + 360) % 360;
    rot += 360 * 6 + ((want - rot % 360) + 360) % 360;
    wheel.style.transform = `rotate(${rot}deg)`;
    let t = 0; const tk = setInterval(() => { sfx.tick(); if (++t > 26) clearInterval(tk); }, 150);
    setTimeout(() => {
      busy = false; used.add(target); save(); paint();
      out.innerHTML = `<span class="e">${opts[target].e}</span><span>Responde la persona más cercana con<b>${opts[target].t}</b></span>`;
      out.classList.add('on'); sfx.win(); fx.at(out, 70);
    }, 4300);
  });
  $('.pk-reset', picker).addEventListener('click', e => { e.stopPropagation(); used.clear(); save(); paint(); sfx.pop(); });
  picker.addEventListener('click', e => { if (e.target === picker || e.target.closest('.pk-x')) picker.classList.remove('open'); });
  document.addEventListener('click', e => {
    const b = e.target.closest('.picker-btn'); if (!b) return;
    e.stopPropagation(); out.classList.remove('on'); out.innerHTML = ''; paint(); picker.classList.add('open'); sfx.pop();
  });
})();
const pickerOpen = () => picker.classList.contains('open');

/* ---------- Contadores ---------- */
const fmt = (v, dec) => v.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
function runCount(el) {
  const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), t0 = performance.now(), dur = 1700;
  cancelAnimationFrame(el._r);
  const tickf = t => {
    const q = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(2, -10 * q);
    el.textContent = fmt(to * (q === 1 ? 1 : e), dec);
    if (q < 1) el._r = requestAnimationFrame(tickf);
  };
  el._r = requestAnimationFrame(tickf);
}

/* ---------- Línea de tiempo (construida desde data.js) ---------- */
$$('.tl-track').forEach(track => {
  track.innerHTML = D.TIMELINE.map((n, i) => `
    <div class="tl-node${i ? ' f' : ' on cur'}" data-i="${i}" style="--nc:${n.c || '#FFC72C'}">
      <div class="yr">${n.prod ? `<img data-prod="${n.prod}" alt="">` : `<span class="ico">${n.i}</span>`}<span>${n.y}</span></div><div class="dot"></div>
      <h4>${n.t}</h4>
      <ul class="checks">${n.checks.map(c => `<li>${c}</li>`).join('')}</ul>
      <button class="more">⊕ Toca para ver más</button>
    </div>`).join('');
  $$('img[data-prod]', track).forEach(setProd);
});

/* ---------- Pasos (fragmentos) ---------- */
function groups(sl) {
  if (sl._g) return sl._g;
  const g = [];
  $$('.f', sl).forEach(e => { if (e.classList.contains('w') && g.length) g[g.length - 1].push(e); else g.push([e]); });
  return (sl._g = g);
}
function setStep(sl, n) {
  const g = groups(sl);
  g.forEach((grp, i) => grp.forEach(e => {
    const was = e.classList.contains('on'), on = i < n;
    e.classList.toggle('on', on);
    if (on && !was) $$('.count', e).concat(e.classList.contains('count') ? [e] : []).forEach(runCount);
  }));
  sl._step = n;
  const h = HOOK[sl.dataset.hook]; if (h && h.step) h.step(sl, n);
}

/* ---------- Navegación ---------- */
const HOOK = {};
function go(n, back = false) {
  if (n < 0 || n >= slides.length || n === cur) return;
  closeModal(); picker.classList.remove('open');
  const old = slides[cur];
  if (old) { old.classList.remove('active'); const h = HOOK[old.dataset.hook]; if (h && h.leave) h.leave(old); }
  cur = n;
  const sl = slides[n];
  slides.forEach((s, i) => s.classList.toggle('past', i < n));
  sl.classList.add('active');
  setStep(sl, back ? groups(sl).length : 0);
  $$('.count', sl).filter(e => !e.closest('.f')).forEach(runCount);
  const h = HOOK[sl.dataset.hook]; if (h && h.enter) h.enter(sl, back);
  hud(sl); sfx.swish();
  try { history.replaceState(null, '', location.pathname + location.search + '#' + (n + 1)); } catch (e) {}
}
function next() {
  if (pickerOpen()) { picker.classList.remove('open'); return; }
  if (modalOpen()) { closeModal(); return; }
  const sl = slides[cur], h = HOOK[sl.dataset.hook];
  if (h && h.next && h.next(sl)) return;
  if (sl._step < groups(sl).length) setStep(sl, sl._step + 1); else go(cur + 1);
}
function prev() {
  if (pickerOpen()) { picker.classList.remove('open'); return; }
  if (modalOpen()) { closeModal(); return; }
  const sl = slides[cur], h = HOOK[sl.dataset.hook];
  if (h && h.prev && h.prev(sl)) return;
  if (sl._step > 0) setStep(sl, sl._step - 1); else go(cur - 1, true);
}

/* ---------- HUD ---------- */
const sectionTag = $('#section-tag');
function hud(sl) {
  $('#progress i').style.width = ((cur + 1) / slides.length * 100) + '%';
  $('#counter').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  let sec = ''; for (let i = cur; i >= 0; i--) if (slides[i].dataset.section) { sec = slides[i].dataset.section; break; }
  sectionTag.textContent = sl.hasAttribute('data-nomark') ? '' : sec;
  document.body.classList.toggle('show-mark', !sl.hasAttribute('data-nomark'));
  const bg = (sl.dataset.bg || '#2E48B8,#E4002B,#7B3FE4').split(',');
  const bgEl = $('#bg'); ['--c1', '--c2', '--c3'].forEach((v, i) => bgEl.style.setProperty(v, bg[i]));
  bumi.classList.toggle('right', sl.dataset.bumiSide === 'right');
  say(sl.dataset.bumi || '');
  $$('#overview button').forEach((b, i) => b.classList.toggle('cur', i === cur));
}

/* ---------- Entrada: teclado, swipe, botones ---------- */
let idleT; const wake = () => { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 2600); };
['pointermove', 'pointerdown', 'keydown'].forEach(ev => addEventListener(ev, wake, { passive: true })); wake();
document.addEventListener('keydown', e => {
  if (e.repeat && !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
  const k = e.key;
  if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); sfx.init(); closeOverview(); next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(k)) { e.preventDefault(); closeOverview(); prev(); }
  else if (k === 'Home') go(0); else if (k === 'End') go(slides.length - 1);
  else if (k === 'f' || k === 'F') fullscreen();
  else if (k === 'o' || k === 'O') toggleOverview();
  else if (k === 'Escape') { if (modalOpen()) closeModal(); else if (pickerOpen()) picker.classList.remove('open'); else toggleOverview(); }
  else if (k === 'm' || k === 'M') toggleMute();
});
let sw = null;
stage.addEventListener('pointerdown', e => {
  sfx.init();
  if (e.target.closest('.noswipe') || modalOpen() || pickerOpen()) { sw = null; return; }
  sw = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId };
});
addEventListener('pointerup', e => {
  if (!sw || e.pointerId !== sw.id) return;
  const dx = e.clientX - sw.x, dy = e.clientY - sw.y, dt = Date.now() - sw.t; sw = null;
  if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 900) dx < 0 ? next() : prev();
});
document.addEventListener('pointerup', () => { const a = document.activeElement; if (a && a !== document.body && a.blur) a.blur(); });
document.addEventListener('contextmenu', e => e.preventDefault());
$('#b-next').onclick = () => next();
$('#b-prev').onclick = () => prev();
$('#b-full').onclick = () => fullscreen();
$('#b-menu').onclick = () => toggleOverview();
$('#b-mute').onclick = () => toggleMute();
function fullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen && document.exitFullscreen();
}
function toggleMute() { const m = sfx.toggle(); $('#b-mute').style.opacity = m ? .3 : ''; }
const ov = $('#overview');
slides.forEach((s, i) => {
  const b = document.createElement('button');
  b.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b>${s.dataset.title || 'Diapositiva'}`;
  b.onclick = () => { closeOverview(); go(i); };
  $('.grid', ov).appendChild(b);
});
function toggleOverview() { ov.classList.toggle('open'); }
function closeOverview() { ov.classList.remove('open'); }

/* =========================================================
   ESCENAS INTERACTIVAS
   ========================================================= */

/* Portafolio: marcos que giran */
HOOK.frames = {
  init(sl) { $$('.frame', sl).forEach(f => f.addEventListener('click', () => { f.classList.toggle('flipped'); sfx.pop(); })); },
  next(sl) { const f = $$('.frame:not(.flipped)', sl)[0]; if (f) { f.classList.add('flipped'); sfx.pop(); return true; } return false; },
  prev(sl) { const f = $$('.frame.flipped', sl).pop(); if (f) { f.classList.remove('flipped'); return true; } return false; },
  enter(sl, back) { $$('.frame', sl).forEach(f => f.classList.toggle('flipped', !!back)); }
};

/* Línea de tiempo: avanzar + tocar un año abre su ficha */
HOOK.timeline = {
  init(sl) {
    const dots = $('.tl-dots', sl);
    if (dots) {
      dots.innerHTML = D.TIMELINE.map((n, i) => `<i data-i="${i}" title="${n.y}"></i>`).join('');
      $$('i', dots).forEach(d => d.addEventListener('click', () => { const i = +d.dataset.i; if (sl._step < i) setStep(sl, i); else HOOK.timeline.focus(sl, i); sfx.pop(); }));
    }
    $$('.tl-node', sl).forEach((e, i) => e.addEventListener('click', () => {
      if (sl._step < i) setStep(sl, i); else HOOK.timeline.focus(sl, i);
      const n = D.TIMELINE[i];
      openModal({ color: n.c || '#FFC72C', kicker: `${n.y} · Línea de tiempo`, title: n.t, html: richHTML(n.m) });
    }));
  },
  focus(sl, i) {
    $$('.tl-node', sl).forEach((e, j) => e.classList.toggle('cur', j === i));
    $('.tl-track', sl).style.transform = `translateX(${-i * 440}px)`;
    $$('.tl-dots i', sl).forEach((e, j) => { e.classList.toggle('cur', j === i); e.classList.toggle('past', j < i); });
    const c = $('.tl-count', sl); if (c) c.innerHTML = `<b>${D.TIMELINE[i].y}</b> · momento ${i + 1} de ${D.TIMELINE.length}`;
  },
  step(sl, n) { $$('.tl-node', sl)[0].classList.add('on'); HOOK.timeline.focus(sl, Math.min(n, D.TIMELINE.length - 1)); }
};

/* Botones que abren fichas (nombre, arquitectura…) */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-modal]'); if (!b) return;
  const n = D.MODALS[b.dataset.modal]; if (!n) return;
  openModal({ color: n.c, kicker: n.k, title: n.t, html: richHTML(n) });
});

/* Pirámide completa: toca un bloque */
HOOK.full = {
  init(sl) {
    const pyr = $('.pyr', sl);
    pyr.addEventListener('blk', e => {
      const k = e.detail, n = { ...D.PYR_INFO[k], tiles: D.BLOCKS[k].items.map(x => ({ i: x.i, b: x.t, s: x.s })) }; selBlk(pyr, k);
      openModal({ color: k === 'res' ? '#FFC72C' : P[k].c[1], kicker: n.k, title: P[k].n, html: richHTML(n) });
    });
  },
  leave(sl) { selBlk($('.pyr', sl), ''); }
};

HOOK.cover = { enter(sl) { setTimeout(() => { if (slides[cur] === sl) fx.at($('.logo-plate', sl), 60); }, 900); } };

/* Inicializar y arrancar */
slides.forEach(sl => { const h = HOOK[sl.dataset.hook]; if (h && h.init) h.init(sl); });
$$('[data-go-next]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); next(); }));
const start = parseInt((location.hash || '').slice(1), 10);
go(start > 0 && start <= slides.length ? start - 1 : 0, /[?&]all/.test(location.search));
const st = +(new URLSearchParams(location.search).get('s') || 0); if (st) setStep(slides[cur], st);
})();
