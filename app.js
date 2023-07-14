const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(morgan("dev"));
const pokeBank = require("./pokeBank");

app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  res.send(html);
});

app.get("/pokemon/:id", (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  } else {
    let html = `<!DOCTYPE html>
    <html>
      <head>
        <title>My Pokedex</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="pokemon-list">
          <header><img src="/logo.png" />Pokedex</header>
          ${pokemon
            .map(
              (pokemon) => `
          <div class="pokemon-item">
            <p>
              <span class="pokemon-position">${pokemon.id}. ▲</span>${pokemon.name}
              <small>(Trained by ${pokemon.trainer})</small>
            </p>
            <small class="pokemon-info">
              Type: ${pokemon.type} | Date Caught: ${pokemon.date}
            </small>
          </div>
          `
            )
            .join("")}
        </div>
      </body>
    </html>
    `;
    res.send(html);
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});