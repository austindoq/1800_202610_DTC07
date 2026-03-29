import { onAuthReady } from "./authentication.js";
import { db, auth } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { createCardHTML } from "./templateEventCard.js";

// Function to fetch the signed-in user's name and display it in the UI
function showUsername() {
  // Get the DOM element where the user's name will be displayed
  // Example: <h1 id="name-goes-here"></h1>
  const nameElement = document.getElementById("user-name");

  // Wait until Firebase Auth finishes checking the user's auth state
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    if (!user) {
      location.href = "login.html";
      return; // Stop execution
    }

    // Get the user's Firestore document from the "users" collection
    // Document ID is the user's unique UID
    const userDoc = await getDoc(doc(db, "users", user.uid));

    // Determine which name to display:
    const name = userDoc.data().username; // Set to username

    // If the DOM element exists, update its text using a template literal to add "!"
    if ("user-name") {
      nameElement.textContent = `${name}`;
    }
  });
}

// Function to display user's email
function showEmail() {
  // Get the DOM element where the user's name will be displayed
  // Example: <h1 id="name-goes-here"></h1>
  const nameElement = document.getElementById("user-email");

  // Wait until Firebase Auth finishes checking the user's auth state
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    if (!user) {
      location.href = "login.html";
      return; // Stop execution
    }

    // Get the user's Firestore document from the "users" collection
    // Document ID is the user's unique UID
    const userDoc = await getDoc(doc(db, "users", user.uid));

    // Determine which name to display:
    const email = userDoc.data().email; // Set email variable = user's email

    // If the DOM element exists, update its text using a template literal to add "!"
    if ("user-email") {
      nameElement.textContent = `${email}`;
    }
  });
}

// Function to display user's age
function showAge() {
  // Get the DOM element where the user's name will be displayed
  // Example: <h1 id="name-goes-here"></h1>
  const nameElement = document.getElementById("user-age");

  // Wait until Firebase Auth finishes checking the user's auth state
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    if (!user) {
      location.href = "login.html";
      return; // Stop execution
    }

    // Get the user's Firestore document from the "users" collection
    // Document ID is the user's unique UID
    const userDoc = await getDoc(doc(db, "users", user.uid));

    // Determine which name to display:
    const age = userDoc.data().age; // Set age = user's age

    // If the DOM element exists, update its text using a template literal to add "!"
    if ("user-age") {
      nameElement.textContent = `${age}`;
    }
  });
}

async function loadSavedEvents() {
  onAuthReady(async (user) => {
    if (!user) return;

    //Get user doc to check savedEvents list
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const savedEvents = userDoc.data()?.savedEvents ?? [];

    // Create an array for the saved event documents
    const eventPromises = savedEvents.map((eventID) =>
      getDoc(doc(db, "events", eventID)),
    );
    const eventDocs = await Promise.all(eventPromises);

    const cardArea = document.getElementById("card-area");
    cardArea.innerHTML = "";

    eventDocs.forEach((eventDoc) => {
      if (eventDoc.exists()) {
        const event = { id: eventDoc.id, ...eventDoc.data() };
        cardArea.innerHTML += createCardHTML(event, true);
      }
    });
  });
}

showUsername();
showEmail();
showAge();
loadSavedEvents();
