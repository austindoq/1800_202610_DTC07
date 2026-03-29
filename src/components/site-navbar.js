import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="sticky top-0 z-50 shadow-sm bg-white">
                <!-- START OF MAIN NAVBAR -->
                <!-- NAVBAR COLOUR -->
                <nav class="p-2">
                    <!-- Navbar - container -->
                    <div class="flex justify-between ">
                    <div class="flex space-x-3 md:space-x-6 items-center">
                        <!-- Navbar - Branding -->
                        <a href="/index.html" class="font-bold ml-6 min-w-12">
                        <img src="/images/logo-yellow-with-motif.png" width="64" height="64">
                        </a>
                        <!-- Navbar-links -->
                        <!-- link 1 -->
                        <a class="hidden font-semibold" href="#">In-Person</a>
                        <!-- link 2 -->
                        <a class="hidden font-semibold" href="#">Virtual</a>
                        <!-- End of Links -->

                        <!-- NAV - SEARCH BAR -->
                        <div class="search-container hidden sm:flex justify-between items-center sm:mx-0 bg-white px-1 py-1 rounded-full outline-gray-400 outline-1 max-w-sm">
                            <!-- keyword search -->
                            <div class="pl-3">
                            <input id="keyword-search" type="search" placeholder="search events" class="">
                            </div>
                            <!-- search filter -->
                            <div class="bg-gray-200 rounded-full flex gap-5 md:pl-2">
                            <div class="relative flex items-center">
                                <button id="search-filter" type="button" class="flex items-center gap-2 text-gray-800">
                                    <svg
                                        class = "pl-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24" viewBox="0 0 24 24"
                                        width="24"><path d="M0 0h24v24H0V0z"
                                        fill="none"/>
                                        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                        </svg>
                                    Filter
                                    <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="#1f2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                    </svg>
                                </button>
                                <!-- DROPDOWN PANEL -->
                                <div id="filter-dropdown" class="hidden absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 min-w-[160px]">
                                    <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                        <input type="checkbox" data-filter="noAlchohol" class="filter-checkbox size-4"> No Alcohol
                                    </label>
                                    <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                        <input type="checkbox" data-filter="noKids" class="filter-checkbox size-4"> No Kids
                                    </label>
                                    <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                        <input type="checkbox" data-filter="noSmoking" class="filter-checkbox size-4"> No Smoking
                                    </label>
                                    <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                        <input type="checkbox" data-filter="noGluten" class="filter-checkbox size-4"> No Gluten
                                    </label>
                                    <button id="apply-filters" class="mt-2 w-full bg-yellow-400 rounded-lg py-1 text-sm font-semibold hover:bg-yellow-300">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        
                            <!-- search button -->
                            <button id="search-button" type="button" class=" bg-[#282828] rounded-full p-2">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" viewBox="0 0 24 24">
                                <path stroke="#ffffff" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                            </button>
                            </div>
                        </div>
                        <!-- END OF NAV - SEARCH BAR -->
                    </div>

                        <!-- Right Container -->
                        <div class="flex justify-end items-center">
                        <!-- login button -->
                        <a id ="login-logout-button" href="/login.html" class="block">
                            <div class="bg-[#282828] text-white py-1 px-2 rounded-full min-w-6 hover:text-yellow-400 text-center">
                            Log in
                            </div>
                        </a>
                        <!-- PROFILE -->
                        <div id="profile-icon" class="flex ml-auto mr-6 pl-6">
                        <a href="/profile.html" class="flex items-center min-h-12 min-w-12">
                            <img src="/images/Profile.svg" width="50" height="50"></a>
                        </div>
                        <!-- END OF PROFILE -->
                        </div>
                    </div>
                </nav>
                <!-- END OF MAIN NAVBAR -->
                
                
                <!-- NAV - SEARCH BAR -->
                    <div class="flex justify-center mx-4 pt-2 pb-4">
                        <div class="search-container flex sm:hidden justify-between items-center sm:mx-0 bg-white px-1 py-1 rounded-full outline-gray-400 outline-1 max-w-sm">
                            <!-- keyword search -->
                            <div class="pl-3 min-w-0">
                                <input id="keyword-search" type="search" placeholder="search events" class="">
                            </div>
                            <!-- search filter -->
                            
                            <div class="bg-gray-200 rounded-full flex flex-shrink-0 gap-5 md:pl-2">
                                <div class="relative flex items-center">
                                    <button id="search-filter" type="button" class="flex max-[350px]:hidden items-center gap-2 text-gray-800 min-w-0">
                                        <svg
                                        class = "pl-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24" viewBox="0 0 24 24"
                                        width="24"><path d="M0 0h24v24H0V0z"
                                        fill="none"/>
                                        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                        </svg>
                                        Filter
                                        <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="#1f2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                        </svg>
                                    </button>
                                    <!-- DROPDOWN PANEL -->
                                    <div id="filter-dropdown" class="hidden absolute space-y-6 left-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 min-w-[160px]">
                                        <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                            <input type="checkbox" data-filter="noAlchohol" class="filter-checkbox size-4"> No Alcohol
                                        </label>
                                        <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                            <input type="checkbox" data-filter="noKids" class="filter-checkbox size-4"> No Kids
                                        </label>
                                        <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                            <input type="checkbox" data-filter="noSmoking" class="filter-checkbox size-4"> No Smoking
                                        </label>
                                        <label class="flex items-center gap-2 py-1 cursor-pointer text-sm font-medium">
                                            <input type="checkbox" data-filter="noGluten" class="filter-checkbox size-4"> No Gluten
                                        </label>
                                        <button id="apply-filters" class="mt-2 w-full bg-yellow-400 rounded-lg py-1 text-sm font-semibold hover:bg-yellow-300">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                        
                            <!-- search button -->
                            <button id="search-button" type="button" class=" bg-[#282828] rounded-full p-2">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" viewBox="0 0 24 24">
                                <path stroke="#ffffff" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                            </button>
                            </div>
                        </div>
                    </div>
                    <!-- END OF NAV - SEARCH BAR -->

                </div>
            </nav>
            <!-- END OF NAVBAR -->
        `;

        onAuthStateChanged(auth, (user) => {
            //we run auth check after innerHTML is set so the profile element exists first
            const profileIcon = this.querySelector("#profile-icon");
            if (profileIcon) {
                profileIcon.style.display = user ? "flex" : "none";
            }
        });



        setTimeout(() => {
            this.querySelectorAll("#search-filter").forEach((filterButton) => {
                const dropdown = filterButton.nextElementSibling;

                // Toggle dropdown when Filter button is clicked
                filterButton.addEventListener("click", (event) => {
                    event.stopPropagation(); // prevent the click from immediately closing via the window listener
                    dropdown.classList.toggle("hidden");
                });

                dropdown.addEventListener("click", (event) => {
                    event.stopPropagation()
                })

                const query = new URLSearchParams(window.location.search)
                const queryValue = query.get("filters")?.split(",") || []

                queryValue.forEach((filterKey) => {
                    if (filterKey){
                        const checkbox = dropdown.querySelector(`[data-filter="${filterKey}"]`)
                        if(checkbox){
                            checkbox.checked = true;
                        }
                    }
                })

                // When "Apply" is clicked, build the URL and navigate
                dropdown.querySelector("#apply-filters").addEventListener("click", () => {
                        const checkedFilters = [...dropdown.querySelectorAll(".filter-checkbox:checked"),
                        ].map((cb) => cb.dataset.filter); // map filter from dataset

                        // Read current search query if one exists
                        const queryParameters = new URLSearchParams(window.location.search);
                        const searchInput = filterButton.closest(".search-container")?.querySelector("#keyword-search");
                        const queryValue = searchInput?.value.trim() || queryParameters.get("q") || "";

                        //keep the search query and add filters to URL
                        let url = `/search-results.html?q=${encodeURIComponent(queryValue)}`;
                        if (checkedFilters.length > 0) {
                            url += `&filters=${checkedFilters.join(",")}`;
                        }
                        window.location.href = url;
                    });
            });

            // Close dropdown if user clicks anywhere else on the page
            window.addEventListener("click", () => {
                this.querySelectorAll("#filter-dropdown").forEach((dropdown) =>
                    dropdown.classList.add("hidden"),
                );
            });
        }, 0);
    }
}



customElements.define("site-navbar", SiteNavbar);
