// This file overwrites the stock UV config.js
self.__uv$config = {
  prefix: "/uv/service/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  toolbar: {
    script: "/toolbar/assets/index.js",
    style: "/toolbar/assets/index.css",
  },
  sw: "/uv/uv.sw.js",
};
