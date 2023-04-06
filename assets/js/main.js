const ul = document.querySelector('main ul');
const btn = document.getElementById('next');
let offset = 0;
let limit = 20;
let createCard = function(_pokemon){
    ul.innerHTML += `<li class="pokemon ${_pokemon.types[0].name}">
        <img src="${_pokemon.image}">
        <p class="name">${_pokemon.name}</p>
        <ul>
        ${_pokemon.types.map(type=>{
            return `<li class="${type.name}">${type.name}</li>`
        }).join('')}
        </ul>
    </li>`;
};

pokeapi.getPokemons(offset,limit).then((pokemons)=>{
    pokemons.map(createCard)
});

btn.addEventListener('click',()=>{
    offset+=limit;
    pokeapi.getPokemons(offset,limit).then((pokemons)=>{
        pokemons.map(createCard)
    });
})