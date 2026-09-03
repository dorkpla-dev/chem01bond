const fs = require('fs');

const sources = [
  { file: 'prototype_01_02_v2.html', batch: '01-02', first: 1, last: 20 },
  { file: 'prototype_03_04_v2.html', batch: '03-04', first: 21, last: 40 },
  { file: 'prototype_05_06_v2.html', batch: '05-06', first: 41, last: 60 },
  { file: 'prototype_07_08_v2.html', batch: '07-08', first: 61, last: 80 },
  { file: 'prototype_09_10_v2.html', batch: '09-10', first: 81, last: 100 }
];

function extract(html, re, label) {
  const m = html.match(re);
  if (!m) throw new Error(`Cannot extract ${label}`);
  return m[1];
}

function parseCss(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(clean))) {
    const selector = m[1].trim();
    const body = m[2].trim();
    if (!selector || !body) continue;
    // Simple prototype CSS is scoped rule-by-rule. Outer @media wrappers are not
    // carried into per-slide CSS; master navigation has its own media rule below.
    if (selector.startsWith('@')) continue;
    rules.push({ selector, body });
  }
  return rules;
}

function splitSelectors(selector) {
  return selector.split(',').map(s => s.trim()).filter(Boolean);
}

function shellCss(css) {
  const allowed = new Set([':root', '*', 'html', 'body', '.deck']);
  return parseCss(css)
    .filter(rule => splitSelectors(rule.selector).every(s => allowed.has(s)))
    .map(rule => `${rule.selector}{${rule.body}}`)
    .join('\n');
}

function batchAnchor(batch) {
  return `.slide[data-batch="${batch}"]`;
}

function scopeSelectorPart(part, batch) {
  const anchor = batchAnchor(batch);
  if (part === ':root' || part === 'html' || part === 'body') return anchor;
  if (part === '*') return `${anchor}, ${anchor} *`;
  if (part === '.deck' || part === '#deck') return null;
  if (part === '.slide') return anchor;
  if (part.startsWith('.slide.') || part.startsWith('.slide[')) return part.replace(/^\.slide/, anchor);
  if (part.startsWith('.slide ')) return `${anchor} ${part.slice('.slide '.length)}`;
  if (part === '.dark') return `${anchor}.dark`;
  if (part.startsWith('.dark ')) return `${anchor}.dark ${part.slice('.dark '.length)}`;
  if (part === '.active') return `${anchor}.active`;
  if (part.startsWith('.deck .slide')) return part.replace(/^\.deck \.slide/, anchor);
  if (part.startsWith('#deck .slide')) return part.replace(/^#deck \.slide/, anchor);
  if (/^body\b/.test(part)) return part.replace(/^body\b/, anchor);
  if (/^html\b/.test(part)) return part.replace(/^html\b/, anchor);
  // Prototype-only navigation is supplied globally by master; do not scope it.
  if (part.startsWith('.slide-nav')) return null;
  return `${anchor} ${part}`;
}

function scopedCss(css, batch) {
  return parseCss(css).map(rule => {
    const scoped = splitSelectors(rule.selector)
      .map(part => scopeSelectorPart(part, batch))
      .filter(Boolean)
      .flatMap(s => s.split(',').map(x => x.trim()))
      .filter((s, i, arr) => arr.indexOf(s) === i);
    if (!scoped.length) return '';
    return `${scoped.join(', ')}{${rule.body}}`;
  }).filter(Boolean).join('\n');
}

function removeActive(sec) {
  return sec.replace(/class="slide([^\"]*)\sactive([^\"]*)"/, 'class="slide$1$2"');
}

function tagBatch(sec, batch) {
  // Do not duplicate data-batch when a newer prototype already carries it.
  if (/\sdata-batch="[^"]+"/.test(sec)) {
    return sec.replace(/\sdata-batch="[^"]+"/, ` data-batch="${batch}"`);
  }
  return sec.replace(/<section class="([^"]*)"/, `<section class="$1" data-batch="${batch}"`);
}

const docs = sources.map(src => {
  const html = fs.readFileSync(src.file, 'utf8');
  const css = extract(html, /<style>([\s\S]*?)<\/style>/i, `style from ${src.file}`);
  const rawSections = [...html.matchAll(/<section class="slide[^"]*"[\s\S]*?<\/section>/g)].map(m => removeActive(m[0]));
  if (rawSections.length !== 20) throw new Error(`${src.file}: expected 20 slides, got ${rawSections.length}`);
  const sections = rawSections.map(sec => tagBatch(sec, src.batch));
  return { ...src, html, css, rawSections, sections };
});

const totalSlides = sources.at(-1).last;
if (docs.flatMap(doc => doc.sections).length !== totalSlides) throw new Error(`Expected ${totalSlides} slides`);
docs[0].sections[0] = docs[0].sections[0].replace(/class="slide([^\"]*)"/, 'class="slide$1 active"');

const masterShellOverrides = `
/* master viewport/deck shell + visible navigation */
html{margin:0;width:100%;height:100%;min-width:0;min-height:0;max-width:100%;max-height:100%;overflow:hidden;background:#111827;overscroll-behavior:none}
body{position:fixed;inset:0;margin:0;width:100%;height:100%;min-width:0;min-height:0;max-width:100%;max-height:100%;overflow:hidden;background:#111827;overscroll-behavior:none;font-family:"Prompt","Leelawadee UI","Segoe UI",sans-serif;color:var(--ink);font-weight:400;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
.deck{position:absolute;left:0;top:0;width:1600px;height:900px;transform:translate3d(var(--deck-x,0px),var(--deck-y,0px),0) scale(var(--scale,1));transform-origin:0 0;background:var(--paper);overflow:hidden;will-change:transform}
.slide-nav{position:fixed;inset:0;z-index:9999;pointer-events:none}
.slide-nav button{position:absolute;top:50%;width:52px;height:52px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(17,24,39,.82);color:#fff;font:500 30px/1 "Segoe UI Symbol","Segoe UI",sans-serif;display:grid;place-items:center;padding:0;box-shadow:0 8px 26px rgba(0,0,0,.24);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transform:translateY(-50%);pointer-events:auto;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.slide-nav .prev{left:max(12px,env(safe-area-inset-left))}
.slide-nav .next{right:max(12px,env(safe-area-inset-right))}
.slide-nav button:hover{background:rgba(17,24,39,.94)}
.slide-nav button:focus-visible{outline:3px solid #fff;outline-offset:3px}
.slide-nav button:disabled{opacity:.28;cursor:default}
@media (max-width:700px){.slide-nav button{top:auto;bottom:max(14px,env(safe-area-inset-bottom));width:48px;height:48px;font-size:27px}.slide-nav .prev{left:max(14px,env(safe-area-inset-left))}.slide-nav .next{right:max(14px,env(safe-area-inset-right))}}
`;

const styleText = [
  '/* global viewport/deck shell from visual-system base */',
  shellCss(docs[0].css),
  ...docs.map(doc => `/* scoped source: ${doc.file} */\n${scopedCss(doc.css, doc.batch)}`),
  masterShellOverrides
].join('\n\n');

const slideMarkup = docs.flatMap(doc => doc.sections).join('\n\n');

const navigation = String.raw`
<nav class="slide-nav" aria-label="ตัวควบคุมสไลด์">
  <button class="prev" id="prevSlide" type="button" aria-label="สไลด์ก่อนหน้า" title="สไลด์ก่อนหน้า (←)">‹</button>
  <button class="next" id="nextSlide" type="button" aria-label="เปิดคำตอบหรือไปสไลด์ถัดไป" title="เปิดคำตอบหรือไปสไลด์ถัดไป (→)">›</button>
</nav>
<script>
(() => {
  const deck = document.getElementById('deck');
  const slides = [...document.querySelectorAll('.slide')];
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  let index = 0;

  function scaleDeck(){
    const vv = window.visualViewport;
    const root = document.documentElement;
    const layoutWidth = Math.max(1, root.clientWidth || innerWidth || 1);
    const layoutHeight = Math.max(1, root.clientHeight || innerHeight || 1);
    const width = Math.max(1, vv?.width ? Math.min(layoutWidth, vv.width) : layoutWidth);
    const height = Math.max(1, vv?.height ? Math.min(layoutHeight, vv.height) : layoutHeight);
    const offsetLeft = vv?.offsetLeft || 0;
    const offsetTop = vv?.offsetTop || 0;
    const s = Math.min(width / 1600, height / 900);
    const renderedWidth = 1600 * s;
    const renderedHeight = 900 * s;
    const x = offsetLeft + Math.max(0, (width - renderedWidth) / 2);
    const y = offsetTop + Math.max(0, (height - renderedHeight) / 2);
    deck.style.setProperty('--scale', String(s));
    deck.style.setProperty('--deck-x', x + 'px');
    deck.style.setProperty('--deck-y', y + 'px');
  }

  function slideNumberFromLocation(){
    const q = Number(new URLSearchParams(location.search).get('slide'));
    if (Number.isFinite(q) && q > 0) return Math.max(1, Math.min(slides.length, q));
    const m = location.hash.match(/(?:^#|[&#])s=(\d+)/i);
    if (!m) return 1;
    return Math.max(1, Math.min(slides.length, Number(m[1]) || 1));
  }

  function resetReveal(slide){
    slide.querySelectorAll('[data-reveal].revealed').forEach(el => el.classList.remove('revealed'));
  }

  function updateNavigation(){
    prevButton.disabled = index <= 0;
    const hasPendingReveal = !!slides[index]?.querySelector('[data-reveal]:not(.revealed)');
    nextButton.disabled = index >= slides.length - 1 && !hasPendingReveal;
  }

  function show(next, {syncHash=true} = {}){
    next = Math.max(0, Math.min(slides.length - 1, next));
    if (slides[index]) {
      slides[index].classList.remove('active');
      resetReveal(slides[index]);
    }
    index = next;
    slides[index].classList.add('active');
    if (syncHash) history.replaceState(null, '', '#s=' + (index + 1));
    updateNavigation();
  }

  function revealNext(){
    const slide = slides[index];
    const pending = [...slide.querySelectorAll('[data-reveal]:not(.revealed)')];
    if (!pending.length) return false;
    const groups = pending.map(el => Number(el.dataset.reveal)).filter(Number.isFinite);
    const group = groups.length ? Math.min(...groups) : null;
    if (group === null) pending.forEach(el => el.classList.add('revealed'));
    else pending.filter(el => Number(el.dataset.reveal) === group).forEach(el => el.classList.add('revealed'));
    updateNavigation();
    return true;
  }

  function revealOrAdvance(){
    if (!revealNext()) show(index + 1);
  }

  addEventListener('resize', scaleDeck, {passive:true});
  addEventListener('orientationchange', scaleDeck, {passive:true});
  addEventListener('pageshow', scaleDeck, {passive:true});
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scaleDeck, {passive:true});
    window.visualViewport.addEventListener('scroll', scaleDeck, {passive:true});
  }
  addEventListener('hashchange', () => show(slideNumberFromLocation() - 1, {syncHash:false}));
  addEventListener('keydown', e => {
    if (['ArrowRight','PageDown',' ','Enter'].includes(e.key)) { e.preventDefault(); revealOrAdvance(); return; }
    if (['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); show(index - 1); return; }
    if (e.key === 'Home') { e.preventDefault(); show(0); return; }
    if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); return; }
    if (e.key === 'Escape') { e.preventDefault(); resetReveal(slides[index]); updateNavigation(); }
  });
  addEventListener('wheel', e => e.preventDefault(), {passive:false});
  addEventListener('touchmove', e => e.preventDefault(), {passive:false});
  prevButton.addEventListener('click', () => show(index - 1));
  nextButton.addEventListener('click', revealOrAdvance);

  scaleDeck();
  index = Math.max(0, slideNumberFromLocation() - 1);
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  history.replaceState(null, '', '#s=' + (index + 1));
  updateNavigation();
})();
</script>`;

const out = `<!doctype html>\n<html lang="th">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>\n<meta name="theme-color" content="#172131"/>\n<title>CHEM01 · พันธะเคมี · คาบ 1–10</title>\n<style>\n${styleText}\n</style>\n</head>\n<body>\n<main class="deck" id="deck">\n${slideMarkup}\n</main>\n${navigation}\n</body>\n</html>\n`;

fs.writeFileSync('index.html', out, 'utf8');
console.log(JSON.stringify({
  output: 'index.html',
  slides: totalSlides,
  bytes: Buffer.byteLength(out),
  sources,
  cssMode: 'per-slide data-batch scoped',
  directSlideChildren: true,
  mobileFit: 'visualViewport contain 1600x900',
  visibleNavigation: true
}, null, 2));
