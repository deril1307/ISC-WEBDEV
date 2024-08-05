import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Konfigurasi Firebase
const Config = {
  apiKey: "AIzaSyAH32Cno0VC7uT8NOpP0639lel53JSjX5c",
  authDomain: "isc-webdev-brt-team.firebaseapp.com",
  projectId: "isc-webdev-brt-team",
  storageBucket: "isc-webdev-brt-team.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Inisialisasi Firebase
const app = initializeApp(Config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const googleLogin = document.getElementById("login-with-google");
  googleLogin.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // Simpan email pengguna di local storage
        localStorage.setItem("loggedInUser", user.email);

        window.location.href = "account.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign-in:", errorCode, errorMessage);
      });
  });
});
