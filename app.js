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

//BLOCKS

function renderLoginInput(container) {
  const input = document.createElement("input");
  input.classList.add("login-input");

  const buttonTitle = document.createElement("p");
  buttonTitle.textContent = "Никнейм";

  input.addEventListener("click", () => {
    console.log("click");
  });

  container.appendChild(buttonTitle);
  container.appendChild(input);
}

function renderLoginButton(container) {
  const loginButton = document.createElement("button");
  loginButton.textContent = "Логин";

  loginButton.addEventListener("click", () => {
    let params = {login:document.querySelector(".login-input").value};
    request("login", params, (response)=>{
        if(response.status=="ok") console.log(response.token);
        else {
            const p = document.createElement("p");
            p.textContent="Введите логин";
            container.appendChild(p);
            setTimeout(()=>container.removeChild(p),1000);
        }
        
    })
  });

  container.appendChild(loginButton);
}

window.application.blocks["login-input"] = renderLoginInput;
window.application.blocks["login-button"] = renderLoginButton;

//SCREENS

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

window.application.screens["login"] = renderLoginScreen;

window.application.renderScreen("login");

console.log(window.application);


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

