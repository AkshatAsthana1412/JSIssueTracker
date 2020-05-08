

function fetchIssues(){
  if (localStorage['probs']){
    var issues = JSON.parse(localStorage.getItem('probs'))

    var issueList = document.getElementById('issues-list')
    issueList.innerHTML = ''
    for(var i = 0; i < issues.length; i++){
      var issueId = issues[i].id
      var description = issues[i].description
      var severity = issues[i].severity
      var assignedTo = issues[i].assignedTo
      var status = issues[i].status

    issueList.innerHTML += `<li class="list-group-item" id="issue-${issueId}">
      <h4>Issue ID:${issueId}</h4>
      <div class="badge badge-primary">${status}</div>
      <article class="py-2">
        <h3>${description}</h3>
        <svg class="bi bi-bell" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z"/>
          <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>
        </svg>
        <span> ${severity} </span>
        <svg class="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
        </svg>
        <span>${assignedTo}</span>
        <p></p>
        <button type="button" name="button" id="close-issue-${issueId}" class="btn btn-warning" onclick="setStatusClosed('${issueId}')">Close</button>
        <button type="button" name="button" id="delete-issue" class="btn btn-danger" onclick="deleteIssue('${issueId}')">Delete</button>
      </article></li>`
  }
}
else{
  document.getElementById('issues-list').innerHTML = 'No issues found'
}
}


document.getElementById('issueInputForm').addEventListener("submit", saveIssue)
function saveIssue(e){
  var issueId = chance.guid()
  var issueDesc = document.getElementById('issue-desc').value
  var issueSeverity = document.getElementById('severity').value
  var assignedTo = document.getElementById('assgn-to').value

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: assignedTo,
    status: 'Open'
  }
  if(localStorage['probs'] === undefined){
    console.log('No probs')
    var issuesList = []
    issuesList.push(issue)
    localStorage.setItem('probs', JSON.stringify(issuesList))
  }
  else{
    console.log('Probs exists')
    var issuesList = JSON.parse(localStorage.getItem('probs'))
    issuesList.push(issue)
    localStorage.setItem('probs', JSON.stringify(issuesList))
  }

  document.getElementById('issueInputForm').reset()
  fetchIssues()
  e.preventDefault()
}

function deleteIssue(id){
  var issues = JSON.parse(localStorage.getItem('probs'))
  for(var k = 0; k < issues.length; k++){
    if(id === issues[k].id){
        issues.splice(k,1)
    }
  }
  localStorage.setItem('probs', JSON.stringify(issues))
  fetchIssues()
}

function setStatusClosed(id){
    btn = document.getElementById(`close-issue-${id}`)
    btn.innerText = 'Closed!'
    issues = JSON.parse(localStorage.getItem('probs'))
    for(var k = 0; k < issues.length; k++){
      if(issues[k].id == id){
        issues[k].status = 'Closed'
      }
    }
    localStorage.setItem('probs', JSON.stringify(issues))
    fetchIssues()
}
