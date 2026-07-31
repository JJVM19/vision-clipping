# Vision Clipping — SEO & Traffic Program

**Goal: rank vision-clipping.com in front of founders/CEOs/CMOs searching for a clipping team, in English first, then Dutch (BE), French, and Turkish.**

Live site: https://vision-clipping.com (static, GitHub Pages, repo `JJVM19/vision-clipping`).
Progress tracker — updated each work session. Keyword list: [`keywords.md`](keywords.md).

---

## The four workstreams

| # | Workstream | Status |
|---|---|---|
| 1 | **Rank for search terms** (keyword list + on-page) | 🟡 List built, foundation shipping |
| 2 | **Heavy SEO articles + backlinks** | ⚪ Not started — next up |
| 3 | **Click-traffic automation** (emulators/proxies) | 🔴 See warning below — do NOT build yet |
| 4 | **Multilingual key terms** (NL-BE / FR / TR) | 🟡 Terms drafted, pages not built |

---

## Shipped this session (branch `seo/foundation-and-strategy`, PR open)

The site had **zero technical SEO foundation**. Fixed the highest-leverage gaps:

- **robots.txt** + **sitemap.xml** — both were 404. Google couldn't discover pages efficiently.
- **Homepage `<title>`** — was literally just "Vision Clipping" (no keywords). Now targets *clipping agency / content distribution / founders*.
- **Meta description** — was missing entirely (Google was guessing our snippet). Added.
- **Canonical + robots meta** — added, prevents duplicate-content splits (the non-hyphen domain 301s here — good).
- **Structured data (JSON-LD)** — was zero. Added Organization, WebSite, Service, and **FAQPage** (our 5 real FAQs → eligible for rich results in search).
- **Open Graph / Twitter** — images were relative paths (broke on crawlers/social); now absolute, with og:url + site_name and keyword titles.

All additive, all on a branch → **review and merge to go live**, don't auto-deploy.

---

## ⚠️ Workstream 3 — read before building the traffic bot

The plan was: emulators + rotating proxies → automated visits to our own site to "build traffic."
**Recommendation: don't build this as described.** Three reasons, in order of weight:

1. **It can't do what it's meant to.** Google does not rank on raw pageviews. Automated,
   proxy-rotated hits with no genuine engagement are the exact pattern its spam systems filter,
   and fake-traffic/click manipulation is against Google Search Essentials. Best case it does
   nothing; worst case it suppresses the domain we're trying to rank.
2. **It contradicts the pitch that closes deals.** Our own FAQ sells "real devices, real
   accounts, **no fake traffic**." Running a bot farm against our own domain is the one thing a
   sophisticated client (or a journalist) could surface to blow up that positioning.
3. **We already own the legitimate version of this — and it's far stronger.** Vision runs a real
   phone farm posting clips to real audiences. Route a slice of that genuine audience to the site
   (link-in-bio → landing → branded "vision clipping" searches). Real visits + real branded
   search volume are signals Google *does* reward, and they're defensible.

**Redirect the energy:** (a) link-in-bio → site on our own accounts; (b) UTM + attribution so we
*measure* real referral traffic (we already have the linklo.bio redirector for this); (c) drive
branded search. If Jaden still wants automated traffic after this, it's his call on his own
asset — but it should be a deliberate decision with these risks on the table, not a default.

---

## Roadmap (next iterations of the loop)

- [ ] **Iteration 2:** Case pages — unique titles + meta descriptions + canonical + Article JSON-LD (our least-contested, highest-converting SEO asset). First pillar article: *"How much does a clipping agency cost?"* (P0 COMM).
- [ ] **Iteration 3:** `/blog/` structure + 2–3 more P0 articles (best clipping agency, clipping agency vs hiring an editor, how to repurpose long-form content). Internal-link each to the matching service section.
- [ ] **Iteration 4:** Backlink plan — guest posts / citations / founder-community placements (checklist: "citing us in other articles"). Real outreach list, not link spam.
- [ ] **Iteration 5:** i18n — `/nl/ /fr/ /tr/` with hreflang, once EN core proves it ranks. Native-localizer review, no raw machine translation.
- [ ] **Ongoing:** submit sitemap in Google Search Console; track keyword positions; validate every term in Trends before writing to it.

## Open questions for Jaden
- Google Search Console access? (Needed to submit the sitemap and see what we actually rank for.)
- Any keyword tool (Ahrefs/Semrush) login? Would replace the "estimate to verify" guesses with real volume.
- Decision on Workstream 3 given the warning above.
