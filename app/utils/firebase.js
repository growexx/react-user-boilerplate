import firebase from 'firebase';

// initializing firebase app
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then(res => {
      // eslint-disable-next-line no-console
      console.log(res.user);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
};

export const signInWithFacebook = () => {
  auth
    .signInWithPopup(facebookProvider)
    .then(res => {
      // eslint-disable-next-line no-console
      console.log(res.user);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
};
