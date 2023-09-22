
// toggle navbar

// Get references to the relevant elements
const navBtn = document.getElementById("nav-btn");
const sidebar = document.querySelector(".sidebar");
const containerClock = document.querySelector(".content");

// Add a click event listener to the button
navBtn.addEventListener("click", () => {
  // Toggle the class on the button to change its appearance (font-awesome icon)
  navBtn.classList.toggle("fa-times");

  // Toggle a class on the body to control the sidebar visibility
  document.body.classList.toggle("sidebar-open");

  // Check if the sidebar is open (body has the class "sidebar-open")
  if (document.body.classList.contains("sidebar-open")) {
    // If the sidebar is open, set its left position to 0 to show it
    sidebar.style.left = "0";
    // Add any other style changes or transitions you want for the sidebar
    sidebar.style.transition = "all 0.3s linear";

    // Add style changes or transitions for other elements (e.g., containerClock)
    containerClock.style.filter = "blur(1rem)";
  } else {
    // If the sidebar is closed, set its left position to -270px to hide it
    sidebar.style.left = "-270px";

    // Reset any style changes or transitions for the sidebar
    sidebar.style.transition = "all 0.3s linear";

    // Reset style changes or transitions for other elements (e.g., containerClock)
    containerClock.style.filter = "none";
  }
});

// dark light mode

let lightModeIcon = document.querySelector("#lightMode-icon");

lightModeIcon.onclick = () => {
  lightModeIcon.classList.toggle("fa-moon");
  document.body.classList.toggle("dark-mode");
};

