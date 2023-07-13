//<reference types="cypress" />
// "cy": "cypress open"
describe("Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Sayfa sorunsuz render oluyor", () => {
    cy.get("[data-testid ='firstname']").should("exist");
    cy.get("[data-testid ='lastname']").should("exist");
    cy.get("[data-testid ='email']").should("exist");
    cy.get("[data-testid ='password']").should("exist");
    cy.get("[data-testid ='terms']").should("exist");
    cy.get("[data-testid ='submit']").should("exist");
    //basit alternatif
    cy.get("input").should("have.length", 5);
    cy.get("button[type='submit']").should("have.length", 1);
  });

  it("Gönder başta disabled", () => {
    cy.get("[data-testid ='submit']").should("have.disabled", "true");
  });

  const passingFormData = {
    firstname: "denemead",
    lastname: "denemesoyad",
    email: "deneme@deneme.com",
    password: "1234pass",
    terms: true,
  };
  const failingFormData = {
    firstname: "de",
    lastname: "de",
    email: "denemedeneme.com",
    password: "1234",
    terms: false,
  };
  it("Form başarıyla gönderiliyor", () => {
    const ffirstname = cy.get("[data-testid ='firstname']");
    const flastname = cy.get("[data-testid ='lastname']");
    const femail = cy.get("[data-testid ='email']");
    const fpassword = cy.get("[data-testid ='password']");
    const fterms = cy.get("[data-testid ='terms']");

    ffirstname.type(passingFormData.firstname);
    flastname.type(passingFormData.lastname);
    femail.type(passingFormData.email);
    fpassword.type(passingFormData.password);
    fterms.check();

    cy.get("[data-testid ='submit']").should("not.have.disabled", "true");
    cy.get("[data-testid ='submit']").click();

    cy.get("ul li")
      .should("have.length", 1)
      .last()
      .should("have.text", passingFormData.firstname);
  });

  it("yuo validation çalışıyor", () => {
    const ffirstname = cy.get("[data-testid ='firstname']");
    const flastname = cy.get("[data-testid ='lastname']");
    const femail = cy.get("[data-testid ='email']");
    const fpassword = cy.get("[data-testid ='password']");

    ffirstname.type(failingFormData.firstname);
    flastname.type(failingFormData.lastname);
    femail.type(failingFormData.email);
    fpassword.type(failingFormData.password);
    cy.get("[data-testid ='terms']").dblclick();

    cy.get("[data-testid ='submit']").should("have.disabled");

    const errorMessages = cy.get(".form-error");
    errorMessages.should("have.length", 5);

    cy.get(".form-error")
      .eq(0)
      .should("have.text", "Firstname must be at least 3 characters long.");
    cy.get(".form-error")
      .eq(1)
      .should("have.text", "Lastname must be at least 3 characters long.");
    cy.get(".form-error")
      .eq(2)
      .should("have.text", "Must be a valid email address.");
    cy.get(".form-error")
      .eq(3)
      .should("have.text", "Passwords must be at least 6 characters long.");
    cy.get(".form-error")
      .eq(4)
      .should("have.text", "You must accept Terms and Conditions");
  });
  // it("Firstname control", () => {
  //   cy.get("[name ='firstname']").should("have.value", "denemead");
  //   cy.get("[name ='lastname']").should("have.value", "denemesoyad");
  //   cy.get("[name ='email']").should("have.value", "deneme@deneme.com");
  //   cy.get("[name ='password']").should("have.value", "denemepass");
  //   cy.get("[name ='terms']").should("have.checked", "true");
  //   cy.get("[name ='button']").should("have.disabled", "false");

  //   // cy.get("input[name=firstname]").type(firstname);
  // });
  // it("eleman kontrolü", () => {
  //   cy.get("[data-cy ='submit']").should("have.length", 4);
  // });
});
