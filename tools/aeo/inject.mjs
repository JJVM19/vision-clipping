#!/usr/bin/env node
// Adds the machine-readable layer to the two VSL pages. Safe to re-run: every block sits between
// <!-- aeo:NAME:start --> / <!-- aeo:NAME:end --> markers and is replaced in place.
//   (The visible "Read the transcript" button was removed 2026-10-05 at Jaden's request; the transcript
//   still ships in the VideoObject JSON-LD and llms-full.txt.)
//   2. VideoObject JSON-LD carrying the same transcript, plus a music-page graph (breadcrumbs, FAQ).
//   3. Client names in the logo strip alt text (the logos were alt="" so crawlers saw nothing).
//   4. <link rel="alternate"> pointers to llms.txt and facts.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const tx = JSON.parse(readFileSync(join(ROOT, 'tools/aeo/transcripts.json'), 'utf8'));
const SITE = 'https://vision-clipping.com';

// logo-07 (the HU crest) stays unnamed on purpose.
const LOGOS = { '01': 'Iman Gadzhi', '02': 'FaZe Clan', '03': 'LEGO', '04': 'SHEIN', '05': 'Cricket District',
  '06': 'Nonstop', '08': 'Red Bull', '09': 'Luke Belmar', '10': 'WD-40' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const block = (name, body) => `<!-- aeo:${name}:start -->\n${body}\n<!-- aeo:${name}:end -->`;
function put(html, name, body, anchor, where = 'after') {
  const re = new RegExp(`<!-- aeo:${name}:start -->[\\s\\S]*?<!-- aeo:${name}:end -->`);
  if (re.test(html)) return html.replace(re, () => block(name, body));
  const i = html.indexOf(anchor);
  if (i < 0) throw new Error(`anchor not found for ${name}: ${anchor.slice(0, 60)}`);
  const at = where === 'after' ? i + anchor.length : i;
  return html.slice(0, at) + '\n' + block(name, body) + '\n' + html.slice(at);
}

function videoLd(v, description) {
  return {
    '@type': 'VideoObject',
    '@id': `${v.page}#video`,
    name: v.name,
    description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`],
    uploadDate: `${v.uploadDate}T12:00:00+00:00`,
    duration: v.duration,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    url: `https://www.youtube.com/watch?v=${v.id}`,
    inLanguage: 'en',
    transcript: v.text,
    publisher: { '@id': `${SITE}/#org` },
  };
}
const ldScript = (obj) => `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', ...obj }, null, 1)}\n</script>`;

const ALT = `<link rel="alternate" type="text/plain" title="Vision Clipping for language models" href="/llms.txt">
<link rel="alternate" type="application/json" title="Vision Clipping facts" href="/facts.json">`;

function logoAlts(html) {
  return html.replace(/(<img[^>]*src="\/?uploads\/logos\/logo-(\d\d)\.webp"[^>]*?)alt="[^"]*"/g,
    (m, pre, n) => (LOGOS[n] ? `${pre}alt="${LOGOS[n]}"` : m));
}

// ---- homepage
{
  const f = join(ROOT, 'index.html');
  let h = readFileSync(f, 'utf8');
  const v = tx.AwLxrRrYye8;
  h = put(h, 'head', ALT + '\n' + ldScript(videoLd(v,
    'Emrah Bayraktar, co-founder of Vision Clipping, explains how the agency turns a brand\'s content into daily distribution on accounts the brand owns, geo-targeted to its markets, with attribution on every post.')), '</head>', 'before');
  h = h.replace('alt="Watch VSL"', 'alt="Do You Want To Own Distribution? Vision Clipping video"');
  writeFileSync(f, logoAlts(h));
}

// ---- music page
{
  const f = join(ROOT, 'music/index.html');
  let h = readFileSync(f, 'utf8');
  const v = tx.Rpt5F6w_Vpk;
  const faqs = [...h.matchAll(/<span class="faq-q">([^<]+)<\/span>[\s\S]*?<div class="faq-a"><div>([\s\S]*?)<\/div><\/div>/g)]
    .map((m) => ({ '@type': 'Question', name: m[1].trim(), acceptedAnswer: { '@type': 'Answer', text: m[2].replace(/<[^>]+>/g, '').trim() } }));
  const graph = {
    '@graph': [
      videoLd(v, 'Jaden Malcolm, co-founder of Vision Clipping, walks through the music content distribution offer: songs placed into trending edit formats across pages Vision Clipping owns, the four packages, the add-ons and what an artist needs to send.'),
      { '@type': 'WebPage', '@id': `${SITE}/music/#page`, url: `${SITE}/music/`, name: 'Music Content Distribution · Vision Clipping',
        about: { '@id': `${SITE}/#org` }, video: { '@id': `${SITE}/music/#video` }, isPartOf: { '@id': `${SITE}/#website` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Music', item: `${SITE}/music/` } ] },
      { '@type': 'FAQPage', '@id': `${SITE}/music/#faq`, mainEntity: faqs },
    ],
  };
  h = put(h, 'head', ALT + '\n' + ldScript(graph), '</head>', 'before');
  writeFileSync(f, logoAlts(h));
  console.log(`music FAQ entries: ${faqs.length}`);
}
console.log('injected');
