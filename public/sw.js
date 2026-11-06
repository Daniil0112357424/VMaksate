// Web Push service worker for VMaksate.
// Receives encrypted push messages (VAPID-authenticated), shows OS-level
// notifications, and routes clicks into the chat page.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let notification = {};
  try {
    notification = event.data ? event.data.json() : {};
  } catch (error) {
    // Malformed payload: fall back to a generic notification.
    notification = { title: 'ВМаксате', body: 'Новое сообщение' };
  }
  const options = {
    body: notification.body || '',
    icon: notification.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: notification.tag || undefined,
    data: { url: notification.url || '/chat.html' },
  };
  if (notification.requireInteraction) {
    options.requireInteraction = true;
  }
  event.waitUntil(self.registration.showNotification(notification.title || 'ВМаксате', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/chat.html', self.location.origin).href;
  event.waitUntil((async () => {
    const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windowClients) {
      if (!('focus' in client)) continue;
      // A tab of our app already exists: focus it and open the target chat.
      client.navigate(target);
      return client.focus();
    }
    await self.clients.openWindow(target);
  })());
});
