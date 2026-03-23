import { db, auth } from "/src/firebaseConfig"; //Bring in firestore db
import { doc, getDoc, addDoc, collection } from "firebase/firestore"; //Bring in read functions from firestore
import { onAuthStateChanged } from "firebase/auth"; //Bring in auth state

// These 2 functions figure out which form element is visible on the page, either the small or medium/large layout, because I've created 2 different layouts in the HTML
//This one is for input elements with text/date/select values
function getInput(idSmall, idLarge) {
  const smallInput = document.getElementById(idSmall);
  return smallInput.offsetParent !== null
    ? smallInput.value
    : document.getElementById(idLarge).value;
}
//This one is for the input element that returns boolean values
function getChecked(idSmall, idLarge) {
  const smallInput = document.getElementById(idSmall);
  return smallInput.offsetParent !== null
    ? smallInput.checked
    : document.getElementById(idLarge).checked;
}

// Ensure user is logged in and have user's instance loaded
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("You must be logged in to create an event!");
    return;
  }

  //Get current user's username from Firebase
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  const userName = userDoc.data().username;

  //Take form data on submit action from submit button at bottom of form, validate all req'd fields are filled, create a Firebase Doc with that info
  const eventForm = document.getElementById("event-form");
  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventTitle = getInput("event-title-sm", "event-title");
    const eventType = getInput("event-type-sm", "event-type");
    const eventLocation = getInput("event-location-sm", "event-location");
    const eventDate = getInput("event-date-sm", "event-date");
    const eventAgeGroup = getInput("event-age-group-sm", "event-age-group");
    const restrictionsText = getInput(
      "event-restriction-text-sm",
      "event-restriction-text",
    );
    const noKidsRestriction = getChecked(
      "restriction-kidfree-sm",
      "restriction-kidfree",
    );
    const noAlchoholRestriction = getChecked(
      "restriction-alchoholfree-sm",
      "restriction-alchoholfree",
    );
    const noSmokingRestriction = getChecked(
      "restriction-smokefree-sm",
      "restriction-smokefree",
    );
    const noGlutenRestriction = getChecked(
      "restriction-glutenfree-sm",
      "restriction-glutenfree",
    );

    const eventDescription = document.getElementById("event-description").value;

    if (!eventTitle || !eventLocation || !eventDate) {
      alert("Please fill in all required fields");
      return;
    }
    // Send form input to firbase and create an event
    try {
      const eventCollectionRef = collection(db, "events");
      await addDoc(eventCollectionRef, {
        host: userName,
        title: eventTitle,
        type: eventType,
        location: eventLocation,
        time: eventDate,
        ageGroup: eventAgeGroup,
        description: eventDescription,
        restrictionsTextbox: restrictionsText,
        noKids: noKidsRestriction,
        noAlchohol: noAlchoholRestriction,
        noSmoking: noSmokingRestriction,
        noGluten: noGlutenRestriction,
        eventImage: "", //Placeholder until we have a database to store images
      });
      alert("Event added successfully!");
      window.location.href = "./main.html";
    } catch (error) {
      console.log("Something went wrong adding this event to Firestore.");
      console.log(error);
    }
  });
});
