import SignInForm from "./SignInForm";
import { BrowserRouter as Router } from 'react-router-dom';

describe("SignInForm", () => {
  it("should render", () => {
    cy.mount(
        <Router>
            <SignInForm />
        </Router>
        );
    });
    it("should contain a form", () => {
        cy.mount(
            <Router>
                <SignInForm />
            </Router>
            );
        cy.get("form").should("exist");
    });
    it("should contain a link to register", () => {
        cy.mount(
            <Router>
                <SignInForm />
            </Router>
            );
        cy.get("a").should("exist");
    });
    it("should contain a button", () => {
        cy.mount(
            <Router>
                <SignInForm />
            </Router>
            );
        cy.get("button").should("exist");
    });
    it("should contain a input", () => {
        cy.mount(
            <Router>
                <SignInForm />
            </Router>
            );
        cy.get("input").should("exist");
    });
});