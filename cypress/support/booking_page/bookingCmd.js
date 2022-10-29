Cypress.Commands.add("getAllFlights", () => {
  return cy.findAllByRole("region").find(".journey-details-card");
});

Cypress.Commands.add("getDate", (locator) => {
  return cy
    .get(`.date`, { timeout: 15000 })
    .contains(locator)
    .parent()
    .find("span")
    .first()
    .invoke("text");
});

// One way flight card by default
Cypress.Commands.add(
  "checkFlightCard",
  (
    direction = "Depart",
    flightDetail = "Outbound",
    flightList = "outbound",
    fareCard = "outbound"
  ) => {
    cy.getDate(direction).then((date) => {
      cy.findByRole("form")
        .find(`#ti-flight-details-date:contains(${flightDetail})`)
        .should("contain.text", +date);
      cy.get(`#${flightList}FlightDatesList`)
        .find(".selected")
        .should("contain.text", +date)
        .find(".price")
        .invoke("text")
        .then((usd) => {
          cy.get(`#${fareCard}-journey-0-`)
            .should("contain.text", "Nice")
            .and("contain.text", usd)
            .and("contain.text", "Selected");
        });
    });
  }
);

Cypress.Commands.add("selectSeat", (indexOfSeat) => {
  cy.findAllByRole("checkbox")
    .not('[aria-disabled="true"]')
    .eq(indexOfSeat)
    .then(function (el) {
      cy.wrap(el).click();
      cy.findByRole("alert")
        .should("be.visible")
        .invoke("text")
        .then((alertText) => {
          const seatNumber = alertText.slice(0, alertText.indexOf(" "));
          cy.get(".seat-details").should("contain.text", seatNumber);
          cy.get(".noty_close_button").click();
          cy.get(`[aria-label='Seat ${seatNumber}']`).should(
            "have.class",
            "chosen"
          );
        });
    });
});
