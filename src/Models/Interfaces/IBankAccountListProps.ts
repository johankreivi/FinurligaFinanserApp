import { BankAccount } from "../Dto/BankAccount";

export interface IBankAccountListProps {
    listOfBankAccounts: BankAccount[];
    handleShowModal: () => void;
    refresh: () => void;
}