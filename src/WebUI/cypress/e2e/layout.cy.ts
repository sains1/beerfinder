describe("Layout spec", () => {
  it("Contains the application name", () => {
    cy.visit("/");

    cy.get("header").contains("BeerFinder");
  });
});
