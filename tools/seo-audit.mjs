#!/usr/bin/env node
/**
 * Vision Clipping — on-page SEO auditor.
 * Scans every published HTML page and reports missing/weak on-page SEO:
 * title, meta description, canonical, single H1, parseable JSON-LD, image alt,
 * absolute OG image, and duplicate titles/descriptions across pages.
 *
 * Safe, read-only. Run locally (`node tools/seo-audit.mjs`) or in CI.
 * Exits non-zero if any ERROR-level issue is found. This is the safe version of
 * the videos' "Site Optimizer": it reports, a human fixes — it never auto-writes.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SITE = 'https://vision-clipping.com';
const SKIP_DIRS = new Set(['assets', 'uploads', 'node_modules', '.git', '.github', 'tools']);
// 404.html is served for URLs that do not exist, so it has no canonical URL of
// its own and must never be indexed — the on-page rules below don't apply to it.
const SKIP_FILES = new Set(['404.html']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out);
    } else if (name.endsWith('.html') && !SKIP_FILES.has(name)) out.push(p);
  }
  return out;
}

// Attribute values use a backreferenced quote (\1) so an apostrophe inside a
// double-quoted value (e.g. content="...Gadzhi's...") does not end the match early.
const rx = {
  title: /<title>([\s\S]*?)<\/title>/i,
  desc: /<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i,
  canonical: /<link\s+rel=["']canonical["']\s+href=(["'])([\s\S]*?)\1/i,
  ogimg: /<meta\s+property=["']og:image["']\s+content=(["'])([\s\S]*?)\1/i,
  h1: /<h1[\s>]/gi,
  ld: /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  imgNoAlt: /<img(?![^>]*\balt=)[^>]*>/gi,
};

const files = walk(ROOT);
const titles = new Map(), descs = new Map();
let errors = 0, warns = 0;
const report = [];

for (const f of files) {
  const rel = relative(ROOT, f);
  const html = readFileSync(f, 'utf8');
  const issues = [];
  const E = m => { issues.push('ERROR  ' + m); errors++; };
  const W = m => { issues.push('warn   ' + m); warns++; };

  const title = (html.match(rx.title) || [])[1]?.trim();
  if (!title) E('no <title>');
  else {
    if (title.length < 25) W(`title short (${title.length} chars)`);
    if (title.length > 65) W(`title long (${title.length} chars) — may truncate in SERP`);
    if (titles.has(title)) E(`duplicate title with ${titles.get(title)}`);
    else titles.set(title, rel);
  }

  const desc = (html.match(rx.desc) || [])[2]?.trim();
  if (!desc) E('no meta description');
  else {
    if (desc.length < 70) W(`description short (${desc.length})`);
    if (desc.length > 165) W(`description long (${desc.length}) — may truncate`);
    if (descs.has(desc)) W(`duplicate description with ${descs.get(desc)}`);
    else descs.set(desc, rel);
  }

  const canon = (html.match(rx.canonical) || [])[2];
  if (!canon) E('no canonical');
  else if (!canon.startsWith(SITE)) W(`canonical not absolute to ${SITE}: ${canon}`);

  const og = (html.match(rx.ogimg) || [])[2];
  if (og && !og.startsWith('http')) W(`og:image not absolute: ${og}`);

  const h1count = (html.match(rx.h1) || []).length;
  if (h1count === 0) E('no <h1>');
  else if (h1count > 1) W(`${h1count} <h1> tags (want exactly 1)`);

  let ldCount = 0, m;
  rx.ld.lastIndex = 0;
  while ((m = rx.ld.exec(html))) {
    ldCount++;
    try { JSON.parse(m[1]); } catch (e) { E(`unparseable JSON-LD block #${ldCount}`); }
  }
  if (ldCount === 0) W('no JSON-LD structured data');

  const noAlt = (html.match(rx.imgNoAlt) || []).length;
  if (noAlt > 0) W(`${noAlt} <img> without alt`);

  if (issues.length) report.push({ rel, issues });
}

console.log(`\nSEO audit — ${files.length} pages scanned\n${'='.repeat(46)}`);
for (const { rel, issues } of report) {
  console.log(`\n${rel}`);
  for (const i of issues) console.log('  ' + i);
}
console.log(`\n${'='.repeat(46)}`);
console.log(`${errors} errors, ${warns} warnings across ${report.length}/${files.length} pages.`);
if (errors > 0) { console.log('FAIL — fix ERROR-level issues.'); process.exit(1); }
console.log('PASS — no blocking issues.');
