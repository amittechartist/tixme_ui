import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATE1yyY-YCyQ3wdtz2zzUa_ivA_Vp-m5M",
  authDomain: "oath-9cd5e.firebaseapp.com",
  projectId: "oath-9cd5e",
  storageBucket: "oath-9cd5e.appspot.com",
  messagingSenderId: "594258976789",
  appId: "1:594258976789:web:2d5f96331dc934a36f2e1c",
  measurementId: "G-QZRJYKNL8K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
