const users = require("../fixtures/users.json");

describe("Users integration tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.server();
    cy.visit("/users");
  });

  it("Should contain a table with users data", () => {
    cy.route(`users?**`, "fixture:users.json").as("users");

    cy.wait("@users");

    cy.get("table")
      .find("thead")
      .contains("th", "Action")
      .scrollIntoView({ easing: "linear" })
      .should("be.visible");

    cy.get("table")
      .find("tr")
      .eq(1)
      .contains(users.content[0].number);

    cy.get("table")
      .find("tr")
      .eq(1)
      .click({ force: true });
  });
});
