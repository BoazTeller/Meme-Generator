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
///////////////////////////////////////////////////

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

function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onAddLine() {
    const canvasHeight = getCanvasDimension('height')
    addLine(canvasHeight)
    clearTextInput()
    renderLines()
}

function onSwitchLine() {
    switchLine()
    clearTextInput()
    updateTextInput()
}

function onDeleteLine() {
    if (!getSelectedLine()) return

    deleteLine()
    clearTextInput()
    updateTextInput()
    renderMeme()
}

function onUpdateFontSize(action) {
    const line = getSelectedLine()
    if (!line) return

    if (action === 'increase') {
        increaseFontSize()
    } else if (action === 'decrease') {
        decreaseFontSize()
    } 

    renderMeme();
}

function clearTextInput() {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = ''
    // elTextInput.focus()
}

function updateTextInput() {
    let txt
    const line = getSelectedLine()
    if (!line) txt = ''
    else txt = line.txt
    
    const elTextInput = document.querySelector('.text-input')
    const placeholderText = elTextInput.placeholder

    if (txt === placeholderText) {
        elTextInput.value = ''
    } else {
        elTextInput.value = txt
    }
}

function onSetTextAlignment(alignment) {
    const line = getSelectedLine()
    if (!line) return

    const canvasWidth = getCanvasDimension('width')
    const textWidth = gCtx.measureText(line.txt).width
    setTextAlignment(alignment, textWidth, canvasWidth)

    renderMeme()
}

//////////////////////////////////////////////

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function getCanvasDimension(dimension) {
        if (dimension === 'width') {
            return gElCanvas.width
        } else if (dimension === 'height') {
            return gElCanvas.height
        } 
}

