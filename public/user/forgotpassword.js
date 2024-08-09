import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAH32Cno0VC7uT8NOpP0639lel53JSjX5c",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "isc-webdev-brt-team",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

//  inisialisasi firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgot-password-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  });
});
