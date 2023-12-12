export type TransactionDetails = {
    receivingAccountNumber: number;
    sendingAccountNumber: number; 
    amount: number;
    timeStamp: Date;
    type: number;
    message: string;
    accountBalance: number;
}