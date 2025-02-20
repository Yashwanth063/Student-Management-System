<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, "users");  // Firestore collection

// HTML Elements
const id = document.getElementById("id");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const year = document.getElementById("year");
const city = document.getElementById("city");
const cgpa = document.getElementById("cgpa");

const frm = document.getElementById("frm");
const tbody = document.getElementById("tbody");

// 🟢 Add or Update User
frm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (fname.value.trim() === "" || email.value.trim() === "" || year.value.trim() === "" || city.value.trim() === "" || cgpa.value.trim() === "") {
        alert("All fields are required");
        return;
    }

    try {
        if (id.value) {  // Update existing user
            await setDoc(doc(db, "users", id.value), {
                fname: fname.value.trim(),
                email: email.value.trim(),
                year: year.value.trim(),
                city: city.value.trim(),
                cgpa: cgpa.value.trim()
            });
            alert("Record updated successfully");
        } else {  // Add new user
            await addDoc(userCollection, {
                fname: fname.value.trim(),
                email: email.value.trim(),
                year: year.value.trim(),
                city: city.value.trim(),
                cgpa: cgpa.value.trim()
            });
            alert("Record added successfully");
        }

        clearForm();
    } catch (error) {
        console.error("Error adding/updating document: ", error);
    }
});

// 🟡 Fetch and Display Users in Real-Time
onSnapshot(userCollection, (snapshot) => {
    if (!snapshot.empty) {
        tbody.innerHTML = "";

        let i = 0;
        snapshot.forEach((doc) => {
            let userData = doc.data();
            let userId = doc.id;
            tbody.innerHTML += `
                <tr>
                    <td>${++i}</td>
                    <td>${userData.fname}</td>
                    <td>${userData.email}</td>
                    <td>${userData.year}</td>
                    <td>${userData.city}</td>
                    <td>${userData.cgpa}</td>
                    <td> <button class="editbtn" data-id="${userId}"><ion-icon name="create-outline"></ion-icon></button></td>
                    <td> <button class="deletebtn" data-id="${userId}"><ion-icon name="trash-outline"></ion-icon></button></td>
                </tr>`;
        });
    } else {
        tbody.innerHTML = "<tr><td colspan='8'>No data found</td></tr>";
    }
});

// 🟠 Edit User
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("editbtn")) {
        const uid = e.target.dataset.id;
        const tdElements = e.target.closest("tr").children;

        id.value = uid;
        fname.value = tdElements[1].textContent;
        email.value = tdElements[2].textContent;
        year.value = tdElements[3].textContent;
        city.value = tdElements[4].textContent;
        cgpa.value = tdElements[5].textContent;
    }
});

// 🔴 Delete User
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("deletebtn")) {
        if (confirm("Are you sure to delete this record?")) {
            let userId = e.target.dataset.id;
            try {
                await deleteDoc(doc(db, "users", userId));
                alert("Record deleted successfully");
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    }
});

// Clear Input Fields After Submission
function clearForm() {
    id.value = "";
    fname.value = "";
    email.value = "";
    year.value = "";
    city.value = "";
    cgpa.value = "";
}
=======
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref,set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://js-crud-9727a-default-rtdb.firebaseio.com"
}
// Initialize Firebase  
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const userList = ref(database,"users");
    
// js

const id = document.getElementById("id");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const year = document.getElementById("year");
const city = document.getElementById("city");
const cgpa = document.getElementById("cgpa");
// form 
const frm = document.getElementById("frm");
// submit(save) button
const tbody = document.getElementById("tbody");


frm.addEventListener("submit",function(e){

    e.preventDefault();
    if(fname.value.trim() === "" || email.value.trim() === "" || year.value.trim() === "" || city.value.trim() === "" || cgpa.value.trim() === ""){
        alert("All fields are required");
        return;
    }
    //updating values
    if(id.value){
        set(ref(database,`users/${id.value}`),{
            fname:fname.value.trim(),
            email:email.value.trim(),
            year:year.value.trim(),
            city:city.value.trim(),
            cgpa:cgpa.value.trim()
        });
        alert("Record updated successfully");
        createRow();
        return;
    }
    //getting values from form
        const newUser = {
            fname:fname.value.trim(),
            email:email.value.trim(),
            year:year.value.trim(),
            city:city.value.trim(),
            cgpa:cgpa.value.trim()
        };

        createRow();    
        push(userList,newUser);
})
function createRow(){
    fname.value = "",
    email.value = "",
    year.value = "",
    city.value = "",
    cgpa.value = ""
}

onValue(userList, (snapshot) => { // snapshots - listerning to changes in database
    if(snapshot.exists()){
        let snapValue = Object.entries(snapshot.val());//contains user id[0],values[1]
        
        tbody.innerHTML = "";

        for(let i=0;i<snapValue.length;i++){
          let currentUser = snapValue[i];
          let userId = currentUser[0];
          let userData = currentUser[1];
          tbody.innerHTML += `
                <tr><td>${i+1}</td>
                    <td>${userData.fname}</td> 
                    <td>${userData.email} </td> 
                    <td>${userData.year}</td> 
                    <td>${userData.city}</td> 
                    <td>${userData.cgpa}</td> 
                    <td> <button class="editbtn" data-id = ${userId}><ion-icon name="create-outline"></ion-icon></button></td>
                    <td> <button class="deletebtn" data-id = ${userId}><ion-icon name="trash-outline"></ion-icon></button></td>
                </tr> `;
         }
}
    else{
        tbody.innerHTML = "<tr><td colspan='8'>No data found</td></tr>";
    }
});


document.addEventListener("click",function(e){
    if(e.target.classList.contains("editbtn")){
        const uid = e.target.dataset.id;
        const tdElements = e.target.closest("tr").children;

        id.value = uid;
        fname.value = tdElements[1].textContent;
        email.value = tdElements[2].textContent;
        year.value = tdElements[3].textContent;
        city.value = tdElements[4].textContent;
        cgpa.value = tdElements[5].textContent;
    }
    if(e.target.classList.contains("deletebtn")){
        if(confirm("Are you sure to delete this record?")){
          let userId = e.target.dataset.id;
          let userRef = ref(database,`users/${userId}`);
          remove(userRef);
    }
}
});
>>>>>>> bc93e1f806ad4c11b71286956d6e2076a3838a9b
