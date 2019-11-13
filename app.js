document.addEventListener('DOMContentLoaded', () => {

  const buttonStartGame = document.getElementById('start-game')
  const buttonWrapper = document.getElementById('button-wrapper')
  const buttons = ['Player vs Player', 'Player vs Computer', 'Computer vs Computer', 'Reset']
  const gridWrapper = document.getElementById('grid-wrapper')
  const gameOverMessage = document.getElementById('gameOver-wrapper')
  const gridSquares = []
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ]

  // Start Game 
  gameOverMessage.style.display = 'none'

  buttonStartGame.addEventListener('click', startGame)

  function startGame() {
    buttonStartGame.style.display = 'none'
    createButtons(buttons)
    createGrid()
    createButtonsEventListeners()
  }

  function createButtons(buttons) {
    buttons.forEach((button, i) => {
      const newButton = document.createElement('button')
      newButton.setAttribute('id', `button${i}`)
      newButton.innerHTML = `${button}`
      buttonWrapper.append(newButton)
    })
  }

  function createGrid() {
    gridWrapper.classList.add('gridWrapper')
    for (let i = 0; i < 9; i++) {
      const newSquare = document.createElement('div')
      newSquare.setAttribute('id',`square${i}`)
      newSquare.classList.add('gridSquare')
      gridWrapper.append(newSquare)
      gridSquares.push(newSquare)
    }
  }

  function createButtonsEventListeners() {
    document.getElementById('button3').addEventListener('click', resetGame)
    // document.getElementById('button2').addEventListener('click', autoPlay)
    document.getElementById('button1').addEventListener('click', onePlayer)
  }

  // Common logic
  
  function createSquaresEventListeners() {
    gridSquares.forEach((square) => square.addEventListener('click', clickFunction))
  }

  // function removeSquaresEventListeners() {
  //   gridSquares.forEach((square) => square.removeEventListener('click', clickFunction))
  // }

  function playing() {
    document.getElementById('button0').style.display ='none'
    document.getElementById('button1').style.display ='none'
    document.getElementById('button2').style.display ='none'
  }

  function notPlaying() {
    document.getElementById('button0').style.display =''
    document.getElementById('button1').style.display =''
    document.getElementById('button2').style.display =''
  }

  // Player vs Computer

  function onePlayer() {
    playing()
    createSquaresEventListeners()
  }

  function clickFunction() {
    console.log('poo')
  }

  function resetGame() {
    return notPlaying()
  }
})