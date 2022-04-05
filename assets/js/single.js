let issuesContainerEL = document.querySelector("#issues-container")
let limitWarningEl = document.querySelector("#limit-warning")
    
var getRepoIssues = function(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayIssues(data)

                    // Check if API has paginated issues
                    if(response.headers.get("Link")) {
                        displayWarning(repo)
                    }
                })
            }
            else {
                alert("There has been a problem with your request!")
            }
        })

};

let displayIssues = function(issues) {
    for(let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on GitHub
        let issueEl = document.createElement("a")
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank")

        // // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl)

        // create a type element
        let typeEl = document.createElement("span")

        // check if pull request or issue
        if(issues[i].pull_request) {
            titleEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }
        
        // append to container 
        issueEl.appendChild(typeEl)

        issuesContainerEL.appendChild(issueEl)
    }
}

let displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit "

    // create link element
    let warningLinkEl = document.createElement("a")
    warningLinkEl.textContent = "here"
    warningLinkEl.setAttribute("href", "https://github.com/" + repo + "/issues")
    warningLinkEl.setAttribute("target", "_blank")

    // append to container
    limitWarningEl.appendChild(warningLinkEl);
}
  
  getRepoIssues("facebook/react");

// repo is encompassing both username and reponame