const CACHE_NAME = "cutie-media-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./signup.html",
  "./home.html",
  "./profile.html",
  "./reels.html",
  "./chat.html",
  "./order.html",
  "./notification-settings.html",
  "./style.css",
  "./script.js",
  "./cutie-media-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
