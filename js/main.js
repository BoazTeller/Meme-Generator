'use strict'

///////////////////////////////
// Note: need to find a better solution for the canvas functions

function onInit() {
    initCanvas()
    addListeners()
    initKeywordsDataList()
    renderKeywords()
    renderGallery()
}

function addListeners() {
    addMouseListeners()
    addColorPickerListeners()
    // addTouchListeners()
    // addResizeListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
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

    setLineIsDrag(clickedLine, true) 
    setSelectedLineIdx(clickedLine)
    document.body.style.cursor = 'grab'
    renderMeme()
}

function onMove(ev) {
    const { lines, selectedLineIdx } = getMeme()
    const lineClicked = lines[selectedLineIdx]
    if (!lineClicked || !lineClicked.isDrag) return

    const evPos = getEvPos(ev)
    const dx = evPos.x - lineClicked.pos.x
    const dy = evPos.y - lineClicked.pos.y
    
    updateLinePos(dx, dy)
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onUp() {
    const clickedLine = getSelectedLine()
    setLineIsDrag(clickedLine, false)
    document.body.style.cursor = 'auto'
}

function onCanvasSelectLine(ev) {
    const clickedLine = isLineClicked(ev)
    if (!clickedLine) return

    setSelectedLineIdx(clickedLine)
    renderMeme()
}

function triggerFileInput() {
    document.getElementById('file-input').click();
  }