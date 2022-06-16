let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector("#new-toy-btn")
    const toyFormContainer = document.querySelector(".container")

    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
        toyFormContainer.style.display = "block"
        } else {
        toyFormContainer.style.display = "none"
        }
    });
    
    //Fetch all toys and place in cards
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toyCard))


    //Fetch one toy and place in card
    // fetch('http://localhost:3000/toys/4')
    // .then(res => res.json())
    // .then(toyData => {toyCard(toyData)
    // })

    //Build a toy card
    function toyCard(toyData) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const img = document.createElement('img')
        const p = document.createElement('p')
        const btn = document.createElement('button')

        div.classList = "card"
        img.classList = "toy-avatar"
        btn.classList = "lik-btn"
        btn.id = toyData.id

        h2.textContent = toyData.name
        img.src = toyData.image
        p.textContent = `${toyData.likes} likes`
        btn.textContent = `Like ❤️`

        //Button event listener
        btn.addEventListener('click', function(e) { 
            let likeTotal = parseInt(e.target.previousElementSibling.innerText)+1
            fetch(`http://localhost:3000/toys/${e.target.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"likes": likeTotal})
                })
                .then(res => res.json())
                .then((toy => {
                    e.target.previousElementSibling.textContent = `${likeTotal} likes`
                }
            ))
        })

        div.append(h2, img, p, btn)
        document.querySelector('#toy-collection').append(div)
    }

    //Create new toy with submit form
    const newToyForm = document.querySelector('form.add-toy-form')
    newToyForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let newToy = {
            name: e.target.name.value,
            image: e.target.image.value,
            likes: 0
        }
        toyCard(newToy)
        
        fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newToy)
          })
        .then(res => res.json())
        .then(console.log)

        newToyForm.reset()
    }) 
})
