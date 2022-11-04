describe('Should e2e test for user tab', () => {
  beforeEach(() => {
    cy.loginUI('test@gmail.com', 'Test@123');
  });
  afterEach(() => {
    cy.logoutUser();
  });
  it('Should check first element of the list', () => {
    cy.location('pathname').should('include', '/users');
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.get('.ant-table-tbody tr')
      .first()
      .should('contain.text', 'Serena Juckes');
  });
  it('Should change page of user list', () => {
    cy.location('pathname').should('include', '/users');
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.get('.ant-table-tbody tr')
      .first()
      .should('contain.text', 'Serena Juckes');
    cy.get('.ant-pagination-item-2 > a').click();
    cy.get('.ant-table-tbody tr')
      .first()
      .should('contain.text', 'Kippy Krollmann');
  });
  it('Should change page size of user list', () => {
    cy.location('pathname').should('include', '/users');
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.selectDropdown('.ant-select-selection-item', '20 / page');
    cy.get('.ant-table-tbody tr').should('have.length', 20);
  });
  it('Should sort user list', () => {
    cy.location('pathname').should('include', '/users');
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.get('.ant-table-tbody tr')
      .first()
      .should('contain.text', 'Serena Juckes');
    cy.get(
      ':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)',
    ).click();
    cy.get('.ant-table-tbody tr')
      .first()
      .should('contain.text', '100');
  });
  it('Should add user successfully', () => {
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.get('[data-testid="ADD_USER"] > span').click();
    cy.get(
      ':nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input',
    ).type('test@mail.com');
    cy.get(
      ':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input',
    ).type('Jethalal');
    cy.get(
      ':nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input',
    ).type('Gada');
    cy.get('[data-testid="USER_MODAL_OK"] > span').click();
    cy.contains('Success').should('be.visible');
  });
  it('Should delete user successfully', () => {
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.contains('Serena Juckes').should('be.visible');
    cy.get(
      '[data-row-key="1"] > :nth-child(7) > .ant-space > :nth-child(2) > [data-testid="DELETE_BUTTON"]',
    ).click();
    cy.get('[data-testid="DELETE_BUTTON_CONFIRMED"] > span').click();
    cy.contains('Deleted').should('be.visible');
    cy.contains('Serena Juckes').should('not.exist');
  });
  it('Should update user successfully', () => {
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.contains('Serena Juckes').should('be.visible');
    cy.get(
      '[data-row-key="1"] > :nth-child(7) > .ant-space > [style="margin-right: 16px;"] > [data-testid="EDIT_BUTTON"]',
    ).click();
    cy.get(
      ':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input',
    ).type('{selectAll}{del}Jethalal');
    cy.contains('Update').click();
    cy.contains('Success').should('be.visible');
    cy.contains('Jethalal Juckes').should('be.visible');
  });
  it('Should filter user status', () => {
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.contains('Delinda Evetts').should('not.exist');
    cy.selectDropdown('#rc_select_0', 'Suspended');
    cy.contains('Delinda Evetts').should('exist');
  });
  it('Should search for user', () => {
    cy.get('.ant-table-tbody tr').should('have.length', 10);
    cy.contains('Delinda Evetts').should('not.exist');
    cy.get('.ant-input').type('Delinda');
    cy.contains('Delinda Evetts').should('exist');
  });
});
