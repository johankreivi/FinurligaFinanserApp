import { FC } from "react";
import { IBankAccountListProps } from "../Models/Interfaces/IBankAccountListProps";
import { Row, Table, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InfoSquare } from 'react-bootstrap-icons';


const BankAccountList: FC<IBankAccountListProps> = (props) => {
    const redirect = useNavigate();

    const handleRedirectToDetails = (bankAccountId:number, nameOfAccount: string, bankAccountNumber: number) =>{
        redirect('/transactionview',{
            state: {
                id: bankAccountId,
                nameOfAccount: nameOfAccount,
                bankAccountNumber: bankAccountNumber
            }
        });
    }

    return (
        <Row data-testid="bankaccount-list" className="mt-5">
            <Col className="col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2"></Col>
                <Col className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">     
                        <Table className="mb-0" striped bordered hover variant="dark" data-testid="bankaccounts-table">
                            <thead>
                                <tr>          
                                    <th className="col-2">Kontonamn</th>
                                    <th className="col-1">Kontonummer</th>
                                    <th className="col-1">Saldo</th>
                                    <th className="col-1"></th>
                                </tr>
                            </thead>
                            <tbody data-testid="bankaccounts-rows">
                                {
                                    props.listOfBankAccounts.map(item => 
                                        <tr data-testid={`account_row_${item.id}`} key={`account_row_${item.id}`}>
                                            <td data-testid={`account_row_nameofaccount_${item.id}`}>{item.nameOfAccount}</td>
                                            <td data-testid={`account_row_accountnumber_${item.id}`}>{item.accountNumber}</td>
                                            <td data-testid={`account_row_balance_${item.id}`}>{item.balance.toFixed(2)} kr</td>
                                            <td data-testid={`account_row_detailsbutton_${item.id}`} className="text-center">
                                                <Button className="btn-sm" 
                                                onClick={() => handleRedirectToDetails(item.id, item.nameOfAccount, item.accountNumber)} 
                                                variant="info">
                                                    <InfoSquare className="m-0" size={18}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td style={{ fontWeight: "bold", borderTop: "2px solid white" }}>Totalt saldo</td>
                                    <td style={{ fontWeight: "bold", borderTop: "2px solid white" }}></td>
                                    <td style={{ fontWeight: "Bold", borderTop: "2px solid white" }}>{props.listOfBankAccounts.reduce((total, account) => total + account.balance, 0).toFixed(2)} kr</td>
                                    <td style={{ fontWeight: "Bold", borderTop: "2px solid white" }}></td>
                                </tr>
                            </tbody>
                        </Table>
                </Col>
            <Col className="col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2"></Col>
        </Row>
    )
}
export default BankAccountList;