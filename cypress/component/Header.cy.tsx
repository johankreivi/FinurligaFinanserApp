import Header from '../../src/Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const userName: string = "TestUser";
const balance: number = 1;

const headerComponent = 
<Router>
    <Header fullName={{firstName: "Test", lastName: "User", id: 1}} balance={balance} userName={userName}
        handleShowModal={function(): void {
            throw new Error("Function not implemented.");
        }} 
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
  it("should contain name and balance", () =>{
    cy.mount(headerComponent);
    cy.get('[data-testid="header-username-and-balance"]').should('exist');
    cy.get('[data-testid="header-username-and-balance"]').should('have.text', `Test User ${balance} kr`);


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
    cy.get('[data-testid="create-bankaccount-button"]').should('have.text', 'Skapa bankkonto');
  });
  })

  /*
[X] Om logga ut finns
[X] Om namn skrivs ut i header
[X] Om saldo skrivs ut i header
[X] Om logo visas i header
  */