import { BrowserRouter as Router } from 'react-router-dom';
import { BankAccount } from '../../src/Models/Dto/BankAccount';
import BankAccountList from '../../src/Components/BankAccountList';


const bankAccounts: BankAccount[]=  [
    {
        accountNumber: 1111111111, 
        balance: 10,
        id: 1,
        nameOfAccount: 'TestAccount1'
    },
    {
        accountNumber: 2222222222, 
        balance: 20,
        id: 2,
        nameOfAccount: 'TestAccount2'
    },
    {
        accountNumber: 3333333333, 
        balance: 30,
        id: 3,
        nameOfAccount: 'TestAccount3'
    },
    {
        accountNumber: 4444444444, 
        balance: 40,
        id: 4,
        nameOfAccount: 'TestAccount4'
    },
    {
        accountNumber: 5555555555, 
        balance: 50,
        id: 5,
        nameOfAccount: 'TestAccount5'
    }
]

const userCookieValue: string = "%7B%22id%22%3A3%2C%22userName%22%3A%22Bobo55%22%2C%22isAuthorized%22%3Atrue%7D";

const bankAccountListComponent = 
<Router>
    <BankAccountList listOfBankAccounts={bankAccounts}  
    refresh={function (): void {
        throw new Error("Function not implemented.");
        }}
    handleShowModal={function (): void {
        throw new Error("Function not implemented.");
        }}/>
</Router>

describe("BankAccountList", () =>{
    beforeEach(()=>{
        cy.setCookie("user", userCookieValue);
        cy.mount(bankAccountListComponent)
    })
    afterEach(() => {
        // Behövs något återställas efter varje test?
    })
    it("should render", () =>{
        cy.get('[data-testid="bankaccount-list"]').should('exist');
    });
    it("should contain a table called bankaccounts-table", () =>{
        cy.get('[data-testid="bankaccounts-table"]').should('exist');
    });
    it("should be as many tablerows as there are accounts", () =>{
        cy.get('[data-testid="bankaccounts-rows"]').children().should('have.length', bankAccounts.length + 1);
    });
    it("should be as many tablerows as there are accounts", () =>{
        for(let i = 0; i < bankAccounts.length; i++){
            cy.get(`[data-testid="account_row_nameofaccount_${bankAccounts[i].id}"]`).should('exist');
            cy.get(`[data-testid="account_row_nameofaccount_${bankAccounts[i].id}"]`).should('have.text', `${bankAccounts[i].nameOfAccount}`);

            cy.get(`[data-testid="account_row_accountnumber_${bankAccounts[i].id}"]`).should('exist');
            cy.get(`[data-testid="account_row_accountnumber_${bankAccounts[i].id}"]`).should('have.text', `${bankAccounts[i].accountNumber}`);

            cy.get(`[data-testid="account_row_balance_${bankAccounts[i].id}"]`).should('exist');
            cy.get(`[data-testid="account_row_balance_${bankAccounts[i].id}"]`).should('have.text', `${bankAccounts[i].balance.toFixed(2)} kr`);
        }
    });
    
})