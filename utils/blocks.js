// -------------ЛОГИН ИНПУТ

function renderLoginInput(container) {
  const input = document.createElement("input");
  input.classList.add("login-input");

  const buttonTitle = document.createElement("p");
  buttonTitle.textContent = "Введите имя";

  container.append(buttonTitle);
  container.append(input);
}

//------------ ЛОГИН КНОПКА

function renderLoginButton(container) {
  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.textContent = "Войти";

  loginButton.addEventListener("click", () => {
    let params = { login: document.querySelector(".login-input").value };
    request("login", params, (response) => {
      if (response.status != "ok") {
        const p = document.createElement("p");
        p.textContent = "Введите логин";
        container.append(p);
        setTimeout(() => container.removeChild(p), 1000);
      } else {
        window.application.token = response.token;

        request(
          "player-status",
          { token: window.application.token },
          (response) => {
            if (response["player-status"].status == "game") {
              window.application.game = response["player-status"].game.id;
              request(
                "game-status",
                {
                  token: window.application.token,
                  id: window.application.game,
                },
                (response) => {
                  window.application.renderScreen(
                    response["game-status"].status
                  );
                }
              );
            } else {
              window.application.renderScreen(response["player-status"].status);
            }
          }
        );
      }
    });
  });

  container.append(loginButton);
}

//------------ СПИСОК ИГРОКОВ

function renderPlayerList(container) {
  const playerList = document.createElement("ul");
  playerList.classList.add("player-list");

  const getPlayers = () => {
    request("player-list", { token: window.application.token }, (response) => {
      window.application.players = window.application.players ?? [];

      const isSame =
        window.application.players.length ==
          response.list.map((item) => item.login).length &&
        window.application.players.every(function (element, index) {
          return element === response.list.map((item) => item.login)[index];
        });

      if (isSame == false) {
        window.application.players = response.list.map((item) => item.login);
        playerList.innerHTML = "";

        window.application.players.forEach((player) => {
          const li = document.createElement("li");
          li.textContent = player;
          playerList.append(li);
        });
      }
    });
  };
  getPlayers();

  window.application.timers.push(setInterval(getPlayers, 1000));

  container.append(playerList);
}

//------------ БЛОК ОЖИДАНИЯ ХОДА

function renderWaitForEnemyMove(container) {
  const title = document.createElement("h2");
  title.textContent = "Ожидаем ход соперника...";
  container.append(title);

  const waitForEnemyMove = () => {
    request(
      "game-status",
      { token: window.application.token, id: window.application.game },
      (response) => {
        if (response["game-status"].status !== "waiting-for-enemy-move") {
          window.application.renderScreen(response["game-status"].status);
        }
        else if(response.status !== "ok") {
          console.error(`${response.status} ${response.message}`);
          window.application.renderScreen("login");
        }
      }
    );
  };

  window.application.timers.push(setInterval(waitForEnemyMove, 500));
}

// ------------ БЛОК ОЖИДАНИЯ ПОДКЛЮЧЕНИЯ

function renderWaitForStart(container) {
  const title = document.createElement("h2");
  title.textContent = "Ожидаем подключение соперника...";
  container.append(title);

  const waitForStart = () => {
    request(
      "game-status",
      { token: window.application.token, id: window.application.game },
      (response) => {
        if (response["game-status"].status !== "waiting-for-start") {
          window.application.renderScreen(response["game-status"].status);
        } else if(response.status !== "ok") {
          console.error(`${response.status} ${response.message}`);
          window.application.renderScreen("login");
        }
      }
    );
  };

  window.application.timers.push(setInterval(waitForStart, 500));
}

// ------------ КНОПКА НАЧАЛА ИГРЫ

function renderPlayButton(container) {
  const playButton = document.createElement("button");
  playButton.classList.add("play-button");
  playButton.textContent = "Играть";

  playButton.addEventListener("click", () => {
    request("start", { token: window.application.token }, (response) => {
      if (response["player-status"].status == "game") {
        window.application.game = response["player-status"].game.id;
        request(
          "game-status",
          { token: window.application.token, id: window.application.game },
          (response) => {
            window.application.renderScreen(response["game-status"].status);
          }
        );
      }
      else {
        console.error(`${response.status} ${response.message}`);
        window.application.renderScreen("login");
      }
    });
  });

  container.append(playButton);
}

// ------------- СТРОКА ИМЯ ПРОТИВНИКА

function renderEnemyName(container) {
  const enemyName = document.createElement("p");
  enemyName.classList.add("enemy-name");

  request(
    "game-status",
    { token: window.application.token, id: window.application.game },
    (response) => {
      enemyName.textContent =
        "Вы против " + response["game-status"].enemy.login;
    }
  );

  container.append(enemyName);
}

// ------------ БЛОК КНОПОК ХОДОВ

function renderMovesButtons(container) {
  const moveBlock = document.createElement("div");
  moveBlock.classList.add("move-block");

  window.application.moves.forEach((item) => {
    const moveButton = document.createElement("button");
    moveButton.classList.add("move-button");
    moveButton.textContent = item.translate;

    moveButton.addEventListener("click", () => {
      request(
        "play",
        {
          token: window.application.token,
          move: item.value,
          id: window.application.game,
        },
        (response) => {
          if(response.status !== "error")
          window.application.renderScreen(response["game-status"].status);
          else {
            console.error(`${response.status} ${response.message}`);
            window.application.renderScreen("login");
          }
        }
      );
    });
    moveBlock.append(moveButton);
  });

  container.append(moveBlock);
}

// ------------ БЛОК ВОЗВРАТ В ЛОББИ

function renderToLobbyButton(container) {
  const toLobbyButton = document.createElement("button");
  toLobbyButton.classList.add("to-lobby-button");
  toLobbyButton.textContent = "В лобби";

  toLobbyButton.addEventListener("click", () => {
    window.application.renderScreen("lobby");
  });

  container.append(toLobbyButton);
}

//-------ЛОАДЕР

function renderLoader(container) {
  const loader = document.createElement("div");
  loader.classList.add("loader");

  for (let i = 1; i < 6; i++) {
    let item = document.createElement("div");
    item.classList.add("item", `item-${i}`);
    loader.append(item);
  }
  container.append(loader);
}

window.application.blocks["login-input"] = renderLoginInput;
window.application.blocks["login-button"] = renderLoginButton;
window.application.blocks["player-list"] = renderPlayerList;
window.application.blocks["play-button"] = renderPlayButton;

window.application.blocks["move-buttons"] = renderMovesButtons;
window.application.blocks["to-lobby-button"] = renderToLobbyButton;
window.application.blocks["wait-for-enemy-move"] = renderWaitForEnemyMove;
window.application.blocks["wait-for-start"] = renderWaitForStart;
window.application.blocks["get-enemy-name"] = renderEnemyName;
window.application.blocks["loader"] = renderLoader;
