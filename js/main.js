'use strict'

///////////////////////////////
// Note: need to find a better solution for the canvas functions

function onInit() {
    initCanvas()
    addListeners() 
    renderGallery()
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

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// function addResizeListeners() {
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }

// function onMouseMove(ev) {
// 	const { offsetX, offsetY, clientX, clientY } = ev

//     const { lines } = getMeme()

//     const hoveredLine = lines.find(line => {
//         const { x, y, rate } = line
//         return offsetX >= x && offsetX <= x + BAR_WIDTH &&
//                 offsetY >= y && offsetY <= y + rate
//     })


// }

function onCanvasSelectLine(ev) {
    const clickedLine = isLineClicked(ev)
    if (!clickedLine) return

    setSelectedLineIdx(clickedLine)
    renderMeme()
}

function onDown(ev) {
    const evPos = getEvPos(ev)
    const clickedLine = isLineClicked(evPos)
    if (!clickedLine) return

    setLineIsDrag(clickedLine, true) 
    setSelectedLineIdx(clickedLine)
    document.body.style.cursor = 'grab'
    renderMeme()
}

function isLineClicked(evPos) {
    const { lines } = getMeme()

    return lines.find(({ pos, txt, size: lineHeight }) => {
        const lineWidth = gCtx.measureText(txt).width
        return evPos.x >= pos.x - lineWidth / 2 &&
               evPos.x <= pos.x + lineWidth / 2 &&
               evPos.y >= pos.y - lineHeight / 2 &&
               evPos.y <= pos.y + lineHeight / 2
    })
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




