import firebase from 'firebase/app';
// auth import from firebase
import 'firebase/auth';

// initializing firebase app
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
/**
 * auth constant for social login
 */
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

/**
 * Sign In With Google
 * @returns
 */
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

/**
 * Sign In With Facebook
 * @returns
 */
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
