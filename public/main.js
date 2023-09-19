function init() {
    const searchEngine = document.getElementById("uv-search-engine");
    const iframe = document.querySelector('.uv-iframe')
    const address = __uv$config.decodeUrl(location.pathname.replace(__uv$config.mainPrefix, ''))
    const url = search(address, searchEngine.value);
    const iframeSrc = __uv$config.prefix + __uv$config.encodeUrl(url);
    iframe.src = iframeSrc
}

init()