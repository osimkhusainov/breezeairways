describe("Roundtrip without login", () => {
  const apiURL = Cypress.env("apiURL");
  it("e2e from searching to adding bags", () => {
    cy.intercept(apiURL + "nsk/v4/availability/search/simple").as(
      "search-result"
    );
    cy.intercept(apiURL + "v2/graph/seatMaps").as("seats");
    cy.visit("/");
    cy.findByRole("button", { name: "Roundtrip" }).should(
      "have.class",
      "active"
    );
    cy.fillSearchInputRandomly("From");
    cy.fillSearchInputRandomly("To");
    cy.findByText("Guests").next().should("contain.text", 1);
    cy.get(".travel-dates", { timeout: 60000 })
      .should("contain.text", "Depart")
      .click();
    cy.findByAvailableDate(0);
    cy.findByAvailableDate(1);
    cy.findByText("Depart").parent().should("not.contain.text", "Select");
    cy.get("#search-flights").then((btn) => {
      cy.wrap(btn).invoke("attr", "aria-disabled").should("contain", false);
      cy.wrap(btn).click();
    });
    cy.wait("@search-result", { timeout: 15000 }).then(({ response }) => {
      cy.get("@getSecondCity").then((city) => {
        cy.get("[aria-label='flight details']").should("contain.text", city);
      });
      // Get all available flights and create an array then compare the array's length with UI flight cards
      const availableTrips = response.body.data.results.flatMap(
        (result) => result.trips.journeysAvailableByMarket
      );
      cy.getAllFlights().should("have.length", availableTrips.length);
      // By default we use Outbound direction with func below
      cy.checkFlightCard();
      // Need to add parameters for Inbound direction
      cy.checkFlightCard("Return", "Return", "return", "inbound");
      cy.findByRole("button", { name: "Login later" }).click();
      cy.wait("@seats", { timeout: 15000 }).then(() => {
        cy.selectSeat(0);
        cy.findByText("Continue to return flight").should("be.enabled").click();
        cy.selectSeat(1);
        cy.findByText("Continue to Bags").should("be.enabled");
      });
    });
  });
});
