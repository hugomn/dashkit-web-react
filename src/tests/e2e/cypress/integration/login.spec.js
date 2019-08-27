describe("Login integration tests", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Logs the user in with an incorrect password", function() {
    cy.url().should("include", "/login");

    cy.get("input[name=email]")
      .type(Cypress.env("email"))
      .should("have.value", Cypress.env("email"));
    cy.get("input[name=password]")
      .type("randomvalue")
      .should("have.value", "randomvalue");

    cy.get("form").submit();

    cy.wait(5000)
      .window()
      .its("store")
      .invoke("getState")
      .its("auth.error.code")
      .should("eq", "NotAuthorizedException");
  });

  it("Logs in a user without admin rights", function() {
    cy.get("input[name=email]")
      .type(Cypress.env("email"))
      .should("have.value", Cypress.env("email"));
    cy.get("input[name=password]")
      .type(Cypress.env("password"))
      .should("have.value", Cypress.env("password"));

    cy.get("form").submit();

    cy.url().should("include", "/users");
    cy.get("header").contains("Sign out");
    cy.get("header").contains("Users");
    cy.get("header").should("not.contain", "Admin");
  });

  it("Logs in a user with admin rights", function() {
    cy.get("input[name=email]")
      .type(Cypress.env("adminemail"))
      .should("have.value", Cypress.env("adminemail"));
    cy.get("input[name=password]")
      .type(Cypress.env("password"))
      .should("have.value", Cypress.env("password"));

    cy.get("form").submit();

    cy.url().should("include", "/users");

    cy.get("header").contains("Users");
    cy.get("header").contains("Admin");
    cy.get("header").contains("Sign out");
  });

  it("Signs the user out", function() {
    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.visit("/");

    cy.get("[data-testid=signout]").click();

    cy.url().should("include", "/login");
  });
});
