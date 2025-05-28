const contactsToggleBtn = document.getElementById('contactsToggleBtn');
const contactsSidebar = document.getElementById('contactsSidebar');
const contactsOverlay = document.getElementById('contactsOverlay');

function openContacts() {
    contactsSidebar.classList.add('open');
    contactsSidebar.style.transform = 'translateX(0)';
    contactsSidebar.classList.remove('hidden');
    contactsOverlay.classList.add('visible');
}
function closeContacts() {
    contactsSidebar.style.transform = 'translateX(-100%)';
    contactsOverlay.classList.remove('visible');
    setTimeout(() => {
        contactsSidebar.classList.add('hidden');
    }, 300);
}

contactsToggleBtn.addEventListener('click', () => {
    if (contactsSidebar.classList.contains('hidden')) {
        openContacts();
    } else {
        closeContacts();
    }
});

contactsOverlay.addEventListener('click', closeContacts);

// On desktop, contactsSidebar always visible, so reset styles on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        contactsSidebar.classList.remove('hidden');
        contactsSidebar.style.transform = 'translateX(0)';
        contactsOverlay.classList.remove('visible');
    } else {
        contactsSidebar.classList.add('hidden');
        contactsSidebar.style.transform = 'translateX(-100%)';
        contactsOverlay.classList.remove('visible');
    }
});

// Initialize on load
if (window.innerWidth >= 768) {
    contactsSidebar.classList.remove('hidden');
    contactsSidebar.style.transform = 'translateX(0)';
    contactsOverlay.classList.remove('visible');
} else {
    contactsSidebar.classList.add('hidden');
    contactsSidebar.style.transform = 'translateX(-100%)';
    contactsOverlay.classList.remove('visible');
}

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("hidden");
});

// Close dropdown when clicked outside
window.addEventListener("click", function (e) {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add("hidden");
    }
});




// ___________________________________________________________________________________ // 

import { auth, onAuthStateChanged, signOut, collection, where, query, onSnapshot, doc, db, getDoc, setDoc, getDocs } from "./firebase.js";

let userName = document.getElementById("userName");
let dropdownName = document.getElementById("dropdownName");
let logoutBtn = document.getElementById("logoutBtn");
let userImage = document.getElementById("userImage");
let addContactsTab = document.getElementById("addContactsTab");
let addUsersBtn = document.getElementById("addUsersBtn");
let usersTabCloseBtn = document.getElementById("usersTabCloseBtn");
let usersList = document.getElementById("usersList");
let contactsFromCloud = document.getElementById("contactsFromCloud");
let currentUserUid = null;


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserUid = user.uid;
        console.log(user);
        userName.innerHTML = user.displayName;
        dropdownName.innerHTML = user.displayName;
        if (user.photoURL === null) {
            userImage.src = "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png";
        } else {
            userImage.src = user.photoURL;
        }
        loadMyContacts();
    }
});


let logOut = () => {
    signOut(auth)
        .then(() => {
            location = "./login.html";
        }).catch((error) => {
            console.log(error);
        });
}

logoutBtn.addEventListener('click', logOut);

addUsersBtn.addEventListener('click', () => {
    addContactsTab.classList.remove('hidden');
    if (window.innerWidth <= 500) {
        closeContacts();
    }
    getUsersFromCloud()
})

usersTabCloseBtn.addEventListener("click", () => {
    addContactsTab.classList.add("hidden");
})



let getUsersFromCloud = async () => {
    let dbRef = collection(db, 'users');
    usersList.innerHTML = "";
    await onSnapshot(dbRef, (snapshot) => {
        snapshot.forEach((doc) => {
            let data = doc.data();

            usersList.innerHTML += `<div class="flex items-center justify-between p-3 rounded-xl border hover:shadow transition">
            <div class="flex items-center gap-3">
              <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="User" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold">${data.name}</p>
                <p class="text-sm text-gray-500">${data.email}</p>
              </div>
            </div>
            <button onclick="addContact('${doc.id}')"
              class="bg-blue-800 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
              Add
            </button>
          </div>`

        })
    })
}


async function addContact(userId) {
    const currentUserUid = auth.currentUser.uid;

    // Step 1: Get user data from "users" collection
    const userDocRef = doc(db, 'users', userId); // 👈 Correct path to get user info
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
        console.log("No such user!");
        return;
    }

    const userData = userSnap.data();

    // Step 2: Save in current user's contacts subcollection
    const contactRef = doc(db, "userContacts", currentUserUid, "contacts", userId);

    await setDoc(contactRef, {
        name: userData.name,
        email: userData.email,
        uid: userData.uid
    });

    console.log("User added");
    loadMyContacts();
}




async function loadMyContacts() {
    const currentUserUid = auth.currentUser.uid;

    const contactsRef = collection(db, "userContacts", currentUserUid, "contacts");
    const snapshot = await getDocs(contactsRef);

    contactsFromCloud.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();

        contactsFromCloud.innerHTML += `
        <li class="p-2 hover:bg-indigo-100 cursor-pointer transition rounded-lg flex items-center space-x-4 shadow-sm">
          <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="Contact"
            class="w-12 h-12 rounded-full border-2 border-indigo-400" />
          <div class="flex flex-col">
            <p class="font-semibold text-gray-800">${data.name}</p>
            <p class="text-sm text-gray-500">${data.email}</p>
          </div>
        </li>`;
    });
}



window.addContact = addContact;