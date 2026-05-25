// FinancIA Service Worker — Cache-first strategy
const CACHE_NAME = 'financia-v1';
const OFFLINE_URL = '/index.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // CDN assets (Typed.js, tsParticles, Fonts)
  'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tsparticles/2.12.0/tsparticles.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600;700&display=swap'
];

// Instalação: pré-cache dos assets principais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando assets...');
      // Cache main assets (ignora falhas em CDN para não bloquear instalação)
      return cache.addAll(['/','index.html','/manifest.json']).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Removendo cache antigo:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first com fallback para rede, offline fallback para index.html
self.addEventListener('fetch', event => {
  // Ignora chamadas para API Gemini e GitHub (sempre rede)
  if (
    event.request.url.includes('generativelanguage.googleapis.com') ||
    event.request.url.includes('api.github.com') ||
    event.request.url.includes('netlify/functions')
  ) {
    return; // deixa passar sem interceptar
  }

  // Apenas GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(networkResponse => {
        // Cache respostas bem-sucedidas de origens próprias e CDN confiável
        if (
          networkResponse && networkResponse.status === 200 &&
          (event.request.url.startsWith(self.location.origin) ||
           event.request.url.includes('cdnjs.cloudflare.com') ||
           event.request.url.includes('fonts.googleapis.com') ||
           event.request.url.includes('fonts.gstatic.com'))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        // Offline: retorna index.html para rotas de navegação
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
