'use strict'

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function renderMeme() {
    const { selectedImgId: imgId } = getMeme()
    const { url: imgSrc } = getImdById(imgId)
    renderImg(imgSrc)
    renderLines()
}

function renderImg(imgSrc) {
    const elImg = new Image()
    elImg.src = imgSrc

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderLines() {
    const { lines } = getMeme()

    lines.forEach(line => {
        const { txt, font, colorStroke, colorFill, size, pos } = line
        
        gCtx.strokeStyle = colorStroke
        gCtx.fillStyle = colorFill
        gCtx.font = `${size}px ${font}`
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'center'
        gCtx.fillText(txt, pos.x, pos.y)
        gCtx.strokeText(txt, pos.x, pos.y)
    })
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onTextInput(txt) {
    console.log('text')
    setLineTxt(txt)
    renderMeme()
}