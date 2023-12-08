import { BankAccount } from "../Dto/BankAccount";
import { IModalProps } from "./IModalProps";

export interface IModalTransactionProps extends IModalProps {
    listOfBankAccounts: BankAccount[]
    refresh: () => void;
    onTransactionComplete: () => void;
}