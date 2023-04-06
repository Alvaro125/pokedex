const pokeapi = {};
pokeapi.convertPokeAPIDetailsToPokemon= function(_pokemon){
    let pokemon = new Pokemon();
    pokemon.name = _pokemon.name;
    pokemon.id = _pokemon.id;
    pokemon.image = _pokemon.sprites.front_default;
    pokemon.types = _pokemon.types.map((type)=>type.type)
    return pokemon;
};
pokeapi.getPokemonDetails = function(_pokemon){
    return fetch(_pokemon.url)
    .then(response=>response.json())
    .then(pokeapi.convertPokeAPIDetailsToPokemon)
}
pokeapi.getPokemons = (offset = 0, limit = 5)=>{
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response)=>response.json())
    .then((jsonBody)=>jsonBody.results)
    .then((pokemons)=>pokemons.map(pokeapi.getPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}