import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig.js";

// Simple function that hides create event button if user in not logged in on index.html.
// For whatever reason, if a user that's been logged in ends up back on index.html it will show up again.
function createEventDisplayCheck() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      document.getElementById("create-event-button").style.display = "none";
    }
  });
}

createEventDisplayCheck();
