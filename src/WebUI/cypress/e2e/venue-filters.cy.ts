describe("Venue List spec", () => {
  beforeEach(() => {
    cy.visit(`/`);
    cy.viewport(1400, 1400);
  });

  // note: given more time would do tests on actually filtering the content e2e
  it("filters should contain sort order", () => {
    cy.get('[data-cy="sort-order"]').click();

    cy.get('[data-cy="sort-order-content"]')
      .should("contain", "Distance")
      .and("contain", "Name")
      .and("contain", "StarsAmenities")
      .and("contain", "StarsValue")
      .and("contain", "StarsBeer");
  });
});
