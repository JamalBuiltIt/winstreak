import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBXHX9XsM31Gf3JwIc0WwYAHZtLgWVf07g",
    authDomain: "statline-840a8.firebaseapp.com",
    projectId: "statline-840a8",
    storageBucket: "statline-840a8.firebasestorage.app",
    messagingSenderId: "974889536554",
    appId: "1:974889536554:web:c91cf7f7e8f71b99eb4753"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
