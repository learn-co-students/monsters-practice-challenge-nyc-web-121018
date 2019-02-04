document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.querySelector('#monster-container')
  const monsterForm = document.querySelector('#create-monster')
  let allMonsters = []
  let page = 1

  appendNewMonsterFrom()
  getMonsters(page) // fetch for all monsters

  monsterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newMonsterName = e.target.name.value
    let newMonsterAge = e.target.age.value
    let newMonsterDescription = e.target.description.value

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newMonsterName,
        age: newMonsterAge,
        description: newMonsterDescription
      })
    }) // end of fetch post
    .then(resp => resp.json())
    .then(monster => {
      allMonsters.push(monster)
      return renderAllMonsters(allMonsters)
    })
  })

  document.body.addEventListener('click', (e) => {
    if (e.target.id === 'back' && page > 1) {
      getMonsters(--page)
    } else if (e.target.id === 'forward') {
      getMonsters(++page)
    }
  })

  function appendNewMonsterFrom() {
    return monsterForm.innerHTML = `
    <form id="monster-form"><input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button></form>`
  }

  function getMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => {
      allMonsters = monsters
      return renderAllMonsters(allMonsters)
    })
  }

  function renderMonster(monster) {
    return `
    <div>
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>Bio: ${monster.description}</p>
    </div>`
  }

  function renderAllMonsters(monsters) {
    return monsterContainer.innerHTML = allMonsters.map(renderMonster).join('')
  }

}) // end of DOMContentLoaded
