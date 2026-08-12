#!/usr/bin/env node
/**
 * Vision Clipping — sitemap <lastmod> refresher.
 *
 * Every <loc> in sitemap.xml is mapped back to the file that serves it and its
 * <lastmod> is set to that file's last git commit date. A stale lastmod (every
 * page claiming the same date it was first shipped) tells Google nothing has
 * changed, so it recrawls less often — exactly the wrong signal for pages we
 * are actively editing.
 *
 * Rewrites sitemap.xml in place. Run after content changes:
 *   node tools/sitemap-lastmod.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SITE = 'https://vision-clipping.com';
const SITEMAP = join(ROOT, 'sitemap.xml');

/** URL path -> the file GitHub Pages serves for it. */
function fileFor(loc) {
  let p = loc.replace(SITE, '').replace(/^\//, '');
  if (p === '' || p.endsWith('/')) p += 'index.html';
  return join(ROOT, p);
}

function lastCommitDate(file) {
  const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim();
  return out || null; // empty when the file is not committed yet
}

const xml = readFileSync(SITEMAP, 'utf8');
let changed = 0;
let missing = 0;

const next = xml.replace(
  /<loc>([\s\S]*?)<\/loc>([\s\S]*?)<lastmod>([\d-]+)<\/lastmod>/g,
  (whole, loc, gap, current) => {
    const file = fileFor(loc.trim());
    if (!existsSync(file)) {
      console.warn(`  missing file for ${loc.trim()}`);
      missing++;
      return whole;
    }
    const date = lastCommitDate(file);
    if (!date || date === current) return whole;
    changed++;
    return `<loc>${loc}</loc>${gap}<lastmod>${date}</lastmod>`;
  },
);

if (changed) writeFileSync(SITEMAP, next);
console.log(`sitemap lastmod: ${changed} updated, ${missing} missing files.`);
if (missing) process.exitCode = 1;
