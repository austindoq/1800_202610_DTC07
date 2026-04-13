import { db } from "./firebaseConfig.js";
import {
  doc,
  onSnapshot,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { createCardHTML } from "./templateEventCard.js"; // this is importing the createCardHTML function from templateEventCard.js
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Get auth instance
const auth = getAuth();

//storing events so search can access them
let allEvents = [];

//==================================================
// This is the main high level function to fetch events from Firestore and render cards
async function loadEvents() {
  const localGrid = document.getElementById("local-events-grid"); //separate local and online events
  const onlineGrid = document.getElementById("online-events-grid");

  //Grab current user's ID
  const user = auth.currentUser;
  const uid = user.uid;

  //Get Users saved events
  const userDoc = await getDoc(doc(db, "users", uid));
  const savedEvents = userDoc.data()?.savedEvents ?? []; //Try to find savedEvents array, if undefined/null use an empty array

  //Get an object containing the contents of the events collection
  const snapshot = await getDocs(collection(db, "events"));

  //save all events first
  snapshot.forEach((doc) => {
    allEvents.push({ id: doc.id, ...doc.data() }); //Use the spread operator to flatten original data + doc ID. Add to array
  });
  //==================================================

  renderEvents(allEvents, savedEvents);

  //==================================================
  //The save/remove event and update firestore logic and update button visuals.
  async function saveToggle(button, uid) {
    const eventID = button.dataset.id;
    const isSaved = button.dataset.saved === "true";

    if (isSaved) {
      //If the event the button is attached to is already saved, remove the event from savedEvents, display "Save" button again
      await updateDoc(doc(db, "users", uid), {
        savedEvents: arrayRemove(eventID),
      });
      await updateDoc(doc(db, "events", eventID), {
        savedEvents: arrayRemove(uid),
      });

      button.dataset.saved = "false";
      const span = button.querySelector("span");
      span.textContent = "Save";
      span.classList.remove("from-gray-300", "to-gray-400");
      span.classList.add("from-[#facc15]", "to-[#fde047]");
      console.log("Event ID: ", eventID, "has been unsaved.");
    } else {
      // Else, if not in user's savedEvents array add it, update button to new look and Unsave text
      await updateDoc(doc(db, "users", uid), {
        savedEvents: arrayUnion(eventID),
      });
      await updateDoc(doc(db, "events", eventID), {
        attendees: arrayUnion(uid),
      });

      button.dataset.saved = "true";
      const span = button.querySelector("span");
      span.textContent = "Unsave ✕";
      span.classList.remove("from-[#facc15]", "to-[#fde047]");
      span.classList.add("from-gray-300", "to-gray-400");
      console.log("Event ID:", eventID, "has been saved");
    }
  }
  //==================================================

  //==================================================
  //Add event listeners for local grid save buttons
  localGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;
    await saveToggle(button, uid);
  });
  //==================================================

  //==================================================
  //Add event listeners for online grid save buttons
  onlineGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;
    await saveToggle(button, uid);
  });
  //==================================================
}
//==================================================

//==================================================
// This functions pushes the created event cards  to the proper place on the webpage
function renderEvents(allEvents, savedEvents = []) {
  const localGrid = document.getElementById("local-events-grid"); //separate local and online events
  const onlineGrid = document.getElementById("online-events-grid");

  localGrid.innerHTML = "";
  onlineGrid.innerHTML = "";

  let localCount = 0;
  let onlineCount = 0;

  allEvents.forEach((event) => {
    const isSaved = savedEvents.includes(event.id); //Finds out if user has this specific event saved
    const card = createCardHTML(event, isSaved); //Event card is created with event ID and save state of event

    if (event.type === "local" && localCount < 6) {
      localGrid.innerHTML += card;
      localCount++;
    } else if (event.type === "online" && onlineCount < 6) {
      onlineGrid.innerHTML += card;
      onlineCount++;
    }
  });
}

onAuthStateChanged(auth, (user) => {
  //Wait for user to be authenticated then load events with users saved events applied
  loadEvents(user.uid);
});

export { allEvents, renderEvents };
