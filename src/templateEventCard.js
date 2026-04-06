export function createCardHTML(event, isSaved = false, showAttendees = false) {
  return `
    <div class="flex flex-col h-full w-full max-w-[370px] overflow-hidden min-w-0">
        <img class="rounded-t-[45px] w-full max-w-full h-52 object-cover border-1 border-gray-200" src="${event.image || "/images/dynamic-soccer-crowd-cheer-fan-vector-silhouette-background.jpg"}" ></img> 
        <div class="border-1 border-gray-200 flex flex-col flex-1 justify-between">
            <div class="flex justify-evenly gap-4 pt-3 space-y-3 text-[12px] pr-4">
                <div class="font-bold border-r-1 border-gray-600 pr-4 pl-4 break-words">${event.title}</div>
                <div class="text-gray-600 border-r-1 pr-4 ">${event.location}</div>
                <div class="flex flex-col">
                  <div class="text-gray-600 ">${event.time}</div>
                  <div class="text-gray-600 ">${event.hour}:${event.minute}${event.ampm}</div>
                </div>
            </div>
            <div class="text-gray-600 text-[12px] px-4">${event.description || "No description for this event"}</div>
            <div class="text-gray-600 py-1 pl-4 text-[12px]">Hosted by: @${event.host}</div>
            

            
            <div id="restrictions-area-container">${
              event.noAlchohol ||
              event.noGluten ||
              event.noKids ||
              event.noSmoking ||
              event.restrictionsTextbox
                ? `<span class=" pl-4 text-[12px] font-semibold">Restrictions:</span>
                <div id="restrictions-area" class="flex flex-wrap gap-1 text-[12px] font-semibold items-center px-4">
                ${event.noAlchohol ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl" >No Alcohol</span>` : ""}
                ${event.noGluten ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">No Gluten</span>` : ""}
                ${event.noKids ? `<spa class="bg-[#464646] text-white p-1 px-1.5 rounded-xl"n>No Kids</spa>` : ""}
                ${event.noSmoking ? ` <span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">No Smoking</span>` : ""}
                ${event.restrictionsTextbox ? `<span class="bg-[#464646] text-white p-1 px-1.5 rounded-xl">${event.restrictionsTextbox}</span>` : ""}
                </div>`
                : ""
            }
            </div>
            ${
              showAttendees
                ? `<div class="text-center py-2 font-semibold text-sm">Attendees: ${event.attendees ? event.attendees.length : 0}</div>`
                : `<button data-id="${event.id}" data-saved="${isSaved}">
  <span class="${
    isSaved
      ? "bg-gray-300 active:bg-red-300"
      : "bg-[#facc15] active:bg-[#fde047]"
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
