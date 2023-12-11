import { FC } from "react";
import { ITransactionListProps } from "../Models/Interfaces/ITransactionListProps";
import { Col, Row, Table } from "react-bootstrap";
import { transactionType } from "../Models/Enums/EnumTransactionsTypes";

const TransactionList: FC<ITransactionListProps> = (props) => {
    
    return(
        <Row data-testid="transaction-list" className="mt-3">
            <Col className="col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2">
            </Col>
            <Col className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
                <div className="tableBorder" style={{border: "1px #212529", backgroundColor: "#3DB2AF", padding: "10px", margin: "3px", borderRadius: "10px"}}>      
                {props.transactions && props.transactions.length > 0 ?
                    <Table className="mb-0" striped bordered hover variant="dark" data-testid="bankaccounts-table" >
                        <thead>
                            <tr>
                                <th className="col-1">Transaktionstyp</th>
                                <th className="col-1">Transaktionsdatum</th>
                                <th className="col-1">Avsändarkonto</th>
                                <th className="col-1">Mottagarkonto</th>
                                <th className="col-1">Transaktionsmeddelande</th>
                                <th className="col-1">Belopp</th>
                                <th className="col-1">Saldo</th>
                            </tr>
                        </thead>
                        <tbody data-testid="transaction-rows">
                            {props.transactions.map((item, index) => <tr data-testid={`account_row_${index}`} key={`account_row_${index}`}>
                                <td data-testid={`account_row_transactionType_${index}`}>{transactionType[item.type]}</td>
                                <td data-testid={`account_row_timeStamp_${index}`}>{item.timeStamp.toString()}</td>
                                <td data-testid={`account_row_sendingAccountNumber_${index}`}>{item.sendingAccountNumber === 0 ? '' : item.sendingAccountNumber}</td>
                                <td data-testid={`account_row_receivingAccountNumber_${index}`}>{item.receivingAccountNumber}</td>
                                <td data-testid={`account_row_message_${index}`}>{item.message}</td>
                                <td data-testid={`account_row_amount_${index}`}>{props.bankAccountNumber === item.sendingAccountNumber ? '-': ''}{item.amount.toFixed(2)} kr</td>
                                <td data-testid={`account_row_accountBalance_${index}`}>{item.accountBalance.toFixed(2)} kr</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    :
                    <Table className="mb-0" striped bordered hover variant="dark" data-testid="bankaccounts-table">
                        <tbody>
                            <tr>
                                <td>Det finns inga transaktioner att visa i "{props.nameOfBankAccount}"".</td>
                            </tr>
                        </tbody>
                    </Table>
                }
                </div>
            </Col>
            <Col className="col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2">
            </Col>
        </Row>
    )
}

export default TransactionList;