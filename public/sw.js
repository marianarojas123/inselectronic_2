// Service Worker para INSELECTRONIC
const CACHE_NAME = 'inselectronic-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/vite.svg'
];

// Verificar si estamos en desarrollo
const isDevelopment = self.location.hostname === 'localhost' || 
                     self.location.hostname === '127.0.0.1' ||
                     self.location.port === '5173';

if (isDevelopment) {
  console.log('Service Worker en modo desarrollo - deshabilitado');
  // En desarrollo, no hacer nada
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', () => {
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (event) => {
    // No interceptar nada en desarrollo
    return;
  });
} else {
  // Solo en producción
  console.log('Service Worker registrado para INSELECTRONIC (producción)');
  
  // Instalar Service Worker
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Cache abierto');
          return cache.addAll(urlsToCache);
        })
    );
  });

  // Interceptar solicitudes
  self.addEventListener('fetch', (event) => {
    // No interceptar solicitudes de desarrollo de Vite
    if (event.request.url.includes('@vite') || 
        event.request.url.includes('@react-refresh') ||
        event.request.url.includes('localhost:5173') ||
        event.request.url.includes('main.jsx') ||
        event.request.url.includes('chunk-')) {
      return;
    }

    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Devolver desde cache si está disponible
          if (response) {
            return response;
          }
          
          // Si no está en cache, hacer la solicitud a la red
          return fetch(event.request).catch(() => {
            // Si falla la red, devolver una respuesta por defecto
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
        }
      )
    );
  });

  // Actualizar Service Worker
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
} 