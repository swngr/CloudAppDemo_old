/// <reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  
describe("Log In flow", () => {
    //defining global variable to be used in cy.session()
    let name = "asdf@13.com"

    it("Navigate to Sign In section", () => {
        //Navigate to the website
        cy.visit("/")

        //Click Log In button
        cy.get('#login-dblue').click()
    })
    
    //Addition code for the challenge
    it("Should not log in user with invalid email / password combination", () => {
        //required to avoid CSRF token issue
        cy.session(name, () => {
            cy.visit("/")
            cy.get('#login-dblue').click()
            cy.get('[data-testid="regular-login-email"]').type(name)
            cy.get('[data-testid="regular-login-password"]').type("Test!")
            cy.get('input[type="submit"]').click()
            cy.contains('.alert-danger', "Invalid email / password combination")
          })

    })

    it("Should log in user", () => {   
        cy.visit("/")
        cy.get('#login-dblue').click()
        
        //Enter username and password and hit Log in button
        cy.get('[data-testid="regular-login-email"]').type(name)
        cy.get('[data-testid="regular-login-password"]').type("Test!1234")
        cy.get('input[type="submit"]').click()
        
        //Assert user is at the right place 
        expect(cy.get('.alert-message').contains("Welcome back!"), "User is not in Home Page")
    })
    

})
