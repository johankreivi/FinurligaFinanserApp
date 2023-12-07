export type PostTransactionDto = {
    sendingAccountNumber: number;
    receivingAccountNumber: number;
    amount: number
    message: string;
}