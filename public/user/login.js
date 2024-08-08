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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const loginMessage = document.getElementById("login-message");

  // Check if the user is already logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      loginMessage.textContent = "You are already logged in.";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;

    try {
      await signInWithEmailAndPassword(auth, username, password);
      localStorage.setItem("loggedInUser", username);
      window.location.href = "account.html"; // Redirect to account page
    } catch (error) {
      console.error("Error logging in:", error);
      loginMessage.textContent = "Invalid credentials. Please try again.";
    }
  });
});
