importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyACAoqgmWj9K7JJatWAve7vThn5oS1R8gI",
  authDomain: "azkari-dayli-f9e88.firebaseapp.com",
  projectId: "azkari-dayli-f9e88",
  storageBucket: "azkari-dayli-f9e88.firebasestorage.app",
  messagingSenderId: "921800651251",
  appId: "1:921800651251:web:d78d043407c75b9cc2a286"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle =
    payload.notification?.title || "🌷 أذكاري ديلي";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "لديك تذكير جديد من أذكاري ديلي 🌷",
    icon: "./icon-192.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      return clients.openWindow("./");
    })
  );
});
