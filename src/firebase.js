import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDTza6FPVqOJCbkUtb7ETtcJMvavHeoI6M",
  authDomain: "norda-projectmd.firebaseapp.com",
  projectId: "norda-projectmd",
  storageBucket: "norda-projectmd.firebasestorage.app",
  messagingSenderId: "586357941687",
  appId: "1:586357941687:web:eaf327a9d31148e93db432",
  measurementId: "G-VVFBFLG3GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firebase Messaging if supported
let messaging = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      messaging = getMessaging(app);
    }
  }).catch(err => console.log('Messaging not supported:', err));
}

export { db, analytics, auth, messaging };