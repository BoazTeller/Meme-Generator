'use strict'

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    if (!savedMemes || !savedMemes.length) {
        return
    }

    let strHTMLs = ''
    savedMemes.forEach(meme => {
        strHTMLs += `
            <div class="saved-meme-container">
                <img src="${meme.dataURL}" class="saved-meme-image" onclick="onEditSavedMeme('${meme.id}')">
                
                <div class="meme-controls">
                    <a href="#" class="fa-solid fa-download" 
                                onclick="onDownloadSavedMeme(this, '${meme.id}')" 
                                download="my-meme.jpg">
                    </a>
         
                    <button class="fa-solid fa-trash" 
                            onclick="onDeleteSavedMeme('${meme.id}')">
                    </button>
                </div>
            </div>`
    })

    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.style.display = 'grid'
    elSavedMemes.innerHTML = strHTMLs
}

function onEditSavedMeme(memeId) {
    hideSaved()
    clearAllActiveHeaderNavs()
    
    editSavedMeme(memeId)
    showEditor()
    renderMeme()
}

function onDeleteSavedMeme(memeId) {
    deleteSavedMeme(memeId)
    renderSavedMemes()
}

function onDownloadSavedMeme(elLink, memeId) {
    const savedMeme = getSavedMemeById(memeId)
    if (!savedMeme) return

    const dataURL = savedMeme.dataURL
    elLink.href =  dataURL
}

// function renderSavedMemes() {
//     const savedMemes = getSavedMemes()
//     if (!savedMemes || !savedMemes.length) return

//     let strHTMLs = ''
    
//     memes.forEach(meme => {
//         let { lines, selectedImgId } = meme
//         if (!getImgById(selectedImgId)) return

//         const { url: imgSrc } = getImgById(selectedImgId)
//         renderImg(imgSrc)
//         renderLines(lines)
    
//         const dataUrl = gElCanvas.toDataURL()
//         strHTMLs += `
//             <img src="${dataUrl}" 
//                  onclick="onEditSavedMeme(${selectedImgId})">
//         `
//     })
    
//     const elSavedMemes = document.querySelector('.saved-memes')
//     elSavedMemes.innerHTML = strHTMLs
// }