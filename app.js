const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
const pokeBank = require("./pokeBank");
app.use(express.static('public'))

app.get("/",(req,rest) => {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  rest.send(html);
});

app.get("/pokemon/:id",(req,res) => {
  const pokemon = pokeBank.find(req.params.id);
  const post = pokeBank.find(req.params.id);

  if(!pokemon) {
    res.status(404).send("Pokemon not found"); }
    else {
      res.send(`<!DOCTYPE html>
      <html>
        <head>
          <title>My Pokedex</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div class="pokemon-list">
            <header><img src="public/logo.png" />Pokedex</header>
            ${pokemon
              .map(
                (pokemon) => `
            <div class="pokemon-item">
              <img class="pokemon-img" src=${pokemon.image} />
              <p>
                <span class="pokemon-position">${pokemon.id}. ▲</span>${pokemon.name}
                <small>(Trained by ${pokemon.trainer})</small>
              </p>
              <small class="pokemon-info">
                Type: ${pokemon.type} | Date Caught: ${pokemon.date}
              </small>
            </div>`
              )
              .join("")} 
          </div>
        </body>
      </html>
      `); 
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`serving is listening on port ${PORT}`)
});