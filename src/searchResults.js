import {db} from "./firebaseConfig.js"
import {getDocs, collection} from "firebase/firestore"
import { createCardHTML } from "./templateEventCard.js"

//for search functionality
const queryParameters = new URLSearchParams(window.location.search)
const queryValue = queryParameters.get("q")?.toLowerCase().trim() || ""

//for filter functionality
const activeFilters = queryParameters.get("filters")?.split(",") || []

const summary = document.getElementById("search-summary")
summary.textContent = queryValue ? `Results for "${queryValue}"` : `Search by keyword(s)`

//for keeping search inputs written in search bar
const searchInputs = document.querySelectorAll("#keyword-search")
searchInputs.forEach((input) =>{
    input.value = queryValue
})

async function loadSearchResults() {
    const snapshot = await getDocs(collection(db, "events"));
    const allEvents = [];

    snapshot.forEach((doc) => {
        allEvents.push({ id: doc.id, ...doc.data() });
    });


    //normalize the query
    let normalizeQuery = queryValue.replace(/\s+/g, "")

    let filteredEvents = allEvents.filter((event) => {
        if (queryValue == 0){
            return true
        }else{
            let fields = [event.title, event.location, event.host]
            return fields.some((field) => {
                let lower = field?.toLowerCase() || "";
                let lowerNoSpaces = lower.replace(/\s+/g, "")
                return lower.includes(queryValue) || lowerNoSpaces.includes(normalizeQuery)
            })
        }

    })

    activeFilters.forEach((filterKey) => {
        if (filterKey) {
            filteredEvents = filteredEvents.filter((event) => event[filterKey] === true)
        }
    })


    renderEvents(filteredEvents)
}

function renderEvents(events){
    const resultsList = document.getElementById("results-list")


    if(events.length === 0){
        resultsList.innerHTML = `<p class="text-2xl">No results for "${queryValue}"</p>`
        return
    }

    resultsList.innerHTML = events.map((event) => createCardHTML(event)).join("")


}

loadSearchResults()