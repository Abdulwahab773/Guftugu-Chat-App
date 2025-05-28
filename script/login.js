import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.js"
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");


let signInUser = () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            location = "/chat.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

document.getElementById("loginBtn").addEventListener('click', function(e){
    e.preventDefault();
    signInUser();
})