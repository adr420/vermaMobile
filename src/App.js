import { repairs } from "./DB.js";

console.log("Hello");
repairs.forEach((doc)=>{
    console.log(doc.data());
});