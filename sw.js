const CACHE_NAME = 'telefonos-app-v8'; // Le pongo v8 para que fuerce la actualización hoy
const urlsToCache = [
    './',
    './index.html',
    './icon.png'
];

// Instala el Service Worker y guarda en caché los archivos básicos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// Activa el Service Worker y LIMPIA LAS CACHÉS VIEJAS (¡La magia que faltaba!)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si el nombre de la caché no es igual a 'telefonos-app-v8', la borra
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Intercepta las solicitudes para funcionar más rápido y offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
