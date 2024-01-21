describe("validate user login", () => {
  it("should modify the username in request payload", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "/login", (req) => {
      req.body.username = "Jessyca.Kuhic";
    }).as("interceptedLogin");
    cy.get('[data-test="signin-username"]').type("Katharina_Bernier");
    cy.get('[data-test="signin-password"]').type("s3cret");
    cy.get('[data-test="signin-submit"]').click();
    cy.wait("@interceptedLogin")
      .its("request.body.username")
      .should("eq", "Jessyca.Kuhic");
  });
});
