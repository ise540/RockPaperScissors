function renderLoginInput(container) {
  const input = document.createElement("input");
  input.classList.add("login-input");

  const buttonTitle = document.createElement("p");
  buttonTitle.textContent = "Никнейм";

  container.appendChild(buttonTitle);
  container.appendChild(input);
}

function renderLoginButton(container) {
  const loginButton = document.createElement("button");
  loginButton.textContent = "Логин";

  loginButton.addEventListener("click", () => {
    let params = { login: document.querySelector(".login-input").value };
    request("login", params, (response) => {
      if (response.status != "ok") {
        const p = document.createElement("p");
        p.textContent = "Введите логин";
        container.appendChild(p);
        setTimeout(() => container.removeChild(p), 1000);
      } else {
        window.application.token = response.token;

        request("player-status", { token: window.application.token }, (response) => {
          if (response["player-status"].status == "game") {
            window.application.game = response["player-status"].game.id;
            request(
              "game-status",
              { token: window.application.token, id: window.application.game },
              (response) => {
                window.application.renderScreen(response["game-status"].status);
              }
            );
          } else {
            window.application.renderScreen(response["player-status"].status);
          }
        });
      }
    });
  });

  container.appendChild(loginButton);
}

function renderPlayerList(container) {
  const playerList = document.createElement("ul");

  window.application.timers.push(
    setInterval(() => {
      playerList.innerHTML = "";
      request("player-list", { token: window.application.token }, (response) => {
        response.list.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.login;
          playerList.appendChild(li);
        });
      });
    }, 1000)
  );

  container.appendChild(playerList);
}

function renderPlayButton(container) {
  const playButton = document.createElement("button");
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
    });
  });

  container.appendChild(playButton);
}

function renderMovesButtons(container) {
  window.application.moves.forEach((item) => {
    const moveButton = document.createElement("button");
    moveButton.textContent = item.translate;

    moveButton.addEventListener("click", () => {
      request(
        "play",
        { token: window.application.token, move: item.value, id: window.application.game },
        (response) => {
          window.application.renderScreen(response["game-status"].status);
        }
      );
    });

    container.appendChild(moveButton);
  });
}

function renderToLobbyButton(container) {
  const toLobbyButton = document.createElement("button");
  toLobbyButton.textContent = "В лобби";

  toLobbyButton.addEventListener("click", () => {
    window.application.renderScreen("lobby");
    console.log("event");
  });

  container.appendChild(toLobbyButton);
}

window.application.blocks["login-input"] = renderLoginInput;
window.application.blocks["login-button"] = renderLoginButton;
window.application.blocks["player-list"] = renderPlayerList;
window.application.blocks["play-button"] = renderPlayButton;

window.application.blocks["move-buttons"] = renderMovesButtons;
window.application.blocks["to-lobby-button"] = renderToLobbyButton;
