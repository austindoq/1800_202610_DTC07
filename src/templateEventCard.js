export function createCardHTML(event) {
  return `
    <div class="flex flex-col h-full w-full max-w-[370px] overflow-hidden min-w-0">
        <img class="rounded-t-[45px] w-full max-w-full h-52 object-cover border-1 border-gray-200" src="${event.image || "/images/dynamic-soccer-crowd-cheer-fan-vector-silhouette-background.jpg"}" ></img> 
        <div class="border-1 border-gray-200 flex flex-col flex-1 justify-evenly">
            <div class="flex gap-4 pt-3 space-y-3 text-[12px]">
                <div class="font-bold border-r-1 border-gray-600 pr-4 pl-4 break-words">${event.title}</div>
                <div class="text-gray-600 border-r-1 pr-4 ">${event.location}</div>
                <div class="text-gray-600 ">${event.time}</div>
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
                <div id="restrictions-area" class="flex flex-wrap gap-1 text-[12px] font-semibold items-center py-1 px-4">
                ${event.noAlchohol ? `<span class="bg-[#464646] text-white p-1 rounded-xl" >No Alchohol</span>` : ""}
                ${event.noGluten ? `<span class="bg-[#464646] text-white p-1 rounded-xl">No Gluten</span>` : ""}
                ${event.noKids ? `<spa class="bg-[#464646] text-white p-1 rounded-xl"n>No Kids</spa>` : ""}
                ${event.noSmoking ? ` <span class="bg-[#464646] text-white p-1 rounded-xl">No Smoking</span>` : ""}
                ${event.restrictionsTextbox ? `<span class="bg-[#464646] text-white p-1 rounded-xl">${event.restrictionsTextbox}</span>` : ""}
                </div>`
                : ""
            }
            </div>
        </div>
    </div>    
    `;
}
// event in event.image refers to the parameter event in createCardHTML
