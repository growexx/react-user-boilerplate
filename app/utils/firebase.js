/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/messaging';

// initializing firebase app
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
export const fcm = firebase.messaging();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js', { scope: '/' })
    .then(async registration => {
      console.log('Service Worker Registered', registration);
      fcm
        .getToken({
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })
        .then(currentToken => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.',
            );
          }
        })
        .catch(err => {
          console.log('An error occurred while retrieving token. ', err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}
