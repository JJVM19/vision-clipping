const S = {
  ttUK26: 'https://newsroom.tiktok.com/kylas-do-you-mind-is-tiktoks-uk-song-of-the-summer-2026-as-uk-garage-takes-over-the-summer?lang=en-GB',
  ttGlobal26: 'https://newsroom.tiktok.com/tiktoks-global-and-us-song-of-the-summer-2026-katy-perrys-the-one-that-got-away?lang=en',
  ocWonderwall: 'https://www.officialcharts.com/songs/oasis-wonderwall/',
  nemzzz: 'https://www.tiktok.com/@nemzzz_/video/7426813956058058016',
  bbPhonk: 'https://www.billboard.com/music/rb-hip-hop/phonk-dance-subgenre-fast-furious-soundtrack-1235172937/',
  variety: 'https://variety.com/2026/music/news/clipping-marketing-tool-took-over-music-industry-1236699705/',
};
const a = (href, text) => `<a class="src" href="${href}" target="_blank" rel="noopener">${text}</a>`;

export default {
  slug: 'football-edit-songs',
  order: 5,
  tag: 'Football',
  crumb: 'Football edit songs',
  title: 'Football Edit Songs in 2026: How Tracks Get Into Football Edits',
  h1: 'Football edit songs in 2026: how tracks get into football edits',
  description: 'The songs that soundtracked football in 2026, why some tracks work under a goal and others do not, and how artists get their music into football edits on purpose.',
  card: 'Wonderwall, Dai Dai and the songs under 2026&rsquo;s football videos. What makes a track work under a goal, and how artists get theirs into the edits.',
  dek: 'For artists who want their song under the goals',
  date: '2026-10-05',
  summary: [
    'Football is one of the biggest soundtracks on short form video. TikTok says <strong>&ldquo;football provided another&rdquo; soundtrack to summer 2026</strong>, and Oasis&rsquo;s &ldquo;Wonderwall&rdquo; climbed back to UK No. 2 on the back of the World Cup.',
    'A song works in a football edit when the <strong>drop lands on the moment</strong>: a build for the skills, a hit for the goal, a hook inside the first few seconds.',
    'Artists get into football edits on purpose: versions editors can cut to, prizes for the best edit, and <strong>daily posting on football pages</strong> that already have an audience.',
  ],
  body: `
    <p class="lede">Scroll any football page for a minute and you will hear a dozen songs. Some are classics, some are this week&rsquo;s trending sound, and some are there because an artist made sure they would be. Here is what soundtracked football in 2026, what makes a track work under a goal, and how to get yours in.</p>

    <h2>The songs that soundtracked football in 2026</h2>
    <p>The World Cup summer turned football into one of the year&rsquo;s defining soundtracks. TikTok&rsquo;s UK summary of the season opened with it: ${a(S.ttUK26, '&ldquo;If the dancefloor provided one soundtrack to summer 2026, football provided another.&rdquo;')}</p>
    <ul>
      <li><strong>Oasis, &ldquo;Wonderwall&rdquo;.</strong> The unofficial soundtrack to England&rsquo;s World Cup. TikTok counted ${a(S.ttUK26, '336,000 creations and a 6,800% surge in searches')}, and the song went back up the Official Singles Chart to ${a(S.ocWonderwall, 'No. 2 on the chart of 23 July')}.</li>
      <li><strong>Oasis, &ldquo;Champagne Supernova&rdquo;.</strong> Also made the UK top 10, as fan content, ${a(S.ttUK26, 'football videos and cultural nostalgia')} brought the band&rsquo;s catalogue to a new generation.</li>
      <li><strong>Shakira and Burna Boy, &ldquo;Dai Dai&rdquo;.</strong> TikTok called it ${a(S.ttGlobal26, '&ldquo;the anthem of our soccer-filled summer&rdquo;')} in its global and US round-up.</li>
    </ul>
    <p>Two of those are old songs. That is the point: football edits do not care when a track came out, only whether it fits the moment on screen.</p>

    <h2>What makes a song work in a football edit</h2>
    <p>Football editors cut to the music. A track gets picked, and keeps getting picked, when it gives them the right shape to cut to:</p>
    <ul>
      <li><strong>A build and a drop.</strong> Skills and dribbles over the build, the goal on the drop. Drill, phonk, afrobeats and anthemic choruses all have this shape.</li>
      <li><strong>The hook early.</strong> Most edits run 10 to 30 seconds. If the best part of your song arrives at 1:40, cut a version where it arrives at 0:05.</li>
      <li><strong>Space to breathe.</strong> Busy vocals fight with crowd noise and commentary. Instrumental sections and clean drops are easier to cut to.</li>
      <li><strong>A feeling, not a lyric.</strong> Edits sell emotion: the comeback, the last minute winner, the farewell. Songs that carry a mood travel further than songs that need their words heard.</li>
    </ul>

    <h2>How artists get their songs into football edits</h2>
    <h3>Give editors versions they can cut to</h3>
    <p>Sped-up, slowed and instrumental versions, plus a short cut with the drop up front. Put them on your official sound so every edit links back to you.</p>
    <h3>Give editors a reason</h3>
    <p>Nemzzz did this directly, posting on his own TikTok that he would pay ${a(S.nemzzz, '&ldquo;2K 4 the best football edit&rdquo;')} to his new single, with a known editor picking the winner. A prize turns every football editor who sees the post into a potential promoter of the song.</p>
    <h3>Get on the pages that already have the audience</h3>
    <p>Edit pages are a distribution channel in their own right, and labels know it. In phonk, Black 17 Media built ${a(S.bbPhonk, 'exclusive relationships with the TikTok pages')} behind car and gym edits while its artists went from thousands of plays a day to millions. In basketball, a clipping campaign put John Summit&rsquo;s &ldquo;Lights Go Out&rdquo; behind ${a(S.variety, 'Steph Curry and Michael Jordan highlights')}, and the top clip alone did 5.3 million views. Football works the same way: the fastest route is pages that already post football every day.</p>
    <h3>Keep the song there for weeks</h3>
    <p>One edit is a moment. The songs above stuck because people heard them under football again and again across a whole tournament. Plan for a month of daily posts on one song, not a single drop.</p>

    <h2>How we put songs into football edits</h2>
    <p>Football is one of the seven formats we run for artists. We listen to the track first, cut it into football edits built so the drop lands on the moment, and post them every day across football pages we own and run on TikTok, Instagram and YouTube, each one linked to your official sound. If the song suits other formats too (news and culture, ranked lists, comps, fight edits), we split the posts across them.</p>
`,
  faqs: [
    ['What songs are used in football edits in 2026?', 'In summer 2026 Oasis&rsquo;s &ldquo;Wonderwall&rdquo; became the unofficial soundtrack to England&rsquo;s World Cup (336,000 TikTok creations, UK No. 2), &ldquo;Champagne Supernova&rdquo; made the UK top 10, and TikTok called Shakira and Burna Boy&rsquo;s &ldquo;Dai Dai&rdquo; the anthem of the soccer summer.'],
    ['What makes a good song for a football edit?', 'A clear build and drop to cut the goal to, a hook in the first few seconds, room for crowd noise, and a strong mood. Drill, phonk, afrobeats and anthemic choruses are common for that reason.'],
    ['How do I get my song into football edits?', 'Release versions editors can cut to (sped-up, instrumental, drop-first), link everything to your official sound, give editors a reason to use it (Nemzzz offered a prize for the best football edit), and get the song posted daily on football pages that already have an audience.'],
    ['Do football edits help songs chart?', 'They can. Oasis&rsquo;s &ldquo;Wonderwall&rdquo; climbed back to No. 2 on the UK chart in July 2026 after becoming the soundtrack to England&rsquo;s World Cup on TikTok. Results depend on the song fitting the format and staying in feeds for weeks.'],
  ],
  sources: [
    ['TikTok Newsroom UK, Songs of the Summer 2026 (September 2026)', S.ttUK26],
    ['TikTok Newsroom, Global and US Song of the Summer 2026 (September 2026)', S.ttGlobal26],
    ['Official Charts, Oasis &ldquo;Wonderwall&rdquo; chart history', S.ocWonderwall],
    ['Nemzzz on TikTok, football edit prize for his single (October 2024)', S.nemzzz],
    ['Billboard, on phonk and Black 17 Media (November 2022)', S.bbPhonk],
    ['Variety, on clipping in the music industry (March 2026)', S.variety],
  ],
};
