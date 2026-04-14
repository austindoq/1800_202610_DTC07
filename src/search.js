//This file listens for user input on the search bar (hitting enter or the search icon button), then redirects the browser to search-results.html with the query in the url


//This function is responsible for the search logic in the search bar. 
function searchKeywords(){
    // we are selecting elements with id=keyword-search and id=search-button (desktop and mobile searchbars/serachbuttons)
    const searchFields = document.querySelectorAll("#keyword-search")
    const searchIcon = document.querySelectorAll("#search-button")
//==================================================

//==================================================
    // helper function to handle redirect logic
    // query is what they user types into the search bar
    function doSearch(query){
        query = query.trim()
        //if query is empty, exit early
        if (query === ""){
            return
        }
        //redirects the browser to search results page. EncodeURIComponent makes the query URL safe
        window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`
    }
//==================================================

//==================================================
    //needs to listen for both the user hitting enter or clicking the search icon
    //loops over every search input field on the page (desktop+mobile search fields)
    searchFields.forEach((field) => {
        //listens for keydown
        field.addEventListener("keydown", (userquery) =>{
            //when the user hits enter, this triggers a search
            if (userquery.key === "Enter"){
                doSearch(field.value)
            }
        })
    })
//==================================================

//==================================================
    //loop over each search button
    searchIcon.forEach((button) => {
        //listen for button click
        button.addEventListener("click", () => {
            //click bubbles up to the nearest element with class search-container
            //pairs each button with its own nearby search input
            const searchInput = button.closest(".search-container").querySelector("#keyword-search")
            //guard condition - search only if there is a searchInput element
            if (searchInput !== null){
                doSearch(searchInput.value)
            }

        })
    })
}
//==================================================

//==================================================
// puts event listener on the html document; makes sure html page is loaded first
document.addEventListener("DOMContentLoaded", () => {
    //sets a 1 second delay to let the navbar finish rendering before searchKeywords tries to find the elements
    setTimeout(searchKeywords, 1000)
})