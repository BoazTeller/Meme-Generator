'use strict'

const SAVED_MEMES_KEY = 'memesDB'
const KEYWORDS_SEARCH_KEY = 'keywordsDB'

let gMeme
let gSavedMemes = loadFromStorage(SAVED_MEMES_KEY) || []
/* Better to separate meme and image services and have this filter there 
   along with many other image related functions */
let gKeywordFilter = null

let gImgId = 1
let gImgs = [
        { id: gImgId++, url: 'images/1.jpg', keywords: ['funny', 'politics'] },
        { id: gImgId++, url: 'images/2.jpg', keywords: ['cute', 'dog', 'smile'] },
        { id: gImgId++, url: 'images/3.jpg', keywords: ['cute', 'baby', 'dog', 'animal'] },
        { id: gImgId++, url: 'images/4.jpg', keywords: ['cute', 'cat', 'animal'] },
        { id: gImgId++, url: 'images/5.jpg', keywords: ['funny', 'baby', 'smile'] },
        { id: gImgId++, url: 'images/6.jpg', keywords: ['funny', 'baby'] },
        { id: gImgId++, url: 'images/7.jpg', keywords: ['funny', 'baby'] },
        { id: gImgId++, url: 'images/8.jpg', keywords: ['funny'] },
        { id: gImgId++, url: 'images/9.jpg', keywords: ['smile', 'funny'] },
        { id: gImgId++, url: 'images/10.jpg', keywords: ['funny', 'politics'] },
        { id: gImgId++, url: 'images/11.jpg', keywords: ['funny'] },
        { id: gImgId++, url: 'images/12.jpg', keywords: ['funny'] },
        { id: gImgId++, url: 'images/13.jpg', keywords: ['funny', 'smile'] },
        { id: gImgId++, url: 'images/14.jpg', keywords: ['funny'] },
        { id: gImgId++, url: 'images/15.jpg', keywords: ['funny', 'politics'] },
        { id: gImgId++, url: 'images/16.jpg', keywords: ['funny', 'smile'] },
        { id: gImgId++, url: 'images/17.jpg', keywords: ['politics'] },
        { id: gImgId++, url: 'images/18.jpg', keywords: ['funny', 'smile'] }
]

let gKeywordsSearchCount
_createKeywords()

function createMeme(imgId) {
    gMeme = _createMeme(imgId)
}

function _createMeme(imgId) {
    return {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [_createLine()]
    }
}

function _createLine() {
    return {
        id: makeId(),
        txt: 'Enter text',
        font: 'Arial',
        size: 20,
        strokeStyle: '',
        fillStyle: 'red',
        isDrag: false,
        pos: {
            x: 250,
            y: 30
        }
    }
}

function _createKeywords() {
    gKeywordsSearchCount = loadFromStorage(KEYWORDS_SEARCH_KEY)
    console.log(gKeywordsSearchCount)

    if (!gKeywordsSearchCount) {
        gKeywordsSearchCount = _generateKeywords()
        _saveKeywords(KEYWORDS_SEARCH_KEY, gKeywordsSearchCount)
    }
}

function _generateKeywords() {
    const imgs = getImgs()

    const rndKeywordsCount = imgs.reduce((acc, img) => {
        const { keywords } = img
        
        keywords.forEach((keyword) => {
            if (!acc[keyword]) {
                acc[keyword] = getRandomIntInclusive(1, 30)
            }
        })

        return acc
    }, {})

    return rndKeywordsCount
}

function _saveKeywords() {
    saveToStorage(KEYWORDS_SEARCH_KEY, gKeywordsSearchCount)
}

function getKeywords() {
    return gKeywordsSearchCount
}

function getMeme() {
    return gMeme
}

function getImgs() {
    if (!gKeywordFilter) {
        return gImgs
    }

    return _filterImgs(gKeywordFilter)
}

function getImgById(imgId) {
    const imgs = getImgs()
    const img = imgs.find(img => img.id === imgId)
    return img
}

function _filterImgs(keyword) {
    const searchedKeyword = keyword.toLowerCase()
    updateKeywordsCount(searchedKeyword)
    return gImgs.filter(img => img.keywords.includes(searchedKeyword))
}

function getRandomImg() {
    const imgs = getImgs()
    const rndIdx = getRandomIntInclusive(0, imgs.length - 1);
    return imgs[rndIdx]
}

function getImdById(imgId) {
    return gImgs.find(({ id }) => imgId === id)
}

function setLineTxt(txt) {
    const line = getSelectedLine()
    line.txt = txt
}

function getSelectedLine() {
    const selectedLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[selectedLineIdx]
}

function addLine(height) {
    const linePosY = calcLinePos(height)

    const newLine = _createLine()
    newLine.pos.y = linePosY

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function calcLinePos(height) {
    const numOfLines = gMeme.lines.length || 0

    if (numOfLines === 0) {
        return 30
    } else if (numOfLines === 1) {
        return height - 30
    } else {
        return height / 2
    }
}

function switchLine() {
    const numOfLine = gMeme.selectedLineIdx + 1
    const numOfLines = gMeme.lines.length

    if (numOfLine >= numOfLines) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function increaseFontSize() {
    const line = getSelectedLine()
    if (line.size > 80) return 
    
    line.size += 2
}

function decreaseFontSize() {
    const line = getSelectedLine()    
    line.size = Math.max(2, line.size - 2) 
}

function setAlignTextLeft() {
    const line = getSelectedLine()
    if (line) line.align = 'left'
}

function setAlignTextCenter() {
    const line = getSelectedLine()
    if (line) line.align = 'center'
}

function setAlignTextRight() {
    const line = getSelectedLine()
    if (line) line.align = 'right'
}

function setTextAlignment(alignment, textWidth, canvasWidth) {
    const line = getSelectedLine()

    if (alignment === 'left') {
        line.pos.x = textWidth / 2
    } else if (alignment === 'center') {
        line.pos.x = canvasWidth / 2
    } else if (alignment === 'right') {
        line.pos.x = canvasWidth - textWidth / 2
    }
}

function setStrokeStyle(color) {
    const line = getSelectedLine()
    if (line) line.strokeStyle = color
}

function setFillStyle(color) {
    const line = getSelectedLine()
    if (line) line.fillStyle = color
}

function setFontFamily(font) {
    const line = getSelectedLine()
    if (line) line.font = font
}

function setLineIsDrag(line, isDrag) {
    line.isDrag = isDrag
}

function updateLinePos(dx, dy) {
    const line = getSelectedLine()
    line.pos.x += dx
    line.pos.y += dy
}

function setSelectedLineIdx(clickedLine) {
    if (!clickedLine) return

    const lineIdx = gMeme.lines.findIndex(line => line === clickedLine)
    gMeme.selectedLineIdx = lineIdx
}

function updateKeywordsCount(keyword) {
    const keywords = getKeywords()
    if (!keywords[keyword] === undefined) return
    if (!keywords[keyword] > 50) return

    keywords[keyword]++
    _saveKeywords()
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

function setFilter(keyword) {
    gKeywordFilter = keyword
}

function addImg(imgSrc) {
    const newImg = _createImg(imgSrc)
    gImgs.unshift(newImg)
}

function _createImg(url) {
    return {
        id: gImgId++,
        url,
        keywords: []
    }
}

function saveMeme() {
    // const existingMeme = gSavedMemes.find(savedMeme => savedMeme.id === gMeme.id)
    
    // if (existingMeme) existingMeme.dataURL = getDataURL()
    // else 
    gSavedMemes.push(structuredClone(gMeme))
    
    _saveMemes()
}

function _saveMemes() {
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes)
}

function deleteSavedMeme(memeId) {
    const memeIdx = gSavedMemes.findIndex(({ id }) => id === memeId)
    if (memeIdx === -1) return

    gSavedMemes.splice(memeIdx, 1)
    _saveMemes()
}

function getSavedMemes() {
    return gSavedMemes
}

function setSavedMeme(meme) {
    gMeme = meme
}