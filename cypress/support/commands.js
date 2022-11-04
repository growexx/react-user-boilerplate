// Custom Login
Cypress.Commands.add('loginUI', (name, password) => {
  cy.visit('http://localhost:3000/login');
  cy.get('#email').type(name);
  cy.get('#password').type(password);
  cy.contains('SIGN IN').click();

  cy.get(':nth-child(1) > .otpComponentInputStyle').type('1');
  cy.get(':nth-child(2) > .otpComponentInputStyle').type('1');
  cy.get(':nth-child(3) > .otpComponentInputStyle').type('1');
  cy.get(':nth-child(4) > .otpComponentInputStyle').type('1');
  cy.get(':nth-child(5) > .otpComponentInputStyle').type('1');
  cy.get(':nth-child(6) > .otpComponentInputStyle').type('1');

  cy.get('[data-testid="ToggleIcon"]').click();
  cy.contains('User Management').click();
  cy.location('pathname').should('include', '/users');
});

// Custom Logout
Cypress.Commands.add('logoutUser', () => {
  cy.clearCookies();
  cy.reload();
});

// Custom Select dropdown for antd
Cypress.Commands.add('selectDropdown', (testId, optionText) => {
  cy.get(testId).click();

  return cy
    .get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)')
    .find('.ant-select-item-option')
    .each(el => {
      if (el.children().text() === optionText) {
        cy.wrap(el).click();
      }
    });
});

// Custom form fill for antd
Cypress.Commands.add('fillFormInput', (num, optionText) => {
  return cy
    .get(
      `:nth-child(${num}) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input`,
    )
    .type(optionText);
});
