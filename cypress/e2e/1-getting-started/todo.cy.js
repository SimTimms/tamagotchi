/// <reference types="cypress" />

context("Assertions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Implicit Assertions", () => {
    it("Check the backgroud image exists", () => {
      // https://on.cypress.io/should
      cy.get(".background")
        .should("be.visible")
        .and(
          "have.css",
          "background-image",
          `url("http://localhost:5173/src/assets/background.jpg")`
        )
        .then(($el) => {
          const url = $el.css("background-image").match(/url\("(.*)"\)/)[1];
          cy.request({ url, failOnStatusCode: false })
            .its("status")
            .should("eq", 200);
        });
    });

    it("Check the title exists", () => {
      cy.get(".ui-title-text").contains("たまごっち");
    });

    it("Check the subtitle exists", () => {
      cy.get(".ui-title-text-back").contains("Tama-not-chi Challenge");
    });

    it("Check the audioRef components exists", () => {
      cy.get('[data-cy="audio-ref"]');
      cy.get('[data-cy="audio-clean"]');
      cy.get('[data-cy="audio-attention"]');
    });

    it("Check the IntroScene components exists", () => {
      cy.get('[data-cy="intro-scene"]');
    });
  });

  describe("Continue to Experience", () => {
    it("Validates I click the PLAY button", () => {
      cy.get('[data-cy="intro-scene"]').click("center");
    });
  });
  describe("Check the contact details", () => {
    it("Check the contact details", () => {
      cy.get(".ui-right").contains("Tim Simms");
      cy.get(".ui-right").contains("React and Three.js Developer");
    });
  });
});
