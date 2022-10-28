Cypress.Commands.add("fillSearchInputRandomly", (input) => {
  cy.findByText(input).next().find("input").should("be.empty").click();
  // click random city from suggestion
  cy.findAllByRole("option", { timeout: 20000 })
    .should("have.length.greaterThan", 0)
    .its("length")
    .then((elements) => Cypress._.random(elements - 1))
    .then((randomEl) => {
      cy.findAllByRole("option")
        .eq(randomEl)
        .click({ force: true })
        .invoke("text")
        .then((text) => {
          // Return only city name from picked airport
          const city = text.trim().slice(0, text.indexOf(",") - 1);
          cy.wrap(city).as("getSecondCity");
          cy.findByText(input)
            .parent()
            .find(".ng-value-label")
            .should("be.visible")
            .and("contain.text", city);
        });
    });
});

Cypress.Commands.add("findByAvailableDate", (index) => {
  cy.get("[role='grid']")
    .find(".mbsc-cal-txt:visible")
    .eq(index)
    .click({ force: true });
});
