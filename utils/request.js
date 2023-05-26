function request(url, params, callback) {
    let paramsString = Object.keys(params)
      .map((item) => item + "=" + params[item])
      .join("&");
  
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://rps-zonest64.b4a.run/${url}?${paramsString}`
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
