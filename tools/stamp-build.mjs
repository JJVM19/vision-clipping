// Stamps a build id into the pages that carry the freshness check, and writes the same id to
// /build.txt. Run it before committing a deploy.
//
// Why: GitHub Pages serves HTML with `cache-control: max-age=600`, so a visitor can hold an old
// copy of a page for minutes. If that deploy removed a file the old page references (it happened
// with the example clips: the previous page asked for `<slug>.hq.mp4`, got a 404 and fell back to
// muted playback), the page is quietly broken. Each stamped page asks the server which build is
// current and reloads itself once if it is behind.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const PAGES = ["index.html", "music/index.html", "music/start/index.html", "explainer-music/index.html"];
const id = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

fs.writeFileSync(path.join(root, "build.txt"), id + "\n");

let stamped = 0, missing = [];
for (const rel of PAGES) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, "utf8");
  if (!/<meta name="vc-build"/.test(html)) { missing.push(rel); continue; }
  html = html.replace(/<meta name="vc-build" content="[^"]*">/, `<meta name="vc-build" content="${id}">`);
  fs.writeFileSync(file, html);
  stamped++;
}
console.log(`build ${id} stamped into ${stamped} page(s)` + (missing.length ? `; no vc-build meta in: ${missing.join(", ")}` : ""));
