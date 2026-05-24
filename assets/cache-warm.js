/* Vision Clipping — register service worker + warm the image cache during idle time. */
(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  /* Image URLs to warm proactively (case covers, founders, logos, hero/results). After page load + idle. */
  const PREFETCH = [
    '/assets/wordmark-dark.webp',
    '/assets/icons/og-image.png',
    /* Case covers (used on homepage carousel + each case page) */
    '/uploads/cases/iman-gadzhi.webp',
    '/uploads/cases/andrew-tate.webp',
    '/uploads/cases/luke-belmar.webp',
    '/uploads/cases/arab.webp',
    '/uploads/cases/nonstop.webp',
    '/uploads/cases/russell-brunson.webp',
    /* Founder photos */
    '/uploads/jaden.webp',
    '/uploads/emrah.webp',
    '/uploads/agency.webp',
    /* Logos in carousel */
    '/uploads/logos/logo-01.webp',
    '/uploads/logos/logo-02.webp',
    '/uploads/logos/logo-03.webp',
    '/uploads/logos/logo-04.webp',
    '/uploads/logos/logo-05.webp',
    '/uploads/logos/logo-06.webp',
    '/uploads/logos/logo-07.webp',
    '/uploads/logos/logo-08.webp',
    '/uploads/logos/logo-09.webp',
    '/uploads/logos/logo-10.webp',
    '/uploads/logos/logo-forbes.webp',
    '/uploads/logos/logo-nyt.webp',
    '/uploads/logos/logo-npr.webp',
    /* 3-billion parallax results screenshots */
    '/uploads/results/r07-chart-643m.webp',
    '/uploads/results/r08-breakdown-116m.webp',
    '/uploads/results/r02-chart-64m.webp',
    '/uploads/results/r04-ring-42m.webp',
    '/uploads/results/r11-breakdown-48m.webp',
    '/uploads/results/r11-ring-35m.webp',
    '/uploads/results/r09-stats-19m.webp',
    '/uploads/results/r12-yt-14m.webp',
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
