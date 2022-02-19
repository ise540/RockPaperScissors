function renderLoginScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Камень, ножницы, бумага";

  const content = document.createElement("div");

  window.application.renderBlock("login-input", content);
  window.application.renderBlock("login-button", content);

  app.append(title);
  app.append(content);
}

function renderLobbyScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Лобби";

  const content = document.createElement("div");

  window.application.renderBlock("player-list", content);
  window.application.renderBlock("play-button", content);

  app.append(title);
  app.append(content);
}

function renderWaitingForYourMoveScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Игра";

  const content = document.createElement("div");

  window.application.renderBlock("get-enemy-name", content);
  window.application.renderBlock("move-buttons", content);

  app.append(title);
  app.append(content);
}

function renderWaitingForStartScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Игра";

  const content = document.createElement("div");

  window.application.renderBlock("wait-for-start", content);

  app.append(title);
  app.append(content);
}

function renderWaitingForEnemyMoveScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");

  title.textContent = "Игра";

  const content = document.createElement("div");

  window.application.renderBlock("get-enemy-name", content);
  window.application.renderBlock("wait-for-enemy-move", content);
  

  app.append(title);
  app.append(content);
}

function renderWinScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Вы победили!";

  const content = document.createElement("div");

  window.application.renderBlock("get-enemy-name", content);
  window.application.renderBlock("play-button", content);
  window.application.renderBlock("to-lobby-button", content);

  app.append(title);
  app.append(content);
}

function renderLoseScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Вы проиграли!";

  const content = document.createElement("div");

  window.application.renderBlock("get-enemy-name", content);
  window.application.renderBlock("play-button", content);
  window.application.renderBlock("to-lobby-button", content);

  app.append(title);
  app.append(content);
}

window.application.screens["login"] = renderLoginScreen;
window.application.screens["lobby"] = renderLobbyScreen;
window.application.screens["waiting-for-start"] = renderWaitingForStartScreen;
window.application.screens["waiting-for-your-move"] =
  renderWaitingForYourMoveScreen;
window.application.screens["waiting-for-enemy-move"] =
  renderWaitingForEnemyMoveScreen;
window.application.screens["win"] = renderWinScreen;
window.application.screens["lose"] = renderLoseScreen;
