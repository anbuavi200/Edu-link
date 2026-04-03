self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'EduLink AI Reminder';
  const options = {
    body: data.body || 'Time to study!',
    icon: '/sparkles.png', // Placeholder icon
    badge: '/sparkles.png',
    data: {
      url: self.location.origin + '/dashboard'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
