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
      if (response.status == "ok") {
        //localStorage.setItem("token", response.token); - Вялая попытка в сохранение токена, подлежит доработке и обсуждению
        window.token = response.token;
        window.application.renderScreen("lobby");
      } else {
        const p = document.createElement("p");
        p.textContent = "Введите логин";
        container.appendChild(p);
        setTimeout(() => container.removeChild(p), 1000);
      }
    });
  });

  container.appendChild(loginButton);
}

function renderPlayerList(container) {
  const playerList = document.createElement("ul");
  request("player-list", { token:window.token }, (json) => {
    json.list.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.login;
      playerList.appendChild(li);
    });
  });
  container.appendChild(playerList);
}

function renderPlayButton(container) {
  const playButton = document.createElement("button");
  playButton.textContent = "Играть";

  playButton.addEventListener("click", () => {
    request("start", { token: window.token }, (response) => {
      if (response["player-status"].status == "game") {
        window.game = response["player-status"].game.id;
        request("game-status", {token: window.token, id: window.game}, (response)=>{
          console.log(response["game-status"].status)
          window.application.renderScreen(response["game-status"].status);
        } )
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
        { token: window.token, move: item.value, id: window.game },
        (response) => {
          window.application.renderScreen(response["game-status"].status);
        }
      );
    });

    container.appendChild(moveButton);
  });
}


window.application.blocks["login-input"] = renderLoginInput;
window.application.blocks["login-button"] = renderLoginButton;
window.application.blocks["player-list"] = renderPlayerList;
window.application.blocks["play-button"] = renderPlayButton;

window.application.blocks["move-buttons"] = renderMovesButtons;

