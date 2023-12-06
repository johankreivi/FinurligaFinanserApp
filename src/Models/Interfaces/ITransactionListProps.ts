import { TransactionDetails } from "../Dto/TransactionDetails";

export interface ITransactionListProps {
    transactions: TransactionDetails[];
    handleRedirectBack: () => void;
}