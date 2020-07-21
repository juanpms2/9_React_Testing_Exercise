/// <reference types="Cypress" />

describe('Login input', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the login page and login', () => {
    const typedText = 'admin';
    const typedPassword = 'test';

    cy.get("[type='text']").should('have.focus');

    cy.get(
      '[data-testid=test-input-name] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .type(typedText)
      .should('have.value', typedText);

    cy.get(
      '[data-testid=test-input-password] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .type(typedPassword)
      .should('have.value', typedPassword);

    cy.get('.MuiButtonBase-root').click().loadAndVisitHotelCollection();
  });
});
