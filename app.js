document.addEventListener('DOMContentLoaded', () => {

  const buttonStartGame = document.getElementById('start-game')
  const buttonWrapper = document.getElementById('button-wrapper')
  const buttons = ['Player vs Player', 'Player vs Computer', 'Computer vs Player', 'Computer vs Computer', 'Reset']
  const gridSquares = document.querySelectorAll('.gridSquare')
  const gameOverMessage = document.getElementById('gameOver-wrapper')
  const huPlayer = 'X'
  const aiPlayer = 'O'
  let origBoard = []
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

  function startGame() {
    buttonStartGame.style.display = 'none'
    createButtons(buttons)
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

  function createButtonsEventListeners() {
    document.getElementById('button0').addEventListener('click', twoPlayer)
    document.getElementById('button1').addEventListener('click', onePlayer)
    document.getElementById('button2').addEventListener('click', onePlayerTwo)
    document.getElementById('button3').addEventListener('click', autoPlay)
    document.getElementById('button4').addEventListener('click', resetGame)
  }

  buttonStartGame.addEventListener('click', startGame)

  // Common logic

  function takeTurn(index, letter) {
    gridSquares[index].innerText = letter
  }

  function getId(square) {
    return Number.parseInt(square.id.replace('square', ''))
  }

  function emptySquares() {
    return [...gridSquares].filter((square) => square.innerText === '')
  }
  
  function createSquaresEventListeners() {
    origBoard = []
    gridSquares.forEach((square) => {
      square.addEventListener('click', clickFunction)
      origBoard.push(square.innerText)
    })
  }

  function removeSquaresEventListeners() {
    origBoard = []
    gridSquares.forEach((square) => {
      square.removeEventListener('click', clickFunction)
      origBoard.push(square.innerText)
    })
    gridSquares.forEach((square) => square.removeEventListener('click', clickFunctionTwo))
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
    return [...gridSquares].filter((square) => square.innerText === huPlayer)
  }

  function countOSquares(){
    return [...gridSquares].filter((square) => square.innerText === aiPlayer)
  }

  function clickFunctionTwo(e) {
    if(!checkVictory() && !checkDraw())
      if(e.target.innerText === '' && countXSquares().length <= countOSquares().length) {
        takeTurn(getId(e.target), huPlayer)
      } else if (e.target.innerText === '' && countXSquares().length >= countOSquares().length){
        takeTurn(getId(e.target), aiPlayer)
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
      takeTurn(getId(e.target), huPlayer)
      if(!checkVictory() && !checkDraw())
        opponentTurn()
    }
  }

  const winningPossibilities = [
    [0,2],
    [3,5],
    [6,8],
    [0,6],
    [1,7],
    [2,8],
    [2,6],
    [0,8],
    [1,2],
    [4,5],
    [7,8],
    [3,6],
    [4,7],
    [5,8],
    [4,6],
    [4,8],
    [0,1],
    [3,4],
    [6,7],
    [0,3],
    [1,4],
    [2,5],
    [2,4],
    [0,4]
  ]

  function twoSame(arr) {
    return arr.every((square) => square.innerText === arr[0].innerText && square.innerText !== '' && square.innerText !== 'O')
  }

  function bestMove() {
    const a = []
    winningPossibilities.forEach((combination) => {
      const _gridSquares = gridSquares
      const sequence = [_gridSquares[combination[0]], _gridSquares[combination[1]]]
      if(twoSame(sequence))
        a.push(sequence[0].id + sequence[1].id)
    })
    return a
  }

  function opponentChoice() { 
    if(emptySquares().length < 7) {
      console.log(bestMove())
      if(bestMove().includes('04') && origBoard[8] === '') {
        return 8
      } else if (bestMove().includes('24') && origBoard[6] === '') {
        return 6
      } else if (bestMove().includes('25') && origBoard[8] === '') {
        return 8
      } else if (bestMove().includes('14') && origBoard[7] === '') {
        return 7
      } else if (bestMove().includes('03') && origBoard[6] === '') {
        return 6
      } else if (bestMove().includes('67') && origBoard[8] === '') {
        return 8
      } else if (bestMove().includes('34') && origBoard[5] === '') {
        return 5
      } else if (bestMove().includes('01') && origBoard[2] === '') {
        return 2
      } else if (bestMove().includes('48') && origBoard[0] === '') {
        return 0
      } else if (bestMove().includes('46') && origBoard[3] === '') {
        return 3
      } else if (bestMove().includes('58') && origBoard[2] === '') {
        return 2
      } else if (bestMove().includes('47') && origBoard[1] === '') {
        return 1
      } else if (bestMove().includes('36') && origBoard[0] === '') {
        return 0
      } else if (bestMove().includes('78') && origBoard[6] === '') {
        return 6
      } else if (bestMove().includes('45') && origBoard[3] === '') {
        return 3
      } else if (bestMove().includes('12') && origBoard[0] === '') {
        return 0
      } else if (bestMove().includes('08') && origBoard[4] === '') {
        return 4
      } else if (bestMove().includes('26') && origBoard[4] === '') {
        return 4
      } else if (bestMove().includes('28') && origBoard[5] === '') {
        return 5
      } else if (bestMove().includes('17') && origBoard[4] === '') {
        return 4
      } else if (bestMove().includes('06') && origBoard[3] === '') {
        return 3
      } else if (bestMove().includes('68') && origBoard[7] === '') {
        return 7
      } else if (bestMove().includes('35') && origBoard[4] === '') {
        return 4
      } else if (bestMove().includes('02') && origBoard[1] === '') {
        return 1
      } else if (bestMove().includes('80') && origBoard[4] === '') {
        return 4
      } else if (bestMove().includes('20') && origBoard[1] === '') {
        return 1
      } else if (bestMove().includes('46') && origBoard[2] === '') {
        return 2
      }
    }

    return getId(emptySquares()[Math.floor(Math.random() * emptySquares().length)])
  }

  function opponentTurn() {
    removeSquaresEventListeners()
    setTimeout(() => {
      takeTurn(opponentChoice(), aiPlayer)
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
    takeTurn(opponentChoice(), huPlayer)
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
    gridSquares.forEach((square) => {
      square.style.display = 'none'
    })
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
      square.style.display = ''
      square.innerText = ''
      square.classList.remove('winner')
    })
    gameOverMessage.style.display = 'none'
    createButtonsEventListeners()
  }

})