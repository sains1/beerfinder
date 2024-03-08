describe("Venue List spec", () => {
  beforeEach(() => {
    cy.intercept("/api/Venue**").as('venueRequest');
    cy.viewport(1400, 1400);
    cy.visit(`/`);
    cy.wait("@venueRequest") // wait for initial page load to settle
  });

  it("filters should contain sort order", () => {
    cy.get('[data-cy="sort-order"]').click();

    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('[data-cy="sort-order-content"]')
      .should("contain", "Distance")
      .and("contain", "Name")
      .and("contain", "StarsAmenities")
      .and("contain", "StarsValue")
      .and("contain", "StarsBeer")
      .get('[data-cy="sort-order-content"]')
      .contains('Name')
      .click();

    cy.url().should('contain', 'sort=Name')

    cy.get('@venueRequest').should('have.been.calledOnce');
  });

  it("filters should contain beer rating", () => {
    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('[data-cy="rating-starsBeer"]')
      .find('button')
      .contains('1')
      .click()

    cy.url().should('contain', 'starsBeer=1')

    cy.get('@venueRequest').should('have.been.calledOnce');
  })

  it("filters should contain value rating", () => {
    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('[data-cy="rating-starsValue"]')
      .find('button')
      .contains('1')
      .click()

    cy.url().should('contain', 'starsValue=1')

    cy.get('@venueRequest').should('have.been.calledOnce');
  })

  it("filters should contain amenities rating", () => {
    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('[data-cy="rating-starsAmenities"]')
      .find('button')
      .contains('1')
      .click()

    cy.url().should('contain', 'starsAmenities=1')

    cy.get('@venueRequest').should('have.been.calledOnce');
  })

  it("filters should contain atmosphere rating", () => {
    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('[data-cy="rating-starsAtmosphere"]')
      .find('button')
      .contains('1')
      .click()

    cy.url().should('contain', 'starsAtmosphere=1')

    cy.get('@venueRequest').should('have.been.calledOnce');
  })
});
