import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc, collection, getDocs, addDoc, serverTimestamp, } from "firebase/firestore";
import {createCardHTML} from "./templateEventCard.js"  // this is importing the createCardHTML function from templateEventCard.js

//storing events so search can access them
let allEvents = []

// This is the function to fetch events from Firestore and render cards
async function loadEvents() {
    const localGrid = document.getElementById("local-events-grid"); //separate local and online events
    const onlineGrid = document.getElementById("online-events-grid");

    const snapshot = await getDocs(collection(db, "events"));
    // console.log(snapshot)

    //save all events first
    snapshot.forEach((doc) => {
        allEvents.push({ id: doc.id, ...doc.data() });
    });

    // console.log(allEvents)

    renderEvents(allEvents)

}

function renderEvents(allEvents){
    const localGrid = document.getElementById("local-events-grid"); //separate local and online events
    const onlineGrid = document.getElementById("online-events-grid");

    localGrid.innerHTML = ""
    onlineGrid.innerHTML = ""

    let localCount = 0
    let onlineCount = 0

    allEvents.forEach((event) => {
        const card = createCardHTML(event)

        if (event.type === "local" && localCount < 6) {
            localGrid.innerHTML += card
            localCount++
        } else if(event.type === "online" && onlineCount < 6) {
            onlineGrid.innerHTML += card
            onlineCount++

        }
    });
}

export {allEvents, renderEvents}

loadEvents() //run on page load
