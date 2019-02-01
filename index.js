let allMonsters = []

const monsterContainer = document.querySelector('#monster-container')
const formContainer = document.querySelector('#create-monster')

document.addEventListener("DOMContentLoaded", ()=>{

  renderForm()
  const monsterForm = document.querySelector('#monster-form')
  let page = 1
  fetchMonsters(page)

  document.body.addEventListener("click", function(event){
    if (event.target.id === "forward"){
      page++
      fetchMonsters(page)
    } else if (event.target.id === "back" && page > 1){
      page--
      fetchMonsters(page)
    }
  })

  monsterForm.addEventListener("submit", function(event){
    event.preventDefault()
    let newMonsterName = event.target.name.value
    let newMonsterAge = event.target.age.value
    let newMonsterDescription = event.target.description.value
    console.log(newMonsterName, newMonsterAge, newMonsterDescription)

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newMonsterName,
        age: newMonsterAge,
        description: newMonsterDescription,
        id: allMonsters.length+1000
      })
    }).then(response => response.json())
      .then(monster => {
        allMonsters.push(monster)
        // makeAllMonsters(allMonsters) // this works as well
        fetchMonsters(page)
      })
  })

}) // End of DOMContentLoaded

// HELPER METHODS

function renderForm(){
  formContainer.innerHTML = '<form id="monster-form"><input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button></form>'
}

function fetchMonsters(page){
  fetch(`http://localhost:3000/monsters?_limit=2000&_page=${page}`)
    .then(response => {
      return response.json()
    })
    .then(parsed => {
      allMonsters = parsed
      makeAllMonsters(allMonsters)
    })
}

function makeAMonster(monster) {
  return `<div>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
          </div>`
}

function makeAllMonsters(monsters) {
  monsterContainer.innerHTML = monsters.map(makeAMonster).join('')
}
