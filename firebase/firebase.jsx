// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcPpCCojAhcWXn0TsaJFEnMK2OMCZ5ve0',
  authDomain: 'adt-cup.firebaseapp.com',
  projectId: 'adt-cup',
  storageBucket: 'adt-cup.appspot.com',
  messagingSenderId: '432629975377',
  appId: '1:432629975377:web:0e0bc07644f8c2b63cab70',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app);
