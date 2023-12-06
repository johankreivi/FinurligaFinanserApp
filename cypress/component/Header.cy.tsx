import Header from '../../src/Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const userName: string = "TestUser";
const balance: number = 1;

const headerComponent = 
<Router>
    <Header userDetails={{firstName: "Test", lastName: "User", id: 1}} 
        setCookie={function (name: string, value: any): void {
            throw new Error("Function not implemented.");
    }}/>
</Router>

 describe("Header", () =>{
  it("should render", () => {
    cy.mount(headerComponent);
  });
  it("should contain logout-button", () =>{
    cy.mount(headerComponent);
    cy.get('[data-testid="header-logout-button"]').should('exist');
    cy.get('[data-testid="header-logout-button"]').should('have.text', 'Logga ut');
  });
  
  it("should contain logo and correct image source", () =>{
    cy.mount(headerComponent);
    cy.get('[data-testid="header-logo"]').should('exist');
    cy.get('[data-testid="header-logo"]').should('have.attr', 'src', '/fflogo.png');    
      

  });
  it("should contain \"Skapa bankkonto\" button", () =>{
    cy.mount(headerComponent);
    cy.get('[data-testid="create-bankaccount-button"]').should('exist');
    cy.get('[data-testid="create-bankaccount-button"]').should('have.prop', 'tagName', 'BUTTON');
    cy.get('[data-testid="create-bankaccount-button"]').should('have.text', 'Lägg till bankkonto');
  });
  })