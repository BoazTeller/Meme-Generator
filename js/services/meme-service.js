'use strict'

const SAVED_MEMES_KEY = 'memesDB'
const KEYWORDS_SEARCHED = 'keywordsDB'

let gMeme
let gSavedMemes

let gKeywordSearchCountMap 
_createKeywordsMap()

let gImgId = 1
let gImgs = [
    { id: gImgId++, url: 'images/1.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/2.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/3.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/4.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/5.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/6.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/7.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/8.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/9.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/10.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/11.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/12.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/13.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/14.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/15.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/16.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/17.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/18.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/19.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/20.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/21.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/22.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/23.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/24.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/25.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/26.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/27.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/28.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/29.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/30.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/31.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/32.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/33.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/34.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/35.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/36.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/37.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/38.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/39.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/40.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/41.jpg', keywords: ['funny', 'politics'] },
    { id: gImgId++, url: 'images/42.jpg', keywords: ['funny', 'politics'] },
]

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
        size: 20,
        color: 'red',
        x: 100,
        y: 100
    }
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImdById(imgId) {
    return gImgs.find(({ id }) => imgId === id)
}

function _createKeywordsMap() {
    gKeywordSearchCountMap = {
        'funny': 12,
        'cat': 16, 
        'baby': 2
    }
}