document.addEventListener('DOMContentLoaded', () => {

  const buttonStartGame = document.getElementById('start-game')
  const buttonWrapper = document.getElementById('button-wrapper')
  const buttons = ['Player vs Player', 'Player vs Computer', 'Computer vs Player', 'Computer vs Computer', 'Reset']
  const gridWrapper = document.getElementById('grid-wrapper')
  const gameOverMessage = document.getElementById('gameOver-wrapper')
  const gridSquares = []
  const computerTwoTurnInterval = []
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
    document.getElementById('button0').addEventListener('click', twoPlayer)
    document.getElementById('button1').addEventListener('click', onePlayer)
    document.getElementById('button2').addEventListener('click', onePlayerTwo)
    document.getElementById('button3').addEventListener('click', autoPlay)
    document.getElementById('button4').addEventListener('click', resetGame)
  }

  // Common logic

  function takeTurn(index, letter) {
    gridSquares[index].innerText = letter
  }

  function getId(square) {
    return Number.parseInt(square.id.replace('square', ''))
  }

  function emptySquares() {
    return gridSquares.filter((square) => square.innerText === '')
  }
  
  function createSquaresEventListeners() {
    gridSquares.forEach((square) => square.addEventListener('click', clickFunction))
  }

  function removeSquaresEventListeners() {
    gridSquares.forEach((square) => square.removeEventListener('click', clickFunction))
  }

  function playing() {
    document.getElementById('button0').style.display ='none'
    document.getElementById('button1').style.display ='none'
    document.getElementById('button2').style.display ='none'
    document.getElementById('button3').style.display ='none'
  }

  function notPlaying() {
    document.getElementById('button0').style.display =''
    document.getElementById('button1').style.display =''
    document.getElementById('button2').style.display =''
    document.getElementById('button3').style.display =''
  }

  // Player vs Player

  function createSqrEventListenersTwo() {
    gridSquares.forEach((square) => square.addEventListener('click', clickFunctionTwo))
  }

  function countXSquares(){
    const x = gridSquares.filter((square) => square.innerText === 'X')
    return x
  }

  function countOSquares(){
    const o = gridSquares.filter((square) => square.innerText === 'O')
    return o
  }

  function clickFunctionTwo(e) {
    if(!checkVictory() && !checkDraw())
      if(e.target.innerText === '' && countXSquares().length <= countOSquares().length) {
        takeTurn(getId(e.target), 'X')
      } else if (e.target.innerText === '' && countXSquares().length >= countOSquares().length){
        takeTurn(getId(e.target), 'O')
      }
    checkVictory()
    checkDraw()
  }

  function twoPlayer() {
    playing()
    createSqrEventListenersTwo()
  }

  // Player vs Computer

  function onePlayer() {
    playing()
    createSquaresEventListeners()
  } 

  function clickFunction(e) {
    if(e.target.innerText === '') {
      takeTurn(getId(e.target), 'X')
      if(!checkVictory() && !checkDraw())
        opponentTurn()
    }
  }

  function opponentChoice() { 
    return getId(emptySquares()[Math.floor(Math.random() * emptySquares().length)])
  }

  function opponentTurn() {
    removeSquaresEventListeners()
    setTimeout(() => {
      takeTurn(opponentChoice(), 'O')
      if(!checkVictory() && !checkDraw())
        createSquaresEventListeners()
    }, 750)
  }

  // Computer vs Player

  function onePlayerTwo() {
    playing()
    opponentTurn()
  } 

  // Computer vs Computer

  function computerTwoTurn() {
    takeTurn(opponentChoice(), 'X')
    if(!checkVictory() && !checkDraw())
      opponentTurn()
  }

  function autoPlay() {
    playing()
    const computerTurnInterval = setInterval(computerTwoTurn, 1500)
    computerTwoTurnInterval.push(computerTurnInterval)
  }

  // Check for victory and End Game 
  function gameWinner(winningSequence) {
    computerTwoTurnInterval.forEach((interval) => clearInterval(interval))
    winningSequence.forEach((square) => {
      square.classList.add('winner')
    })
    removeSquaresEventListeners()
  }

  function allSame(arr) {
    return arr.every((square) => square.innerText === arr[0].innerText && square.innerText !== '')
  }

  function checkVictory() {
    let victory = false
    winningCombinations.forEach((combination) => {
      const _gridSquares = gridSquares
      const sequence = [_gridSquares[combination[0]], _gridSquares[combination[1]], _gridSquares[combination[2]]]
      if(allSame(sequence)) {
        victory = true
        gameWinner(sequence)
      }
    })
    return victory
  }

  function gameOver() {
    computerTwoTurnInterval.forEach((interval) => clearInterval(interval))
    gridWrapper.style.display = 'none'
    gameOverMessage.style.display = ''
  }

  function checkDraw() {
    let draw = false
    if(emptySquares().length === 0){
      draw = true
      gameOver()
    }
    return draw
  }

  // Reset Game

  function resetGame() {
    computerTwoTurnInterval.forEach((interval) => clearInterval(interval))
    removeSquaresEventListeners()
    notPlaying()
    gridSquares.forEach((square) => {
      square.innerText = ''
      square.classList.remove('winner')
    })
    gameOverMessage.style.display = 'none'
    gridWrapper.style.display = ''
    createButtonsEventListeners()
  }

})