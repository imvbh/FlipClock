const flipCard = document.querySelector(".flip-card");

flip(flipCard);

//date counter
// const countToDate = new Date("2023-07-31").setHours(0,0);
// const countToDate = new Date().setHours(new Date().getHours() + 24);
// let previousTimeBetweenDates;
// setInterval(() => {
//   const currentDate = new Date();
//   const timeBetweenDate = Math.ceil((countToDate - currentDate) / 1000);

//   flipAllCards(timeBetweenDate);

//   previousTimeBetweenDates = timeBetweenDate;
// }, 250);

// just Clock
let is12HourFormat = true; // Initially, set it to 12-hour format

document.querySelector(".ampm-btn").addEventListener("click", function () {
  is12HourFormat = !is12HourFormat;

  var t = document.querySelector(".ampm-btn");
  if (t.innerHTML === "12") {
    t.innerHTML = "24";
  } else {
    t.innerHTML = "12";
  }
  // Toggle the format
  var x = document.querySelector(".ampm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  // Call the function to update the displayed time
  flipAllCards();
});

function formatHours(hours) {
  if (is12HourFormat) {
    if (hours === 0) {
      return 12; // 12 AM
    } else if (hours > 12) {
      return hours - 12; // Convert to 12-hour format
    } else {
      return hours; // 1 AM to 11 AM
    }
  } else {
    return hours; // 24-hour format
  }
}

function flipAllCards() {
  var current = new Date();
  var hours = current.getHours();
  var minutes = current.getMinutes();
  var seconds = current.getSeconds();

  hours = formatHours(hours);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[current.getDay()];

  var amPM = current.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  amPM_str = amPM.slice(-2);

  document.querySelector("[am-pm]").innerHTML = amPM_str;

  var date = current.toDateString();
  date_str = day + ", " + date.slice(3, date.length - 5);

  document.getElementById("date").innerHTML = date_str;

  console.log(hours, minutes, seconds);
  // flip(document.querySelector("[hours]"), hours);
  // flip(document.querySelector("[minutes]"), minutes);
  // flip(document.querySelector("[seconds]"), seconds);

  flip(document.querySelector("[hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[hours-units]"), hours % 10);
  flip(document.querySelector("[minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[minutes-units]"), minutes % 10);
  flip(document.querySelector("[seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[seconds-units]"), seconds % 10);
}

setInterval(flipAllCards, 200);

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  if (document.fullscreenElement) {
    const flipSound = document.getElementById("flipSound");
    flipSound.play();
  } else {
    const flipSound = document.getElementById("flipSound");
    flipSound.pause();
  }

  top.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}

// toggle navbar

// Get references to the relevant elements
const navBtn = document.getElementById("nav-btn");
const sidebar = document.querySelector(".sidebar");
const containerClock = document.querySelector(".container .clock");

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

// Toggle seconds

let secondsToggle = document.querySelector(".seconds-btn");

secondsToggle.onclick = () => {
  var x = document.getElementById("seconds-segment");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

// full screen

let screen = document.querySelector("html");

screen.addEventListener("dblclick", function (e) {
  screen.requestFullscreen();
});
screen.addEventListener("dblclick", function (e) {
  document.exitFullscreen();
});

// Disappear on inactivity

// Get all the buttons with the 'btn' class
const buttons = document.querySelectorAll(".btn", "#btn");

// Initialize a timer variable
let inactivityTimer;

// Function to hide the buttons
function hideButtons() {
  buttons.forEach((button) => {
    button.style.opacity = 0; // Hide the button
  });
}

// Function to show the buttons
function showButtons() {
  buttons.forEach((button) => {
    button.style.opacity = 1; // Show the button
  });
}

// Function to reset the inactivity timer and show buttons
function resetInactivityTimerAndShowButtons() {
  clearTimeout(inactivityTimer); // Clear the previous timer
  showButtons(); // Show the buttons
  inactivityTimer = setTimeout(hideButtons, 2000); // Set a new timer for 2 seconds
}

// Add event listeners to detect user activity and reset the timer
document.addEventListener("click", resetInactivityTimerAndShowButtons);
document.addEventListener("mousemove", resetInactivityTimerAndShowButtons);
document.addEventListener("keydown", resetInactivityTimerAndShowButtons);

// Initially, set the timer to hide the buttons after 2 seconds
resetInactivityTimerAndShowButtons();
