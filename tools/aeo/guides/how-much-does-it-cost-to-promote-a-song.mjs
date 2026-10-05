const S = {
  bbPaid: 'https://www.billboard.com/pro/song-viral-tiktok-organically-or-paid-for/',
  npr: 'https://www.npr.org/2026/07/13/nx-s1-5849926/influencers-paid-music-promotion',
  bbCurators: 'https://www.billboard.com/pro/tiktok-curators-viral-songs',
  bbFan: 'https://www.billboard.com/pro/fan-pages-artists-marketing-tool/',
  variety: 'https://variety.com/2026/music/news/clipping-marketing-tool-took-over-music-industry-1236699705/',
  vulture: 'https://www.vulture.com/article/social-media-feeds-chaotic-good-projects-clipping.html',
  midia: 'https://www.midiaresearch.com/blog/clipping-campaigns-marketings-next-move-in-a-fragmented-attention-economy',
  ttAds: 'https://ads.tiktok.com/help/article/budget',
  lebesgue: 'https://lebesgue.io/tiktok-ads/tiktok-ads-benchmarks-for-ctr-cr-and-cpm',
};
const a = (href, text) => `<a class="src" href="${href}" target="_blank" rel="noopener">${text}</a>`;

export default {
  slug: 'how-much-does-it-cost-to-promote-a-song',
  order: 4,
  tag: 'Pricing',
  crumb: 'What song promotion costs',
  title: 'How Much Does It Cost to Promote a Song in 2026? TikTok, Influencers and Clipping',
  h1: 'How much does it cost to promote a song in 2026?',
  description: 'Real 2026 prices for promoting a song: TikTok ads, influencer posts ($25 to $10,000), meme pages, clipping campaigns (about $1 per 1,000 views) and managed packages, all sourced.',
  card: 'TikTok ads, influencer posts from $25 to $10,000, meme pages, clipping at about $1 per thousand views, and managed packages. Every price sourced.',
  dek: 'Sourced prices for every way to push a song',
  date: '2026-10-05',
  summary: [
    'Paying creators to use a song runs from <strong>$25 a post for micro creators to about $10,000</strong> for a top TikTok star, per Billboard. Agencies put a worthwhile creator campaign at $5,000 and up.',
    'Clipping is the cheapest reach in the market: clients typically pay <strong>about $1 per thousand views</strong>, against roughly $10 for a billboard and $30 or more for TV, according to Vulture.',
    'What you are really buying is not views but <strong>repetition</strong>. Budget for a month or more of daily posting on one song, not one big post.',
  ],
  body: `
    <p class="lede">Ask five people what it costs to promote a song and you will get five answers, because they are pricing five different things. Here is what each route actually costs in 2026, from people who have seen the invoices, and what each one buys you.</p>

    <h2>The price of every route, side by side</h2>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Route</th><th>Typical price</th><th>What you get</th></tr></thead>
      <tbody>
        <tr><td>TikTok ads</td><td>From $50 per campaign; around $4.80 per 1,000 impressions on average</td><td>A labelled &ldquo;Sponsored&rdquo; post in feeds</td></tr>
        <tr><td>Micro creator post</td><td>From $25 per post</td><td>One video from a small account</td></tr>
        <tr><td>Mid-size creator post</td><td>$150 to $600 per post</td><td>One video from an 80K to 1.1M follower account</td></tr>
        <tr><td>Top creator post</td><td>About $10,000 per post</td><td>One video from a major account</td></tr>
        <tr><td>Creator campaign</td><td>$5,000 to $80,000</td><td>Many creators posting around a release</td></tr>
        <tr><td>Meme and curator pages</td><td>$400 to $1,000 per post</td><td>A post on a music or meme page</td></tr>
        <tr><td>Open clipping campaign</td><td>$1,000 to $5,000; clippers paid $1 to $5 per 1,000 views</td><td>Many clips from many posters, paid on views</td></tr>
        <tr><td>Managed clipping (ours)</td><td>&pound;1,000 to &pound;10,000 a month</td><td>90 to 720 posts a month on run pages, linked to your sound</td></tr>
      </tbody>
    </table></div>
    <div class="tbl-cap">Sources: TikTok, Lebesgue, Billboard, NPR, Variety, Vulture. Details and links below.</div>

    <h2>How much does TikTok promotion cost?</h2>
    <p>The cheapest way in is TikTok&rsquo;s own ad platform. A campaign budget ${a(S.ttAds, 'must exceed $50')}, with ad groups from $20 a day. One ad analytics firm puts the ${a(S.lebesgue, 'average TikTok ads CPM at $4.80')}, though that figure comes from ecommerce brands, not music. The catch for songs is the label: an ad is marked &ldquo;Sponsored&rdquo;, people scroll past adverts, and a paid post rarely makes anyone use your sound. Vulture reports a sponsored TikTok ad ${a(S.vulture, 'can cost ten times what a clipping campaign does')} for the same reach.</p>

    <h2>How much do TikTok influencers charge to use a song?</h2>
    <p>This is the route most labels have used for years. Billboard&rsquo;s reporting puts the range at ${a(S.bbPaid, '$25 for a micro creator to $10,000 for a TikTok star')}, with top creators rarely fetching more than $10,000 for a song. NPR spoke to music influencers in 2026: one with 80,000 followers charges ${a(S.npr, '$150 to $400 per post')}, another with 1.1 million charges about $300 to $600. Two marketing agencies told Billboard that ${a(S.bbPaid, '$5,000 is the low end for a campaign worth running')}, and spend can reach $80,000.</p>
    <p>Below the creators sit music and meme pages. Empire told Billboard it can ${a(S.bbCurators, '&ldquo;make a splash&rdquo; with 400 or 500 bucks')} on a curator post, and a rap blog quoted $1,000 for a solo post. And at the very bottom of the ladder, one label boss told Billboard he would ${a(S.bbFan, 'rather pay a kid $50 to make six edits')} for a song than pay an influencer for one post.</p>

    <h2>How much does a music clipping campaign cost?</h2>
    <p>Clipping pays for distribution rather than personality: editors cut short videos with your song in them and post across many accounts. Variety reports that music clipping campaigns ${a(S.variety, 'run on average $1,000 to $5,000')}, paying clippers $1 to $5 for every 1,000 impressions until the budget runs out. From the client&rsquo;s side, Vulture puts a typical campaign at ${a(S.vulture, 'roughly a dollar per thousand views')}, and MIDiA Research says ${a(S.midia, 'many campaigns cost as little as $1 CPM')}.</p>

    <figure>
      <div class="figbox">
      <svg class="ch" viewBox="0 0 720 250" role="img" aria-label="Cost per thousand views: clipping about 1 dollar, TikTok ads about 4.80 dollars on average, a billboard about 10 dollars, a TV spot 30 dollars or more.">
        <defs><linearGradient id="cb" x1="0" x2="1"><stop offset="0" stop-color="#7a1622"/><stop offset="1" stop-color="#b3202c"/></linearGradient></defs>
        <g font-family="Inter,-apple-system,sans-serif">
          <text x="10" y="24" fill="#2d2724" font-size="15" font-weight="700">What 1,000 views costs</text>
          <text x="170" y="74" text-anchor="end" fill="#5c534e" font-size="13">Clipping</text>
          <rect x="180" y="58" width="17" height="24" rx="5" fill="url(#cb)"/>
          <text x="206" y="75" fill="#2d2724" font-size="13" font-weight="700">~$1</text>
          <text x="170" y="114" text-anchor="end" fill="#5c534e" font-size="13">TikTok ads</text>
          <rect x="180" y="98" width="82" height="24" rx="5" fill="#c9b6ae"/>
          <text x="271" y="115" fill="#2d2724" font-size="13" font-weight="700">~$4.80 average</text>
          <text x="170" y="154" text-anchor="end" fill="#5c534e" font-size="13">Billboard</text>
          <rect x="180" y="138" width="170" height="24" rx="5" fill="#c9b6ae"/>
          <text x="359" y="155" fill="#2d2724" font-size="13" font-weight="700">~$10</text>
          <text x="170" y="194" text-anchor="end" fill="#5c534e" font-size="13">TV spot</text>
          <rect x="180" y="178" width="510" height="24" rx="5" fill="#c9b6ae"/>
          <text x="680" y="195" fill="#fff" font-size="13" font-weight="700" text-anchor="end">$30+</text>
          <text x="10" y="236" fill="#8a7f7a" font-size="11.5">Clipping, billboard and TV from Vulture (May 2026); TikTok ads from Lebesgue&rsquo;s ecommerce benchmark.</text>
        </g>
      </svg>
      </div>
      <figcaption><strong>Reach is cheapest through clips.</strong> The trade-off is control: in open campaigns you do not choose who posts or how the song is framed.</figcaption>
    </figure>

    <h2>What a managed clipping package costs</h2>
    <p>Open campaigns price per view. A managed operation prices per month, for a set number of posts on pages it runs, in the formats you choose. Ours, for artists and labels:</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Package</th><th>Price</th><th>What you get</th></tr></thead>
      <tbody>
        <tr><td>Minimum</td><td>&pound;1,000 a month</td><td>90 posts, 1 song, 2 niches</td></tr>
        <tr><td>Standard</td><td>&pound;3,000 a month</td><td>300 posts, 2 songs, 3 niches</td></tr>
        <tr><td>Premium</td><td>&pound;5,000 a month</td><td>300 posts on our pages, 90 on 3 accounts you own</td></tr>
        <tr><td>Elite</td><td>&pound;10,000 a month</td><td>450 posts on our pages, 270 on 9 accounts you own</td></tr>
      </tbody>
    </table></div>
    <div class="tbl-cap">Posts go out across Instagram, TikTok and YouTube, every one linked to your official sound. Full details on the <a href="/music/#packages">music page</a>.</div>

    <h2>How to spend a song promotion budget</h2>
    <ul>
      <li><strong>Under &pound;1,000.</strong> Make the versions editors want (sped-up, slowed, instrumental), post daily edits yourself, and put a few hundred into meme or curator pages that suit the song.</li>
      <li><strong>&pound;1,000 to &pound;3,000 a month.</strong> Daily clipping across pages that already have an audience, focused on one song and two or three formats, for at least a month.</li>
      <li><strong>&pound;5,000 and up.</strong> Clipping plus accounts you own, so the audience you build stays with you, with a handful of creator posts around the moments that matter.</li>
    </ul>
    <p>Whatever the budget, put it behind one song for long enough to work. A single big post is a moment. Repetition is what turns a hook into a hit.</p>
`,
  faqs: [
    ['How much does it cost to promote a song on TikTok?', 'TikTok ads start from a $50 campaign budget and average around $4.80 per 1,000 impressions (ecommerce benchmark). Paying creators runs from $25 a post for micro creators to about $10,000 for top stars. Clipping campaigns typically cost the client about $1 per 1,000 views.'],
    ['How much do influencers charge to promote a song?', 'NPR found mid-size music influencers charging $150 to $600 a post in 2026. Billboard reported a range of $25 for micro creators to about $10,000 for TikTok stars, with full creator campaigns from $5,000 to $80,000.'],
    ['How much does a music clipping campaign cost?', 'Variety reports music clipping campaigns averaging $1,000 to $5,000, paying clippers $1 to $5 per 1,000 impressions. Managed operations charge monthly instead; ours start at &pound;1,000 a month for 90 posts.'],
    ['What is the cheapest way to promote a song?', 'Per view, clipping is the cheapest paid reach, at around $1 per thousand views. The cheapest overall is doing it yourself: releasing sped-up and instrumental versions, and posting daily edits with your official sound attached.'],
  ],
  sources: [
    ['Billboard Pro, on whether viral TikTok songs are organic or paid for (October 2024)', S.bbPaid],
    ['NPR, on music influencers paid to promote songs (July 2026)', S.npr],
    ['Billboard Pro, on TikTok music curator pages (August 2022)', S.bbCurators],
    ['Billboard Pro, on fan pages as a marketing tool (August 2024)', S.bbFan],
    ['Variety, on clipping in the music industry (March 2026)', S.variety],
    ['Vulture, &ldquo;The Feed Is Fake&rdquo; (May 2026)', S.vulture],
    ['MIDiA Research, on clipping campaigns (May 2026)', S.midia],
    ['TikTok Ads Manager help, campaign budgets', S.ttAds],
    ['Lebesgue, TikTok ads benchmarks (September 2026)', S.lebesgue],
  ],
};
