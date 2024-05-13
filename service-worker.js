self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    // Perform install steps
    event.waitUntil(
        caches.open('v1').then(cache => {
            console.log('Opened cache');
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/script.js',
                '/images/logo.png'
            ]);
        }).then(() => {
            console.log('All resources have been added to cache');
        }).catch(error => {
            console.error('Failed to cache resources during install', error);
        })
    );
});
self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
    var cacheWhitelist = ['v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Old caches cleaned.');
        })
    );
});
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request).then(response => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open('v1').then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
