import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAH32Cno0VC7uT8NOpP0639lel53JSjX5c",
  authDomain: "isc-webdev-brt-team.firebaseapp.com",
  projectId: "isc-webdev-brt-team",
  storageBucket: "isc-webdev-brt-team.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;

    try {
      // Anggap username adalah email, ganti username dengan email jika diperlukan
      await signInWithEmailAndPassword(auth, username, password);

      // Simpan username di local storage
      localStorage.setItem("loggedInUser", username);

      window.location.href = "account.html"; // Redirect ke halaman sukses login
    } catch (error) {
      console.error("Error logging in:", error);
      window.location.href = `login.html?error=invalid_credentials`; // Redirect dengan parameter error
    }
  });
});
