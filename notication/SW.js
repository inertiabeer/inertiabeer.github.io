var CACHE_NAME = '测试Test';
var urlsToCache = [
    '/css/index.css',
    '/js/index.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            cache.addAll(urlsToCache);
            return;
        })
    );
});
