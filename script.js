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