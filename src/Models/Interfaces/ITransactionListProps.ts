import { TransactionDetails } from "../Dto/TransactionDetails";

export interface ITransactionListProps {
    transactions: TransactionDetails[];
    nameOfBankAccount: string;
    bankAccountNumber: number;
}