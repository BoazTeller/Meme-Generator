'use strict'

///////////////////////////////
// Note: need to find a better solution for the canvas functions

function onInit() {
    initCanvas()
    addListeners()
    initKeywordsDataList()
    renderKeywords()
    initWebShareAPI()
    renderGallery()
}

function addListeners() {
    addMouseListeners()
    addColorPickerListeners()
    addTouchListeners()
    // addResizeListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

// Function to trigger color input click on button click
function addColorPickerListeners() {
    const colorInputs = document.querySelectorAll('button input[type=color]') 

    colorInputs.forEach(input => {
        const btn = input.parentElement
        btn.addEventListener('click', () => {
            input.click()
        })
    })
}

/////////////////////////////////////////

function onDown(ev) {
    const evPos = getEvPos(ev)
    const clickedLine = isLineClicked(evPos)
    if (!clickedLine) return

    gDragOffset = {
        x: evPos.x - clickedLine.pos.x,
        y: evPos.y - clickedLine.pos.y
    }

    setLineIsDrag(clickedLine, true)
    setSelectedLineIdx(clickedLine)
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const { lines, selectedLineIdx } = getMeme()
    const line = lines[selectedLineIdx]
    if (!line || !line.isDrag) return

    const evPos = getEvPos(ev)
    line.pos.x = evPos.x - gDragOffset.x
    line.pos.y = evPos.y - gDragOffset.y

    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onUp() {
    const clickedLine = getSelectedLine()
    if (clickedLine && clickedLine.isDrag) {
        setLineIsDrag(clickedLine, false)
    }

    // reset offset
    gDragOffset = null 
    document.body.style.cursor = 'auto'
}

function onCanvasSelectLine(ev) {
    const clickedLine = isLineClicked(ev)
    if (!clickedLine) return

    setSelectedLineIdx(clickedLine)
    renderMeme()
}

function triggerFileInput() {
    document.getElementById('file-input').click()
}