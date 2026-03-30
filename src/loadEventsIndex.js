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
} from "firebase/firestore";
import { createCardHTML } from "./templateEventCard.js"; // this is importing the createCardHTML function from templateEventCard.js
import { getAuth, onAuthStateChanged } from "firebase/auth";

//storing events so search can access them
let allEvents = [];

// This is the function to fetch events from Firestore and render cards
async function loadEvents() {
  const localGrid = document.getElementById("local-events-grid"); //separate local and online events
  const onlineGrid = document.getElementById("online-events-grid");

  //Grab current user's ID
  const user = auth.currentUser;
  const uid = user.uid;

  //Get Users saved events
  const userDoc = await getDoc(doc(db, "users", uid));
  const savedEvents = userDoc.data()?.savedEvents ?? [];

  const snapshot = await getDocs(collection(db, "events"));
  // console.log(snapshot)

  //save all events first
  snapshot.forEach((doc) => {
    allEvents.push({ id: doc.id, ...doc.data() });
  });

  // console.log(allEvents)

  renderEvents(allEvents, savedEvents);

  //Add event listeners for local grid save buttons
  localGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;

    const eventID = button.dataset.id;

    await updateDoc(doc(db, "users", uid), {
      //Save EventID to savedEvents array
      savedEvents: arrayUnion(eventID),
    });

    await updateDoc(doc(db, "events", eventID), {
      //Save the userID to the event's attendees array
      attendees: arrayUnion(uid),
    });

    // Update the button visually
    button.disabled = true;
    button.querySelector("span").textContent = "Saved ✓";
    button
      .querySelector("span")
      .classList.remove("bg-[#facc15]", "active:bg-[#fde047]");
    button.querySelector("span").classList.add("bg-gray-400");

    console.log("Local event:", eventID, " has been saved.");
  });

  //Add event listeners for online grid save buttons
  onlineGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;

    const eventID = button.dataset.id;

    await updateDoc(doc(db, "users", uid), {
      //Save EventID to savedEvents array
      savedEvents: arrayUnion(eventID),
    });

    await updateDoc(doc(db, "events", eventID), {
      //Save the userID to the event's attendees array
      attendees: arrayUnion(uid),
    });

    // Update the save/saved button visually
    button.disabled = true;
    button.querySelector("span").textContent = "Saved ✓";
    button
      .querySelector("span")
      .classList.remove("bg-[#facc15]", "active:bg-[#fde047]");
    button.querySelector("span").classList.add("bg-gray-400");
    console.log("Online event:", eventID, " has been saved.");
  });
}

function renderEvents(allEvents, savedEvents = []) {
  const localGrid = document.getElementById("local-events-grid"); //separate local and online events
  const onlineGrid = document.getElementById("online-events-grid");

  localGrid.innerHTML = "";
  onlineGrid.innerHTML = "";

  let localCount = 0;
  let onlineCount = 0;

  allEvents.forEach((event) => {
    const isSaved = savedEvents.includes(event.id);
    const card = createCardHTML(event, isSaved);

    if (event.type === "local" && localCount < 6) {
      localGrid.innerHTML += card;
      localCount++;
    } else if (event.type === "online" && onlineCount < 6) {
      onlineGrid.innerHTML += card;
      onlineCount++;
    }
  });
}

export { allEvents, renderEvents };

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  //Wait for user to be authenticated then load events with users saved events applied
  loadEvents(user.uid); //run on page load
});
