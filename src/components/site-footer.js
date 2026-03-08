class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!--START OF FOOTER-->
            <footer class="bg-[#282828] text-white py-8 rounded-[30px] m-3 p-5">
                <!-- container -->
                <div class="max-w-5xl mx-auto">
                <!-- Top line -->
                <div class="flex items-center justify-between font-bold pb-8 border-b-1 border-gray-400">
                    <div class="flex items-center gap-2">
                    <img src="/images/logo-white-with-motif.png" height="48" width="48">
                    <div class="text-2xl">
                        <p>Your <span class="text-yellow-400">sports community</span> platform.</p>
                    </div>
                    </div>

                    <div class="flex gap-2 text-2xl">
                    <p>Find community.</p>
                    <div class="">
                        <a href="login.html" class="flex items-center">
                        <p class="text-gray-400">Get Started.</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h.5m3 0h1.5m3 0h6" />
                            <path d="M15 16l4 -4" />
                            <path d="M15 8l4 4" />
                        </svg>
                        </a>
                    </div>
                    </div>
                </div>
                <!-- container for links -->
                <div
                    class="flex justify-center space-x-6 text-white font-light tracking-wider pt-8"
                >
                    <a href="#" class="hover:text-yellow-400">About</a>
                    <a href="#" class="hover:text-yellow-400">Team</a>
                    <a href="#" class="hover:text-yellow-400">Contact</a>
                    <a href="#" class="hover:text-yellow-400">Terms</a>
                </div>
                </div>
            </footer>
            <!-- END OF FOOTER -->
        `;
    }
}

customElements.define('site-footer', SiteFooter)
