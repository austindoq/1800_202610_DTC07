import { onAuthReady } from "./authentication.js";
import { db, auth } from "./firebaseConfig.js";
import {
  doc,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
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

async function loadHostedEvents() {
  onAuthReady(async (user) => {
    if (!user) return;

    const hostedEventQuery = query(
      //Return a filterd result of events that are hosted by userID
      collection(db, "events"),
      where("hostID", "==", user.uid),
    );

    const hostedEventsSnap = await getDocs(hostedEventQuery);

    const cardArea = document.getElementById("host-card-area");

    if (hostedEventsSnap.empty) {
      cardArea.innerHTML = "You haven't hosted any events yet.";
      return;
    }

    hostedEventsSnap.forEach((doc) => {
      const event = { id: doc.id, ...doc.data() };
      cardArea.innerHTML += createCardHTML(event, false, true);
    });
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

    if (savedEvents.length === 0) {
      document.getElementById("card-area").innerHTML =
        "You have no saved events. Click 'Save' on an event and it will show up here";
    }

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
loadHostedEvents();
loadSavedEvents();
