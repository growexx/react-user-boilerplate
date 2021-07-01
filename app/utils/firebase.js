import firebase from 'firebase/app';
// auth import from firebase
import 'firebase/firestore';

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
 * db - firebase firestore connection reference
 */
export const db = firebase.firestore();

/**
 * getFireStoreCollectionReference
 * @param {String} collectionName
 * @returns collection reference
 */
export const getFireStoreCollectionReference = collectionName =>
  db.collection(collectionName);

/**
 * getFireStoreDocumentReference
 * @param {String} collectionName
 * @param {String} documentName
 * @returns document reference
 */
export const getFireStoreDocumentReference = (collectionName, documentName) =>
  db.collection(collectionName).doc(documentName);

/**
 * getFireStoreDocumentData
 * @param {String} collectionName
 * @param {String} documentName
 * @returns document data
 */
export const getFireStoreDocumentData = (collectionName, documentName) =>
  db
    .collection(collectionName)
    .doc(documentName)
    .get();

/**
 * setFirestoreDocumentData
 * @param {String} collectionName
 * @param {String} documentName
 * @param {Object} payload
 * @returns
 */
export const setFirestoreDocumentData = (
  collectionName,
  documentName,
  payload,
) =>
  db
    .collection(collectionName)
    .doc(documentName)
    .set(payload);
