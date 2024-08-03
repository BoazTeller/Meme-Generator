'use strict'

///////////////////////////////
// Note: need to find a better solution for the canvas functions

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx

function onInit() {
    // initCanvas()
    // resizeCanvas()
 
    renderGallery()
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
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

