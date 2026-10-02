// Builds /cases/<slug>/ pages, the /cases/ index and the homepage case carousel
// from tools/cases-data.mjs. Run: node tools/build-cases.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, CHAPTERS, HOME_ORDER } from './cases-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://vision-clipping.com';
const V = '/uploads/cases/v2/';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const chap = k => CHAPTERS.find(c => c.key === k);
const ARROW = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h8M8 4l3 3-3 3"/></svg>';
const PLAY = '<span class="cs-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></span>';
// Image URLs carry the file's mtime: the site's service worker caches images by URL, so a
// re-cropped file under the same name would otherwise keep showing the old picture.
const ver = rel => { try { return `${rel}?v=${Math.floor(fs.statSync(path.join(ROOT, rel.replace(/^\//, ''))).mtimeMs / 1000)}`; } catch { return rel; } };
const cssVer = () => Math.floor(fs.statSync(path.join(ROOT, 'assets/cases.css')).mtimeMs / 1000);

function head({ title, desc, url, image, ld }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<!-- vc-icons:start -->
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16.png">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96.png">
<link rel="shortcut icon" href="/assets/icons/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
<meta name="theme-color" content="#4f0006">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Vision Clipping">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${image}">
<!-- vc-icons:end -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/subpage.css">
<link rel="stylesheet" href="/assets/cases.css?v=${cssVer()}">
<script src="/assets/subpage.js" defer></script>
<script src="/assets/cache-warm.js" defer></script>
<!-- vc-seo:start -->
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
<!-- vc-seo:end -->
<script src="/assets/attribution.js" defer></script>
</head>
<body>
`;
}

const NAV = `
<a class="sub-back" href="/cases/">
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 7H3M6 4L3 7l3 3"/></svg>
  All cases
</a>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="/#Home"><img src="/assets/wordmark-dark.png" alt="Vision Clipping"></a>
    <div class="nav-links">
      <a href="/cases/">Cases</a>
      <a href="/#process">Process</a>
      <a href="/#founders">Founders</a>
      <a href="/#pricing">Pricing</a>
      <a href="/#calc">Calculator</a>
    </div>
    <a class="nav-cta" href="/book/">Book a call</a>
  </div>
</nav>
`;

const CTA = `
  <section class="sub-cta-block">
    <div class="wrap">
      <h3>Want this for your <em>brand?</em></h3>
      <p>Free 30-min call &middot; See if we are a right fit</p>
      <a href="/book/" class="glow-cta">
        Book your strategy session
        ${ARROW}
      </a>
    </div>
  </section>`;

const FOOT = `
<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <img src="/assets/wordmark-dark.png" alt="Vision Clipping" />
        <p>A clipping agency for founders, creators and brands who need distribution at scale.</p>
      </div>
      <div class="foot-col"><h2>Navigate</h2>
        <a href="/cases/">Case Studies</a><a href="/#process">Process</a><a href="/#why">Why Us</a><a href="/#faq">FAQ</a>
      </div>
      <div class="foot-col"><h2>Tools</h2>
        <a href="/#calc">Budget Calculator</a><a href="/book/">Book a call</a>
      </div>
      <div class="foot-col"><h2>Contact</h2>
        <a href="mailto:contact@J-visionmedia.com">contact@J-visionmedia.com</a>
      <a href="/privacy-policy/">Privacy</a></div>
    </div>
    <div class="foot-bot"><div>&copy; 2026 Vision Clipping</div></div>
  </div>
</footer>

</body>
</html>
`;

const ld = (c, url) => ({
  '@context': 'https://schema.org', '@type': 'Article',
  headline: `${c.name} case study: ${c.stats[0][0]} ${c.stats[0][1].toLowerCase()}`,
  description: c.lede, about: c.name,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url }, url,
  image: `${ORIGIN}/assets/icons/og-image.png`,
  author: { '@type': 'Organization', name: 'Vision Clipping', url: `${ORIGIN}/` },
  publisher: { '@type': 'Organization', name: 'Vision Clipping', logo: { '@type': 'ImageObject', url: `${ORIGIN}/assets/icons/og-image.png` } },
  isPartOf: { '@type': 'WebSite', name: 'Vision Clipping', url: `${ORIGIN}/` },
});

const media = (m, kind) => {
  const inner = `<img src="${ver(V + m.src + '.webp')}" alt="" loading="lazy" decoding="async">${m.href ? PLAY : ''}${m.views ? `<span class="cs-views">${esc(m.views)}</span>` : ''}`;
  return m.href
    ? `<a class="cs-${kind}" href="${m.href}" target="_blank" rel="noopener" aria-label="Watch${m.views ? ', ' + esc(m.views) : ''}">${inner}</a>`
    : `<div class="cs-${kind}">${inner}</div>`;
};

const section = (n, label, body) => `
    <div class="cs-row fade-up">
      <div class="cs-label"><span class="n">${n}</span>${label}</div>
      <div class="cs-text">${body}</div>
    </div>`;

function casePage(c, i) {
  const url = `${ORIGIN}/cases/${c.slug}/`;
  const ch = chap(c.chapter);
  const prev = CASES[(i - 1 + CASES.length) % CASES.length];
  const next = CASES[(i + 1) % CASES.length];
  const title = `${c.name} Case Study: ${c.stats[0][0]} ${c.stats[0][1]}, Vision Clipping`;
  const avatar = c.avatar ? `<div class="cs-avatar"><img src="${ver(V + c.slug + '-avatar.webp')}" alt="${esc(c.name)}"></div>`
    : `<div class="cs-avatar conf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>`;

  const figs = (c.proof || []).map(p => `
      <figure class="cs-proof fade-up"><div class="cs-proof-frame"><img src="${ver(V + p.src + '.webp')}" alt="${esc(p.cap)}" loading="lazy" decoding="async"></div><figcaption>${esc(p.cap)}</figcaption></figure>`);

  const did = `<ol class="cs-steps n${c.did.length}">${c.did.map(([h, t], k) => `<li><span class="sn">${String(k + 1).padStart(2, '0')}</span><h4>${esc(h)}</h4><p>${esc(t)}</p></li>`).join('')}</ol>`;

  const videos = c.videos ? `
    <div class="cs-media fade-up">
      <h3 class="cs-h3">Example <em>videos</em></h3>
      <div class="cs-videos n${c.videos.length}">${c.videos.map(v => media(v, 'video')).join('')}</div>
    </div>` : '';
  const clips = c.clips ? `
    <div class="cs-media fade-up">
      <h3 class="cs-h3">${c.clipsTitle || 'Example <em>clips</em>'}</h3>
      <div class="cs-clips n${c.clips.length}${c.deckClips ? ' deck' : ''}">${c.clips.map(v => media(v, 'clip')).join('')}</div>
      ${c.clipsNote ? `<p class="cs-note">${esc(c.clipsNote)}</p>` : ''}
    </div>` : '';
  const talent = c.talent ? `
    <div class="cs-media fade-up">
      <h3 class="cs-h3">The <em>trailers</em></h3>
      <div class="cs-talent">${c.talent.map(t => `
        <a class="cs-tal" href="${t.href}" target="_blank" rel="noopener">
          <div class="cs-tal-img"><img src="${ver(V + 'pranku-' + t.slug + '-photo.webp')}" alt="${esc(t.name)}" loading="lazy" decoding="async"></div>
          <div class="cs-tal-body"><h4>${esc(t.name)}</h4><div class="cs-tal-stat"><b>${esc(t.stat)}</b> ${esc(t.lbl)}</div><span class="cs-tal-link">Watch on Instagram <span aria-hidden="true">↗</span></span></div>
        </a>`).join('')}
      </div>
    </div>` : '';

  const html = head({ title, desc: c.lede, url, image: `${ORIGIN}/assets/icons/og-image.png`, ld: ld(c, url) }) + NAV + `
<main class="cs">
  <section class="sub-hero cs-hero">
    <div class="wrap">
      <div class="sub-hero-tag"><span class="dot"></span>${esc(ch.title)} &middot; Case Study</div>
      <div class="cs-id">${avatar}<div><h1><em>${esc(c.name)}.</em></h1><p class="cs-sub">${esc(c.sub)}</p></div></div>
      <p class="cs-lede">${esc(c.lede)}</p>
      <div class="cs-stats n${c.stats.length}">${c.stats.map(([v, k]) => `<div class="cs-stat"><div class="v">${esc(v)}</div><div class="k">${esc(k)}</div></div>`).join('')}</div>
    </div>
  </section>

  <section class="cs-body">
    <div class="wrap">
${section('01', 'Background', c.background.map(p => `<p>${esc(p)}</p>`).join(''))}
${section('02', 'Challenge', c.challenge.map(p => `<p>${esc(p)}</p>`).join(''))}
${figs[0] || ''}
${section('03', 'What we did', did)}
${section('04', 'Results', `<p class="cs-result">${esc(c.results)}</p>`)}
${figs.slice(1).join('')}
${talent}${videos}${clips}
    </div>
  </section>

  <section class="cs-next">
    <div class="wrap">
      <a class="cs-nx prev" href="/cases/${prev.slug}/"><span class="lbl">Previous case</span><span class="nm">${esc(prev.name)}</span></a>
      <a class="cs-all" href="/cases/">All case studies</a>
      <a class="cs-nx next" href="/cases/${next.slug}/"><span class="lbl">Next case</span><span class="nm">${esc(next.name)}</span></a>
    </div>
  </section>
${CTA}
</main>
<script>
(() => { const els = document.querySelectorAll('.fade-up'); if(!('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e)); })();
</script>
` + FOOT;
  const dir = path.join(ROOT, 'cases', c.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// Card used on /cases/ and the homepage. `prefix` is '' for the homepage (relative uploads/ path) or '/'.
const vnCls = (vn, vl = '') => vn.length >= 6 || vl.length >= 16 ? 'vn sm' : 'vn';
function cardImg(c, prefix) {
  const vb = `<div class="views-block"><div class="${vnCls(c.card.vn, c.card.vl)}">${esc(c.card.vn)}</div><div class="vl">${esc(c.card.vl)}</div></div>`;
  if (c.card.redacted) return `<div class="case-img dark redact"><div class="rd"><span class="rd-bar"></span><span class="rd-bar short"></span><span class="rd-lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Confidential</span></div>${vb}</div>`;
  if (c.card.proof) return `<div class="case-img dark conf"><img src="${prefix}${ver('uploads/cases/v2/' + c.card.proof + '.webp').replace(/^\//, '')}" alt="${esc(c.name)}" loading="lazy" decoding="async"><div class="views-block"><div class="${vnCls(c.card.vn, c.card.vl)}">${esc(c.card.vn)}</div><div class="vl">${esc(c.card.vl)}</div></div></div>`;
  return `<div class="case-img"><img src="${prefix}${ver('uploads/cases/' + c.card.img)}" alt="${esc(c.name)}" loading="lazy" decoding="async"><div class="views-block"><div class="${vnCls(c.card.vn, c.card.vl)}">${esc(c.card.vn)}</div><div class="vl">${esc(c.card.vl)}</div></div></div>`;
}

function indexPage() {
  const url = `${ORIGIN}/cases/`;
  const groups = CHAPTERS.map(ch => {
    const list = CASES.filter(c => c.chapter === ch.key);
    return `
  <section class="ci-chapter">
    <div class="wrap">
      <div class="ci-head fade-up"><span class="ci-n">${ch.n}</span><div><h2>${esc(ch.title)}.</h2><p>${esc(ch.lead)}</p></div></div>
      <div class="ci-grid">${list.map(c => `
        <a class="ci-card fade-up" href="/cases/${c.slug}/">
          ${cardImg(c, '/')}
          <div class="ci-meta"><h3>${esc(c.name)}</h3><p>${esc(c.sub)}</p></div>
        </a>`).join('')}
      </div>
    </div>
  </section>`;
  }).join('');
  const html = head({
    title: 'Case Studies: 3B+ Views Engineered, Vision Clipping',
    desc: `${CASES.length} campaigns, from Russell Brunson and Iman Gadzhi to Nonstop and Sexyy Red. What we were asked to do, what we built and what it produced.`,
    url, image: `${ORIGIN}/assets/icons/og-image.png`,
    ld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Vision Clipping case studies', url,
      hasPart: CASES.map(c => ({ '@type': 'Article', name: `${c.name} case study`, url: `${ORIGIN}/cases/${c.slug}/` })) },
  }).replace('href="/cases/">\n  <svg', 'href="/#cases">\n  <svg') + NAV.replace('href="/cases/">\n  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 7H3M6 4L3 7l3 3"/></svg>\n  All cases', 'href="/#cases">\n  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 7H3M6 4L3 7l3 3"/></svg>\n  Back') + `
<main class="ci">
  <section class="sub-hero">
    <div class="wrap">
      <div class="sub-hero-tag"><span class="dot"></span>Our track record</div>
      <h1>Case <em>studies.</em></h1>
      <p class="cs-lede">Three years of short form systems and over 3 billion views for clients. Every case below shows what we were asked to do, what we built and what it produced.</p>
      <div class="ci-jump">${CHAPTERS.map(ch => `<span>${ch.n} ${esc(ch.title)}</span>`).join('')}</div>
    </div>
  </section>
${groups}
${CTA}
</main>
<script>
(() => { const els = document.querySelectorAll('.fade-up'); if(!('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e)); })();
</script>
` + FOOT;
  fs.writeFileSync(path.join(ROOT, 'cases', 'index.html'), html);
}

function homepage() {
  const p = path.join(ROOT, 'index.html');
  let s = fs.readFileSync(p, 'utf8');
  const list = HOME_ORDER.map(k => CASES.find(c => c.slug === k));
  const card = (c, dup) => `
        <a class="case fade-in" href="/cases/${c.slug}/" ${dup ? 'aria-hidden="true" tabindex="-1"' : `aria-label="${esc(c.name)} case study"`}>
          ${cardImg(c, '').replace('class="case-img', 'class="case-img fade-in')}
          <div class="case-title fade-in"><h3>${esc(c.name)}</h3><div class="tag">${esc(c.tag)}</div></div>
        </a>`;
  const track = `<div class="cases-track" id="cases-track"><!-- cases:start (generated by tools/build-cases.mjs) -->${list.map(c => card(c, false)).join('')}
        <!-- duplicate sets for seamless infinite loop -->${list.map(c => card(c, true)).join('')}${list.map(c => card(c, true)).join('')}
      <!-- cases:end --></div>`;
  s = s.replace(/<div class="cases-track" id="cases-track">[\s\S]*?<\/div>\s*<\/div>\s*<button class="cases-nav next"/, `${track}\n    </div>\n    <button class="cases-nav next"`);
  const dots = `<div class="cases-dots" id="cases-dots" aria-hidden="true">\n${list.map((c, i) => `      <button class="cs-dot${i ? '' : ' active'}" data-i="${i}" aria-label="${esc(c.name)}"></button>`).join('\n')}\n    </div>`;
  s = s.replace(/<div class="cases-dots" id="cases-dots" aria-hidden="true">[\s\S]*?<\/div>/, dots);
  const more = `<div class="cases-more"><a href="/cases/">See case studies ${ARROW}</a></div>`;
  if (!s.includes('class="cases-more"')) s = s.replace(dots, dots + '\n    ' + more);
  else s = s.replace(/<div class="cases-more">[\s\S]*?<\/a><\/div>/, more);
  fs.writeFileSync(p, s);
}

CASES.forEach(casePage);
indexPage();
homepage();
console.log(`built ${CASES.length} case pages + /cases/ + homepage carousel`);
