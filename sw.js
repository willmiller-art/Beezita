// --- SERVICE WORKER DO BEEZITA ---

const CACHE_NAME = 'beezita-cache-v1';

// Ocorre quando o celular baixa o código pela primeira vez ou acha uma atualização no GitHub
self.addEventListener('install', (event) => {
    // A MÁGICA: Pula a fila de espera e obriga o celular a instalar a versão nova imediatamente
    self.skipWaiting();
});

// Ocorre logo após a instalação, ativando o novo código
self.addEventListener('activate', (event) => {
    // A MÁGICA: O novo código assume o controle de todas as abas abertas do web app na mesma hora
    event.waitUntil(clients.claim());
});

// Intercepta as requisições de rede (necessário para o PWA funcionar offline e ser instalável)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
