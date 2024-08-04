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

function onImgSelect(imgId) {    
    createMeme(imgId)  

    hideGallery()
    clearAllActiveHeaderNavs()
    showEditor()

    renderMeme()
}

function onShowGallery(elLink) {
    hideEditor()
    showGallery()
}

function hideGallery() {
    const elGallery = document.querySelector('.meme-gallery-container')
    elGallery.classList.add('hidden')
}

function showGallery() {
    const elGallery = document.querySelector('.meme-gallery-container')
    elGallery.classList.remove('hidden')
}

function hideEditor() {
    const elEditor = document.querySelector('.meme-editor-container')
    elEditor.classList.add('hidden')
}

function showEditor() {
    const elEditor = document.querySelector('.meme-editor-container')
    elEditor.classList.remove('hidden')
}

function onUpdateActiveNav(elLink) {
    if (elLink.classList.contains('active')) return

    clearAllActiveHeaderNavs()
    elLink.classList.add('active')
}

function clearAllActiveHeaderNavs() {
    const navLinks = document.querySelectorAll('.main-nav a')
    navLinks.forEach(link => link.classList.remove('active'))
}

function onDisplayRandomMeme() {
    const { id: rndImgId } = getRandomImg()
    onImgSelect(rndImgId)
}

























