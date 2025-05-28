import { auth, createUserWithEmailAndPassword, updateProfile, provider, signInWithPopup, GoogleAuthProvider, db, doc, collection, setDoc, addDoc, updateDoc, Timestamp } from "./firebase.js";

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let googleSignInBtn = document.getElementById("googleSignInBtn");



let createAcc = () => {

    if (nameInput.value && emailInput.value && passwordInput.value) {
        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: nameInput.value,
                });

                let saveUserToCloud = async () => {
                    await setDoc(doc(db, "users", user.uid), {
                        name: nameInput.value,
                        email: emailInput.value,
                        uid: user.uid
                    });
                    hideLoader();
                    location = "./chat.html";
                }
                saveUserToCloud();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    } else {
        alert("please fill all fields");
    }
}



let signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            location = "./chat.html"
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}


googleSignInBtn.addEventListener('click', signInWithGoogle)

document.getElementById("submitBtn").addEventListener('click', function (e) {
    e.preventDefault();
    createAcc();
    showLoader();
})


function showLoader() {
    document.getElementById('fullScreenLoader').classList.remove('hidden');
}

function hideLoader() {
    document.getElementById('fullScreenLoader').classList.add('hidden');
}
