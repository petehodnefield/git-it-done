var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")

var repoSearchTerm = document.querySelector("#repo-search-term")
var repoContainerEl = document.querySelector("#repos-container")
let languageButtonsEl = document.querySelector("#language-buttons")



let getFeaturedRepos = function(language) {
    // creates api endpoint
    let apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues"

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language)
                console.log(data);
            })
        }
        else {
            alert("Error: GitHub user not found!")
        }
    }) 
}

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user)
            })
        }
        else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html")
        }
    })
    .catch(function(error) {
        // Notice this .catch() getting chained onto the end of the then() method
        alert("Unable to connect to Git Hub")
    })
    console.log("outside")
}

var formSubmitHandler = function(event) {
    event.preventDefault()
    
    // get the value of the form input element
    var username = nameInputEl.value.trim()
    // send it to getUserRepos()
    if(username) {
        getUserRepos(username)
        nameInputEl.value = ""
    }
    else {
        alert("Please enter a Git Hub username!")
    }
}

var displayRepos = function(repos, searchTerm) {
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found!"
        return
    }
    // clear old content
    repoContainerEl.textContent = ""
    repoSearchTerm.textContent = searchTerm

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repos name
        var repoName = repos[i].owner.login + "/" + repos[i].name

        // create a container for each repo
        var repoEl = document.createElement("a")
        // Each repo will be a link that takes them to single.js
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName)
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        // create a span to hold repo name
        var titleEl = document.createElement("span")
        titleEl.textContent = repoName

        // append to container
        repoEl.appendChild(titleEl)

        // create a status element
        var statusEl = document.createElement("span")
        statusEl.classList = "flex-row align-center"

        // check if the current repo has issues or not
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innterHTML =
            "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl)

        // append container to the dom
        repoContainerEl.appendChild(repoEl)
    }
}

let buttonClickHandler = function(event) {
    let language = event.target.getAttribute("data-language")
    if(language) {
        getFeaturedRepos(language)
        
        // clear old container
        repoContainerEl.textContent = '';
    }
    else {
        al
    }
    console.log(language)
}

userFormEl.addEventListener("submit", formSubmitHandler)
languageButtonsEl.addEventListener("click", buttonClickHandler)