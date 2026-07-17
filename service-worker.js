const CACHE_NAME = "neko-bousai-games-v7";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./img/gemes192.png",
  "./img/gemes512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
