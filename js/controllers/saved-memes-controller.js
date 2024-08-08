'use strict'

function renderSavedMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')

    const savedMemes = getSavedMemes()
    if (!savedMemes || !savedMemes.length) {
        elSavedMemes.style.display = 'none'
        return
    }

    let strHTMLs = ''
    savedMemes.forEach(meme => {
        strHTMLs += `
            <div class="saved-meme-container">
                <img src="${meme.dataURL}" class="saved-meme-image" onclick="onEditSavedMeme('${meme.id}')">
                
                <div class="meme-controls flex">
                    <button class="download-saved-btn fa-solid fa-download" 
                            onclick="triggerOnDownloadSavedMeme()">
                            Download
                    </button>
                    <a href="#" class="hidden"
                                id="downloads-saved-link" 
                                onclick="onDownloadSavedMeme(this, '${meme.id}')" 
                                download="my-meme.jpg">
                    </a>
         
                    <button class="delete-saved-btn fa-solid fa-trash" 
                            onclick="onDeleteSavedMeme('${meme.id}')">
                            Delete
                    </button>
                </div>
            </div>`
    })

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