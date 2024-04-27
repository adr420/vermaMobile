import { initializeApp } from 'firebase/app'
import { getFirestore, collection,doc,setDoc,getDocs,deleteDoc,query } from 'firebase/firestore'
  
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
const collectedUsers = query(collection(db,"passkeys"));


export const DB = {
    getAllData: async function(){
        const repairs = await getDocs(collected);
        return repairs;
    },
    getData: async function(id){
        const docs = await this.getAllData();
        let data = null;

        docs.forEach((doc)=>{
            if (id === doc.id){
                data = doc.data();
            }
        });

        return data;
    },
    insertData: async function(done=false){
        let n = (await this.getData("count")).NextRepairNo;
        await setDoc(doc(db,"repairs",n.toString()),{done},{merge:true});

        await setDoc(doc(db,"repairs","count"),{NextRepairNo:n+1},{merge:true});

        return n;
    },
    updateData: async function(id,done){
        await setDoc(doc(db,"repairs",id),{done},{merge:true});

        // TODO: return boolean result
        //       for success/failure.
    },
    deleteData: async function(id){

        await deleteDoc(doc(db,"repairs",id));

        // TODO: return boolean result
        //       for success/failure.
    },
    isAdmin: async function(passkey) {
        const users = await getDocs(collectedUsers);
        let ret = false;

        users.forEach((doc)=>{
            if (doc.data().value == passkey)
                ret = true;
        });

        return ret;
    },
    changePasskey: async function(newkey){
        await setDoc(doc(db,"passkeys","admin"),{value:newkey},{merge:true});
    }
}
