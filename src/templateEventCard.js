export function createCardHTML(event) {
    return `
    <div class="flex flex-col h-full w-full max-w-[370px] overflow-hidden min-w-0">
        <img class="rounded-t-[45px] w-full max-w-full h-52 object-cover border-1 border-gray-200" src="${event.image || '/images/dynamic-soccer-crowd-cheer-fan-vector-silhouette-background.jpg'}" ></img> 
        <div class="border-1 border-gray-200 flex flex-col flex-1">
            <div class="flex gap-4 pt-3 space-y-3 text-[12px]">
                <div class="font-bold border-r-1 border-gray-600 pr-4 pl-4 break-words">${event.title}</div>
                <div class="text-gray-600 border-r-1 pr-4 ">${event.location}</div>
                <div class="text-gray-600 ">${event.time}</div>
            </div>
            <div class="text-gray-600 pb-3 pl-4 text-[12px]">Hosted by: ${event.host}</div>
        </div>
    </div>    
    `;
}
// event in event.image refers to the parameter event in createCardHTML
