"use strict";
/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/uv/sw.js";

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  let updated = false;
  let activated = false;

  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  // Ultraviolet has a stock `sw.js` script.
  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  }).then(regitration => {
    regitration.addEventListener("updatefound", () => {
      const worker = regitration.installing;
      worker.addEventListener('statechange', () => {
        console.log({ state: worker.state });
        if (worker.state === "activated") {
          // Here is when the activated state was triggered from the lifecycle of the service worker.
          // This will trigger on the first install and any updates.
          activated = true;
          checkUpdate();
        }
      });
    });
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This will be triggered when the service worker is replaced with a new one.
    // We do not just reload the page right away, we want to make sure we are fully activated using the checkUpdate function.
    console.log({ state: "updated" });
    updated = true;
    checkUpdate();
  });

  function checkUpdate() {
    if (activated && updated) {
      console.log("Application was updated refreshing the page...");
      window.location.reload();
    }
  }
}
