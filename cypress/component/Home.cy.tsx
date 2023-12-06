import Home from "../../src/Views/Home"
import { BrowserRouter as Router } from 'react-router-dom';


const fakeUserId: number  = 1;

const userCookieValue: string = "%7B%22id%22%3A3%2C%22userName%22%3A%22Bobo55%22%2C%22isAuthorized%22%3Atrue%7D";
// const apiUri = "https://localhost:7030/api/BankAccount";
// const apiUserBankAccounts= `${LOCALHOST}/BankAccount/User/${fakeUserId}}`;
// const apiGetUserDetails = `${LOCALHOST}/UserAccount/GetUserInfo/${fakeUserId}`;

const homeComponent = 
<Router>
    <Home
    setCookie={function (name: string, value: any): void {
        throw new Error("Function not implemented.");
        }}
    cookieUser={userCookieValue}
    />
</Router>

describe("Home", () => {
    beforeEach(() => {
        cy.setCookie("user", userCookieValue);
        cy.intercept('GET', '**').as('allGetRequests');
        cy.intercept('POST', '**').as('allPostRequests');
        cy.log('kommer vi hit?')
        // cy.intercept('POST', apiUserBankAccounts).as('getAllUserBankAccounts');  
        // cy.intercept('POST', apiGetUserDetails).as('getUserDetails');
        cy.mount(homeComponent)    
    })
    afterEach(() => {
        cy.clearCookies();

    })
    it("should render if cookie exists and user is authorized", () => {
        cy.get('[data-testid="home-component"]').should('exist');
    })
})