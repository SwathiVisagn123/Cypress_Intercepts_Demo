describe("validate UI for user notifications", () => {
  beforeEach("login the application", () => {
    cy.loginApp();
  });

  it("should return a status code of 200", () => {
    cy.intercept("http://localhost:3001/notifications").as("notifications");
    cy.get('[data-test="nav-top-notifications-link"]').click();
    cy.wait("@notifications").its("response.statusCode").should("eq", 200);
  });

  it("stub response code to 401", () => {
    cy.intercept("GET", "/notifications", {
      statusCode: 401,
    }).as("notifications");
    cy.get('[data-test="nav-top-notifications-link"]').click();
    cy.wait("@notifications").its("response.statusCode").should("eq", 401);
    cy.get('[data-test="empty-list-header"]').should("exist");
  });
});
