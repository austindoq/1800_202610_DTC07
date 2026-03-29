
function searchKeywords(){
    const searchFields = document.querySelectorAll("#keyword-search")
    const searchIcon = document.querySelectorAll("#search-button")

    function doSearch(query){
        query = query.trim()
        if (query === ""){
            return
        }
        window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`
    }

    searchFields.forEach((field) => {
        field.addEventListener("keydown", (userquery) =>{
            if (userquery.key === "Enter"){
                doSearch(field.value)
            }
        })

    })

    searchIcon.forEach((button) => {
        button.addEventListener("click", () => {
            const searchInput = button.closest(".search-container").querySelector("#keyword-search")
            if (searchInput !== null){
                doSearch(searchInput.value)
            }

        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(searchKeywords, 1000)
})