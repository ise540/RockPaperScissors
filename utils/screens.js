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
  
    window.application.renderBlock("move-buttons", content);
  
    app.appendChild(title);
    app.appendChild(content);
  }
  
  window.application.screens["login"] = renderLoginScreen;
  window.application.screens["lobby"] = renderLobbyScreen;
  window.application.screens["game"] = renderGameScreen;

