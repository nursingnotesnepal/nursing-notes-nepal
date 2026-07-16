<script type="module">

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getStorage,
ref,
uploadBytes,
getDownloadURL
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


import {
getFirestore,
collection,
addDoc
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// Firebase Configuration

const firebaseConfig = {

apiKey: "AIzaSyBAxZcTUhfTL3Jm58vH4pRFfzKy9aaMdmw",

authDomain: "nursing-notes-nepal-a3b65.firebaseapp.com",

projectId: "nursing-notes-nepal-a3b65",

storageBucket: "nursing-notes-nepal-a3b65.firebasestorage.app",

messagingSenderId: "410665155054",

appId: "1:410665155054:web:a4b96722c9326c8c93f6ff"

};




// Initialize Firebase

const app = initializeApp(firebaseConfig);


const storage = getStorage(app);


const db = getFirestore(app);





const uploadBtn =
document.getElementById("uploadBtn");



uploadBtn.addEventListener("click", async()=>{


const year =
document.getElementById("year").value;


const subject =
document.getElementById("subject").value;


const unit =
document.getElementById("unit").value;


const file =
document.getElementById("pdfFile").files[0];



const message =
document.getElementById("message");




if(!file){

alert("Please select PDF file");

return;

}




if(file.type !== "application/pdf"){

alert("Only PDF files allowed");

return;

}



try{


message.innerHTML="Uploading...";



// Storage location

const filePath =
"Fundamentals/" + file.name;



const storageRef =
ref(storage,filePath);



// Upload PDF

await uploadBytes(storageRef,file);




// Get PDF URL

const pdfURL =
await getDownloadURL(storageRef);




// Save information

await addDoc(
collection(db,"notes"),
{

title: unit,

subject: subject,

year: year,

fileURL: pdfURL,

storagePath: filePath,

type: "pdf"

}

);



message.innerHTML=
"✅ PDF Uploaded Successfully";



}

catch(error){


console.log(error);


message.innerHTML=
"❌ Error: " + error.message;



}



});


</script>