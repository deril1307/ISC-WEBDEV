import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAH32Cno0VC7uT8NOpP0639lel53JSjX5c",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "isc-webdev-brt-team",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      .then(() => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Error signing out: " + error.message);
      });
  });
});
