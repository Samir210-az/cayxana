// Sadəcə PWA quraşdırıla bilmə tələbini ödəyir. Bilərəkdən heç nə keşləmir —
// tətbiq Firebase Realtime Database ilə canlı işlədiyi üçün köhnəlmiş
// versiyanın göstərilməsinin qarşısı alınır.
self.addEventListener('install', (e)=>{
  self.skipWaiting();
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(fetch(e.request));
});
