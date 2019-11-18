describe('Play game', () => {
  it('Visits the game and play', () => {
    cy.visit('./index.html')
    cy.get('h1').should('have.text', 'Tic-Tac-Toe')
    cy.get('p').should('have.text', 'A game in which two players seek in alternate turns to complete a row, a column, or a diagonal with either three O\'s or three X\'s.')
    cy.get('#start-game').should('have.text', 'Play').click()
    cy.get('[class*="gridSquare"]').should('have.length', 9)

    cy.get('#start-game').should('have.exist')

    cy.contains('Player vs Player').click()
    cy.get('.gridSquare').should('have.text', '')
    cy.get('.gridSquare').then((square) => square.click())

    cy.contains('Reset').click()
    
    cy.contains('Player vs Computer').click()
    

    cy.contains('Reset').click()

    cy.contains('Computer vs Player').click()

    cy.contains('Reset').click()

    cy.contains('Computer vs Computer').click()
    cy.get('.gridSquare').should('have.text', '')
    
  })
})