document.addEventListener('DOMContentLoaded', initalize)

baseUrl = "http://localhost:3000/a_cappella_groups"

function initalize() {
  getGroups().then(groups => {
    state.groups = groups
    addGroupsToTable(state.groups)
  })
}

const tableBody = document.querySelector('#table-body')

const state = {
  groups: [],
  winner: null
}


const addGroupsToTable = groups => {
  const tableBody = document.querySelector('#table-body')

  tableBody.innerHTML = ""
  groups.forEach(group => addGroupToTableRow(group))
}


const addGroupToTableRow = group => {
  if (group == state.winner) {
    return null
  }

  const tableBody = document.querySelector('#table-body')

  const groupRow = document.createElement('tr')

  tableBody.appendChild(groupRow)

  const groupName = document.createElement('td')
  groupName.innerText = group.name

  const groupCollege = document.createElement('td')
  groupCollege.innerText = group.college.name

  const groupMembership = document.createElement('td')
  groupMembership.innerText = group.membership

  const groupDivision = document.createElement('td')
  groupDivision.innerText = group.college.division

  const winnerButton = document.createElement('td')

  winnerButton.innerHTML = `
    <button class="winner-button" data-id="${group.id}">
        <img class="trophy-image" src="./assets/trophy.png" alt="winner button" />
        </button>`

  const deleteButton = document.createElement('td')

  deleteButton.innerHTML = `
  <button class="delete-button" data-id="${group.id}">
      <img class="delete-image" src="./assets/delete.jpg" alt="delete button" style="width:90px" />
      </button>`

  groupRow.append(groupName, groupCollege, groupMembership, groupDivision, winnerButton, deleteButton)
  winnerButton.addEventListener('click', () => onTrophyClick(group))
  deleteButton.addEventListener('click', () => onDeleteClick(group))
}

const onTrophyClick = group => {
  state.winner = group
  const h2 = document.querySelector('#winner')
  h2.innerText = `Winner: ${state.winner.name}`
  document.querySelector('#table-body').innerHTML = ""
  addGroupsToTable(state.groups)
}

const onDeleteClick = group => {
  event.preventDefault()
  deleteGroup(group.id).then(() => getGroups().then(addGroupsToTable))
}

const getGroups = () => {
  return fetch(baseUrl)
    .then(response => response.json())
}

const deleteGroup = (id) => {

  const options = {
    method: "DELETE",
    }

  return fetch(baseUrl + `/${id}`, options)

}
