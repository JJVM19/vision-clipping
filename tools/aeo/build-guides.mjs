#!/usr/bin/env node
// Music guides: /music/guides/ hub + one page per article in tools/aeo/guides/*.mjs.
// Every article ends on the same close: who we have made content for, 3B+ views, Get started.
// Run: node tools/aeo/build-guides.mjs   (then node tools/aeo/build-llms.mjs to refresh llms.txt)
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = 'https://vision-clipping.com';
const HUB = '/music/guides/';
const OG = `${SITE}/assets/music/og-music-2.jpg`;

const dir = join(ROOT, 'tools/aeo/guides');
const guides = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.mjs')).sort()) {
  const g = (await import(pathToFileURL(join(dir, f)).href)).default;
  if (!g.draft) guides.push(g);
}
guides.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&amp;/g, '&').replace(/&pound;/g, '£');
const month = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

const CSS = `<style>
.nav-inner > a:first-child img{height:30px}
.close{margin:64px 0 8px;padding:44px 44px 34px;border-radius:24px;color:#fff;position:relative;overflow:hidden;
  background:linear-gradient(160deg,#5d0a12 0%,#4f0006 42%,#26030a 100%);box-shadow:0 30px 70px -30px rgba(40,2,8,.55)}
.close:before{content:"";position:absolute;top:-45%;right:-12%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(255,128,120,.16),transparent 70%);pointer-events:none}
.close .ey{position:relative;display:block;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:18px}
.close-who{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}
.close-who a{position:relative;display:block;aspect-ratio:4/3;border-radius:14px;overflow:hidden;color:#fff;text-decoration:none;background:#1a0306}
.close-who img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.9);transition:transform .5s}
.close-who a:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(10,0,2,.82) 100%)}
.close-who b{position:absolute;left:14px;bottom:12px;z-index:1;font-size:16px;font-weight:700;letter-spacing:-.01em}
@media (hover:hover) and (pointer:fine){.close-who a:hover img{transform:scale(1.04)}}
.close-logos{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:18px 30px;padding:4px 0 26px;border-bottom:1px solid rgba(255,255,255,.12)}
.close-logos img{height:24px;width:auto;filter:brightness(0) invert(1);opacity:.72}
.close-logos img.t{height:30px}
.close-bot{position:relative;display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center;padding-top:28px}
.close-stat b{display:block;font-family:'Inter',sans-serif;font-weight:800;font-size:58px;line-height:.95;letter-spacing:-.03em}
.close-stat span{display:block;margin-top:8px;font-size:13px;font-weight:600;color:rgba(255,255,255,.7)}
.close h3{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:clamp(24px,3vw,30px);line-height:1.15;margin:0 0 10px;color:#fff}
.close p{margin:0 0 20px;color:rgba(255,255,255,.74);font-size:15.5px;line-height:1.55}
.close-btns{display:flex;flex-wrap:wrap;gap:12px}
.close-btns a{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none}
.close-btns .go{background:#fff;color:#4f0006}
.close-btns .alt{border:1px solid rgba(255,255,255,.28);color:#fff}
@media (hover:hover) and (pointer:fine){.close-btns .go:hover{background:#ffe9e4}.close-btns .alt:hover{border-color:#fff}}
.related{margin:56px 0 0}
.related h2{font-family:'Inter',sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:0 0 14px}
.related a{display:block;padding:14px 0;border-top:1px solid var(--line);font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:19px;color:var(--ink);text-decoration:none}
@media (hover:hover) and (pointer:fine){.related a:hover{color:var(--ox)}}
figure{margin:36px 0}
figure .figbox{background:#fbf9f7;border:1px solid #eee2dd;border-radius:14px;padding:22px 20px 14px}
figcaption{margin-top:10px;font-size:.82rem;color:#8a7f7a;line-height:1.5}
figcaption strong{color:#3d3733;font-weight:600}
figure svg{width:100%;height:auto;display:block}
.ytwrap{position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000}
.ytwrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
@media(max-width:700px){
  .close{padding:30px 20px 26px;border-radius:20px}
  .close-who{grid-template-columns:repeat(3,1fr);gap:8px}
  .close-who b{left:9px;bottom:8px;font-size:12.5px}
  .close-logos{gap:14px 22px}
  .close-logos img{height:19px}.close-logos img.t{height:24px}
  .close-bot{grid-template-columns:1fr;gap:18px}
  .close-stat b{font-size:46px}
  figure .figbox{padding:16px 12px 10px;overflow-x:auto;-webkit-overflow-scrolling:touch}
  figure .figbox svg.dg{min-width:620px}
}
</style>`;

const head = ({ title, description, url, type = 'article', ld }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="shortcut icon" href="/assets/icons/favicon.ico">
<meta name="theme-color" content="#4f0006">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Vision Clipping">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG}">
<link rel="alternate" type="text/plain" title="Vision Clipping for language models" href="/llms.txt">
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }, null, 1)}
</script>
<link rel="stylesheet" href="/assets/blog.css">
${CSS}
</head>
<body data-section="music">
<nav class="nav">
  <div class="nav-inner">
    <a href="/music/"><img decoding="async" src="/assets/wordmark-dark.webp" alt="Vision Clipping"></a>
    <div class="nav-links">
      <a href="/music/">Music</a>
      <a href="/music/#clips">Examples</a>
      <a href="/music/#packages">Packages</a>
      <a href="${HUB}">Guides</a>
    </div>
    <a class="nav-cta" href="/music/start/">Get started</a>
  </div>
</nav>
`;

const foot = `<footer class="foot">
  <div class="wrap">
    <div>
      <img decoding="async" src="/assets/wordmark-dark.webp" alt="Vision Clipping" />
      <p>Short form distribution for artists and labels. Daily edits built around your music, across Instagram, TikTok and YouTube.</p>
    </div>
    <div class="foot-links">
      <a href="/music/">Music distribution</a>
      <a href="${HUB}">Guides for artists</a>
      <a href="/music/start/">Get started</a>
      <a href="/">For brands</a>
      <a href="/privacy-policy/">Privacy</a>
    </div>
  </div>
  <div class="foot-bot"><div class="wrap">&copy; 2026 Vision Clipping</div></div>
</footer>
<script src="/assets/blog.js" defer></script>
</body>
</html>
`;

// The close every guide ends on: who we have made content for (names, no per-client numbers),
// the 3B+ total, and the way in.
const close = (g) => `    <section class="close" aria-label="Work with Vision Clipping">
      <span class="ey">Who we have made content for</span>
      <div class="close-who">
        <a href="/cases/sexyy-red/"><img src="/assets/music/sexyy-red.webp" alt="Sexyy Red" loading="lazy" width="683" height="418"><b>Sexyy Red</b></a>
        <a href="/cases/nle-choppa/"><img src="/assets/music/nle-choppa.webp" alt="NLE Choppa" loading="lazy" width="1200" height="735"><b>NLE Choppa</b></a>
        <a href="/cases/jojo-siwa/"><img src="/assets/music/jojo-siwa.webp" alt="JoJo Siwa" loading="lazy" width="960" height="588"><b>JoJo Siwa</b></a>
      </div>
      <div class="close-logos" aria-label="Brands we have worked with">
        <img src="/uploads/logos/logo-08.webp" alt="Red Bull" loading="lazy" class="t">
        <img src="/uploads/logos/logo-03.webp" alt="LEGO" loading="lazy" class="t">
        <img src="/uploads/logos/logo-02.webp" alt="FaZe Clan" loading="lazy">
        <img src="/uploads/logos/logo-04.webp" alt="SHEIN" loading="lazy">
        <img src="/uploads/logos/logo-10.webp" alt="WD-40" loading="lazy" class="t">
      </div>
      <div class="close-bot">
        <div class="close-stat"><b>3B+</b><span>views generated for clients</span></div>
        <div>
          <h3>${g.closeTitle || 'Get your music into the edits.'}</h3>
          <p>${g.closeLine || 'We cut your song into football, culture and comp edits and post them every day across pages we already run, on TikTok, Instagram and YouTube.'}</p>
          <div class="close-btns">
            <a class="go" href="/music/start/">Get started</a>
            <a class="alt" href="/music/#packages">See the packages</a>
          </div>
        </div>
      </div>
    </section>`;

const crumbsLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });

function article(g) {
  const url = `${SITE}${HUB}${g.slug}/`;
  const ld = [
    { '@type': 'Article', '@id': `${url}#article`, headline: g.h1 || g.title, description: g.description,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url }, image: OG, inLanguage: 'en-GB',
      author: { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'Vision Clipping', url: `${SITE}/` },
      publisher: { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'Vision Clipping', logo: { '@type': 'ImageObject', url: `${SITE}/assets/icons/og-image.png` } },
      datePublished: g.date, dateModified: g.modified || g.date, about: g.about || undefined },
    crumbsLd([['Home', `${SITE}/`], ['Music', `${SITE}/music/`], ['Guides', `${SITE}${HUB}`], [g.crumb || g.h1 || g.title, url]]),
  ];
  if (g.faqs?.length) ld.push({ '@type': 'FAQPage', mainEntity: g.faqs.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  const related = guides.filter((x) => x.slug !== g.slug).slice(0, 4);
  return head({ title: g.title, description: g.description, url, ld }) + `<main class="wrap">
  <div class="crumbs"><a href="/music/">Music</a> &rsaquo; <a href="${HUB}">Guides</a> &rsaquo; ${g.crumb || 'Guide'}</div>
  <article>
    <span class="eyebrow">${g.eyebrow || 'Guide for artists'}</span>
    <h1>${g.h1 || g.title}</h1>
    <div class="meta">${month(g.modified || g.date)} &middot; Vision Clipping${g.dek ? ` &middot; ${g.dek}` : ''}</div>
    <div class="summary"><div class="lbl">Summary</div><ul>
${g.summary.map((s) => `      <li>${s}</li>`).join('\n')}
    </ul></div>
${g.body.trim()}
${close(g)}
${g.faqs?.length ? `    <section class="faq"><h2>Frequently asked questions</h2>
${g.faqs.map(([q, a]) => `    <div class="faq-q">${q}</div><p class="faq-a">${a}</p>`).join('\n')}
    </section>` : ''}
${g.sources?.length ? `    <div class="sources"><h2>Sources</h2><ol>
${g.sources.map(([label, href]) => `      <li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join('\n')}
    </ol></div>` : ''}
    <div class="related"><h2>More guides for artists</h2>
${related.map((r) => `      <a href="${HUB}${r.slug}/">${r.h1 || r.title}</a>`).join('\n')}
      <a href="/music/">How our music distribution works &rarr;</a>
    </div>
  </article>
</main>
` + foot;
}

function hub() {
  const url = `${SITE}${HUB}`;
  const title = 'Music Promotion Guides for Artists (2026) · Vision Clipping';
  const description = 'How songs actually blow up in 2026: clipping, edits, TikTok sounds, football edits and what promotion costs. Cited guides for independent artists and labels.';
  const ld = [
    { '@type': 'CollectionPage', '@id': `${url}#page`, url, name: 'Guides for artists', description, isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@type': 'ItemList', itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${url}${g.slug}/`, name: strip(g.h1 || g.title) })) } },
    crumbsLd([['Home', `${SITE}/`], ['Music', `${SITE}/music/`], ['Guides', url]]),
  ];
  return head({ title, description, url, type: 'website', ld }) + `<main class="wrap hubwrap">
  <div class="head">
    <h1>Guides for artists</h1>
    <p>How songs actually travel in 2026. Clipping, edits, sounds and what promotion really costs, written from the inside of a distribution operation and cited where it matters.</p>
  </div>
  <div class="postgrid">
${guides.map((g) => `    <a class="post" href="${HUB}${g.slug}/">
      <span class="tag">${g.tag || 'Guide'}</span>
      <h2>${g.h1 || g.title}</h2>
      <p>${g.card || g.description}</p>
    </a>`).join('\n')}
  </div>
  <article>
${close({})}
  </article>
</main>
` + foot;
}

mkdirSync(join(ROOT, HUB), { recursive: true });
writeFileSync(join(ROOT, HUB, 'index.html'), hub());
for (const g of guides) {
  mkdirSync(join(ROOT, HUB, g.slug), { recursive: true });
  writeFileSync(join(ROOT, HUB, g.slug, 'index.html'), article(g));
}

// sitemap: keep /music/, the hub and every guide listed
let sm = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const want = [`${SITE}/music/`, `${SITE}${HUB}`, ...guides.map((g) => `${SITE}${HUB}${g.slug}/`)];
const today = new Date().toISOString().slice(0, 10);
for (const u of want) {
  if (sm.includes(`<loc>${u}</loc>`)) continue;
  sm = sm.replace('</urlset>', `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>`);
}
writeFileSync(join(ROOT, 'sitemap.xml'), sm);
console.log(`hub + ${guides.length} guides written`);
