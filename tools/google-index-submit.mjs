#!/usr/bin/env node
/**
 * Submit sitemap URLs to the Google Indexing API to nudge a faster recrawl.
 * No npm deps — signs a service-account JWT with node:crypto and exchanges it
 * for an access token, then calls urlNotifications:publish per URL.
 *
 * ⚠️  IMPORTANT / HONEST CAVEAT:
 * Google officially supports the Indexing API only for pages with JobPosting or
 * livestream BroadcastEvent structured data. Using it for general marketing pages
 * is outside Google's stated support — it often works, but it is NOT the sanctioned
 * path and could be ignored or, in theory, flagged. The SANCTIONED fast-index path
 * for our pages is: submit sitemap.xml in Search Console + use URL Inspection
 * ("Request indexing") for priority URLs. IndexNow (see indexnow.yml) already covers
 * Bing/Yandex safely. Treat this script as OPTIONAL and Jaden's call.
 *
 * Setup: create a GCP service account with the Indexing API enabled, add its email
 * as an Owner of the GSC property, and put the JSON key in the GOOGLE_INDEXING_SA
 * GitHub secret (or env var). Run: node tools/google-index-submit.mjs [--dry-run]
 */
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const DRY = process.argv.includes('--dry-run');
const raw = process.env.GOOGLE_INDEXING_SA;
const sitemap = readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

console.log(`Google Indexing API — ${urls.length} URLs from sitemap`);
if (DRY || !raw) {
  if (!raw && !DRY) console.log('⚠  GOOGLE_INDEXING_SA not set — add the service-account JSON as a secret. Showing URLs only.\n');
  urls.forEach((u) => console.log('  ' + u));
  process.exit(0);
}

const sa = JSON.parse(raw);
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64({ alg: 'RS256', typ: 'JWT' });
  const claim = b64({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  });
  const sig = createSign('RSA-SHA256').update(`${header}.${claim}`).sign(sa.private_key, 'base64url');
  return `${header}.${claim}.${sig}`;
}

async function token() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
  });
  if (!res.ok) throw new Error(`token HTTP ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

const at = await token();
let ok = 0, fail = 0;
for (const url of urls) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${at}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  if (res.ok) { ok++; console.log(`  ✓ ${url}`); }
  else { fail++; console.log(`  ✗ ${res.status} ${url} — ${(await res.text()).slice(0, 120)}`); }
}
console.log(`\nDone: ${ok} submitted, ${fail} failed.`);
if (fail && !ok) process.exit(1);
