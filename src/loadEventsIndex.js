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

  async function saveToggle(button, uid) {
    const eventID = button.dataset.id;
    const isSaved = button.dataset.saved === "true";

    if (isSaved) {
      await updateDoc(doc(db, "users", uid), {
        savedEvents: arrayRemove(eventID),
      });
      await updateDoc(doc(db, "events", eventID), {
        savedEvents: arrayRemove(uid),
      });

      button.dataset.saved = "false";
      button.disabled = false;
      const span = button.querySelector("span");
      span.textContent = "Save";
      span.className =
        "bg-[#facc15] active:bg-[#fde047] text-xl mx-auto mt-1 flex justify-center tracking-widest w-full gap-2 px-2 shadow-md hover:cursor-pointer";
      console.log("Event ID: ", eventID, "has been unsaved.");
    } else {
      // Save event button visible
      await updateDoc(doc(db, "users", uid), {
        savedEvents: arrayUnion(eventID),
      });
      await updateDoc(doc(db, "events", eventID), {
        attendees: arrayUnion(uid),
      });

      button.dataset.saved = "true";
      const span = button.querySelector("span");
      span.textContent = "Saved ✓";
      span.classList.remove("bg-[#facc15]", "active:bg-[#fde047]");
      span.classList.add("bg-gray-400");
      console.log("Event ID:", eventID, "has been saved");
    }
  }
  //Add event listeners for local grid save buttons
  localGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;
    await saveToggle(button, uid);
  });

  //Add event listeners for online grid save buttons
  onlineGrid.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;
    await saveToggle(button, uid);
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
