describe('Test cypress is working', () => {
  it('Should visit google', () => {
    cy.visit('https://google.com');

    // cy.get('.gLFyf').type('Hello world');
    // cy.contains('Google Search').click();
    // or use this
    cy.get('.gLFyf').type('Hello world{enter}');
  });
});
