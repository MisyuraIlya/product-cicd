// service-worker.js

const CACHE_NAME = 'my-app-cache-v1';
const CACHE_URLS = [
  '/',
  '/index.php',  
  '/build/main.css',  
  '/build/bundle.js',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
