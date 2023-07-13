/// <reference types="cypress" />
// "cy": "cypress open"
describe("Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Firstname control", () => {
    cy.get("[name ='firstname']").should("have.value", "denemead");
    cy.get("[name ='lastname']").should("have.value", "denemesoyad");
    cy.get("[name ='email']").should("have.value", "deneme@deneme.com");
    cy.get("[name ='password']").should("have.value", "denemepass");
    cy.get("[name ='terms']").should("have.checked", "true");
    cy.get("[name ='button']").should("have.disabled", "false");

    // cy.get("input[name=firstname]").type(firstname);
  });
  // it("eleman kontrolü", () => {
  //   cy.get("[data-cy ='submit']").should("have.length", 4);
  // });
});
