import venueClosest from "../fixtures/venue-closest.json";

describe("Venue List spec", () => {
  beforeEach(() => {
    cy.intercept("/api/Venue**").as('venueRequest');
    cy.viewport(1400, 1400);
    cy.visit(`/`);
    cy.wait("@venueRequest") // wait for initial page load to settle
  });

  it('should load more data when clicking next', () => {
    cy.intercept("/api/Venue**", cy.spy().as('venueRequest'));

    cy.get('body').find('button').contains('load more').click()

    cy.get('@venueRequest').should('have.been.calledOnce');
  })

  it("card should contain the venue name", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-header"]')
      .contains(venueClosest.venueName);
  });

  it("card should contain the beer rating", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-rating-beer"]')
      .contains(venueClosest.starsBeer);
  });

  it("card should contain the atmosphere rating", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-rating-atmosphere"]')
      .contains(venueClosest.starsAtmosphere);
  });

  it("card should contain the beer rating", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-rating-amenities"]')
      .contains(venueClosest.starsAmenities);
  });

  it("card should contain the beer rating", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-rating-value"]')
      .contains(venueClosest.starsValue);
  });

  it("card should contain a link to the venue", () => {
    cy.get('[data-cy="venue-card"]')
      .first()
      .find('[data-cy="venue-link"]')
      .should("have.attr", "href", `/venues/${venueClosest.venueId}`);
  });
});
