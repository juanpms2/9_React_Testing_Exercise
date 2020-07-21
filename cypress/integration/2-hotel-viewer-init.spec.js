/// <reference types="Cypress" />

describe('Hotel viewer init', () => {
  it('displays hotels on page load', () => {
    cy.loadAndVisitHotelCollection();
    cy.get('[data-testid="div-hotel-container"] > div').should(
      'have.length',
      2
    );
  });
  it('should navigate to hotel-edit', () => {
    cy.get(
      ':nth-child(1) > .MuiCardActions-root > [data-testid=test-button-editHotel]'
    ).click();
  });
});
