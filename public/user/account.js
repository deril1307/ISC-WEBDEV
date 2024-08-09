import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"; // firebase app
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js"; // auth

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAH32Cno0VC7uT8NOpP0639lel53JSjX5c",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "isc-webdev-brt-team",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// inisialiasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// menerima inputan email dari login.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("account-info").innerHTML = `
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>UID:</strong> ${user.uid}</p>
    `;
  } else {
    document.getElementById("account-info").innerHTML = `
      <p>No user is logged in. Please <a href="login.html">log in</a>.</p>
    `;
  }

  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth)
      // berhasil sign out
      .then(() => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
      })
      // jika error sign out
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Error signing out: " + error.message);
      });
  });
});
