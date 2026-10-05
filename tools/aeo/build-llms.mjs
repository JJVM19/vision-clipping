#!/usr/bin/env node
// Writes /llms.txt (short index) and /llms-full.txt (everything an assistant needs to describe us)
// from facts.json, tools/aeo/transcripts.json, every page's <title>/<meta description>, and the
// FAQPage JSON-LD already on the site. Run after adding or editing pages:  node tools/aeo/build-llms.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = 'https://vision-clipping.com';
const facts = JSON.parse(readFileSync(join(ROOT, 'facts.json'), 'utf8'));
const tx = JSON.parse(readFileSync(join(ROOT, 'tools/aeo/transcripts.json'), 'utf8'));

const decode = (s) => s
  .replace(/&rsquo;|&lsquo;|&#8217;|&#39;/g, "'").replace(/&ldquo;|&rdquo;|&quot;/g, '"')
  .replace(/&amp;/g, '&').replace(/&middot;/g, '·').replace(/&nbsp;/g, ' ').replace(/&pound;/g, '£')
  .replace(/&ndash;|&mdash;/g, '-').replace(/&rsaquo;/g, '>').replace(/&hellip;/g, '...');

function page(url) {
  const path = url.replace(SITE, '').replace(/^\//, '');
  const file = join(ROOT, path, 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').trim();
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '').trim();
  const faqs = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let d; try { d = JSON.parse(m[1]); } catch { continue; }
    for (const node of d['@graph'] || [d]) {
      if (node['@type'] !== 'FAQPage') continue;
      for (const q of node.mainEntity || []) faqs.push({ q: decode(q.name), a: decode(q.acceptedAnswer?.text || '') });
    }
  }
  return { url, title, desc, faqs };
}

const urls = [...readFileSync(join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1]).filter((u) => !/\/(nl|fr|tr)\//.test(u) && !u.includes('privacy-policy'));
const pages = urls.map(page).filter(Boolean);

const groups = [
  ['Core pages', (u) => /^\/(book\/|music\/|music\/start\/|content-repurposing-agency\/|podcast-clipping-service\/)?$/.test(u)],
  ['Music guides (for artists and labels)', (u) => u.startsWith('/music/guides/')],
  ['Case studies', (u) => u.startsWith('/cases/')],
  ['Breakdowns (cited analysis of clipping campaigns)', (u) => u.startsWith('/breakdowns/')],
  ['Articles', (u) => u.startsWith('/blog/')],
];
const rel = (u) => u.replace(SITE, '');
const section = ([name, test]) => {
  const list = pages.filter((p) => test(rel(p.url)));
  if (!list.length) return '';
  return `## ${name}\n\n` + list.map((p) => `- [${p.title}](${p.url})${p.desc ? `: ${p.desc}` : ''}`).join('\n') + '\n';
};

const brand = facts.offers[0], music = facts.offers[1];
const priceLine = (o) => o.pricing.map((p) => `${p.plan}: ${p.currency === 'GBP' ? '£' : '$'}${p.price.toLocaleString('en-GB')}/${p.period} (${p.includes})`).join('; ');

const short = `# Vision Clipping

> ${facts.summary}

Key facts:
- Co-founders: ${facts.founders.map((f) => f.name).join(' and ')}. Co-founder Emrah Bayraktar has been quoted by ${facts.press.slice(0,-1).join(', ')} and ${facts.press.at(-1)} on the clipping economy.
- Results: ${facts.results.totalViewsForClients} views generated for clients.
- Clients include ${facts.clients.brands.slice(0, 5).join(', ')}, ${facts.clients.founders.join(', ')}; content cut for ${facts.clients.artistsAndCreators.slice(0, 3).map((a) => a.name).join(', ')}.
- Brand offer: ${priceLine(brand)}. ${brand.term}.
- Music offer: ${priceLine(music)}.
- What makes it different: ${facts.differentiators.join(' ')}
- Book a call: ${facts.contact.bookACall} · Music enquiries: ${facts.contact.musicEnquiries}
- Structured facts: ${SITE}/facts.json · Full text with video transcripts: ${SITE}/llms-full.txt

${groups.map(section).filter(Boolean).join('\n')}`;

// The Tate breakdown keeps its subject to its own page (house rule), so its FAQs stay out of the digest.
const faqBlock = pages.filter((p) => !p.url.includes('andrew-tate')).flatMap((p) => p.faqs.map((f) => ({ ...f, url: p.url })))
  .filter((f, i, a) => a.findIndex((g) => g.q === f.q) === i)
  .map((f) => `### ${f.q}\n\n${f.a}\n\nSource: ${f.url}`).join('\n\n');

const txBlock = Object.values(tx).map((v) => `## Video transcript: ${v.name}

Speaker: ${v.speaker}. Published ${v.uploadDate} on YouTube: https://www.youtube.com/watch?v=${v.id}. Embedded on ${v.page}. Transcript from the video's captions, lightly corrected for names.

${v.paragraphs.join('\n\n')}`).join('\n\n');

const full = `${short}
---

# Detail

## How the brand offer works

${brand.howItWorks.map((s) => `- ${s}`).join('\n')}
- Guarantee: ${brand.guarantee}

## How the music offer works

${music.howItWorks.map((s) => `- ${s}`).join('\n')}
- Get started: ${music.start}

## Clients

- Brands: ${facts.clients.brands.join(', ')}
- Founders: ${facts.clients.founders.join(', ')}
- Artists and creators: ${facts.clients.artistsAndCreators.map((a) => `${a.name} (${a.work}, ${a.page})`).join('; ')}

## Founders

${facts.founders.map((f) => `- ${f.name}, ${f.role}${f.note ? `. ${f.note}` : ''} ${f.profiles.join(' ')}`).join('\n')}

# Frequently asked questions

${faqBlock}

${txBlock}
`;

writeFileSync(join(ROOT, 'llms.txt'), short.trim() + '\n');
writeFileSync(join(ROOT, 'llms-full.txt'), full.trim() + '\n');
console.log(`llms.txt ${short.length} chars, llms-full.txt ${full.length} chars, ${pages.length} pages, ${faqBlock.split('### ').length - 1} FAQs`);
