'use strict'

function renderSavedMemes() {
    const memes = getSavedMemes()
    if (!memes) return

    let strHTMLs = ''
    
    memes.forEach(meme => {
        let { lines, selectedImgId } = meme
        if (!getImgById(selectedImgId)) return

        const { url: imgSrc } = getImgById(selectedImgId)
        renderImg(imgSrc)
        renderLines(lines)
    
        const dataUrl = gElCanvas.toDataURL()
        strHTMLs += `
            <img src="${dataUrl}" 
                 onclick="onEditSavedMeme(${selectedImgId})">
        `
    })
    
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.innerHTML = strHTMLs
}