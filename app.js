function slidesPLugin(activeSlides = 0) {
  const slides = document.querySelectorAll('.slide')

  slides[activeSlides].classList.add('active')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses()
      slide.classList.add('active')
    })
  } 

  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
  }
}

slidesPLugin(1)

const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver)
  placeholder.addEventListener('dragenter', dragEnter)
  placeholder.addEventListener('dragleave', dragLeave)
  placeholder.addEventListener('drop', drop)
}

function dragStart (event) {
  event.target.classList.add('hold')
  setTimeout(() => event.target.classList.add('hidden'), 0)
}

function dragEnd (event) {
  event.target.classList.remove('hold', 'hidden')
}

function dragOver (event) {
  event.preventDefault()
}

function dragEnter (event) {
  event.target.classList.add('hovered')
}

function dragLeave (event) {
  event.target.classList.remove('hovered')
}

function drop (event) {
  event.target.append(item)
  event.target.classList.remove('hovered')
}

const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar')
const slide = document.querySelector('.main-slide')
const container = document.querySelector('.container__sidebar')

const slideCount = slide.querySelectorAll('div').length

let activeSlideIndex = 0

sidebar.style.top = `-${(slideCount - 1) * 100}vh`

upButton.addEventListener('click', () => {
  changesSlide('up')
})

downButton.addEventListener('click', () => {
  changesSlide('down')
})

function changesSlide (dir) {
  if (dir === 'up') {
    activeSlideIndex++
    if (activeSlideIndex === slideCount) {
      activeSlideIndex = 0
    }
  } else if (dir === 'down') {
    activeSlideIndex--
    if (activeSlideIndex < 0) {
      activeSlideIndex = slideCount - 1
    }
  }

  const height = container.clientHeight

  slide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

const board = document.querySelector('#board')
const SQUARES_NUMBER = 500

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div')
  square.classList.add('square')

  square.addEventListener('mouseover', () => 
  setColor(square))

  square.addEventListener('mouseleave', () => 
  removeColor(square))

  board.append(square)
}

function setColor(element) {
  const color = generateRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
  element.style.backgroundColor = '#1d1d1d'
  element.style.boxShadow = '0 0 2px #000'
}

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)].toLowerCase()
  }
  return '#' + color
}



const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time') 
const board2 = document.querySelector('#board2') 
const endText = document.querySelector('.qqq') 
const endButton = document.querySelector('.game-again') 

let time 
let score = 0
let current


startButton.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board2.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createTarget()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createTarget()
  setTime(time)
}




function decreaseTime() {
  if (time === 0) {
    endGame()
  } else {
    current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
    console.log(current)
  }
  
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function endGame() {
  timeEl.parentNode.classList.add('hide')
  board2.innerHTML = `<h1 class="qqq">Счет: <span class="primary">${score}</span><h1>
  <a href="#" id="game-again" onclick="location.reload(); return false;">
	Начать заново
</a>`
  // board2.innerHTML = `<h1 class="qqq">Счет: <span class="primary">${score}</span><h1>
  // <button id="game-again" class="game-again">Начать заново</button>`
  
  // newGame()
}

// function newGame () {
//   timeEl.parentNode.classList.remove('hide')
//   board2.addEventListener('click', event => {
//     if (event.target.classList.contains('game-again')) {
//       screens[1].classList.remove('up')
//       screens[0].classList.remove('up')
//       score = 0
//       current = 0
//     }
    
//   }) 
// }

function createTarget() {
  const target = document.createElement('div')
  target.classList.add('circle')
  const size = getRandomNumber(10, 60)
  const {width, height} = board2.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = generateRandomColor()

  target.style.background = color
  target.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  target.style.top = `${x}px`
  target.style.left = `${y}px`
  target.style.width = `${size}px`
  target.style.height = `${size}px`
  board2.append(target)
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)].toLowerCase()
  }
  return '#' + color
}


