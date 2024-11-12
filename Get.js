//import functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6OJmdKspro9Nb1FxwMH2PtN7WAJnKaUM",
    authDomain: "code-crafts-f5107.firebaseapp.com",
    projectId: "code-crafts-f5107",
    storageBucket: "code-crafts-f5107.appspot.com",
    messagingSenderId: "171510387289",
    appId: "1:171510387289:web:4234c82d229a80bb5d9748",
    measurementId: "G-Y9SCZHRVYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//inialize firebase instances
const auth = getAuth();
const database = getFirestore();

//event listener if authentication has changed
onAuthStateChanged(auth, (user) => {

    //retieve the user id
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {

        console.log(user);
        //creating a reference to users collection
        const docRef = doc(database, "users", loggedInUserId);

        //fetch data from the database document
        getDoc(docRef)

            .then((docSnap) => {
                if (docSnap.exists()) {

                    //fetcht user data
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.FirstName;
                    document.getElementById('loggedUserEmail').innerText = userData.Email;
                    document.getElementById('loggedUserLName').innerText = userData.LastName;

                }
                else {
                    //alert the user
                    alert("Error getting document")
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                //alert the user
                alert("Error getting document", error)
                console.log("Error getting document", error);
            })
    }
    else {
        //alert user
        alert("User Id not Found in Local storage")
        console.log("User Id not Found in Local storage")
    }
});



//variable for login button 
const logoutButton = document.getElementById('logout');

//remove user id 
logoutButton.addEventListener('click', () => {

    localStorage.removeItem('loggedInUserId');
    //object for sign out firebase instance
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})

logoutButton.addEventListener('click', () => {

    
    localStorage.removeItem('loggedInUserId');

    //object for sign out firebase instance
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
});