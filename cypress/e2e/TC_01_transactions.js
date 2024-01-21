describe("validate UI for no results in user transactions", () => {
  it("should display a user friendly message for no results", () => {
    cy.loginApp();
    cy.intercept("/transactions", {
      body: {
        pageData: {
          page: 1,
          limit: 10,
          hasNextPages: true,
          totalPages: 24,
        },
        results: {},
      },
    }).as("personalTransactions");
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test="transaction-item]').should("not.exist");
  });
});
