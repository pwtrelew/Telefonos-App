const CACHE_NAME = 'telefonos-app-v9'; // Subimos a v9 para que se actualice automático sin perder ningún dato
const urlsToCache = [
    './',
    './index.html',
    './icon.png'
];

// 1. Instalación: Guarda los archivos nuevos en la caché v9
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting(); // Obliga al nuevo Service Worker a tomar el control de inmediato
});

// 2. Activación y Limpieza: Destruye todas las versiones viejas (v1, v2... v8) para que no estorben
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => clients.claim())
    );
});

// 3. Respuesta rápida y soporte Offline: Sirve desde caché o busca en internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
