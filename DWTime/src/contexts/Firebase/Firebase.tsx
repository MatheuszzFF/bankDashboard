import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCkh7s4LW79jL8SkVZaevCPk1R-tnmVEOA",
    authDomain: "bank-dashboard-5a59b.firebaseapp.com",
    projectId: "bank-dashboard-5a59b",
    storageBucket: "bank-dashboard-5a59b.appspot.com",
    messagingSenderId: "642700569616",
    appId: "AIzaSyCkh7s4LW79jL8SkVZaevCPk1R-tnmVEOA", // Certifique-se de usar o appId correto aqui
};
  
const app = initializeApp(firebaseConfig);

const fireStoreDb = getFirestore(app);
const fireBaseAuth = getAuth(app);
const fireBaseStorage = getStorage(app);

export { fireStoreDb, fireBaseAuth, fireBaseStorage };
