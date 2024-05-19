// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FB_API_KEY,
  authDomain: import.meta.env.FB_AUTH_DOMAIN,
  projectId: import.meta.env.FB_PROJECT_ID,
  storageBucket: import.meta.env.FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.FB_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
