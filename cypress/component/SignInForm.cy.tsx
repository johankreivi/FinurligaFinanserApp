import SignInForm from "../../src/Components/SignInForm";
import { BrowserRouter as Router } from 'react-router-dom';

describe("SignInForm", () => {
  it("should render", () => {
    cy.mount(
        <Router>
            <SignInForm setCookie={function (name: string, value: any): void {
                throw new Error("Function not implemented.");
                }} />
        </Router>
        );
    });
    it("should contain a form", () => {
        cy.mount(
            <Router>
            <SignInForm setCookie={function (name: string, value: any): void {
                throw new Error("Function not implemented.");
                }} />
            </Router>
            );
        cy.get("form").should("exist");
    });
    it("should contain a link to register", () => {
        cy.mount(
            <Router>
            <SignInForm setCookie={function (name: string, value: any): void {
                throw new Error("Function not implemented.");
                }} />
            </Router>
            );
        cy.get("a").should("exist");
    });
    it("should contain a button", () => {
        cy.mount(
            <Router>
            <SignInForm setCookie={function (name: string, value: any): void {
                throw new Error("Function not implemented.");
                }} />
            </Router>
            );
        cy.get("button").should("exist");
    });
    it("should contain a input", () => {
        cy.mount(
            <Router>
            <SignInForm setCookie={function (name: string, value: any): void {
                throw new Error("Function not implemented.");
                }} />
            </Router>
            );
        cy.get("input").should("exist");
    });
});