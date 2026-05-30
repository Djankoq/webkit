const CACHE_NAME = 'my-app-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/static/css/main.chunk.css', // Пути могут отличаться в зависимости от сборки
  '/static/js/main.chunk.js',
  '/static/js/bundle.js'
];

// Установка Service Worker и кеширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Активация Service Worker и очистка старого кеша
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка fetch-запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если ресурс найден в кеше, возвращаем его
        if (response) {
          return response;
        }

        // Если это API-запрос и мы офлайн, возвращаем ошибку
        if (!navigator.onLine && event.request.url.includes('/api/')) {
            return new Response(JSON.stringify({ error: 'You are offline' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // В противном случае, делаем запрос к сети
        return fetch(event.request);
      })
  );
});