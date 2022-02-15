let token; 
let gameId;
//--------------------------BLOCKS

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
        token = response.token;
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
  request("player-list", {token,}, (json) => {
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
    request("start", { token: token }, (response) => {
      if (response["player-status"].status == "game") {
          console.log(response["player-status"].game.id)
        gameId = response["player-status"].game.id;
        window.application.renderScreen("game");
      }
    });
  });

  container.appendChild(playButton);
}

function renderRockButton(container) {
  const rockButton = document.createElement("button");
  rockButton.textContent = "Камень";

  rockButton.addEventListener("click", () => {
    request("play", { token, move: "rock", id: gameId }, (response) => {
      console.log(response);
    });
  });

  container.appendChild(rockButton);
}

function renderPaperButton(container) {
  const paperButton = document.createElement("button");
  paperButton.textContent = "Бумага";

  paperButton.addEventListener("click", () => {
    request("play", { token: token, move: "paper", id: gameId }, (response) => {
      console.log(response);
    });
  });

  container.appendChild(paperButton);
}

function renderScissorsButton(container) {
  const scissorsButton = document.createElement("button");
  scissorsButton.textContent = "Ножницы";

  scissorsButton.addEventListener("click", () => {
    request("play", { token, move: "scissors", id: gameId }, (response) => {
      console.log(response);
    });
  });

  container.appendChild(scissorsButton);
}

window.application.blocks["login-input"] = renderLoginInput;
window.application.blocks["login-button"] = renderLoginButton;
window.application.blocks["player-list"] = renderPlayerList;
window.application.blocks["play-button"] = renderPlayButton;

window.application.blocks["rock-button"] = renderRockButton;
window.application.blocks["paper-button"] = renderPaperButton;
window.application.blocks["scissors-button"] = renderScissorsButton;