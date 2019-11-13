# Project tic-tac-toe

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