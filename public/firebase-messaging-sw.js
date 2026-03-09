// Firebase Cloud Messaging Service Worker
// Acest fișier se încarcă în background pentru a gestiona notificări push

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase in service worker
firebase.initializeApp({
  apiKey: "AIzaSyDTza6FPVqOJCbkUtb7ETtcJMvavHeoI6M",
  authDomain: "norda-projectmd.firebaseapp.com",
  projectId: "norda-projectmd",
  storageBucket: "norda-projectmd.firebasestorage.app",
  messagingSenderId: "586357941687",
  appId: "1:586357941687:web:eaf327a9d31148e93db432",
  measurementId: "G-VVFBFLG3GJ"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification.title || 'Noardă Notificare';
  const notificationOptions = {
    body: payload.notification.body || 'Ai o nouă notificare',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'order-notification'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
