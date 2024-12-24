import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp45GmAsPM7_gh8zkNsGnCjuQigAc_Qj8",
  authDomain: "auth-master-3e471.firebaseapp.com",
  projectId: "auth-master-3e471",
  storageBucket: "auth-master-3e471.firebasestorage.app",
  messagingSenderId: "159090226823",
  appId: "1:159090226823:web:7bfc9e0bf8c387b32b2a22",
  measurementId: "G-LMQQR05ZMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  let user = null;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    console.log(error);
  }

  return user;
};
