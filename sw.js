const CACHE_NAME = 'telefonos-app-v1';
const urlsToCache = [
    './',
    './index.html'
];

// Instala el Service Worker y guarda en caché los archivos básicos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// Activa el Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// Intercepta las solicitudes para funcionar más rápido (y offline en el futuro si se requiere)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
