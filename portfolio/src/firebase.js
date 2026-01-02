import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage"; // optional

const firebaseConfig = {
  apiKey: "AIzaSyCKmWmfMgdjP1ANriuoK_ubRaz5Ooz8xJs",
  authDomain: "first-project-96c6a.firebaseapp.com",
  projectId: "first-project-96c6a",
  storageBucket: "first-project-96c6a.appspot.com",
  messagingSenderId: "846251326596",
  appId: "1:846251326596:web:92570c3785a89fa49096d1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app); // enable only if needed
