document.getElementById("hamburger").onclick = function toggleMenu() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll("#sidebar a");

  hamburger.addEventListener("click", function () {
    sidebar.classList.add("open");
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("open");
    });
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

  // Show/hide navbar based on window size
  function toggleNavbar() {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove("open");
    }
  }

  window.addEventListener("resize", toggleNavbar);
  toggleNavbar(); // Initial check
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("spinner").style.display = "none";
  }, 500); // 2 seconds delay
});

// Function to show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerText = message;
  document.body.appendChild(notification);

  // Show the notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 500); // Wait for animation to finish before removing
  }, 3000);
}

// Example usage
// showNotification('Registration successful!', 'success');
// showNotification('Login failed. Please try again.', 'error');

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Show notifications based on query parameters
window.onload = () => {
  const success = getQueryParam("success");
  const error = getQueryParam("error");

  if (success === "registration") {
    showNotification("Registration successful!", "success");
  } else if (success === "login") {
    showNotification("Login successful!", "success");
  }

  if (error === "password_mismatch") {
    showNotification("Passwords do not match.", "error");
  } else if (error === "server_error") {
    showNotification("Server error. Please try again later.", "error");
  } else if (error === "duplicate_entry") {
    showNotification("Username or email already exists.", "error");
  } else if (error === "database_error") {
    showNotification("Database error. Please try again later.", "error");
  } else if (error === "login_failed") {
    showNotification("Login failed. Please try again.", "error");
  }
};
