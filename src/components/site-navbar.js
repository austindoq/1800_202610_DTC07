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
                        <a class="sm:block hidden font-semibold" href="#">In-Person</a>
                        <!-- link 2 -->
                        <a class="sm:block hidden font-semibold" href="#">Virtual</a>
                        <!-- End of Links -->

                        <!-- NAV - SEARCH BAR -->
                        <div class="flex justify-between items-center sm:mx-0 bg-white px-1 py-1 rounded-full outline-gray-400 outline-1 max-w-sm">
                            <!-- keyword search -->
                            <div class="pl-3">
                            <input id="keyword-search" type="search" placeholder="search events" class="">
                            </div>
                            <!-- search filter -->
                            <div class="bg-gray-200 rounded-full flex gap-5 md:pl-2">
                            <button id="search-filter" type="button" class="hidden md:flex items-center gap-2 text-gray-800">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1f2937"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                >
                                <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
                                </svg>
                                Filter
                                <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="#1f2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                </svg>
                            </button>
                        
                            <!-- search button -->
                            <button type="submit" class=" bg-[#282828] rounded-full p-2">
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
                        <a href="#" class="hidden lg:block">
                            <div class="bg-[#282828] text-white py-2 px-3 rounded-full hover:text-yellow-400">
                            Log in
                            </div>
                        </a>
                        <!-- PROFILE -->
                        <div class="flex ml-auto mr-6 pl-6">
                        <a href="/profile.html" class="flex items-center min-h-12 min-w-12">
                            <img src="/images/Profile.svg" width="50" height="50"></a>
                        </div>
                        <!-- END OF PROFILE -->
                        </div>
                    </div>
                </nav>
                <!-- END OF MAIN NAVBAR -->
                
                <!-- Start of Mobile Navbar -->
                <div class="flex justify-evenly bg-gray-100 p-2 sm:hidden">
                    <!-- Link 1 -->
                    <a href="#">
                        <div class="font-semibold">In-Person</div>
                    </a>
                    <!-- Link 2 -->
                    <a href="#">
                        <div class="font-semibold">Virtual</div>
                    </a>
                
                </div>
                <!-- END OF NAV - SEARCH BAR -->

                </div>
            </nav>
            <!-- END OF NAVBAR -->
        `;
    }
}

customElements.define("site-navbar", SiteNavbar);
