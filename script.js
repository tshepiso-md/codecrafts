// common.js
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const auth = getAuth();

export function logout() {
    signOut(auth).then(() => {
        // Update the UI after logout
        document.getElementById('usernameDisplay').textContent = 'Guest';
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
    }).catch((error) => {
        console.error('Error during logout:', error);
        alert('Failed to log out. Please try again.');
    });
}

// Make logout globally accessible
window.logout = logout;
