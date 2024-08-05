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
    addTouchListeners()
    addResizeListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onMouseDown)
    gElCanvas.addEventListener('touchmove', onMouseMove)
    gElCanvas.addEventListener('touchend', onMouseUp)
}

function addResizeListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function onMouseMove() {

}

function onMouseDown() {

}

function onMouseUp() {

}
