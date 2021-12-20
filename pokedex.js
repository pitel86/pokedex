const myPokemons = [];
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokedexDiv$$ = document.querySelector("#pokedex");
const listDiv$$ = document.querySelector(".listPokemon");
const myButton$$ = document.querySelector("button");
const myInput$$ = document.querySelector("input");

myButton$$.addEventListener("click", () => {
  searchPokemon(myInput$$.value);
});

const pokedex = async () => {
  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`${pokeUrl}${i}`);
    const resJson = await res.json();
    myPokemons.push(resJson);
  }

  drawPokemons();
};

const drawPokemons = async () => {
  pokedexDiv$$.innerHTML = "";
  for (let i = 0; i < myPokemons.length; i++) {
    const pokemon = myPokemons[i];
    drawPokemon(pokemon, pokedexDiv$$);
  }
  // console.log(pokemons)
};


const searchPokemon = (name) => {
  listDiv$$.innerHTML = "";
  const filteredPokemons = myPokemons.filter((pokemon) =>
    pokemon.name.includes(name)
  );
  for (let i = 0; i < filteredPokemons.length; i++) {
    const pokemon = filteredPokemons[i];
    drawPokemon(pokemon, listDiv$$);
  }
};

const drawPokemon = async (pokemon, div$$) => {
  let pokemonDiv$$ = document.createElement("div");
  pokemonDiv$$.classList.add("pokemon");
  pokemonDiv$$.innerHTML = `
          <div class="pokemon__element1">
            <img class="pokemon__element1--img" src="${
              pokemon.sprites.other["official-artwork"].front_default
            }">
          </div>
          <div class="pokemon__element2">
            <h2 class="pokemon__element2--h2">${pokemon.name}</h2>
            <h3 class="pokemon__element2--h3">${pokemon.types
              .map((type) => type.type.name)
              .join(", ")}</h3>
            <p class="pokemon__element2--p">Peso: ${pokemon.weight / 10} Kg</p>
            <p class="pokemon__element2--p">Altura: ${pokemon.height / 10} M</p>
          </div>
        `;
  div$$.appendChild(pokemonDiv$$);
};



pokedex();

