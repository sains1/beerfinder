import venue1 from "../fixtures/venue-1.json";

describe("Venue Details spec", () => {
  beforeEach(() => {
    cy.visit(`/venues/${venue1.venueId}`);
  });

  it("Contains the venue name", () => {
    cy.get("h1").contains(venue1.venueName);
  });

  it("Contains the excerpt", () => {
    cy.get("[data-cy='venue-excerpt']").contains(venue1.excerpt);
  });

  it("Contains the beer rating", () => {
    cy.get("[data-cy='venue-rating-beer']").contains(venue1.starsBeer);
  });

  it("Contains the amenities rating", () => {
    cy.get("[data-cy='venue-rating-amenities']").contains(
      venue1.starsAmenities,
    );
  });

  it("Contains the atmosphere rating", () => {
    cy.get("[data-cy='venue-rating-atmosphere']").contains(
      venue1.starsAtmosphere,
    );
  });

  it("Contains the value rating", () => {
    cy.get("[data-cy='venue-rating-value']").contains(venue1.starsValue);
  });

  it("Contains all the tags", () => {
    venue1.tags.forEach((tag) => {
      cy.get("[data-cy='venue-tag']").contains(tag);
    });
  });
});
