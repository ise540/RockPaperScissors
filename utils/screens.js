function renderLoginScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Камень, ножницы, бумага";

  const content = document.createElement("div");

  window.application.renderBlock("login-input", content);
  window.application.renderBlock("login-button", content);

  app.appendChild(title);
  app.appendChild(content);
}

function renderLobbyScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Лобби";

  const content = document.createElement("div");

  window.application.renderBlock("player-list", content);
  window.application.renderBlock("play-button", content);

  app.appendChild(title);
  app.appendChild(content);
}

function renderWaitingForYourMoveScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Игра";

  const content = document.createElement("div");

  window.application.renderBlock("move-buttons", content);

  app.appendChild(title);
  app.appendChild(content);
}

function renderWaitingForStartScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Ожидаем подключения соперника...";

  // const content = document.createElement("div");

  // window.application.renderBlock("move-buttons", content);

  window.application.timers.push(
    setInterval(
      () =>
        request(
          "game-status",
          { token: window.application.token, id: window.application.game },
          (response) => {
            if (response["game-status"].status == "waiting-for-your-move") window.application.renderScreen(response["game-status"].status);
             // window.application.screens[response["game-status"].status];
          }
        ),
      1000
    )
  );

  app.appendChild(title);
  //app.appendChild(content);
}

function renderWaitingForEnemyMoveScreen () {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Ожидаем ход соперника...";

  // const content = document.createElement("div");

  // window.application.renderBlock("move-buttons", content);

  window.application.timers.push(
    setInterval(
      () =>
        request(
          "game-status",
          { token: window.application.token, id: window.application.game },
          (response) => {
            //if (response["game-status"].status == "waiting-for-enemy-move")
            window.application.renderScreen(response["game-status"].status);
          }
        ),
      500
    )
  );

  app.appendChild(title);
  //app.appendChild(content);
}

function renderWinScreen () {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Победа";

  const content = document.createElement("div");

  window.application.renderBlock("play-button", content);
  window.application.renderBlock("to-lobby-button", content);


  app.appendChild(title);
  app.appendChild(content);
}

function renderLoseScreen () {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Поражение";

  const content = document.createElement("div");

  window.application.renderBlock("play-button", content);
  window.application.renderBlock("to-lobby-button", content);

  app.appendChild(title);
  app.appendChild(content);
}

window.application.screens["login"] = renderLoginScreen;
window.application.screens["lobby"] = renderLobbyScreen;
window.application.screens["waiting-for-start"] = renderWaitingForStartScreen;
window.application.screens["waiting-for-your-move"] = renderWaitingForYourMoveScreen;
window.application.screens["waiting-for-enemy-move"] = renderWaitingForEnemyMoveScreen;
window.application.screens["win"] = renderWinScreen;
window.application.screens["lose"] = renderLoseScreen;

