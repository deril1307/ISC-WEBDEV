document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll("#sidebar a");
  const spinner = document.getElementById("spinner");

  const toggleClass = (element, className) => {
    element.classList.toggle(className);
  };

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

  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

  const toggleNavbar = () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove("open");
    }
  };

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(toggleNavbar, 100);
  });

  toggleNavbar();

  window.addEventListener("load", () => {
    setTimeout(() => {
      spinner.style.display = "none";
    }, 500);
  });

  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const someParam = getQueryParam("example");
  if (someParam) {
    showNotification(`Query parameter 'example' is ${someParam}`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
});

var toTopButton = document.getElementById("to-top-button");

if (toTopButton) {
  window.onscroll = function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      toTopButton.classList.remove("hidden");
    } else {
      toTopButton.classList.add("hidden");
    }
  };

  window.goToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

window.onload = () => {
  const error = getQueryParam("error");
  if (error === "invalid_credentials") {
    const message = document.createElement("div");
    message.innerText = "Invalid email or password.";
    message.className = "text-red-500 mb-4";
    document.querySelector("form").insertBefore(message, document.querySelector("form").firstChild);
  }
};
