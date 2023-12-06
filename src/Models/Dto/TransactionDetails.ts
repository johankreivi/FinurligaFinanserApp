export type TransactionDetails = {
    receivingAccountNumber: number;
    sendingAccountNumber: number; 
    amount: number;
    timeStamp: Date;
    transactionType: number;
    message: string;
    accountBalance: number;
}