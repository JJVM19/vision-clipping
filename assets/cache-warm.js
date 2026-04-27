/* Vision Clipping — register service worker + warm the image cache during idle time. */
(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  /* Image URLs to warm proactively (case covers, founders, logos, hero/results). After page load + idle. */
  const PREFETCH = [
    '/assets/wordmark-dark.png',
    '/assets/icons/og-image.png',
    /* Case covers (used on homepage carousel + each case page) */
    '/uploads/cases/iman-gadzhi.png',
    '/uploads/cases/andrew-tate.png',
    '/uploads/cases/luke-belmar.png',
    '/uploads/cases/arab.png',
    '/uploads/cases/nonstop.png',
    '/uploads/cases/russell-brunson.png',
    /* Founder photos */
    '/uploads/jaden.png',
    '/uploads/emrah.png',
    '/uploads/agency.png',
    /* Logos in carousel */
    '/uploads/logos/logo-01.png',
    '/uploads/logos/logo-02.png',
    '/uploads/logos/logo-03.png',
    '/uploads/logos/logo-04.png',
    '/uploads/logos/logo-05.webp',
    '/uploads/logos/logo-06.png',
    '/uploads/logos/logo-07.png',
    '/uploads/logos/logo-08.webp',
    '/uploads/logos/logo-09.png',
    '/uploads/logos/logo-10.webp',
    '/uploads/logos/logo-forbes.png',
    '/uploads/logos/logo-nyt.png',
    '/uploads/logos/logo-npr.png',
    /* 3-billion parallax results screenshots */
    '/uploads/results/r07-chart-643m.jpeg',
    '/uploads/results/r08-breakdown-116m.png',
    '/uploads/results/r02-chart-64m.jpeg',
    '/uploads/results/r04-ring-42m.jpeg',
    '/uploads/results/r11-breakdown-48m.png',
    '/uploads/results/r11-ring-35m.jpeg',
    '/uploads/results/r09-stats-19m.png',
    '/uploads/results/r12-yt-14m.jpeg',
  ];

  const warm = () => {
    /* Use Image() — browser caches in HTTP cache and (with the SW active) in Cache Storage too. */
    PREFETCH.forEach(src => { const i = new Image(); i.decoding = 'async'; i.src = src; });
  };

  const schedule = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 4000 });
    else setTimeout(warm, 2200);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule);
})();
