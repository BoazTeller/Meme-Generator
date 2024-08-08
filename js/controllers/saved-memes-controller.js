'use strict'

function renderSavedMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    const elSavedH2 = document.querySelector('.no-saved-msg')

    const savedMemes = getSavedMemes()
    if (!savedMemes || !savedMemes.length) {
        elSavedMemes.style.display = 'none'
        elSavedH2.classList.remove('hidden')
        return
    }

    let strHTMLs = ''
    savedMemes.forEach(meme => {
        strHTMLs += `
            <div class="saved-meme-container">
                <img src="${meme.dataURL}" class="saved-meme-image" onclick="onEditSavedMeme('${meme.id}')">
                
                <div class="meme-controls flex">
                    <button class="edit-saved-btn fa pencil" 
                            onclick="onEditSavedMeme('${meme.id}')">
                    </button>

                    <button class="download-saved-btn fa circle-down" 
                            onclick="triggerOnDownloadSavedMeme()">
                    </button>
                    <a href="#" class="hidden"
                                id="downloads-saved-link" 
                                onclick="onDownloadSavedMeme(this, '${meme.id}')" 
                                download="my-meme.jpg">
                    </a>
         
                    <button class="delete-saved-btn fa trash-can" 
                            onclick="onDeleteSavedMeme('${meme.id}')">
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