/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/**
 * THIS IS FOR NOTIFICATION FIREBASE
 */
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBH8BC-ZxKiNjsoYAX59i3Eg4zx7Z2SawA',
  authDomain: 'react-user-boilerplate.firebaseapp.com',
  projectId: 'react-user-boilerplate',
  storageBucket: 'react-user-boilerplate.appspot.com',
  messagingSenderId: '880855602241',
  appId: '1:880855602241:web:5edc2da8fe488287c322c0',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  const { notification } = payload;

  self.registration.showNotification(notification.title, notification);
});
