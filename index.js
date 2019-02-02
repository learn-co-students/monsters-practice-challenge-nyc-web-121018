let allMonsters = []
let monsterContainer = {}
const createMonsterButton = document.querySelector('#create-monster-button')
const createMonsterContainer = document.querySelector('#create-monster-container')
const pageNavigator = document.querySelector("#page-navigator")
let monsterSelectionStartPoint = 0
let monsterSelectionEndPoint = 50

document.addEventListener("DOMContentLoaded", function(){

  monsterContainer = document.querySelector('#monster-container')

  apiGetRequest(0,50)

createMonsterButton.addEventListener('click', function(event){

  createMonsterContainer.innerHTML =
  `<form id = "create-monster-form" action="index.html" method="post">
    <label for="">Name</label>
    <input id="name-input" type="text"  value="">
    <label for="">Age</label>
    <input id="age-input" type="text"  value="">
    <label for="">Description</label>
    <input id="description-input" type="text"  value="">
    <button>Submit</button>
  </form>
  `
  const createMonsterForm = document.querySelector('#create-monster-form')

  createMonsterForm.addEventListener('submit',function(event){
    event.preventDefault()

    let newName = event.target.querySelector('#name-input').value
    let newAge = event.target.querySelector('#age-input').value
    let newDescription = event.target.querySelector('#description-input').value

    apiCreate(newName, newAge, newDescription)


  }) //end of submit button listener

}) //dropdown listener

pageNavigator.addEventListener('click',function(event){

  if (event.target.id === "forward") {
    console.log("forward button");
    nextPageView("forward")
  }
  else if (event.target.id === "back") {
    nextPageView("backward")
    console.log("backwards button");
  }
})

monsterContainer.addEventListener('click',function(event){

  if (event.target.dataset.id === "delete"){
    let monsterId = event.target.parentElement.dataset.id
    let monsterDiv = event.target.parentElement

    apiDelete(monsterId)

    monsterContainer.removeChild(monsterDiv)

  }
  else if (event.target.dataset.id === "edit"){
    let monsterId = event.target.parentElement.dataset.id
    let monsterDiv = event.target.parentElement
    let name = monsterDiv.dataset.name
    let age = monsterDiv.dataset.age
    let description = monsterDiv.dataset.description

    renderEditForm(monsterDiv, name, age, description)

    let editForm = document.querySelector(`#edit-monster-form-${monsterDiv.dataset.id}`)

    editForm.addEventListener('submit',function(event){
      event.preventDefault()
      let newName = event.target.querySelector('#name-input').value
      let newAge = event.target.querySelector('#age-input').value
      let newDescription = event.target.querySelector('#description-input').value
      apiEdit(monsterId, newName, newAge, newDescription)

      monsterDiv.innerHTML =
      `<p></p>
      <h4>${newName}</h4>
      <p>${newAge}</p>
      <p>${newDescription}</p>
      <button data-id="edit">Edit</button>
      <button data-id="delete">Delete</button>
      `
    })


  }

})

}) //end of DOMContentLoaded


function showMonstersSetLength(monsterSelectionStartPoint, monsterSelectionEndPoint) {
  monsters = allMonsters.slice(monsterSelectionStartPoint, monsterSelectionEndPoint)
  monsterContainer.innerHTML = ''
  for(let monster of monsters){
    monsterContainer.innerHTML +=
    `<div data-id="${monster.id}" data-name="${monster.name}" data-id="${monster.age}" data-description="${monster.description}">
    <h4>${monster.name}</h4>
    <p>${monster.age}</p>
    <p data-id="description">${monster.description}</p>
    <button data-id="edit">Edit</button>
    <button data-id="delete">Delete</button>
    </div>
    `

  }

}

function apiGetRequest(monsterSelectionStartPoint, monsterSelectionEndPoint) {
  fetch('http://localhost:3000/monsters')
  .then(function(response){
  return response.json()
  }).then(function(response){
  allMonsters = response.reverse()

  showMonstersSetLength(0,50)
  // displays all monsters function goes here...
  })
}

function nextPageView(direction) {

   if (direction === "forward"){
    monsterSelectionStartPoint += 50
    monsterSelectionEndPoint += 50
    if (monsterSelectionStartPoint > allMonsters.length){
      monsterSelectionStartPoint = 0
      monsterSelectionEndPoint = 50
    }
  }
  else if (direction === "backward") {
    monsterSelectionStartPoint -= 50
    monsterSelectionEndPoint -= 50
    if (monsterSelectionStartPoint < 0){
      monsterSelectionStartPoint = 0
      monsterSelectionEndPoint = 50
    }
  }

  showMonstersSetLength(monsterSelectionStartPoint, monsterSelectionEndPoint)
}

function apiDelete(monsterId){
  fetch(`http://localhost:3000/monsters/${monsterId}`, {
  method:'DELETE'
  }
  ).then( function(response){
    return response.json()
  })
}

function apiCreate(newName, newAge, newDescription) {
    fetch('http://localhost:3000/monsters', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"

  },
  body: JSON.stringify( {
    name: newName,
    age: newAge,
    description: newDescription,

  })
  }).then( function(response){
  return response.json()
  }).then( function(response){
  newDiv = document.createElement('div')
  newDiv.dataset.id= allMonsters[0].id++
  newDiv.innerHTML =
  `<p></p>
  <h4>${newName}</h4>
  <p>${newAge}</p>
  <p>${newDescription}</p>
  <button data-id="edit">Edit</button>
  <button data-id="delete">Delete</button>
  `
  monsterContainer.prepend(newDiv)


  })
}

function apiEdit(monsterId, newName, newAge, newDescription) {
    fetch(`http://localhost:3000/monsters/${monsterId}`, {
  method: 'PATCH',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"

  },
  body: JSON.stringify( {
    name: newName,
    age: newAge,
    description: newDescription,

  })
  }).then( function(response){
  return response.json()
  })
}


function renderEditForm(monsterDiv, name, age, description) {
  monsterDiv.innerHTML +=
  `<form id = "edit-monster-form-${monsterDiv.dataset.id}" action="index.html" method="post">
    <label for="">Name</label>
    <input id="name-input" type="text"  value="${name}">
    <label for="">Age</label>
    <input id="age-input" type="text"  value="${age}">
    <label for="">Description</label>
    <input id="description-input" type="text"  value="${description}">
    <button>Submit</button>
  </form>
  `
}
