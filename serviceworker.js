const staticCacheName = "thundercal-v1";

const filesToCache = [
  '/',
  'index.html',
  'audios/scan.mp3',
];

// Install event to cache new files
self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(filesToCache);
      })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('thundercal-') &&
                  cacheName !== staticCacheName;
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
  );
});

// Fetch event to serve files from the cache
self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request).catch(function () {
          return caches.match('index.html');
        });
      })
  );
});
