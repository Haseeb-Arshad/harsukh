// public/unity/ServiceWorker.js
const cacheName = "MangoMango-HarsukhResidencies-0.1";
const contentToCache = [
  "/unity/Build/HarsukhWeb.loader.js",
  "/unity/Build/HarsukhWeb.framework.js.gz",
  "/unity/Build/HarsukhWeb.data.gz",
  "/unity/Build/HarsukhWeb.wasm.gz",
  "/unity/TemplateData/style.css",
  "/unity/TemplateData/favicon.ico",
  "/unity/manifest.webmanifest",
];

self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');

  e.waitUntil((async function () {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());

  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('[Service Worker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[Service Worker] Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log(`[Service Worker] Fetching resource: ${e.request.url}`);

  e.respondWith((async function () {
    const response = await caches.match(e.request);
    if (response) {
      return response;
    }

    try {
      const fetchResponse = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, fetchResponse.clone());
      return fetchResponse;
    } catch (error) {
      console.error('[Service Worker] Fetch failed:', error);
      throw error;
    }
  })());
});
