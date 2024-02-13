import { initializeApp } from 'firebase/app'
import { getFirestore, collection,doc,getDocs,query } from 'firebase/firestore'
  
const firebaseConfig = {
    apiKey: "AIzaSyC-pXZw3myj0G4TPzWC5kmwCZn3SUE6txY",
    authDomain: "vermamobile-98e83.firebaseapp.com",
    projectId: "vermamobile-98e83",
    storageBucket: "vermamobile-98e83.appspot.com",
    messagingSenderId: "809080614746",
    appId: "1:809080614746:web:122e991e1b2091b61ccd63",
    measurementId: "G-5GPGM1XL9G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collected = query(collection(db,'repairs'));

export const repairs = await getDocs(collected);
// export const DB = {
//     init: function () {
//     },
//     getAllData: function(){

//     }
// }
