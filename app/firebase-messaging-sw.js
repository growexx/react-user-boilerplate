/**
 * THIS IS FOR NOTIFICATION FIREBASE
 */
importScripts(
  'https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js',
);
importScripts('sw-env.js');
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  // console.log(
  //   '[firebase-messaging-sw.js] Received background message ',
  //   payload,
  // );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png',
  };

  window.registration.showNotification(notificationTitle, notificationOptions);
});
