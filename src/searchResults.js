// Takes queries and filters from the URL, fetches events from firestore, and filters and display the matching ones 

//these are firebase imports; database; documents; collections; shared cared generated from templateEventCard.js
import {db} from "./firebaseConfig.js"
import {getDocs, collection} from "firebase/firestore"
import { createCardHTML } from "./templateEventCard.js"
//==================================================

  //==================================================
//for search functionality
// URLSearchParams is a built-in browser API for reading URL query strings
// window.location.search gives the query and filter part of the URL that search.js builds
const queryParameters = new URLSearchParams(window.location.search)
// "q" is the search keyword from the url, then we normalize it
const queryValue = queryParameters.get("q")?.toLowerCase().trim() || ""

//for filter functionality
// Reads the "filters" parameter from the URL
const activeFilters = queryParameters.get("filters")?.split(",") || []

//gets search-summary element from search-results.html
const summary = document.getElementById("search-summary")

//show search result summary
summary.textContent = queryValue ? `Results for "${queryValue}"` : ``

//for keeping search inputs written in search bar.  Selecting the desktop+mobile search bars
const searchInputs = document.querySelectorAll("#keyword-search")
searchInputs.forEach((input) =>{
    //sets the the text in the search bar with the query value so it persists visually
    input.value = queryValue
})
//==================================================

  //==================================================
//async function — fetches all events from Firestore, then filters them
async function loadSearchResults() {
    //fetches documents from events collection
    const snapshot = await getDocs(collection(db, "events"));
    const allEvents = [];

    //loop over each document
    snapshot.forEach((doc) => {
        //adds documents with doc id  to all events list
        allEvents.push({ id: doc.id, ...doc.data() });
    });


    //normalize the query - remove space for loose matching
    let normalizeQuery = queryValue.replace(/\s+/g, "")

    //Filters the full event list down to only the matching results
    let filteredEvents = allEvents.filter((event) => {
        if (queryValue == 0){
            return true
        }else{
            //checks these three fields for a keyword match
            let fields = [event.title, event.location, event.host]
            return fields.some((field) => {
                let lower = field?.toLowerCase() || "";
                let lowerNoSpaces = lower.replace(/\s+/g, "")
                //return match to either the raw query or spaceless query
                return lower.includes(queryValue) || lowerNoSpaces.includes(normalizeQuery)
            })
        }
    })

    //Filter separation
    //typeFilters filter event types: local and online
    const typeFilters = activeFilters.filter((x) => x === "local" || x === "online")
    //restrictionFilters  filter non-event types (restriction tags)
    const restrictionFilters = activeFilters.filter((x) => x != "local" && x != "online")

    //event type filters - if active, keep only the type field that matches
    if (typeFilters.length > 0) { 
        filteredEvents = filteredEvents.filter(event => typeFilters.includes(event.type))
    }

    //restriction filters - loops over each restruction
    restrictionFilters.forEach((filterKey) => {
        if (filterKey){
            //Checks that the event has that field set to true in Firestore - set when event is created in create-event.js
            filteredEvents = filteredEvents.filter((event) => event[filterKey] === true)
        }
    })
    //pass final filtered list to render function
    renderEvents(filteredEvents)
}
//==================================================

  //==================================================
// takes filtered events array and build the card HTML in the page
function renderEvents(events){
    const resultsList = document.getElementById("results-list")

    // if no events, show no results message
    if(events.length === 0){
        resultsList.innerHTML = `<p class="text-2xl">No results for "${queryValue}"</p>`
        return
    }

    //map each event object to a card HTML string using createCardHTML function, combine array into string
    resultsList.innerHTML = events.map((event) => createCardHTML(event)).join("")
}


loadSearchResults()