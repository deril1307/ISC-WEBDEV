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
