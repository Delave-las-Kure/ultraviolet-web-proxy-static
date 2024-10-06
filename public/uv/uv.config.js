// This file overwrites the stock UV config.js
self.__uv$config = {
  prefix: "/uv/service/",
  mainPrefix: "/uvl/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
  /*env*/
  /*metrics*/
};

if (navigator && navigator.serviceWorker) {

  (async function () {
    let refreshing = false;

    const swr = navigator.serviceWorker
    // detect controller change and refresh the page
    swr.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload()
        refreshing = true
      }
    })

    const registration = await navigator.serviceWorker.getRegistration();
    // (it is also returned from navigator.serviceWorker.register() function)

    if (registration) { // if there is a SW active
      registration.addEventListener('updatefound', () => {
        if (registration.installing) {
          // wait until the new Service worker is actually installed (ready to take over)
          registration.installing.addEventListener('statechange', () => {
            if (registration.waiting) {
              // if there's an existing controller (previous Service Worker)
              if (swr) {
                registration.waiting.postMessage('SKIP_WAITING')
              } else {
                // otherwise it's the first install, nothing to do
                console.log('Service Worker initialized for the first time')
              }
            }
          })
        }
      })
    }

  })()
  // get the ServiceWorkerRegistration instance

}
