const CACHE_NAME = "neko-bousai-games-v5";
const FILES = [
  "/neko-bousai-games/index.html",
  "/neko-bousai-games/style.css",
  "/neko-bousai-games/manifest.json",
  "/neko-bousai-games/img/gemes192.png",
  "/neko-bousai-games/img/gemes512.png"
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
