function init() {
    const searchEngine = document.getElementById("uv-search-engine");
    const iframe = document.querySelector('.uv-iframe')
    const address = location.pathname.replace(__uv$config.mainPrefix, '')
    const url = search(address, searchEngine.value);
    const iframeSrc = __uv$config.prefix + url;
    iframe.src = iframeSrc
}

init()