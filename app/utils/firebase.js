import { initializeApp } from 'firebase/app';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyDgxfCgbiO0jU2JQ5yPqcSVigloamvF9Xs',
  authDomain: 'fcm-web-demo-5dce8.firebaseapp.com',
  projectId: 'fcm-web-demo-5dce8',
  storageBucket: 'fcm-web-demo-5dce8.appspot.com',
  messagingSenderId: '655422292094',
  appId: '1:655422292094:web:fae859d2c598f83c7d182f',
};

const app = initializeApp(config);

const messaging = getMessaging(app);

export const requestFirebaseNotificationPermission = async () => {
  const currentToken = await getToken(messaging);
  if (currentToken) {
    return currentToken;
  }
  return false;
};

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
