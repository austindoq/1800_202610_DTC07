// Takes queries and filters from the URL, fetches events from firestore, and filters and display the matching ones 

//these are firebase imports; database; documents; collections; shared cared generated from templateEventCard.js
import { db } from "./firebaseConfig.js";
import { getDoc, getDocs, collection, arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { createCardHTML } from "./templateEventCard.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Set auth instance for user
const auth = getAuth();
//==================================================

  //==================================================
//for search functionality
// URLSearchParams is a built-in browser API for reading URL query strings
// window.location.search gives the query and filter part of the URL that search.js builds
//for search functionality
const queryParameters = new URLSearchParams(window.location.search);
// "q" is the search keyword from the url, then we normalize it
const queryValue = queryParameters.get("q")?.toLowerCase().trim() || "";

//for filter functionality
// Reads the "filters" parameter from the URL
const activeFilters = queryParameters.get("filters")?.split(",") || [];

//gets search-summary element from search-results.html
const summary = document.getElementById("search-summary");
//show search result summary
summary.textContent = queryValue ? `Results for "${queryValue}"` : ``;

//for keeping search inputs written in search bar
const searchInputs = document.querySelectorAll("#keyword-search");
searchInputs.forEach((input) => {
    //sets the the text in the search bar with the query value so it persists visually
    input.value = queryValue;
});
//==================================================

  //==================================================
  //async function — fetches all events from Firestore, then filters them
async function loadSearchResults(user) {
    //fetches documents from events collection
    const snapshot = await getDocs(collection(db, "events"));
    const allEvents = [];
    const uid = user.uid;

    //loop over each document
    snapshot.forEach((doc) => {
        //adds documents with doc id  to all events list
        allEvents.push({ id: doc.id, ...doc.data() });
    });

    //normalize the query - remove space for loose matching
    let normalizeQuery = queryValue.replace(/\s+/g, "");

    //Filters the full event list down to only the matching results
    let filteredEvents = allEvents.filter((event) => {
        if (queryValue == "") {
            return true;
        } else {
            //checks these three fields for a keyword match
            let fields = [event.title, event.location, event.host];
            return fields.some((field) => {
                let lower = field?.toLowerCase() || "";
                let lowerNoSpaces = lower.replace(/\s+/g, "");
                //return match to either the raw query or spaceless query
                return lower.includes(queryValue) || lowerNoSpaces.includes(normalizeQuery);
            });
        }
    });

    //Filter separation
    //typeFilters filter event types: local and online
    const typeFilters = activeFilters.filter((x) => x === "local" || x === "online");
    //restrictionFilters  filter non-event types (restriction tags)
    const restrictionFilters = activeFilters.filter((x) => x != "local" && x != "online");

    //event type filters - if active, keep only the type field that matches
    if (typeFilters.length > 0) {
        filteredEvents = filteredEvents.filter((event) => typeFilters.includes(event.type));
    }

    //restriction filters - loops over each restruction
    restrictionFilters.forEach((filterKey) => {
        if (filterKey) {
            //Checks that the event has that field set to true in Firestore - set when event is created in create-event.js
            filteredEvents = filteredEvents.filter((event) => event[filterKey] === true);
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
    //Add event listeners for the filtered events save buttons
    let resultsListArea = document.getElementById("results-list");
    resultsListArea.addEventListener("click", async (e) => {
        const button = e.target.closest("button[data-id]");
        if (!button) return;
        await saveToggle(button, uid);
    });
}
//==================================================

//==================================================
// takes filtered events array and build the card HTML in the page
function renderEvents(events, savedEvents) {
    const resultsList = document.getElementById("results-list");

    // if no events, show no results message
    if (events.length === 0) {
        resultsList.innerHTML = `<p class="text-2xl">No results for "${queryValue}"</p>`;
        return;
    }

    //map each event object to a card HTML string using createCardHTML function, combine array into string
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
