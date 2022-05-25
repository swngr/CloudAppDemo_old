/// <reference types = "cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


describe("Update avatar flow", () => {
    it("Should update name, company and role", () => {
        
        cy.visit("/")
        cy.get('#login-dblue').click()
        cy.get('[data-testid="regular-login-email"]').type("asdf@13.com")
        cy.get('[data-testid="regular-login-password"]').type("Test!1234")
        cy.get('input[type="submit"]').click()

        //Click on user main menu dropdown
        cy.get('#main-menu').click()
        
        cy.wait(1000)

        //Click on Settings
        cy.get('[data-testid="dropdown-link-settings"]').click()

        //Assert you're in Profile page
        expect(cy.get('#profile div h3').contains(("Your profile")))

        //Update Name, Company, Role and Submit
        cy.get('[data-testid="settings-about-you-name-field"]').clear().type("Demo_2")
        cy.get('[data-testid="settings-about-you-company-field"]').clear().type("CloudApp")
        cy.get('[data-testid="settings-about-you-profile-field"]').select("engineering")
        cy.get('[data-testid="onboarding-submit-about-you-form"]').click()

        //Assert that changes have been updated successfully
        cy.contains('.alert-success',"Account updated successfully").should('exist')

    })

})





