const CACHE_NAME = "vr-shop-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/main.js",
  "/js/products.js",
  "/manifest.json",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
