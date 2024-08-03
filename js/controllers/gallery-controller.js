'use strict'

function renderGallery() {
    const imgs = getImgs()
    const shuffledImgs = shuffleItems(imgs)
    const strHTMLs = shuffledImgs.map(
        ({ id, url }) => 
            `<img id="${id}" onclick="onImgSelect(${id})" src="${url}">`
    ).join('')

    const elGallery = document.querySelector('.meme-gallery')
    elGallery.innerHTML = strHTMLs
}

function onUpdateActiveNav(elLink) {
    if (elLink.classList.contains('active')) return

    const navLinks = document.querySelectorAll('.main-nav a')
    navLinks.forEach(link => link.classList.remove('active'))
    elLink.classList.add('active')
}































