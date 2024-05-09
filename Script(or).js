function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.style.left = menu.style.left === '0px' ? `-${menu.offsetWidth}px` : '0px';
}

function openWindow(section) {
    console.log(`Opening ${section}`);
    // Here, implement more functional code based on the section.
}

function showInfo(series) {
    const infoBar = document.querySelector(`.info-bar[data-series="${series}"]`);
    infoBar.style.display = 'block';
}

function hideInfo(series) {
    const infoBar = document.querySelector(`.info-bar[data-series="${series}"]`);
    infoBar.style.display = 'none';
}
