फ़ाइल 1: "service-worker.js"

"use strict";

const CACHE_NAME = "bharat-nova-v1";

self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    (async function() {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(function(key) {
            return key !== CACHE_NAME;
          })
          .map(function(key) {
            return caches.delete(key);
          })
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(async function() {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      return new Response(
        "इंटरनेट उपलब्ध नहीं है। कृपया दोबारा कोशिश करें।",
        {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        }
      );
    })
  );
});

फ़ाइल 2: "icon.svg"

<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#071b35"/>
  <rect x="38" y="38" width="436" height="436" rx="85" fill="#087cf0"/>
  <text x="256" y="310" font-family="Arial,sans-serif" font-size="150" font-weight="bold" text-anchor="middle" fill="#ffffff">BN</text>
  <circle cx="390" cy="115" r="24" fill="#75c6ff"/>
</svg>
