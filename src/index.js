let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Fetch requests
  function fetchResource(url) {
    return fetch(url)
    .then(res => res.json())
  }

  function createNewToy(newToy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }


  //Rendering functions
  function createToy(toyData) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    h2.textContent = toyData.name;
    img.src = toyData.image;
    p.textContent = `${toyData.likes} likes`;
    btn.textContent = "like";
    btn.id = toyData.id;

    btn.classList = 'like-btn';
    div.classList = 'card';
    img.classList = 'toy-avatar';

    div.append(h2, img, p, btn);
    document.querySelector('#toy-collection').append(div);
  }

  //Event Listeners
  document.querySelector('.add-toy-form').addEventListener('submit', handleToySubmit)

  //Event Handlers
  function handleToySubmit(e) {
    e.preventDefault();
    //Create new toy
    let newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    createToy(newToy);
    createNewToy(newToy);
  }

  //Invoke functions
  fetchResource('http://localhost:3000/toys')
  .then(toys => toys.forEach(createToy))

});

