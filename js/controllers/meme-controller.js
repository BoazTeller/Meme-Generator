'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gDragOffset = null

function renderMeme() {
    const { selectedImgId: imgId, lines } = getMeme()
    const { url: imgSrc } = getImdById(imgId)
    renderImg(imgSrc)
    renderLines(lines)
}

function renderImg(imgSrc) {
    const elImg = new Image()
    elImg.src = imgSrc

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

///////////////////////////////////////////////////

function renderLines() {
    const meme = getMeme()
    if (!meme) return
   
    const { lines, selectedLineIdx } = meme

    lines.forEach((line, idx) => {
        const { txt, font, strokeStyle, fillStyle, size, pos } = line
        
        gCtx.strokeStyle = strokeStyle
        gCtx.fillStyle = fillStyle
        gCtx.font = `${size}px ${font}`
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'center'
        gCtx.fillText(txt, pos.x, pos.y)
        gCtx.strokeText(txt, pos.x, pos.y)

        if (idx === selectedLineIdx) {
            renderLineFrame(txt, size, pos)
        }
    })
}

function renderLineFrame(txt, size, pos) {
    const framePaddingX = 5
    const framePaddingY = 3
    
    const lineWidth = gCtx.measureText(txt).width
    const lineHeight = size
    const frameWidth = lineWidth + framePaddingX * 2
    const frameHeight = lineHeight + framePaddingY * 2
    
    gCtx.save()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1.5
    gCtx.setLineDash([12, 12])

    gCtx.strokeRect(
        pos.x - lineWidth / 2 - framePaddingX,
        pos.y - lineHeight / 2 - framePaddingY,
        frameWidth,
        frameHeight
    )

    gCtx.restore()
}

function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onAddLine(txt) {
    const canvasHeight = getCanvasDimension('height')
    addLine(txt, canvasHeight)
    clearTextInput()
    renderMeme()
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

function onSetStrokeStyle(color) {
    setStrokeStyle(color)
    renderMeme()
}

function onSetFillStyle(color) {
    setFillStyle(color)
    renderMeme()
}

function onSetFontFamily(font) {
    setFontFamily(font)
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}

function onDownloadMeme(elLink) {
    clearSelectedLine()
    renderMeme()

    const dataURL = gElCanvas.toDataURL()
    elLink.href = dataURL
}

function onShareOnFacebook() {
    clearSelectedLine()
    
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getCanvasCenter() {
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}