# Vision Clipping — Keyword Master List

Built 2026-07-31. Grounds the SEO program (ranking, articles, i18n).

**Who we're ranking in front of:** founders, CEOs, CMOs, and creators who are already
spending money on content and want reach without building a team. High-ticket ($10k/mo+),
so we rank for **buyer-intent** terms, not vanity volume.

**Volume column = estimate to verify.** No paid keyword tool is wired in yet. Validate every
term in Google Keyword Planner + Google Trends before committing an article to it (the Trends
step the checklist calls for). Priority is set by **intent × fit**, not raw volume — a 90/mo
term where the searcher is a founder with a budget beats a 10k/mo term that's all job-seekers.

Intent key: **TXN** = ready to buy · **COMM** = comparing/evaluating · **INFO** = learning.

---

## 1. Core commercial — the money terms (TXN)
These are the pages/sections that must rank. Homepage + dedicated service/landing sections.

| Keyword | Intent | Priority | Target page |
|---|---|---|---|
| clipping agency | TXN | P0 | Home |
| content clipping agency | TXN | P0 | Home |
| clipping agency for founders | TXN | P0 | Home / landing |
| content distribution agency | TXN | P0 | Home |
| short form content agency | TXN | P0 | Home |
| short form video agency | TXN | P1 | Home |
| done for you clipping | TXN | P1 | Home |
| video clipping service | TXN | P1 | Service section |
| faceless content agency | TXN | P1 | Landing |
| social media clipping service | TXN | P2 | Service section |
| in-house clipping team | TXN | P1 | Home (our exact angle) |
| content repurposing agency | TXN | P2 | Service section |

## 2. Comparison / evaluation (COMM) — blog + FAQ + landing
Searcher is choosing between options. We win these with honest comparison content.

| Keyword | Intent | Priority | Target |
|---|---|---|---|
| best clipping agency | COMM | P0 | Article: "Best clipping agencies (2026)" |
| clipping agency pricing / cost | COMM | P0 | Article + Calculator |
| how much does a clipping agency cost | COMM | P0 | Article |
| clipping agency vs hiring an editor | COMM | P1 | Article (we already answer this in FAQ) |
| clipping agency vs public clipping campaign | COMM | P1 | Article (our differentiator) |
| best short form content agency | COMM | P1 | Article |
| is a clipping agency worth it | COMM | P2 | Article |
| clipping agency reviews | COMM | P2 | Cases hub |

## 3. Problem-aware (INFO→COMM) — the article engine
Founder knows the problem, not the solution yet. Top of our content funnel.

| Keyword | Intent | Priority | Target article |
|---|---|---|---|
| how to repurpose long form content | INFO | P0 | Guide |
| how to build a clipping team | INFO | P0 | Guide (positions us as the alternative) |
| how to distribute content across multiple accounts | INFO | P1 | Guide |
| how founders grow on social media without posting | INFO | P1 | Guide |
| content omnipresence strategy | INFO | P1 | Guide |
| how to go viral with short form content | INFO | P2 | Guide |
| how to turn a podcast into clips | INFO | P1 | Guide |
| short form content distribution strategy | INFO | P1 | Pillar page |

## 4. Brand-adjacent / case-study (COMM+INFO) — highest-converting, low competition
People search these founder names + "clips/content". Our case pages already target them.

| Keyword | Intent | Priority | Target |
|---|---|---|---|
| how iman gadzhi grew on social media | INFO | P0 | cases/iman-gadzhi.html |
| iman gadzhi clipping strategy | COMM | P0 | cases/iman-gadzhi.html |
| how luke belmar built his audience | INFO | P1 | cases/luke-belmar.html |
| russell brunson content strategy | INFO | P1 | cases/russell-brunson.html |
| how [founder] gets so many clips | INFO | P2 | cases hub |

> Case pages are our sharpest, least-contested SEO asset. Next iteration: give each one a
> unique title, meta description, canonical, and Article/CaseStudy JSON-LD.

## 5. Geo / programmatic (TXN) — the competitor's playbook
clippingagency.co ranks nationally by spinning up "clipping agency {country}" pages. We can
mirror this cheaply once the core ranks. Only build these when we can serve the market.

| Pattern | Priority |
|---|---|
| clipping agency USA / UK / Dubai / Europe | P2 |
| content distribution agency {country} | P3 |

---

## 6. Multilingual key terms (checklist: Dutch-BE, French, Turkish)

Native-market phrasing, not literal translation. **In all three markets the English word
"clipping" is frequently kept** in marketing jargon — hedge by targeting both the localized
term and the English-loanword variant. Mark for native-speaker/localizer review before publish.

### 🇧🇪 Dutch (Belgium / Flanders) — INFO/TXN
| English | Dutch target | Notes |
|---|---|---|
| clipping agency | **clipping bureau** / content clipping bureau | "bureau" = agency; "clipping" kept |
| content distribution agency | **content distributie bureau** | |
| short form video agency | **short form video bureau** / korte video content bureau | |
| clipping agency for founders | clipping bureau voor ondernemers | "ondernemers" (entrepreneurs) reads better than "oprichters" |
| faceless content | faceless content / anonieme content | English kept commonly |
| repurpose content | content hergebruiken | |
| geo modifier | + België / Vlaanderen / Antwerpen / Gent | |

### 🇫🇷 French — INFO/TXN
| English | French target | Notes |
|---|---|---|
| clipping agency | **agence de clipping** / agence de contenu court | |
| content distribution agency | **agence de distribution de contenu** | |
| short form video agency | **agence de vidéos courtes** / agence short-form | |
| clipping agency for founders | agence de clipping pour fondateurs / entrepreneurs | |
| faceless content | contenu sans visage | |
| repurpose long form content | recycler du contenu long / réutiliser ses vidéos | strong INFO term |
| geo modifier | + France / Paris / Belgique francophone / Suisse | France + FR-BE + CH-FR |

### 🇹🇷 Turkish — INFO/TXN
| English | Turkish target | Notes |
|---|---|---|
| clipping agency | **klip ajansı** / içerik klipleme ajansı | |
| short form video agency | **kısa video ajansı** / kısa form video ajansı | |
| content distribution agency | **içerik dağıtım ajansı** | |
| clipping agency for founders | girişimciler için klip ajansı | "girişimciler" = entrepreneurs |
| faceless content | yüzsüz içerik | |
| repurpose content | içerik yeniden kullanımı | |
| geo modifier | + Türkiye / İstanbul | |

**i18n build note:** serve localized pages at `/nl/`, `/fr/`, `/tr/` with correct
`<html lang>` and reciprocal `hreflang` tags (incl. `x-default`). Do NOT machine-translate and
ship — route through a native localizer. Belgium is bilingual: Dutch (Flanders) + French
(Wallonia/Brussels), so it's covered by both the `/nl/` and `/fr/` trees.

---

## Priorities for the next iterations
1. **P0 commercial + P0 case-study** terms first — they convert and face the least competition.
2. Validate every P0/P1 term in Trends + Keyword Planner; drop any with zero real volume.
3. One article per P0 COMM/INFO term, internally linked to the matching service section.
4. i18n only after EN core proves it ranks — translating a page that doesn't rank wastes the localizer.
