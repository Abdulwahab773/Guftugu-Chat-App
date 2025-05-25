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