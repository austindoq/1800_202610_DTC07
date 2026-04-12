import { db } from "./firebaseConfig.js";
import {
  getDoc,
  getDocs,
  collection,
  arrayRemove,
  arrayUnion,
  updateDoc,
  doc,
} from "firebase/firestore";
import { createCardHTML } from "./templateEventCard.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Set auth instance for user
const auth = getAuth();

//for search functionality
const queryParameters = new URLSearchParams(window.location.search);
const queryValue = queryParameters.get("q")?.toLowerCase().trim() || "";

//for filter functionality
const activeFilters = queryParameters.get("filters")?.split(",") || [];

const summary = document.getElementById("search-summary");
summary.textContent = queryValue
  ? `Results for "${queryValue}"`
  : `Search by keyword(s)`;

//for keeping search inputs written in search bar
const searchInputs = document.querySelectorAll("#keyword-search");
searchInputs.forEach((input) => {
  input.value = queryValue;
});

async function loadSearchResults(user) {
  const snapshot = await getDocs(collection(db, "events"));
  const allEvents = [];
  const uid = user.uid;

  snapshot.forEach((doc) => {
    allEvents.push({ id: doc.id, ...doc.data() });
  });

  //normalize the query
  let normalizeQuery = queryValue.replace(/\s+/g, "");

  let filteredEvents = allEvents.filter((event) => {
    if (queryValue == 0) {
      return true;
    } else {
      let fields = [event.title, event.location, event.host];
      return fields.some((field) => {
        let lower = field?.toLowerCase() || "";
        let lowerNoSpaces = lower.replace(/\s+/g, "");
        return (
          lower.includes(queryValue) || lowerNoSpaces.includes(normalizeQuery)
        );
      });
    }
  });

  const typeFilters = activeFilters.filter(
    (x) => x === "local" || x === "online",
  );
  const restrictionFilters = activeFilters.filter(
    (x) => x != "local" && x != "online",
  );

  //filter by event type
  if (typeFilters.length > 0) {
    filteredEvents = filteredEvents.filter((event) =>
      typeFilters.includes(event.type),
    );
  }

  //filter by restrictions
  restrictionFilters.forEach((filterKey) => {
    if (filterKey) {
      filteredEvents = filteredEvents.filter(
        (event) => event[filterKey] === true,
      );
    }
  });

  //Get Users saved events
  const userDoc = await getDoc(doc(db, "users", uid));
  const savedEvents = userDoc.data()?.savedEvents ?? []; //Try to find savedEvents array, if undefined/null use an empty

  renderEvents(filteredEvents, savedEvents);

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
      button.disabled = false;
      const span = button.querySelector("span");
      span.textContent = "Save";
      span.className =
        "bg-[#facc15] active:bg-[#fde047] text-xl mx-auto mt-1 flex justify-center tracking-widest w-full gap-2 px-2 shadow-md hover:cursor-pointer";
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
      span.classList.remove("bg-[#facc15]", "active:bg-[#fde047]");
      span.classList.add("bg-gray-300");
      console.log("Event ID:", eventID, "has been saved");
    }
  }
  //==================================================

  //==================================================
  //Add event listeners for the filtered events save buttons
  let resultsListArea = document.getElementById("results-list");
  resultsListArea.addEventListener("click", async (e) => {
    const button = e.target.closest("button[data-id]");
    if (!button) return;
    await saveToggle(button, uid);
  });
  //==================================================
}

function renderEvents(events, savedEvents) {
  const resultsList = document.getElementById("results-list");

  if (events.length === 0) {
    resultsList.innerHTML = `<p class="text-2xl">No results for "${queryValue}"</p>`;
    return;
  }

  resultsList.innerHTML = events
    .map((event) => {
      if (savedEvents.includes(event.id)) {
        return createCardHTML(event, true, false);
      } else {
        return createCardHTML(event, false, false);
      }
    })
    .join("");
}

onAuthStateChanged(auth, (user) => {
  loadSearchResults(user);
});
