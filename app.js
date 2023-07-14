const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/",(req,rest) => {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  rest.send(html);
});

const PORT = 3000;
app.listen(Port, () => {
  console.log(`serving is listening on port ${PORT}`)
});