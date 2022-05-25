/// <reference types = "cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


/*
Required to place Sign Up and Sign Out together only for this challenge to demonstrate flow 
due to "experimentalSessionAndOrigin" required for Cypress 9.7.0
This makes Cypres navigating to a blank page between each test

Sign Up and Sign Out can be in different tests to allow maintainability

**/
describe("Sign Up & Sign Out flows", () => {    
    //Addition code for the challenge
    it("Should not sign up user if any field is empty", () => {
        cy.visit("/")
        cy.get('#login-dblue').click()
        cy.get('a[href="/signup"]').click()
        cy.get('#email').clear()
        cy.get('#password').clear()
        cy.get('input[type="submit"]').click()
        cy.get('.toast-body').should('not.exist')

    })

    //Addition code for the challenge
    it("Should not sign up user if email has already been taken", () => {
        cy.visit("/")
        cy.get('#login-dblue').click()
        cy.get('a[href="/signup"]').click()
        cy.get('#email').type("asdf@13.com")
        cy.get('#password').type("Test!1234")
        cy.get('input[type="submit"]').click()
        cy.contains('.alert-danger','Validation failed: Email has already been taken').should('exist')

    })

    
    it("Should sign up user & then sign out", () => {
        cy.visit("/")
        cy.get('#login-dblue').click()
        cy.get('a[href="/signup"]').click()         
        cy.get('#email').clear().type("asdf@033.com")
        cy.get('#password').clear().type("Test!1234")
        cy.get('input[type="submit"]').click()

        //Assert user is successfully signed up
        expect(cy.get('.toast-body')).to.exist

        //Click CloudApp logo
        cy.get('[data-testid="cloudapp-logo"]').click()

        //Assert user can see Main Menu
        expect(cy.get('#main-menu'), "Main menu not visible").to.exist

        //Sign out user 
        cy.get('#main-menu').click()

        cy.wait(1000)

        //Click Sign Out
        cy.get('[data-testid="dropdown-link-sign_out"]').click()

        //Assert user is successfully logged out
        cy.contains('.alert-success', "Successfully Logged Out").should('exist') 
        
    })


   

})

