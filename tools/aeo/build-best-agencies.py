#!/usr/bin/env python3
"""Builds /blog/best-clipping-agencies/index.html from the live article shell."""
import json, re, html, pathlib

SITE = pathlib.Path.home() / "vision-clipping-site"
SLUG = "best-clipping-agencies"
URL = f"https://vision-clipping.com/blog/{SLUG}/"
TITLE = "Best Clipping Agencies in 2026: 10 Compared"
HEADLINE = "Best Clipping Agencies in 2026: 10 Compared by Model, Price and Fit"
DESC = ("The best clipping agencies in 2026 side by side: how each works, published pricing, platforms "
        "and who each one is best for. Sourced, checked October 2026.")
CRUMB = "Best clipping agencies 2026"

def ext(href, text):
    return f'<a href="{href}" rel="nofollow noopener" target="_blank">{text}</a>'

def src(href, text):
    return f'<a class="src" href="{href}" rel="nofollow noopener" target="_blank">{text}</a>'

# ---- agencies, grouped by model; order inside a group = how often lists name them
AGENCIES = [
  dict(group="owned", name="Vision Clipping", url="https://vision-clipping.com/", internal=True,
       model="Managed team, accounts the client owns",
       price="$3,000/mo per channel (4 accounts, 120 posts); 3-month minimum",
       platforms="TikTok, Instagram, YouTube, Facebook",
       best="Founders and brands who want accounts they keep, views in the markets they sell to, and click attribution",
       body=("This is us. Our own team cuts the clips and posts them every day on a network of accounts "
             "<strong>the client owns</strong> (four per channel: TikTok, Instagram, YouTube, Facebook). "
             "Accounts run on dedicated devices set up in the client&rsquo;s target region, every post is checked "
             "by a manager first, and the client gets a dashboard with click attribution. Pricing is "
             "<a href=\"/#pricing\">published</a>: $3,000 a month for one channel, $12,000 for four. "
             "Clients include Iman Gadzhi, Luke Belmar and Russell Brunson, with 3B+ views generated for clients "
             "across <a href=\"/cases/\">our case studies</a>. For artists there is a separate "
             "<a href=\"/music/\">music offer</a> that places songs into trending edit formats on pages we own.")),
  dict(group="network", name="Clipping Culture", url="https://clippingculture.com/",
       model="Clipper network (500K+ community on Whop)",
       price="Averages of about 22M views for $15K, 70M for $50K, 140M for $100K",
       platforms="TikTok, Instagram Reels, YouTube Shorts",
       best="Music labels, entertainment and large brands that want huge volume with a published budget guide",
       body=("Clipping Culture runs one approved source library through a very large network of independent "
             "clippers, built on a community of 500K+ on Whop. It is unusually open about pricing: its pricing page lists "
             "averages of about 22M verified views for $15,000 and 140M for $100,000, and rejected posts cost nothing. "
             "It says every submission is reviewed before it publishes, reports verified views live with a platform split, "
             "and sends monthly dashboards that include effective CPM. Self-reported results include 2B+ views from 25,245 "
             "clips for bbno$, and Variety named it in its 2026 piece on clipping in the music industry. It appears on every "
             "major &ldquo;best clipping agencies&rdquo; list we checked.")),
  dict(group="network", name="The Clip Ship", url="https://theclipship.com/",
       model="Clipper network (200,000+ creators)",
       price="About $1 per 1,000 views, fixed; pilots from about $10K",
       platforms="TikTok, Instagram Reels, YouTube Shorts",
       best="Music, film and TV launches that want a fixed, transparent rate",
       body=("The Clip Ship works on a fixed rate of about $1 per 1,000 views, with every clip verified before "
             "payout, and says pilot campaigns start around $10K. Its recent campaigns are listed with their ending CPM, "
             "between $0.16 and $0.60. Self-reported work includes 125M+ views for Logic&rsquo;s &ldquo;Paradise Records&rdquo; "
             "and 40M views in 10 days for Mewgenics, and its logo wall includes Capitol Records and Universal Music Group.")),
  dict(group="network", name="Lumina Clippers", url="https://luminaclippers.com/",
       model="Clipper network (62,900+ verified clippers)",
       price="$5,000 minimum, custom rate per 1,000 verified views (illustrative $2.50 to $4)",
       platforms="TikTok, Instagram Reels, YouTube Shorts, X, plus LinkedIn on founder and B2B campaigns",
       best="B2B, SaaS, crypto and founder brands that want a big network with bot filtering",
       body=("Lumina turns long-form content into thousands of vertical clips posted by a network of 62,900+ "
             "verified clippers. Every clip is reviewed against the brief before it goes live, and bot traffic is filtered "
             "out before it reaches the report. Campaigns start at $5,000 and you pay only for verified views; Lumina reports "
             "views, engagement and top hooks, and you track conversions in your own analytics. It has a dedicated founder "
             "personal-brand offer. Self-reported results include 1.8B+ views for Stake and 164M+ in 30 days for Wispr Flow.")),
  dict(group="network", name="Clouted", url="https://clouted.com/",
       model="Hybrid: AI agents plus a creator network",
       price="Not published",
       platforms="TikTok, Instagram, YouTube, X, Facebook",
       best="Brands that want clipping bundled with AI testing, UGC and wider creator marketing",
       body=("Clouted pairs a network of 100,000+ creators with AI agents; it says its platform learns which formats win "
             "and which audiences convert. It reviews every clip for quality and brand safety before it goes live. It also "
             "sells UGC, influencer seeding, performance ads and a fan page service in which it sets up accounts and shares "
             "the keys with the brand. TechCrunch reported its $7M seed round led by Slow Ventures in May 2026. Self-reported "
             "work includes 30M+ views and about 1,000 clips in two weeks for ILLENIUM.")),
  dict(group="network", name="Clipping Agency", url="https://clippingagency.co/",
       model="Clipper network, set up and run on Whop",
       price="Says about $0.003 per view on average; exact quote on a call",
       platforms="TikTok, Instagram Reels, YouTube Shorts, X (LinkedIn and Facebook Reels on request)",
       best="Creators and podcasters who want a done-for-you Whop clipping program",
       body=("clippingagency.co sets up a brand&rsquo;s whole clipping engine on Whop (setup, dashboard, automation "
             "and rules) and then runs it, with clippers paid on the views their clips earn. It says every clip goes through "
             "its internal review before it goes live, offers region-matched clipper networks for markets like the US and UAE, "
             "and quotes an average of around $0.003 per view, with exact pricing on a call. It has dedicated offers for "
             "podcasts and X, and a live dashboard showing views, clip volume and clipper activity.")),
  dict(group="network", name="Clipify", url="https://clipifymedia.com/",
       model="Clipper network (10K+ vetted creators)",
       price="Pay for performance; rate not published",
       platforms="YouTube Shorts, TikTok, Instagram Reels, X",
       best="Creators and brands that want to launch a pay-per-view campaign quickly",
       body=("Clipify Media puts a campaign in front of a community of 10K+ vetted clippers; you set the budget and "
             "only pay when clips meet your standards and deliver views. Its dashboard tracks views, engagement and ROI per clip, "
             "with AI filtering of artificial views. Self-reported totals: 6.9B+ views and 200+ campaigns, including "
             "Rumble and Higgsfield AI.")),
  dict(group="network", name="ClipFarm", url="https://www.clipfarm.biz/",
       model="Clipper network, built on Whop",
       price="You choose the rate per 1,000 views; no upfront fees",
       platforms="Not stated",
       best="Testing clipping cheaply, at a rate you set yourself",
       body=("ClipFarm connects a brand directly to its network of clippers and lets the brand choose exactly what it pays per "
             "1,000 views, with no upfront fee. ClipFarm reviews the submitted clips and approves the ones that match the "
             "campaign, and you pay only for approved views. Its homepage shows work for names including HBO Max, the Jonas "
             "Brothers and Fortnite.")),
  dict(group="self", name="Clipur", url="https://clipur.ai/",
       model="Self-serve platform, plus a managed option",
       price="$250 / $500 / $1,000 a week for about 200K / 440K / 880K verified views",
       platforms="YouTube, TikTok, Instagram, X",
       best="Startups that want to start small with a published weekly price",
       body=("Clipur lets a brand launch a pay-per-view campaign itself with no agency call, using weekly plans "
             "from $250, and pays only for views verified through the platforms&rsquo; own APIs. Its Clipper University site "
             "describes clipur.com as its managed agency; the two are run by the same team, which Clipper University says on "
             "its own ranking page.")),
  dict(group="self", name="Vyro", url="https://vyro.com/",
       model="Self-serve clipper marketplace from MrBeast&rsquo;s Beast Industries",
       price="Pay per verified view up to a max CPM you set; $1,000 minimum budget",
       platforms="Instagram, TikTok, YouTube Shorts, X",
       best="Big creators and consumer brands that want a large, MrBeast-backed clipper pool",
       body=("Vyro is a MrBeast company built by Beast Industries; Tubefilter reported its launch in October 2025. "
             "Brands set a budget and a maximum CPM, with a $1,000 minimum and unused budget refunded. Creators follow the "
             "brand&rsquo;s brief, post to their own accounts and submit the live post for review; view counts and earnings "
             "refresh hourly. The site says it is trusted by MrBeast, Mark Rober and Unwell, and MrBeast campaigns run on it.")),
]

GROUPS = [
  ("owned", "Managed, on accounts the brand owns",
   "A team makes and posts the clips on accounts that belong to the brand. Higher monthly cost, but the accounts, followers and data stay with you, and posting can be aimed at a region."),
  ("network", "Managed clipper networks",
   "The agency briefs a large network of independent clippers who post on their own accounts and are paid per 1,000 verified views. This is usually the lowest cost per view and the fastest way to flood a launch."),
  ("self", "Self-serve marketplaces",
   "You set up the campaign and the rate yourself and clippers pick it up. Cheapest way to test, with the least hand-holding."),
]


# Tick table. y = stated on their own site; n = ruled out by how their own site says they work
# (e.g. clips post on clippers' accounts); u = not stated, so no cross. Re-check before editing.
FEATURES = [
  ("own",   "You own the accounts"),
  ("team",  "In-house team makes every clip"),
  ("check", "Every post checked before it goes out"),
  ("geo",   "Posts from devices set up in your target region"),
  ("attr",  "Click attribution per post"),
  ("fb",    "Facebook included"),
  ("price", "Published pricing"),
]
MATRIX = {
  "Vision Clipping":  dict(own="y", team="y", check="y", geo="y", attr="y", fb="y", price="y"),
  "Clipping Culture": dict(own="n", team="u", check="y", geo="u", attr="u", fb="n", price="y"),
  "The Clip Ship":    dict(own="n", team="u", check="u", geo="u", attr="u", fb="n", price="y"),
  "Lumina Clippers":  dict(own="n", team="u", check="y", geo="u", attr="n", fb="u", price="y"),
  "Clouted":          dict(own="u", team="u", check="y", geo="u", attr="u", fb="y", price="u"),
  "Clipping Agency":  dict(own="u", team="u", check="y", geo="u", attr="u", fb="y", price="y"),
  "Clipify":          dict(own="n", team="n", check="u", geo="u", attr="u", fb="n", price="n"),
  "ClipFarm":         dict(own="n", team="n", check="u", geo="u", attr="u", fb="u", price="u"),
  "Clipur":           dict(own="n", team="n", check="u", geo="u", attr="u", fb="u", price="y"),
  "Vyro":             dict(own="n", team="n", check="n", geo="u", attr="u", fb="n", price="y"),
}
MARK = {
  "y": '<span class="mk mk-y" role="img" aria-label="Yes"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7"/></svg></span>',
  "n": '<span class="mk mk-n" role="img" aria-label="No"><svg viewBox="0 0 16 16"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg></span>',
  "u": '<span class="mk mk-u" role="img" aria-label="Not stated"></span>',
}
CSS = """<style>
.ck-wrap{width:min(94vw,var(--wide));margin-left:50%;transform:translateX(-50%);overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:28px;margin-bottom:12px;border:1px solid var(--line);border-radius:14px;background:#fff}
.ck{border-collapse:separate;border-spacing:0;width:100%;min-width:760px;font-size:14px}
.ck th,.ck td{padding:12px 10px;text-align:center;vertical-align:middle;border-bottom:1px solid var(--hair)}
.ck thead th{font-size:11.5px;font-weight:650;line-height:1.3;color:var(--muted);background:var(--soft);border-bottom:1px solid var(--line)}
.ck th:first-child,.ck td:first-child{text-align:left;position:sticky;left:0;z-index:1;background:#fff;font-weight:650;color:var(--ink);padding-left:16px;min-width:128px;box-shadow:1px 0 0 var(--hair)}
.ck thead th:first-child{background:var(--soft)}
.ck tbody tr:last-child td{border-bottom:0}
.ck tr.us td{background:#fbf3f3}
.ck tr.us td:first-child{color:var(--ox);background:#fbf3f3}
.ck .score{font-weight:700;color:var(--ink)}
.ck tr.us .score{color:var(--ox)}
.mk{display:inline-flex;width:22px;height:22px;border-radius:50%;align-items:center;justify-content:center;vertical-align:middle}
.mk svg{width:13px;height:13px;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.mk-y{background:var(--ox)}.mk-y svg{stroke:#fff}
.mk-n{background:rgba(10,10,10,.06)}.mk-n svg{stroke:rgba(10,10,10,.38)}
.mk-u{width:12px;height:12px;border:1.5px solid rgba(10,10,10,.22)}
.ck-key{display:flex;flex-wrap:wrap;gap:16px;font-size:13px;color:var(--muted);margin:0 0 28px;width:min(94vw,var(--wide));margin-left:50%;transform:translateX(-50%)}
@media(max-width:760px){.ck-wrap,.ck-key{width:auto;margin-left:0;transform:none}}
.ck-key span{display:inline-flex;align-items:center;gap:7px}
.ck-key .mk{width:18px;height:18px}.ck-key .mk svg{width:11px;height:11px}.ck-key .mk-u{width:10px;height:10px}
</style>"""

FIT = [
  ("Maximum views for a launch or release, priced per view", "Clipping Culture, The Clip Ship, Lumina"),
  ("A music release", "Clipping Culture, The Clip Ship, or our <a href=\"/music/\">music offer</a>"),
  ("Testing clipping on a small budget", "Clipur, ClipFarm, Vyro, Whop Content Rewards"),
  ("Clipping plus AI testing and creator marketing", "Clouted"),
  ("Accounts you own, views in your markets, click attribution", "Vision Clipping"),
]

FAQS = [
  ("What is the best clipping agency in 2026?",
   "It depends on what you want. For the most views per dollar on a launch, clipper networks like Clipping Culture and The Clip Ship publish some of the lowest rates (around $0.70 to $1 per 1,000 views). For accounts you own, views targeted to the countries you sell in and click attribution, a managed agency on owned accounts like Vision Clipping fits better. For a cheap test, self-serve platforms like Clipur or ClipFarm let you set your own budget."),
  ("How much does a clipping agency cost?",
   "Published prices in October 2026: Clipping Culture lists an average of about 22M views for $15,000; The Clip Ship works at about $1 per 1,000 views; Lumina starts at $5,000; Clipur starts at $250 a week; Vision Clipping is $3,000 a month per channel of four owned accounts. Clipper networks charge per view; managed owned-account agencies charge a monthly retainer."),
  ("What is the difference between a clipper network and a managed clipping agency?",
   "A clipper network pays many independent clippers per view to post your clips on their own accounts, so it scales fast and cheaply but the audience sits on their pages. A managed agency on owned accounts has its own team post to accounts you own, so you keep the followers and the data and can target specific regions, at a monthly retainer."),
  ("Which clipping agency is best for founders?",
   "Founders building a personal brand usually care about keeping the audience and seeing which clips drive calls or sales. Vision Clipping runs accounts the founder owns with click attribution, and Lumina has a dedicated founder personal-brand offer on its clipper network."),
  ("Which clipping agency is best for music?",
   "Clipping Culture and The Clip Ship both do a lot of music work, and Variety named Clipping Culture in its 2026 piece on clipping in the music industry. Vision Clipping also has a music offer that places songs into trending edit formats on pages it owns."),
]

def plain(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s))

# ---------- body
b = []
b.append(f'<h1>{TITLE}</h1>')
b.append('<div class="meta">Last updated October 2026 &middot; Vision Clipping</div>')
b.append('<div class="summary"><div class="lbl">Summary</div><ul>'
         '<li>Clipping agencies in 2026 fall into three models: managed on accounts the brand owns, managed clipper networks, and self-serve marketplaces.</li>'
         '<li>Clipper networks have the lowest published cost per view: around $0.70 to $1 per 1,000 views at Clipping Culture and The Clip Ship.</li>'
         '<li>Owned-account agencies cost a monthly retainer, and the accounts, followers and data stay with the brand.</li>'
         '<li>Pick by outcome: maximum views for a launch, a cheap test, or a channel you own and can measure.</li>'
         '</ul></div>')
b.append('<p>Search &ldquo;best clipping agencies&rdquo; and almost every list you find is written by an agency that ranks itself first. '
         'This one is written by an agency too, so instead of a ranking it sorts the field by <strong>how each agency works</strong>, '
         'shows the pricing each one publishes, and says plainly who each is best for. The agencies were chosen because they come up most often '
         'across the lists that rank for this search.</p>')

b.append('<div class="callout"><p><strong>Disclosure:</strong> we are Vision Clipping, one of the agencies here. Facts about the others come from their own sites and the press listed at the end, checked 5 October 2026; results are their own figures. Something out of date? <a href="mailto:contact@J-visionmedia.com">Tell us</a>.</p></div>')
b.append('<h2>The 10 agencies at a glance</h2>')
hdr = "".join(f"<th>{t}</th>" for _, t in FEATURES)
trs = ""
for a in AGENCIES:
    m = MATRIX[a["name"]]
    score = sum(v == "y" for v in m.values())
    cls = ' class="us"' if a.get("internal") else ""
    cells = "".join(f"<td>{MARK[m[k]]}</td>" for k, _ in FEATURES)
    trs += f'<tr{cls}><td>{a["name"]}</td>{cells}<td class="score">{score}/{len(FEATURES)}</td></tr>'
b.append(f'<div class="ck-wrap"><table class="ck"><thead><tr><th>Agency</th>{hdr}<th>Score</th></tr></thead><tbody>{trs}</tbody></table></div>')
b.append('<div class="ck-key"><span>' + MARK["y"] + 'Yes, stated on their site</span><span>' + MARK["n"] + 'No, by how their site says they work</span><span>'
         + MARK["u"] + 'Not stated on their site</span></div>')
b.append('<h2>Three ways clipping agencies work</h2>')
for key, title, text in GROUPS:
    b.append(f'<p><strong>{title}.</strong> {text}</p>')
b.append('<p>None of these is the &ldquo;right&rdquo; model for everyone. A label pushing a single for two weeks and a founder building a channel for two years want different things. '
         'For the full checklist of what to ask on a call, see <a href="/blog/how-to-choose-the-best-clipping-agency/">how to choose a clipping agency</a>, and for the maths, '
         '<a href="/blog/how-much-does-a-clipping-agency-cost/">what a clipping agency costs</a>.</p>')

n = 0
for key, title, _ in GROUPS:
    b.append(f'<h2>{title}</h2>')
    for a in [x for x in AGENCIES if x["group"] == key]:
        n += 1
        link = f'<a href="{a["url"]}">{a["name"]}</a>' if a.get("internal") else ext(a["url"], a["name"])
        b.append(f'<h3>{n}. {a["name"]}</h3>')
        b.append(f'<p>{a["body"]}</p>')
        b.append(f'<p><strong>Pricing:</strong> {a["price"]}. <strong>Best for:</strong> {a["best"]}. <strong>Platforms:</strong> {a["platforms"]}. <strong>Site:</strong> {link}</p>')

b.append('<h2>Also worth knowing</h2>')
b.append('<p><strong>Whop Content Rewards</strong> is not an agency but the marketplace many of these agencies run on. A brand can post a campaign there directly, set its own rate per 1,000 views and approve each clip. '
         'Whop says clippers are paid about $1 per 1,000 views on average. Other names that appear on these ranking lists include Atomik Growth, Clip.tech, ClipUp, FORKOFF, CLPR Media, Clipster, Overlap, Spade Clipping and OCRO Media.</p>')

b.append('<h2>Which one fits you</h2>')
fr = "".join(f'<tr><td>{g}</td><td>{w}</td></tr>' for g, w in FIT)
b.append(f'<div class="tbl-wrap"><table class="tbl"><thead><tr><th>If you want</th><th>Look at</th></tr></thead><tbody>{fr}</tbody></table></div>')

b.append('<h2>How we built this list</h2>')
b.append('<p>We read the eight most visible &ldquo;best clipping agencies&rdquo; lists (published by OpusClip, Lumina, ClipUp, Clipper University, FORKOFF, OCRO Media, Spade and Overlap) and counted which agencies they name. '
         'Clipping Culture is on all eight; The Clip Ship, Clouted and Lumina on six. We then read each agency&rsquo;s own site and kept only what it states there or what reputable press reported. '
         'Where an agency does not publish a price, we say so instead of guessing.</p>')
b.append('<p>Press used: '
         + src("https://variety.com/2026/music/news/clipping-marketing-tool-took-over-music-industry-1236699705/", "Variety") + ', '
         + src("https://techcrunch.com/2026/05/20/clouted-wants-to-take-the-guesswork-out-of-making-short-videos-go-viral/", "TechCrunch") + ', '
         + src("https://www.tubefilter.com/2025/10/14/mrbeast-vyro-clipping-platform-viewstats-expansion/", "Tubefilter") + ', '
         + src("https://www.netinfluencer.com/clipping-101-inside-the-clipping-economy/", "NetInfluencer") + ', '
         + src("https://www.npr.org/2026/05/12/nx-s1-5794670-e1/the-clipping-economy-how-short-form-video-clippers-are-overrunningthe-internet", "NPR")
         + ' (NPR&rsquo;s piece features our co-founder Emrah Bayraktar).</p>')

b.append('<div class="cta-box"><h3>Want accounts you own, posting every day?</h3>'
         '<p>Book a call and we&rsquo;ll map your content to a channel plan, with the markets and numbers it should hit.</p>'
         '<a href="/book/">Book a strategy session &rarr;</a></div>')
faq_html = "".join(f'<div class="faq-q">{q}</div><p class="faq-a">{a}</p>' for q, a in FAQS)
b.append(f'<section class="faq"><h2>Frequently asked questions</h2>{faq_html}</section>')
body = "\n    ".join(b)

# ---------- schema
graph = [
  {"@type": "Article", "headline": HEADLINE, "description": DESC,
   "mainEntityOfPage": {"@type": "WebPage", "@id": URL},
   "image": "https://vision-clipping.com/assets/icons/og-image.png",
   "author": {"@type": "Organization", "name": "Vision Clipping", "url": "https://vision-clipping.com/"},
   "publisher": {"@type": "Organization", "name": "Vision Clipping",
                 "logo": {"@type": "ImageObject", "url": "https://vision-clipping.com/assets/icons/og-image.png"}},
   "datePublished": "2026-10-05", "dateModified": "2026-10-05"},
  {"@type": "ItemList", "name": "Clipping agencies compared (2026)", "itemListOrder": "https://schema.org/ItemListUnordered",
   "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": a["name"], "url": a["url"]} for i, a in enumerate(AGENCIES)]},
  {"@type": "BreadcrumbList", "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://vision-clipping.com/"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vision-clipping.com/blog/"},
    {"@type": "ListItem", "position": 3, "name": CRUMB, "item": URL}]},
  {"@type": "FAQPage", "mainEntity": [
    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in FAQS]},
]
ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=2, ensure_ascii=False)

# ---------- shell from the live buyer's guide
shell = (SITE / "blog/how-to-choose-the-best-clipping-agency/index.html").read_text()
head_end = shell.index('<link rel="preconnect"')
tail_start = shell.index('</article>')
e = html.escape
head = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{TITLE}</title>
<meta name="description" content="{e(DESC)}">
<link rel="canonical" href="{URL}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16.png">
<link rel="shortcut icon" href="/assets/icons/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
<meta name="theme-color" content="#4f0006">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Vision Clipping">
<meta property="og:url" content="{URL}">
<meta property="og:title" content="{e(TITLE)}">
<meta property="og:description" content="{e(DESC)}">
<meta property="og:image" content="https://vision-clipping.com/assets/icons/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(TITLE)}">
<meta name="twitter:description" content="{e(DESC)}">
<meta name="twitter:image" content="https://vision-clipping.com/assets/icons/og-image.png">
<script type="application/ld+json">
{ld}
</script>
'''
rest = CSS + '\n' + shell[head_end:shell.index('<!-- vc-i18n:start -->')] + shell[shell.index('<script src="/assets/attribution.js"'):shell.index('<article>')]
rest = re.sub(r'<div class="crumbs">.*?</div>',
              f'<div class="crumbs"><a href="/">Home</a> &rsaquo; <a href="/blog/">Blog</a> &rsaquo; {CRUMB}</div>', rest, flags=re.S)
out = head + rest + '<article>\n    ' + body + '\n  ' + shell[tail_start:]
for bad in ("—", "–", "&mdash;", "&ndash;"):
    assert bad not in out, f"dash found: {bad!r}"
p = SITE / "blog" / SLUG / "index.html"
p.parent.mkdir(exist_ok=True)
p.write_text(out)
print("wrote", p, len(out), "bytes")
