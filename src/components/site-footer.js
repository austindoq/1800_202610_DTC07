class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!--START OF FOOTER-->
            <footer class="bg-zinc-500 py-8">
                <!-- container for links -->
                <div class="flex justify-center space-x-6 text-white font-light tracking-wider">
                <a href="#" class="hover:text-yellow-200">About</a>
                <a href="#" class="hover:text-yellow-200">Team</a>
                <a href="#" class="hover:text-yellow-200">Contact</a>
                <a href="#" class="hover:text-yellow-200">Terms</a>
                </div>
            </footer>
            <!-- END OF FOOTER -->
        `;
    }
}

customElements.define('site-footer', SiteFooter)
