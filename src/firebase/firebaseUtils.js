import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBBN6cgKzguakw1-WUXmDvkLyHj5ksJeQo",
  authDomain: "react-ecommerce-1e7fa.firebaseapp.com",
  databaseURL: "https://react-ecommerce-1e7fa.firebaseio.com",
  projectId: "react-ecommerce-1e7fa",
  storageBucket: "react-ecommerce-1e7fa.appspot.com",
  messagingSenderId: "110029739708",
  appId: "1:110029739708:web:464e72471337b9a92fe2b9",
};

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
