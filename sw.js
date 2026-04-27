/* Vision Clipping service worker — aggressive image cache + stale-while-revalidate for everything else */
const VERSION = 'vc-v3';
const STATIC_CACHE = `${VERSION}-static`;
const IMAGE_CACHE = `${VERSION}-images`;

/* Pre-cache only the most universal assets so first-load isn't slowed. Everything else is cached on first request. */
const PRECACHE = [
  '/assets/wordmark-dark.png',
  '/assets/icons/favicon.ico',
  '/assets/icons/og-image.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(n => !n.startsWith(VERSION)).map(n => caches.delete(n))
    )).then(() => self.clients.claim())
  );
});

const isImage = (url) => /\.(png|jpe?g|webp|svg|gif|ico|avif)$/i.test(url.pathname);
const isHTML  = (req) => req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Images: cache-first. Once cached, served instantly. */
  if (isImage(url)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache =>
        cache.match(request).then(hit => hit ||
          fetch(request).then(resp => {
            if (resp && resp.status === 200) cache.put(request, resp.clone());
            return resp;
          }).catch(() => hit)
        )
      )
    );
    return;
  }

  /* HTML: network-first w/ cache fallback so users always get the latest copy when online but still load offline. */
  if (isHTML(request)) {
    event.respondWith(
      fetch(request).then(resp => {
        const copy = resp.clone();
        caches.open(STATIC_CACHE).then(c => c.put(request, copy));
        return resp;
      }).catch(() => caches.match(request).then(r => r || caches.match('/')))
    );
    return;
  }

  /* CSS / JS / fonts / other: stale-while-revalidate. Returns cache instantly, refreshes in background. */
  event.respondWith(
    caches.open(STATIC_CACHE).then(cache =>
      cache.match(request).then(cached => {
        const networkPromise = fetch(request).then(resp => {
          if (resp && resp.status === 200) cache.put(request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || networkPromise;
      })
    )
  );
});
