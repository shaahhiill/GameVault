const CACHE_NAME = 'test'
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    'images/logo.png_maskable.png',
    'images/logo.png_rounded.png'
];

self.addEventListener('install' , (event)=> {
    event.waitUntil (
        caches.open(CACHE_NAME)
        .then((cache) =>
        cache.addAll(urlsToCache)
        )
    );
});


self.addEventListener('fetch' , (event) =>{
    event.respondWith(
        caches.match(event.request)
        .then((respose) => response || fetch(event.request))
    );

});