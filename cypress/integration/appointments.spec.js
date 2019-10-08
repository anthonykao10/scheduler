describe("appointments", () => {

  beforeEach(() => {
    // Reset db
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Select first empty appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // Input appointment details
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.get("button").contains("Save").click();

    // Verify 2 "Show" components are displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Select "edit" on the booked appointment
    cy
    .contains("Archie Cohen")
    .get("[alt=Edit]")
    .click({ force: true });

    // Input appointment details
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.get("button").contains("Save").click();

    // Verify edited component
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });

  it("should cancel an interview", () => {
    cy
    .contains("Archie Cohen")
    .get("[alt=Delete]")
    .click({ force: true });

    cy.contains("Confirm").click()

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});