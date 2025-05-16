import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuniFgelDrKGQfSEFf3WR1a3B0_VPe40c",
  authDomain: "task-manager-app-46287.firebaseapp.com",
  projectId: "task-manager-app-46287",
  storageBucket: "task-manager-app-46287.appspot.com",
  messagingSenderId: "908142997659",
  appId: "1:908142997659:web:222e38256b380f76e6563e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);