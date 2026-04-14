import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig.js";
import { logoutUser } from "./authentication";
import { log } from "firebase/firestore/pipelines";

// Simple function that hides create event button if user in not logged in on index.html.
// For whatever reason, if a user that's been logged in ends up back on index.html it will show up again.
function createEventDisplayCheck() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      document.getElementById("create-event-button").style.display = "none";
    }
  });
}
//==================================================

//==================================================
function updateLoginLogoutButton() {
  onAuthStateChanged (auth, (user) => {
    const loginLogoutButton = document.getElementById("login-logout-button")
    if(!loginLogoutButton){
      console.log("button in navbar has not loaded yet")
      return
    }

    if (user) { // user is logged in, so we need to show logout
      loginLogoutButton.href = "#"
      loginLogoutButton.querySelector("div").textContent = "Log out"
      loginLogoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        logoutUser();
      });
    } else{ // user is NOT logged in, so we need to show log in
        loginLogoutButton.href = "/login.html"
        loginLogoutButton.querySelector("div").textContent = "Log in"
    }
  })
}
//==================================================

//==================================================
// hide the get started button if the user is logged in
function hideGetStartedButton(){
  onAuthStateChanged(auth, (user) => {
    const button = document.getElementById("get-started-btn")
    if (!button) return // if no button on page, don't do anything
    button.classList.toggle("hidden", !!user) // toggle hidden as a tailwind class
    }
  )
}


createEventDisplayCheck();
updateLoginLogoutButton();
hideGetStartedButton();
