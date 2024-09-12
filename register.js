//import functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

//function to display message
function showMessage(message, divId) {

    //declaring variable 
    var messageDiv = document.getElementById(divId);
    
    //display style
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    
    //after 5 seconds the message will hidden
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

//form declarations
const signUp = document.getElementById('submitSignUp');
const signIn = document.getElementById('submitSignIn');

//onclick function for user to create account
signUp?.addEventListener('click', (event) => {

    //prevent default form load
    event.preventDefault();

    //declaring variables
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;


    //using create user with password and email firebase function
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            //user property for user credential
            const user = userCredential.user;

            //creating a user data object to store to database
            const userData = {
                Email: email,
                FirstName: firstName,
                LastName: lastName
            };

            //alerts the user 
            showMessage('Account Created Successfully', 'signUpMessage');

            //creating a reference to a specific document in a firestore firebase
            //pass the database variable and "" and user credential unique id
            const docRef = doc(database, "users", user.uid);

            //set doc provided by firestore requires arguments to reference document
            //where data will be stored and the data that will stored (set)
            setDoc(docRef, userData)
                .then(() => {

                    //redirect user to the Login page if successful login
                    window.location.href = 'login.html';
                })
                .catch((error) => {

                    //alert the user
                    alert("Error writing document")
                    console.error("Error writing document", error);

                });
        })
        .catch((error) => {

            //variable for specific error
            const errorCode = error.code;

            //if specific error found 
            if (errorCode == 'auth/email-already-in-use') {

                //alert the user 
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            }
            else {
                //alert the user
                showMessage('unable to create User', 'signUpMessage');
            }
        })

});//end of register function

//onclick function for user to login
signIn?.addEventListener('click', (event) => {

    //prevent default load
    event.preventDefault();

    //variables from the sign up form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //using sign with password and email firebase function
    //userCredential object contains user information
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            //alert the user
            showMessage('login is successful', 'signInMessage');

            //inialize const user credential object
            const user = userCredential.user;

            //storing the user ID of a logged-in user
            //Used to track the user authentication state of a user that loggged in
            localStorage.setItem('loggedInUserId', user.uid);

            //redirect user to the next page
            window.location.href = 'bookings.html';
        })
        .catch((error) => {
            const errorCode = error.code;

            //if speific error code found 
            if (errorCode === 'auth/invalid-credential') {
                
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        })
})
