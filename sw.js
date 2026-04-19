const CACHE = 'kadoshi-v1';

const PRECACHE = [
  '/kadoshi-photography/',
  '/kadoshi-photography/index.html',
  '/kadoshi-photography/css/style.css',
  '/kadoshi-photography/js/main.js',
  '/kadoshi-photography/images/logo-k-gold.png',
  '/kadoshi-photography/images/logo-full-gold.png',
  '/kadoshi-photography/images/logo-full-white.png'
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
