window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    window.application.screens[screenName]();
  },
  renderBlock: function (blockName, container) {
    window.application.blocks[blockName](container);
  },
  timers: [],
};

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

//--------------------------SCREENS

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

function renderGameScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.textContent = "Игра";

  const content = document.createElement("div");

  window.application.renderBlock("rock-button", content);
  window.application.renderBlock("scissors-button", content);
  window.application.renderBlock("paper-button", content);

  app.appendChild(title);
  app.appendChild(content);
}

window.application.screens["login"] = renderLoginScreen;
window.application.screens["lobby"] = renderLobbyScreen;
window.application.screens["game"] = renderGameScreen;

//REQUEST

function request(url, params, callback) {
  let paramsString = Object.keys(params)
    .map((item) => item + "=" + params[item])
    .join("&");

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://morning-beyond-90272.herokuapp.com/${url}?${paramsString}`
  );
  xhr.send();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.warn(xhr.status + ": " + xhr.statusText);
    } else {
      const response = JSON.parse(xhr.responseText);
      callback(response);
    }
  });
}

//----------TEST AREA

console.log(application);

// ЕЩЕ КУСОК ВЫПИЛЕННОГО ТОКЕНА 

// request("player-status", { token }, (response) => {
//   if (response.status == "error") window.application.renderScreen("login");
//   else window.application.renderScreen(response["player-status"].status);
// });

window.application.renderScreen("login")