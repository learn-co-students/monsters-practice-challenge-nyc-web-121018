let allMonsters = []

document.addEventListener("DOMContentLoaded", function(){
  console.log("Hi Gabbbie not Gabby");
  const monsterContainer = document.querySelector('#monster-container')

  fetch('http://localhost:3000/monsters')
  .then(function(response){
  return response.json()
}).then(function(response){
  allMonsters = response
  // displays all monsters function goes here...
})




})


function showMonstersSetLength(allMonsters) {

  for(let monster of allMonsters){
    monsterContainer.innerHTML +=
    `<div "${}">
    <h4>${}</h4>
    </div>
    `
  }

}
