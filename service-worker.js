'use strict';

const CACHE_NAME = 'sp-guide-v3';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './data/stops.json',
  /* images (fallback SVG, prefer WebP from stops.json) */
  './images/01-pieta.svg',
  './images/02-kaplica-sakramentu.svg',
  './images/03-baldachim.svg',
  './images/04-oltarz-papieski.svg',
  './images/05-groty-watykanskie.svg',
  './images/06-cathedra-petri.svg',
  './images/07-kopula.svg',
  './images/08-oltarz-grzegorza.svg',
  './images/09-oltarz-ofiarowania.svg',
  './images/10-chrzcielnica.svg',
  './images/11-atrium-drzwi.svg',
  './images/12-navicella.svg',
  /* audio */
  './audio/01-pieta.mp3',
  './audio/02-kaplica-sakramentu.mp3',
  './audio/03-baldachim.mp3',
  './audio/04-oltarz-papieski.mp3',
  './audio/05-groty-watykanskie.mp3',
  './audio/06-cathedra-petri.mp3',
  './audio/07-kopula.mp3',
  './audio/08-oltarz-grzegorza.mp3',
  './audio/09-oltarz-ofiarowania.mp3',
  './audio/10-chrzcielnica.mp3',
  './audio/11-atrium-drzwi.mp3',
  './audio/12-navicella.mp3',
  /* icons */
  './icons/icon-192.png',
  './icons/icon-512.png',
];

/* Install: precache all assets */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

/* Activate: remove old caches */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch: Cache First, network fallback */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  /* Always try network first for dynamic content */
  if (url.pathname.endsWith('/data/stops.json')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        /* For navigation requests, fallback to index.html */
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
