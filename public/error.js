"use strict";
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const registerButton = document.getElementById("uv-register-sw");


registerButton.addEventListener("click", async () => {
  try {
    await registerSW();
    location.reload();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    registerButton.classList.remove("show");
  }
});

async function init() {
  if (location.pathname.startsWith(__uv$config.prefix))
    try {
      await registerSW();
      location.reload();
    } catch (error) {
      error.textContent = "Error: The service worker is not registered.";
      registerButton.classList.add("show");
      showErrorPage()
    }
  else {
    showError()
  }
}

function showErrorPage() {
  document.body.classList.remove("nonvisible");
  document.title = '404 Error'
}

init()