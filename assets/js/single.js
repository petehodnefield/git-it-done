let issuesContainerEL = document.querySelector("#issues-container")
    
var getRepoIssues = function(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayIssues(data)
                    console.log(data)
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
  
  getRepoIssues("facebook/react");

// repo is encompassing both username and reponame