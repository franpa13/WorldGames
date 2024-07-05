// URL del endpoint de la API
const apiURL = "http://localhost:3000/games/";

// Elementos del DOM donde se mostrarán los juegos
const pcGamesContainer = document.getElementById("pc-games");
const xboxGamesContainer = document.getElementById("xbox-games");
const playstationGamesContainer = document.getElementById("playstation-games");
const nintendoGamesContainer = document.getElementById("nintendo-games");

// Función para crear elementos de juego
function createGameElement(game) {
  const gameElement = document.createElement("div");
  gameElement.className = "game";
  gameElement.style.display = "flex";
  gameElement.style.flexDirection = "column";
  gameElement.style.gap = "8px";

  const gameLink = document.createElement("a");
  gameLink.href = game.href;
  gameLink.target = "_blank";
  gameLink.title = game.titulo;

  // Crear imagen
  const gameImg = document.createElement("img");
  console.log(game.image_blob, "imageeeeee");
  const imageUrl = game.image;
  gameImg.src = imageUrl;
  gameImg.alt = `Juego ${game.consola}`;
  gameImg.className = "game-image";

  gameLink.appendChild(gameImg);
  gameElement.appendChild(gameLink);

  const gameTitle = document.createElement("h2");
  gameTitle.innerText = game.titulo;
  gameElement.appendChild(gameTitle);
  gameTitle.style.color = "white";
  gameTitle.style.fontSize = "15px";

  const gameButtonDelete = document.createElement("button");
  gameButtonDelete.innerText = "Eliminar";
  gameButtonDelete.style.backgroundColor = "white";
  gameButtonDelete.style.color = "black";
  gameButtonDelete.style.border = "none";
  gameButtonDelete.style.padding = "8px";

  gameElement.appendChild(gameButtonDelete);

  gameButtonDelete.addEventListener("click", async () => {
    try {
      const response = await fetch(`${apiURL}${game.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      gameElement.remove();
    } catch (e) {
      log(e);
    }
  });
  return gameElement;
}

async function fetchGames() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Network response was not ok");

    const games = await response.json();
    console.log(games);

    pcGamesContainer.innerHTML = "";
    xboxGamesContainer.innerHTML = "";
    playstationGamesContainer.innerHTML = "";
    nintendoGamesContainer.innerHTML = "";

    games.forEach((game) => {
      const gameElement = createGameElement(game);
      switch (game.consola) {
        case "PC":
          pcGamesContainer.appendChild(gameElement);
          break;
        case "XBOX":
          xboxGamesContainer.appendChild(gameElement);
          break;
        case "PLAYSTATION":
          playstationGamesContainer.appendChild(gameElement);
          break;
        case "NINTENDO":
          nintendoGamesContainer.appendChild(gameElement);
          break;
        default:
          console.error(`Plataforma desconocida: ${game.consola}`);
      }
    });
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
  }
}

fetchGames();

document.getElementById("submitForm").addEventListener("click", function () {
  let form = document.getElementById("gameForm");
  let formData = new FormData(form);

  fetch("http://localhost:3000/games", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
