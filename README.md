# Project tic-tac-toe

### Install

```
yarn install
```

### Test

```
yarn test
```
_Note:_ [Cypress.io](https://www.cypress.io/) is included in the project and all tests will run using it.

### Approach

I tackled the exercise in the following order:

  1 - Made a list of the different tasks needed to deliver the following objectives:

    - Write an unbeatable Tic Tac Toe (Noughts and Crosses) program
  
    - User can choose the game type
      - human v. computer
      - human v. human
      - computer v. computer

    - User has the choice of which player goes first

  2 - Planned the logic behind the game and the different steps of the program

  3 - Tackled the to-do list step by step and when needed researched for solutions

  4 - Refactored the code

#### Time

* About 8 hours including MiniMax research

#### Logic to create grid and buttons

```js
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
```

#### Logic Human vs. Computer

```js
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

function opponentTurn() {
  removeSquaresEventListeners()
  setTimeout(() => {
    takeTurn(opponentChoice(), 'O')
    if(!checkVictory() && !checkDraw())
      createSquaresEventListeners()
  }, 750)
}
```

#### Opponent Choice Logic

```js
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
    }  else if (bestMove().includes('25') && origBoard[8] === '') {
      return 8
    }  else if (bestMove().includes('14') && origBoard[7] === '') {
      return 7
    }  else if (bestMove().includes('03') && origBoard[6] === '') {
      return 6
    }  else if (bestMove().includes('67') && origBoard[8] === '') {
      return 8
    }  else if (bestMove().includes('34') && origBoard[5] === '') {
      return 5
    }  else if (bestMove().includes('01') && origBoard[2] === '') {
      return 2
    }  else if (bestMove().includes('48') && origBoard[0] === '') {
      return 0
    }  else if (bestMove().includes('46') && origBoard[3] === '') {
      return 3
    }  else if (bestMove().includes('58') && origBoard[2] === '') {
      return 2
    }  else if (bestMove().includes('47') && origBoard[1] === '') {
      return 1
    }  else if (bestMove().includes('36') && origBoard[0] === '') {
      return 0
    }  else if (bestMove().includes('78') && origBoard[6] === '') {
      return 6
    }  else if (bestMove().includes('45') && origBoard[3] === '') {
      return 3
    }  else if (bestMove().includes('12') && origBoard[0] === '') {
      return 0
    }  else if (bestMove().includes('08') && origBoard[4] === '') {
      return 4
    }  else if (bestMove().includes('26') && origBoard[4] === '') {
      return 4
    }  else if (bestMove().includes('28') && origBoard[5] === '') {
      return 5
    }  else if (bestMove().includes('17') && origBoard[4] === '') {
      return 4
    }  else if (bestMove().includes('06') && origBoard[3] === '') {
      return 3
    }  else if (bestMove().includes('68') && origBoard[7] === '') {
      return 7
    }  else if (bestMove().includes('35') && origBoard[4] === '') {
      return 4
    }  else if (bestMove().includes('02') && origBoard[1] === '') {
      return 1
    }  else if (bestMove().includes('80') && origBoard[4] === '') {
      return 4
    }  else if (bestMove().includes('20') && origBoard[1] === '') {
      return 1
    } else if (bestMove().includes('46') && origBoard[2] === '') {
      return 2
    }
}
```

#### Logic Check Victory 

```js
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
```

### Wins and Blockers

#### Wins

* The game offers
  - human v. computer
  - human v. human
  - computer v. computer

* The user can choose which player goes first (computer or human)
* DOM Manipulations to create game grid and button
* Reset button instead of reloading page

#### Blockers

* Improve the algorithm to allow the computer to make intelligent choices and be unbeatable

### Future functionality

* Implement a MiniMax algorithm to improve computer choices
* Create a score board to increase competitiveness

### What I've learnt (tech & soft skills)

* Exposure to algorithms and MiniMax
* Stepping back and thinking about what exactly I want to achieve
* Refresh my vanilla JS skills