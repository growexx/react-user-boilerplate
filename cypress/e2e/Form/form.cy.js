import moment from 'moment';

describe('Should e2e test for sample form tab', () => {
  beforeEach(() => {
    cy.loginUI('test@gmail.com', 'Test@123');
  });
  afterEach(() => {
    cy.logoutUser();
  });
  it('Should fill form and submit', () => {
    cy.contains('Redux-Saga Form').click();
    cy.location('pathname').should('include', '/sample-form');
    cy.contains('First Name');
    cy.fillFormInput(1, 'Jethalal');
    cy.fillFormInput(2, 'Gada');
    cy.fillFormInput(3, 'jetha@gada.com');

    // Gender
    cy.get(':nth-child(1) > .ant-radio > .ant-radio-input').check();

    // Favourite Color
    cy.selectDropdown('.ant-select-selection-item', 'Red');
    cy.get('#employed').check();
    cy.get('.ant-picker-input-active > input')
      .click()
      .type(
        `${moment()
          .add(1, 'days')
          .format('YYYY-MM-DD')}{enter}${moment()
          .add(3, 'days')
          .format('YYYY-MM-DD')}{enter}`,
      );
    cy.get('[data-testid="Notes"]').type(
      'Gokuldham society,\nMumbai,{enter}India',
    );
    cy.contains('Submit').click();
  });
});
