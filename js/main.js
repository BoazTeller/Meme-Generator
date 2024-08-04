'use strict'

///////////////////////////////
// Note: need to find a better solution for the canvas functions

function onInit() {
    // resizeCanvas()
    initCanvas()
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

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     addResizeListeners()
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onStartDraw)
//     gElCanvas.addEventListener('mousemove', onDraw)
//     gElCanvas.addEventListener('mouseup', onEndDraw)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onStartDraw)
//     gElCanvas.addEventListener('touchmove', onDraw)
//     gElCanvas.addEventListener('touchend', onEndDraw)
// }

// function addResizeListeners() {
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }

