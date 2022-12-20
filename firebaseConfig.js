import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_wCQSbeAGOR_0_9f1OKS1NPAtOjqW8uU",
  authDomain: "autocar-cf416.firebaseapp.com",
  projectId: "autocar-cf416",
  storageBucket: "autocar-cf416.appspot.com",
  messagingSenderId: "333852505190",
  appId: "1:333852505190:web:320d866fa229a2320ba9a7",
  measurementId: "G-KTF6FFDXQR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
