/* Author: Shawn Philipps*/
/* Javascript script that will retrieve information from Pokemon API to be used in CSS and HTML document */
/* This script will only retrieve the first 151 Pokemon (original pokemon) */
/* Get "pokedex" element from HTML page */
const pokedex = document.getElementById('pokedex')

/* Function to fetch Pokemon information from PokeAPI */
const fetchPokemon = () => {
/* array to hold Objects from API */
  const promises = []
  /* Loop that will loop through first 151 pokemon in PokeAPI. 'i' is used as a parameter in URL link to API endpoint and corresponds to pokemon id number */
  for (let i = 1; i <= 151; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    /*push json obects into promises array*/
    promises.push(fetch(url).then((res) => res.json()))
  }
  /* Promise that will take the array of objects call "promises" and queue the contents and load each result in parallel */
  Promise.all(promises).then((results) => {
    /* This will take the array of objects returned by results and map to a new array of objects called "pokemon" with the below specified object fields */
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      /* converting weight and height fields to kilograms and meters respectively */
      weight: (data.weight * .1).toFixed(2),
      height: (data.height * .1).toFixed(2),
      /* mapping abilties and joining with a comma for easy formatting. Same with types */
      abilities: data.abilities.map(ability => ability.ability.name).join(', '),
      type: data.types.map( type => type.type.name).join(', ')
    }))
    displayPokemon(pokemon)
  })
}
/* function that will be used in displaying pokemon information to webpage */
const displayPokemon = (pokemon) => {
  /* This will be used to format individual pokemon information for each "card" that will be displayed on webpage */
  const pokemonHTMLString = pokemon.map((pokeman) => `
        <li class = card>
            <h2 class = "card-number"> #${pokeman.id}</h2>
            <img class = "card-image" src = "${pokeman.image}"/>
            <h2 class = "card-name"> ${pokeman.name}</h2>
            <p class = "card-types">Type: ${pokeman.type}</p>
            <p class = "card-height"> Height: ${pokeman.height}m</p>
            <p class = "card-weight"> Weight: ${pokeman.weight}kgs</p>
            <p class = "card-abilities">Abilities: ${pokeman.abilities}</p>
        </li>
        `).join('')
  pokedex.innerHTML = pokemonHTMLString
}
fetchPokemon()
