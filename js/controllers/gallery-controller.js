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
    hideSaved()
    showGallery()
    hideSaved()
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

function hideSaved() {
    const elSaved = document.querySelector('.saved-memes-section')
    elSaved.classList.add('hidden')
}

function showSaved() {
    const elSaved = document.querySelector('.saved-memes-section')
    elSaved.classList.remove('hidden')
    // elSaved.classList.remove('hidden')
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

// onFilterByKeyword(this.value)

// function onFilterByKeyword(keyword) {
 
// }

function onSearchByKeyword(keyword) {
    updateMemeSearch(keyword)
    setFilter(keyword)
    renderKeywords()
    renderGallery()
}

function updateMemeSearch(keyword) {
    const elMemeSearch = document.querySelector('.meme-search-input')
    elMemeSearch.value = keyword
}

function onSetFilter(keyword) {
    setFilter(keyword)
    renderGallery()
}

function renderKeywords() {
    const keywords = getKeywords()
    // get the first 6 keywords
    const slicedKeywords = Object.fromEntries(
        Object.entries(keywords)
            .slice(0, 6)
    )
    const minKeywordSize = 6

    let strHTMLs = ''
    for (const keyword in slicedKeywords) {
        let keywordSize = slicedKeywords[keyword]
        // if (keywordSize < minKeywordSize) keywordSize = minKeywordSize

        strHTMLs += `
            <li class="keyword" 
                style="font-size: ${keywordSize}px" 
                onclick=onSearchByKeyword('${keyword}')>
                ${keyword}
            </li>
        `
    }

    const elKeywordsList = document.querySelector('.keywords-search-list')
    elKeywordsList.innerHTML = strHTMLs
}

function initKeywordsDataList() {
    const keywords = getKeywords()
    const slicedKeywords = Object.entries(keywords).slice(0, 6)

    let strHTMLs = ''
    for (const [keyword] of slicedKeywords) {
        const capitalizedKeyword = capitalizeFirstLetter(keyword)
        strHTMLs += `<option value="${capitalizedKeyword}"></option>`
    }

    const keywordsDataList = document.getElementById('meme-keywords')
    keywordsDataList.innerHTML = strHTMLs
}

function onClearSearch() {
    onSetFilter('')
    updateMemeSearch('')
    renderGallery()
}

///////////////////////////////////////
// Upload image from local

function onImgInput(event) {
    loadImageFromFileInput(event, addFileToImgs)
}

function loadImageFromFileInput(event, addFileToImgs) {
    const fileReader = new FileReader()
    
    fileReader.onload = function (fileLoadEvent) {
        const imageElement = new Image()
        imageElement.src = fileLoadEvent.target.result
        imageElement.onload = () => addFileToImgs(imageElement.src)
    }
    
    const selectedFile = event.target.files[0]
    fileReader.readAsDataURL(selectedFile)
}

function addFileToImgs(imgSrc) {
    addImg(imgSrc)
    renderGallery()
}

function onDisplaySaved() {
    hideGallery()
    hideEditor()
    showSaved()
    renderSavedMemes()
}









