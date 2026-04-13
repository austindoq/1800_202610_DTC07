// this file creates the event card template. Cards are injected into HTML by loadEventsIndex.js, searchResults.js, and profile.js

export function createCardHTML(event, isSaved = false, showAttendees = false) {
  return `
    <div class="flex flex-col h-full w-full max-w-[370px] overflow-hidden min-w-0 shadow-xl">
        <img class="rounded-t-[45px] w-full max-w-full h-52 object-cover border-1 border-gray-200" src="${event.image || "/images/dynamic-soccer-crowd-cheer-fan-vector-silhouette-background.jpg"}" ></img> 
        <div class="border-1 border-gray-200 flex flex-col flex-1 justify-between">
            <div id="top-event-details" class="flex flex-col gap-1">
              <div class="font-bold border-r-2 border-gray-600 text-[18px] pr-4 pl-4 break-words flex items-center justify-center">${event.title}</div>
              <div class="flex justify-between space-y-3 text-[16px] pl-4 pr-4">
                  <div class="text-gray-600 border-r-2 break-all flex justify-center pr-1 items-center w-1/2">${event.location}</div>
                  <div class="flex flex-col w-1/2 items-center">
                    <div class="text-gray-600 ">${event.time}</div>
                    <div class="text-gray-600 ">${event.hour}:${event.minute}${event.ampm}</div>
                  </div>
              </div>
            </div>
            <div class="text-gray-600 text-[16px] px-4">${event.description || "No description for this event"}</div>
            <div class="text-gray-600 py-1 pl-4 text-[14px]">Hosted by: @${event.host}</div>
            
            
            <div id="restrictions-area-container">${
              event.noAlchohol || // true if "Alcohol Free" was checked on create-event.html
              event.noGluten ||   // true if "Gluten Free" was checked
              event.noKids ||     // true if "Kid Free" was checked
              event.noSmoking ||  // true if "Smoke Free" was checked
              event.restrictionsTextbox   // truthy if a custom restriction was typed in
              // If any of the above are truthy, render the full restrictions block:
                ? `<span class=" pl-4 text-[14px] font-semibold">Restrictions:</span>
                <div id="restrictions-area" class="flex flex-wrap gap-1 text-[16px] font-semibold items-center px-4">
                ${event.noAlchohol ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl" >No Alcohol</span>` : ""}
                ${event.noGluten ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">No Gluten</span>` : ""}
                ${event.noKids ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl"n>No Kids</span>` : ""}
                ${event.noSmoking ? ` <span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">No Smoking</span>` : ""}
                ${event.restrictionsTextbox ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">${event.restrictionsTextbox}</span>` : ""}
                </div>`
                // If all restriction fields are false/empty, render nothing here
                : ""
            }
            </div>
            ${
              showAttendees
                ? `<div class="text-center py-2 font-semibold text-md">Attendees: ${event.attendees ? event.attendees.length : 0}</div>`
                : `<button data-id="${event.id}" data-saved="${isSaved}">
  <span class="${
    isSaved
      ? "bg-gray-300 active:font-semibold"
      : "bg-gradient-to-b from-[#facc15] to-[#fde047] active:bg-[#fde047] active:font-semibold"
  } text-xl mx-auto mt-1 flex justify-center tracking-widest w-full gap-2 px-2 shadow-md hover:cursor-pointer">
    ${isSaved ? "Unsave ✕" : "Save"}
  </span>
</button>`
            }
        </div>
    </div>    
    `;
}
// event in event.image refers to the parameter event in createCardHTML
