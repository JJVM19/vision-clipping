// Case study content, sourced from "Vision Clipping - Case Studies.pdf" (Oct 2026 deck).
// Every number here is from the deck, except Evelyn's 100K top video (Jaden, 2 Oct 2026) and the
// PrankU trailer views/likes (live Instagram posts, 2 Oct 2026).
// Do not add a metric neither source carries.
// Media lives in /uploads/cases/v2/<slug>-*.webp (cropped from the deck by the build script).

export const CHAPTERS = [
  { key: 'revenue', n: '01', title: 'Revenue and reach', lead: 'Views on their own are worth nothing to a client. These campaigns were measured on the leads, sales and revenue they produced.' },
  { key: 'pages', n: '02', title: 'Pages we scaled', lead: 'Pages we built and scaled for clients, several of them starting from zero.' },
  { key: 'short', n: '03', title: 'Short form campaigns', lead: 'Trailers and clips cut from long form for A-list artists, creators and founders.' },
  { key: 'long', n: '04', title: 'Long form and creative', lead: 'If you can hold retention across 20 to 30 minutes, you know exactly which moments carry it and how to turn them into content that travels.' },
];


// PrankU campaign artists. One page each; the deck gives the talent's audience size, the trailer and
// the campaign-wide total (10.3M views across all PrankU trailers and clips), nothing per artist.
const PRANKU = "PrankU is a celebrity prank channel from the co-creator of Punk'd, running campaigns with A-list music artists and creators.";
const talent = ({ slug, name, pos, aud, reach, views, viewsLong, likes, tag, href }) => ({
  slug, chapter: 'short', name, tag, avatar: true,
  sub: `${aud}, PrankU campaign`,
  card: { img: `v2/card-${slug}.webp`, vn: views, vl: 'Trailer views' },
  stats: [[views, 'Views on the trailer'], [likes, 'Likes on the trailer'], ['10.3M', 'PrankU campaign views']],
  lede: `${name}'s PrankU episode needed a trailer that could stop ${pos} fans mid-scroll. We cut it from the long form episode and it went out on ${pos} own Instagram.`,
  background: [PRANKU, `${name} starred in one of the episodes. With ${reach}, the trailer was going in front of a huge audience.`],
  challenge: ["Every PrankU episode starts as long form. The trailer is the flagship promotion for the episode and goes out on the talent's own Instagram, so it has to hold attention from the very first frame."],
  did: [
    ['Long form in', 'We started from the full long form episode.'],
    ['High-retention trailer out', 'We cut it down into a high-retention trailer, built to hold attention from the first second to the last.'],
    ['Posted by the talent', `The trailer went out on ${pos} own Instagram as the flagship promotion for the episode.`],
  ],
  results: `The flagship trailer for ${name}'s PrankU episode, cut from the long form and posted to ${pos} Instagram. Across the PrankU campaigns, our trailers and short form content generated 10.3 million views, and this trailer alone has ${viewsLong} views and ${likes} likes on Instagram.`,
  clipsTitle: 'The <em>trailer</em>',
  clips: [{ src: `talent-${slug}-trailer`, href, views: `${views} views` }],
});
// views/likes: read from the live Instagram posts (@wepranku collabs) through the Vision Analytics
// media/info lane on 2 Oct 2026. Instagram-only; cross-platform reposts are not counted.
const TALENT = [
  talent({ slug: 'sexyy-red', name: 'Sexyy Red', pos: 'her', aud: 'Rapper with 17.6M monthly listeners', reach: '17.6 million monthly listeners', views: '4.9M', viewsLong: '4.9 million', likes: '143K', tag: 'Artist', href: 'https://www.instagram.com/p/DA6giwdPARx/' }),
  talent({ slug: 'nle-choppa', name: 'NLE Choppa', pos: 'his', aud: 'Rapper with 14.4M monthly listeners', reach: '14.4 million monthly listeners', views: '859K', viewsLong: '859,000', likes: '26.9K', tag: 'Artist', href: 'https://www.instagram.com/p/DAoeSFmSKDs/' }),
  talent({ slug: 'jojo-siwa', name: 'JoJo Siwa', pos: 'her', aud: 'Performer with 25M+ followers', reach: 'more than 25 million followers', views: '577K', viewsLong: '577,000', likes: '10K', tag: 'Creator', href: 'https://www.instagram.com/p/DBURfOsxHP3/' }),
  talent({ slug: 'jynxzi-sketch', name: 'Jynxzi & Sketch', pos: 'their', aud: 'Creators with 14M+ combined followers', reach: 'more than 14 million combined followers', views: '1.5M', viewsLong: '1.5 million', likes: '52.3K', tag: 'Creators', href: 'https://www.instagram.com/p/DAMWxbUyceF/' }),
];

export const CASES = [
  {
    slug: 'russell-brunson', chapter: 'revenue', name: 'Russell Brunson',
    sub: 'Co-founder of ClickFunnels, 1.9M followers across platforms',
    tag: 'Founder', avatar: true,
    card: { img: 'russell-brunson.webp', vn: '$106K', vl: 'Attributed revenue' },
    stats: [['1M', 'Views a month'], ['$106,255', 'Attributed revenue'], ['8', 'Month partnership']],
    lede: 'A billion-dollar founder with a huge content library and no short form system. We built the whole thing from nothing and measured every clip on revenue.',
    background: [
      'ClickFunnels is one of the most widely used sales funnel platforms in the world. Russell co-founded it from scratch and grew it past a billion dollars in cumulative revenue. He built a following of over a million entrepreneurs through books, courses and live events.',
      'The goal was simple: put his existing educational library in front of a new, younger short form audience and pull them into the ClickFunnels ecosystem.',
    ],
    challenge: [
      'No clipping course, no clipping campaign and no short form distribution system. An enormous content library was sitting unused while competitors were building audiences on short form every single day.',
    ],
    did: [
      ['Started from nothing', 'There was no system to inherit, so we built every piece of it with him, from the accounts to the editing standard.'],
      ['Built the funnel first', 'We built his clipping course and a free marketing course, so every viewer had somewhere to go after the clip.'],
      ['Ran the clipping campaign', 'His educational content was cut into clips and posted daily across the accounts.'],
      ['Measured on revenue', 'Every clip was judged on whether it moved people toward the funnel, not on views alone.'],
    ],
    results: 'Around 1,000,000 views a month, sustained for eight months, on content that was already sitting in his library. The campaign generated $106,255 in attributed revenue, and it is one of multiple campaigns we run for him at the same time.',
    proof: [{ src: 'russell-brunson-proof', cap: 'Campaign dashboard. One of multiple campaigns we run simultaneously.' }],
    clips: [
      { src: 'russell-brunson-clip1', href: 'https://drive.google.com/file/d/1aJUpMxCTkkPnQmpJGzbbvsOKzBbrTC33/view' },
      { src: 'russell-brunson-clip2', href: 'https://drive.google.com/file/d/1SgNQuy-NbpksGUyzHebuzQTvxQwptu0N/view' },
      { src: 'russell-brunson-clip3', href: 'https://drive.google.com/file/d/1aKPyJ_kkPw1VBd1v2W5oPP21pk9kdX8W/view' },
    ],
  },
  {
    slug: 'iman-gadzhi', chapter: 'revenue', name: 'Iman Gadzhi',
    sub: 'Education and agency entrepreneur, 5.6M YouTube, 2.7M Instagram, 3.2M TikTok',
    tag: 'Creator', avatar: true,
    card: { img: 'iman-gadzhi.webp', vn: '300M', vl: 'Total views' },
    stats: [['300M', 'Total views'], ['20,000+', 'Leads from one video'], ['2', 'Accounts from zero']],
    lede: 'His main channels were already huge. The funnel still needed more traffic than they could produce, so we built two new accounts whose only job was click-through.',
    background: [
      'Iman built one of the biggest education businesses in the creator economy by 23. His course funnel drives the majority of his revenue, and he has over 10 million followers across platforms.',
      'The goal: volume at the top of the funnel. More people seeing him, clicking through and entering the pipeline.',
    ],
    challenge: [
      'His own channels were already large, but the funnel needed more traffic than his main accounts alone could produce. Every extra lead had a direct cash value attached to it.',
    ],
    did: [
      ['Two accounts from a standing start', 'Both accounts were launched from zero, separate from his main channels, so they reached people his main pages were not reaching.'],
      ['Built for the landing page', 'Every clip was made to move people from the feed to his landing page and into the funnel.'],
      ['Chosen for click-through', 'The edit, the hook and the caption were all chosen for click-through, not reach.'],
    ],
    results: '300 million total views across the two accounts. Over 20,000 leads went into one of his funnels from a single video, along with a significant number of buyers into the course.',
    proof: [{ src: 'iman-gadzhi-proof', cap: 'Landing page and account screenshots from the campaign.' }],
    clips: [
      { src: 'iman-gadzhi-clip1', href: 'https://drive.google.com/file/d/1zBUDfxv2VOpqkyDN9D1SSHk1K0AOUf5_/view' },
      { src: 'iman-gadzhi-clip2', href: 'https://drive.google.com/file/d/1MbS-xdEp7j-vaUwKgDxStFnv8NQby0qk/view' },
      { src: 'iman-gadzhi-clip3', href: 'https://drive.google.com/file/d/1-CxxYRDa4wFyy_sIdlzJHeN7OrEY8N0S/view' },
    ],
  },
  {
    slug: 'luke-belmar', chapter: 'revenue', name: 'Luke Belmar',
    sub: 'Founder of Capital Club, 9M+ followers across platforms',
    tag: 'Founder', avatar: true,
    card: { img: 'luke-belmar.webp', vn: '$102K', vl: 'Tracked revenue' },
    stats: [['$102,295', 'Tracked revenue'], ['200+', 'Sales at $499'], ['$30k', 'Commission earned']],
    lede: 'We were paid 30% of every sale and nothing if it did not convert. Five months later the clips had sold $102,295 of a $499 product and turned him into a global meme.',
    background: [
      'Luke is the founder of Capital Club, an entrepreneurial network with over 15,000 active members across 72 countries and over 9 million followers across platforms.',
      'We were tied to the success of these accounts, earning a 30% commission on every sale. If it did not convert, we earned nothing.',
    ],
    challenge: [
      'Strong long form output, but no meme or mass-level presence in short form. The content that converted inside long form was not reaching the people who had never watched a full episode.',
    ],
    did: [
      ['Cut the long form', 'His existing long form was cut into clips and posted at volume every day.'],
      ['Every clip a test', 'Each clip tested an angle that was not being explored on his own channels.'],
      ['Ran the winners harder', 'The clips that produced sales were pushed harder, and the ones that did not were dropped.'],
    ],
    results: '$102,295 in tracked revenue on a $499 product in about five months, from more than 200 sales. The clips scaled hard enough that he became a global meme.',
    proof: [{ src: 'luke-belmar-proof', cap: 'Referral and sales tracking from the campaign.' }],
    clips: [{ src: 'luke-belmar-clip1' }, { src: 'luke-belmar-clip2' }, { src: 'luke-belmar-clip3' }], deckClips: true,
    clipsNote: 'Turned into a global meme.',
  },
  {
    slug: 'arab', chapter: 'pages', name: 'Arab',
    sub: 'Content creator and owner of Taboo TV',
    tag: 'Creator', avatar: true,
    card: { img: 'arab.webp', vn: '600M+', vl: 'Total views' },
    stats: [['600.7M', 'Total views'], ['1.07M', 'Followers'], ['40,253', 'Website visits to Taboo TV']],
    lede: 'A page stuck at around 150,000 followers with no system behind it. We took over distribution in August 2025 and grew it past a million followers and 600 million views.',
    background: [
      'Arab is a content creator who travels to the craziest corners of the world to document the reality of things. He also owns Taboo TV, a subscription streaming platform for him and his network of creators.',
    ],
    challenge: [
      'The page had grown to roughly 150,000 followers from spillover traffic from Instagram. There was no distribution system, no consistent posting cadence and no format testing, so the content was producing a fraction of the views it was capable of.',
    ],
    did: [
      ['Full managed operation', 'From August 2025 we built and ran the whole distribution operation, posting every day.'],
      ['Every clip a test', 'Each clip was treated as a test, and the formats that won were scaled across the account.'],
      ['Reach with a purpose', 'We targeted global reach specifically to drive awareness of Taboo TV, not just views.'],
    ],
    results: '600,712,481 total views and 1,069,540 followers. 17 million views in a single day at peak and 3.7 million watch time hours. Over 40,000 direct website visits to Taboo TV came from the videos, growing his core platform through organic content.',
    proof: [
      { src: 'arab-proof1', cap: 'Total views from the day we started, with the 17M daily view peak.' },
      { src: 'arab-proof2', cap: 'Followers from the day we started: 1M generated.' },
    ],
    clips: [{ src: 'arab-clip1' }, { src: 'arab-clip2' }, { src: 'arab-clip3' }], deckClips: true,
  },
  {
    slug: 'global-broadcast-media', chapter: 'pages', name: 'Global Broadcast Media',
    sub: 'Interview and discussion format, client confidential',
    tag: 'Confidential', confidential: true,
    card: { redacted: true, vn: '5M+', vl: 'Views in 2 weeks' },
    stats: [['5M+', 'Views generated'], ['3', 'Brand-new TikTok accounts'], ['1 week', 'To go live']],
    lede: 'They messaged us three weeks before the end of the World Cup with no accounts and no infrastructure. One week later the whole operation was live.',
    background: [
      'The sports arm of one of the most-watched interviewers in the world. During the World Cup they reached out wanting more views and more traffic driven to their long form YouTube channel.',
    ],
    challenge: [
      'They came to us three weeks before the end of the World Cup. They needed a short form distribution operation live and producing content immediately, with no existing accounts and no infrastructure, starting from zero.',
    ],
    did: [
      ['Live in one week', 'The pages were set up and the full production team was ready to go within a week.'],
      ['Three accounts from zero', 'Three brand-new TikTok accounts, with no cross-posting between them.'],
      ['Different audiences, different styles', 'We posted at volume and targeted a different audience segment with a different clip style on each account.'],
    ],
    results: 'Over 5 million views, with a huge spike in daily views across several videos that performed well, followed by a consistent floor of views day in, day out. The traffic drove straight back to the YouTube channel and led to longer-term work together.',
    proof: [{ src: 'global-broadcast-proof', cap: 'Views across the three accounts.' }],
  },
  {
    slug: 'prediction-markets', chapter: 'pages', name: 'Prediction Market',
    sub: 'Prediction and trading platform, client confidential',
    tag: 'Confidential', confidential: true,
    card: { redacted: true, vn: '13.7M', vl: 'Views in 3 weeks' },
    stats: [['13.7M', 'First campaign views'], ['3x', 'Spend increase the following month'], ['4x', 'Web traffic']],
    lede: 'A World Cup campaign to reach people who had never heard of them. 13.7 million views in three weeks, four times the web traffic, and they tripled their spend the next month.',
    background: [
      'A prediction markets platform that wanted to tie a World Cup campaign to their product and reach audiences who did not know them yet through short form content.',
    ],
    challenge: [
      'They needed to enter several content markets quickly and test whether different audiences would respond to their offer. There was no existing page network and no content production system, so everything started from zero.',
    ],
    did: [
      ['A network from zero', 'We launched a network of accounts, managed entirely by us.'],
      ['Creative direction', 'We gave creative direction directly to their team, used their existing footage and produced new material.'],
      ['Many markets at once', 'Geo-targets and posting locations were varied across the network to test different markets at the same time.'],
    ],
    results: '13.7 million views in three weeks on the first campaign. Web traffic to the platform rose 4x, alongside a clear increase in trade volume. The following month they tripled their spend with us, and they are now expanding the operation into new markets.',
    proof: [{ src: 'prediction-markets-proof', cap: 'Total views across all campaigns.' }],
  },
  {
    slug: 'wtf-games', chapter: 'pages', name: 'WTF Games',
    sub: 'Crypto casino platform, part of Supergroup',
    tag: 'Brand', avatar: true,
    card: { img: 'v2/card-wtf-games.webp', vn: '3.6M', vl: 'Views in 2 months' },
    stats: [['3.6M', 'Views'], ['9', 'Accounts managed'], ['2', 'Months']],
    lede: 'A content concept nobody in their space had done before, aimed at three specific countries and nowhere else. Nine accounts, each one built for one market.',
    background: [
      'WTF Games is a crypto casino platform, part of Supergroup. They came to us with a new content concept for their space, one that had not been done before. The goal was to bring the idea to life at scale in a consistent, repeatable format.',
    ],
    challenge: [
      'They needed to reach Swedish, Chilean and Canadian audiences specifically, without the content reaching people in other countries.',
    ],
    did: [
      ['Nine accounts from zero', 'We launched nine accounts and used our infrastructure to target each location.'],
      ['Dubbed for each market', 'Existing content was dubbed and new content was made for each market.'],
      ['Tested market by market', 'Each account showed us how its audience responded and engaged, so we could tell what worked where.'],
    ],
    results: '3.6 million views across nine accounts in two months. A brand-new content format, done at scale, with each market reached by the audience it was built for. Live audience breakdowns show 71% of one account\'s viewers in Chile and 89.3% of another\'s in Sweden.',
    proof: [
      { src: 'wtf-games-proof', cap: 'Views across the account network.' },
      { src: 'wtf-games-geo', cap: 'Geo-targeting in practice: live audience breakdowns from a Chile-targeted and a Sweden-targeted account.' },
    ],
    clips: [{ src: 'wtf-games-clip1' }, { src: 'wtf-games-clip2' }], deckClips: true,
  },
  ...TALENT,
  {
    slug: 'musa', chapter: 'short', name: 'Musa',
    sub: 'Co-founder and CMO of Crayo, the AI video editor used by 3.2M+ creators',
    tag: 'Founder', avatar: true,
    card: { img: 'v2/card-musa.webp', vn: '100K', vl: 'Total views' },
    stats: [['100K', 'Total views'], ['~30K', 'Average views per post']],
    lede: 'A founder who already knows clipping inside out wanted to see a different editing perspective on his own content. Our clips became some of the best performers on his page.',
    background: [
      'Musa Mustafa co-founded Crayo, an AI video editing tool built for clippers. He grows the product through his own short form pages, using clips to put Crayo in front of new creators.',
    ],
    challenge: [
      'Musa wanted to test a different editing perspective and style on his content, and see how it would land with a specific audience.',
    ],
    did: [
      ['A set of test clips', 'We made a set of clips for him to use and test.'],
      ['Cut for one audience', 'His long form series was cut in a specific way to speak directly to a specific audience.'],
    ],
    results: 'The clips were among the best-performing content on his page for a few days after posting, with 100,000 total views and an average of around 30,000 views per post.',
    clips: [{ src: 'musa-clip1' }, { src: 'musa-clip2' }, { src: 'musa-clip3' }], deckClips: true,
  },
  {
    slug: 'nonstop', chapter: 'long', name: 'Nonstop',
    sub: 'Basketball documentary channel, 1.2M YouTube subscribers',
    tag: 'Creator', avatar: true,
    card: { img: 'nonstop.webp', vn: '700M+', vl: 'Total views' },
    stats: [['676M', 'Long form views'], ['28M', 'Short form views'], ['70.6M', 'Watch time hours'], ['$750k+', 'Attributed revenue']],
    lede: 'A basketball documentary channel built to keep earning for years. We rebuilt the storytelling from the ground up and clipped every film for social.',
    background: [
      'Nonstop is a basketball documentary channel on YouTube, grown from nothing into a catalogue of 20 to 30 minute films on players and stories mainstream coverage ignores.',
      'The goal was a library that kept earning views for years, not a feed that burns out in a week.',
    ],
    challenge: [
      'The existing videos followed a template-driven format that was not holding retention well enough. The content was not compelling audiences to watch through, which limited both algorithmic reach and the ability to attract brand partners.',
    ],
    did: [
      ['Rebuilt the storytelling', 'We rebuilt the approach to storytelling from the ground up, with deep narrative structure in every film.'],
      ['Openings and calls to action', 'Stronger cold opens and better calls to action throughout each video.'],
      ['Tested against retention', 'Every video was tested and refined against retention data.'],
      ['Clipped for social', 'Short form clips were distributed on social, driving millions more views back to the channel.'],
    ],
    results: '676 million long form views, 70.6 million watch time hours and 1.2 million subscribers. Over $750,000 in attributed revenue, with major sponsorships secured with HelloFresh, Polymarket, DraftKings and SeatGeek. The short form clips also went viral across platforms, feeding audiences back into the long form.',
    proof: [{ src: 'nonstop-proof', cap: 'Channel views: 643,820,243 in the period shown.' }],
    videos: [
      { src: 'nonstop-video1', views: '14M views', href: 'https://www.youtube.com/watch?v=0MYacOcScG0' },
      { src: 'nonstop-video2', views: '3.5M views', href: 'https://www.youtube.com/watch?v=40SIDA-Ob8w' },
    ],
    clips: [
      { src: 'nonstop-clip1', views: '8.4M views', href: 'https://www.youtube.com/shorts/CylXSCjZfbI' },
      { src: 'nonstop-clip2', views: '846K views', href: 'https://www.youtube.com/shorts/7m0_msUUnt4' },
      { src: 'nonstop-clip3', views: '2.9M views', href: 'https://www.youtube.com/shorts/gMdAVH0k7ZQ' },
    ],
  },
  {
    slug: 'dr-insanity', chapter: 'long', name: 'Dr Insanity',
    sub: 'True crime channel, 1.72M YouTube subscribers',
    tag: 'Creator', avatar: true,
    card: { img: 'v2/card-dr-insanity.webp', vn: '18M', vl: 'Views on one video' },
    stats: [['18M', 'Long form views'], ['3M', 'Short form views']],
    lede: 'Creative direction on a flagship video that reached 18 million views, then a month of clipping on a channel that had never posted a short, right up to its acquisition.',
    background: [
      "Dr Insanity is one of YouTube's largest true crime channels, with 1.72 million subscribers. It was acquired by Wonderloom Media in July 2026. We provided assisting creative direction on a flagship video.",
    ],
    challenge: [
      'The channel had never produced short form content before. The long form video needed to be positioned correctly, and the story told in a way that would both earn algorithmic traction and hold audiences through the full runtime.',
    ],
    did: [
      ['Full creative review', 'We assisted with creative direction on the flagship video, reviewing its structure, pacing and editorial angle.'],
      ['A short form strategy', 'We then ran a short form clipping strategy for the channel for one month.'],
      ['Ahead of the sale', 'The clipping was there to boost the channel\'s perceived value ahead of the sale.'],
    ],
    results: '18 million long form views on the flagship video, and three million views from short form on a channel that had never posted shorts before. The clipping strategy ran right through to the acquisition.',
    proof: [{ src: 'dr-insanity-proof', cap: 'Channel and short form analytics during the campaign.' }],
    videos: [{ src: 'dr-insanity-video1', views: '18M views', href: 'https://www.youtube.com/watch?v=zGLUqrUMWK0' }],
    clips: [
      { src: 'dr-insanity-clip1', href: 'https://drive.google.com/file/d/1NjO6fudiU2NktE8mWVaaUoF8n4-c5XCq/view' },
      { src: 'dr-insanity-clip2', href: 'https://drive.google.com/file/d/1s_oBJ-tfq88XGD7dcUiDMq1k-IRiN6s2/view' },
      { src: 'dr-insanity-clip3', href: 'https://drive.google.com/file/d/1MiJX-aySNV3PyX-d2BYnAfxLxz-TWZAc/view' },
      { src: 'dr-insanity-clip4', href: 'https://drive.google.com/file/d/1B9ODS9rob4gUBjREEel5zeIRYS2fqG5C/view' },
    ],
  },
  {
    slug: 'midwest-safety', chapter: 'long', name: 'Midwest Safety',
    sub: 'Bodycam and law enforcement channel, 4.1M YouTube subscribers',
    tag: 'Creator', avatar: true,
    card: { img: 'v2/card-midwest-safety.webp', vn: '7.5M', vl: 'Long form views' },
    stats: [['7.5M', 'Long form views'], ['14', 'Long form videos produced'], ['10', 'Months ongoing']],
    lede: 'One of the biggest bodycam channels on YouTube needed to publish more without dropping the quality its audience expects. We took on editing and creative direction.',
    background: [
      'Midwest Safety is one of the largest bodycam and law enforcement channels on YouTube, with 4.1 million subscribers and over 2.5 billion views.',
    ],
    challenge: [
      'The channel needed to increase its production rate and publish more long form videos, while keeping the quality its existing audience expects.',
    ],
    did: [
      ['More volume', 'We came in to increase production volume.'],
      ['Editing and direction', 'We edited and led creative direction on every long form video we produced, 14 of them over 10 months.'],
      ['Cut again for Facebook', 'The videos were then cut into clips for Facebook.'],
    ],
    results: 'Around 7.5 million long form views, plus millions more as the videos were cut into clips for Facebook. The uploads have generated tens of thousands of dollars in YouTube revenue.',
    videos: [
      { src: 'midwest-safety-video1', views: '4M views', href: 'https://www.youtube.com/watch?v=qRttCDR1rd0' },
      { src: 'midwest-safety-video2', views: '1.7M views', href: 'https://www.youtube.com/watch?v=UYJwoV8aFks' },
    ],
  },
  {
    slug: 'daniel-bitton', chapter: 'long', name: 'Daniel Bitton',
    sub: 'Personal brand, CEO of Content Rewards',
    tag: 'Founder', avatar: true,
    card: { img: 'v2/card-daniel-bitton.webp', vn: '$100K+', vl: 'Attributed revenue' },
    stats: [['1.6M', 'Long form views'], ['5.2M+', 'Short form views'], ['$100k+', 'Attributed revenue'], ['1 year', 'Partnership']],
    lede: 'He only had to film. Strategy, ideas, scripting, the team and delivery were all ours, and the most viral videos on his second channel were produced by us.',
    background: [
      'Daniel had a background in building YouTube Shorts and Snapchat channels that blew up, then launching info offers on the back of those audiences. He needed help with both long form and short form content for his personal brand.',
    ],
    challenge: [
      'He needed a complete end-to-end production system, not just editing help. Strategy, ideation, team management and delivery all had to be built from nothing, and the short form side had to be running and converting alongside the long form.',
    ],
    did: [
      ['Built from scratch', 'Strategy, content ideation and what each video is about, all built from nothing.'],
      ['Ran the team', 'We managed the team that got every video produced end to end.'],
      ['He only filmed', 'While he was starting his second channel, the most viral videos were produced by us. Everything except filming was covered.'],
    ],
    results: '1.6 million long form views and over 5.2 million short form views across a one year partnership. The videos sit in a very niche guru category, so views here line up directly with customers and revenue: over $100,000 in attributable revenue, including $21,314.75 within a few days of one YouTube video going live.',
    proof: [{ src: 'daniel-bitton-proof', cap: '$21,314.75 within a few days of one YouTube video launching.' }],
    videos: [
      { src: 'daniel-bitton-video1', views: '436K views', href: 'https://www.youtube.com/watch?v=MEZuuEgz7pU&t=13s' },
      { src: 'daniel-bitton-video2', views: '193K views', href: 'https://www.youtube.com/watch?v=ZXc3TMkd3-A&t=210s' },
    ],
    clips: [
      { src: 'daniel-bitton-clip1', href: 'https://drive.google.com/file/d/1IAJKVsZQEcULDQjl1FZqpVKfarmEofK0/view' },
      { src: 'daniel-bitton-clip2', href: 'https://drive.google.com/file/d/1vXQjq2wbghnLZo9FUdv-F_M7q5sSsCbp/view' },
      { src: 'daniel-bitton-clip3', href: 'https://drive.google.com/file/d/1s1FLcjcY-AX_Kzqln8Rqv90GGH8g_KNP/view' },
    ],
  },
  {
    slug: 'evelyn-effrim-botchey', chapter: 'long', name: 'Evelyn Effrim-Botchey',
    sub: 'International model, Vogue, Vivienne Westwood, Balenciaga',
    tag: 'Personal brand', avatar: true,
    card: { img: 'v2/card-evelyn-effrim-botchey.webp', vn: '100K', vl: 'Views on top video' },
    stats: [['100K', 'Views on top video'], ['7x', 'Her average views per video'], ['6,000', 'Followers gained']],
    lede: 'A brand-new personal brand that wanted to see what proper creative direction would change. Her best video yet hit 100,000 views, and Vogue noticed.',
    background: [
      'Evelyn was just starting her personal brand and wanted to understand what the difference would look like if she had proper creative direction and production on her videos from the start.',
    ],
    challenge: [
      'A new personal brand with no prior audience and no established presence. The content had to reach the right audience straight away, not just anyone.',
    ],
    did: [
      ['End-to-end production', 'We came up with and produced the videos end to end, and supplied the concept for a third.'],
      ['Creative direction', 'Angle, format, pacing and presentation were all directed by us.'],
      ['Built for one audience', 'Every decision was made to appeal to a high-profile fashion and lifestyle audience rather than a general one.'],
    ],
    results: 'Our latest video is her best performer yet at 100,000 views, about seven times her average of around 14,000 views per video. Before that we had 76,000, 64,000 and 12,200 on the others. Every video we worked on beat the rest of her page on every engagement metric. She was spotted by Vogue, Balenciaga and Vivienne Westwood, received inbound messages from celebrities and had several brand deal conversations, and she has since signed for long-term creative direction and consistent clipping.',
    proof: [{ src: 'evelyn-effrim-botchey-proof', cap: 'Top video analytics against her typical reel.' }],
    clips: [
      { src: 'evelyn-effrim-botchey-clip1', views: '76K views', href: 'https://www.instagram.com/reel/DXw88vINVdx/' },
      { src: 'evelyn-effrim-botchey-clip2', views: '12.2K views', href: 'https://www.instagram.com/reel/DZ0PTEdNexH/' },
      { src: 'evelyn-effrim-botchey-clip3', views: '64K views', href: 'https://www.instagram.com/reel/DZNUOPHN1wP/' },
    ],
  },
];

// Homepage carousel order (strongest first).
export const HOME_ORDER = ['iman-gadzhi', 'luke-belmar', 'arab', 'nonstop', 'russell-brunson', 'sexyy-red', 'nle-choppa', 'prediction-markets', 'dr-insanity', 'daniel-bitton', 'evelyn-effrim-botchey', 'jynxzi-sketch', 'jojo-siwa'];
