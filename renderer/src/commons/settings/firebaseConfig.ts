import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ENV_FIREBASE_APP_KEY,
  authDomain: process.env.NEXT_PUBLIC_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ENV_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);


