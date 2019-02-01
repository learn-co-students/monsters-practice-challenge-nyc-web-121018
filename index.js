let allMonsters = []
let monsterContainer = {}
const createMonsterButton = document.querySelector('#create-monster-button')
const createMonsterContainer = document.querySelector('#create-monster-container')


document.addEventListener("DOMContentLoaded", function(){
  console.log("Hi Gabbbie not Gabby");
    monsterContainer = document.querySelector('#monster-container')

  fetch('http://localhost:3000/monsters')
  .then(function(response){
  return response.json()
}).then(function(response){
  allMonsters = response
  firstFiftyMonsters = allMonsters.slice(0,50)
  showMonstersSetLength(firstFiftyMonsters)
  // displays all monsters function goes here...
})

createMonsterButton.addEventListener('click', function(event){
  console.log("button clicked");
  createMonsterContainer.innerHTML =
  `<form id = "create-monster-form" action="index.html" method="post">
    <label for="">Name</label>
    <input type="text"  value="">
    <label for="">Age</label>
    <input type="text"  value="">
    <label for="">Description</label>
    <input type="text"  value="">
  </form>
  `

})



}) //end of DOMContentLoaded






function showMonstersSetLength(monsters) {
  let i = 1
  monsterContainer.innerHTML = ''
  for(let monster of monsters){
    monsterContainer.innerHTML +=
    `<div data-id="${monster.id}">
    <p>${i}</p>
    <h4>${monster.name}</h4>
    <p>${monster.age}</p>
    <p>${monster.description}</p>
    </div>
    `
    i++
  }

}
