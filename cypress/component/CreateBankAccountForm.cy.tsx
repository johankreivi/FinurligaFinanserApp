import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../src/Views/Home';

const userCookieValue: string = "%7B%22id%22%3A3%2C%22userName%22%3A%22Bobo55%22%2C%22isAuthorized%22%3Atrue%7D";
const accountName: string = "TestBankAccountName";
const accountNumber: number = 1234567890;
const confirmationMessage: string = `Bankkonto "${accountName}" skapades och tilldelades kontonummer ${accountNumber}.`;
const apiUri = "https://localhost:7030/api/BankAccount";

const homeComponent = 
<Router>
    <Home
    setCookie={function (name: string, value: any): void {
        throw new Error("Function not implemented.");
        }}
    cookieUser={userCookieValue}
    />
</Router>

describe("CreateBankAccountForm", () =>{
    beforeEach(()=>{
        cy.setCookie("user", userCookieValue);
        cy.intercept('POST', apiUri, {
            statusCode: 200,
            body: {
              accountNumber: accountNumber,
              nameOfAccount: accountName,
            },
          }).as('postBankAccount');
        cy.mount(homeComponent);
    })
    afterEach(() => {
        cy.clearCookies();
    })
    it("should render", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').should('exist');
    });
    it("should contain an input field with data-testid bankaccount-input", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-input"]').should('exist');
    });
    it("should contain Avbryt button", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-creation-modal-abort"]').should('exist');
        cy.get('[data-testid="bankaccount-creation-modal-abort"]').should('have.text', 'Avbryt');
    });
    it("should contain Bekräfta button", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-creation-modal-confirm"]').should('exist');
        cy.get('[data-testid="bankaccount-creation-modal-confirm"]').should('have.text', 'Bekräfta');
    });
    it("should display correct title and message after successful creation of bankaccount", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-input"]').type(accountName);
        cy.get('[data-testid="bankaccount-creation-modal-confirm"]').click();
        cy.get('[data-testid="bankaccount-created-title"]').should('exist');
        cy.get('[data-testid="bankaccount-created-title"]').should('have.text', 'Bankkonto skapat!');
        cy.get('[data-testid="bankaccount-created-text"]').should('have.text', confirmationMessage);
    });
    it("should warn if input is empty", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-creation-modal-confirm"]').click();
        cy.get('[data-testid="create-bankaccount-invalid-input"]').should('exist');
    });
    it("should contain Stäng button", () =>{
        cy.get('[data-testid="create-bankaccount-button"]').click();
        cy.get('[data-testid="bankaccount-input"]').type(accountName);
        cy.get('[data-testid="bankaccount-creation-modal-confirm"]').click();
        cy.get('[data-testid="bankaccount-created-close-button"]').should('exist');
        cy.get('[data-testid="bankaccount-created-close-button"]').should('have.text', 'Stäng');
    });
})