import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { UserDetails } from '../Models/Dto/UserDetails';
import { ITransactionViewProps } from '../Models/Interfaces/ITransactionViewProps';
import TransactionList from '../Components/TransactionList';
import { TransactionDetails } from '../Models/Dto/TransactionDetails';
import { deleteBankAccount, getBankAccountTransactions, getUserDetails } from '../Services/APIService';
import { Button, Col, Row } from 'react-bootstrap';
import ModalEditBankAccountName from '../Components/ModalEditBankAccountName';
import ModalDeleteBankAccount from '../Components/ModalDeleteBankAccount';
import { ArrowLeft, Trash } from 'react-bootstrap-icons';

const TransactionView: FC<ITransactionViewProps> = (props) => {  

    const redirect = useNavigate();    
    const handleRedirectBack = () => redirect('/home');

    const location = useLocation();  // This lets us access properties passed in the redirect function via a state.
    
    const { state } = location;                                         // This is how we break out the state from location.
    const bankAccountId: number = state && state.id;                    // Breaking out the property "id" from the state.
    const nameOfBankAccount: string = state && state.nameOfAccount;     // Breaking out the property "nameOfAccount" from the state.
    const bankAccountNumber: number = state && state.bankAccountNumber; // Breaking out the property "bankAccountNumber" from the state.

    const [userDetails, setUserDetails] = useState<UserDetails>({id: -1, firstName: "", lastName: ""});
    const [transactions, setTransactions] = useState<TransactionDetails[]>([]);

    const [showEditName, setShowEditName] = useState<boolean>(false);
    const [showDeleteAccount, setshowDeleteAccount] = useState<boolean>(false);

    useEffect(() => {
        if(!props.cookieUser || !props.cookieUser.isAuthorized){
            redirect('/');
        }

        const getAllTransactions = async () => {
            const transactionsResult = await getBankAccountTransactions(bankAccountId);
            setTransactions(transactionsResult);
        }

        const getFullName = async () => {
            const user = await getUserDetails(props.cookieUser?.id);
            setUserDetails(user);
        }

        getAllTransactions();
        getFullName();        
    }, [props.cookieUser, props.cookieUser.isAuthorized, redirect, bankAccountId]);
   

    const handleShowDeleteAccount = async () => {
        setshowDeleteAccount(true);
    }

    const handleCloseDeleteAccount = () =>{
        setshowDeleteAccount(false);
    }

    const handleSubmitDeleteAccount = async () => {
        if (nameOfBankAccount === "Privatkonto") {
            if (props.handleAlert === undefined || props.setAlertMessage === undefined) return;
            props.handleAlert(false);
            props.setAlertMessage("Det är förbjudet att ta bort Privatkonto.");
            setshowDeleteAccount(false);
            return;
        }
        try {
            await deleteBankAccount(bankAccountId);
            setshowDeleteAccount(false);
            if (props.handleAlert === undefined || props.setAlertMessage === undefined) return;
            props.handleAlert(true);
            props.setAlertMessage(`${nameOfBankAccount} är borttaget.`);            
            redirect("/home");
        } catch{
            if (props.handleAlert === undefined || props.setAlertMessage === undefined) return;
            props.handleAlert(false);
            props.setAlertMessage(`Något gick fel vid borttagning av ${nameOfBankAccount}. Försök igen!`); 
        }
        
    }    

    const handleCloseEditName = () =>{
        setShowEditName(false);
    }

    const handleSubmitEditName = (newName?: string) => {
        setShowEditName(false);
        alert(`Ej implementerad ännu. Försökte byta namn på "${nameOfBankAccount}" med id:${bankAccountId}. Nytt namn: "${newName}"`);
    }

    return(
        <Container className="mx-0 px-0" fluid style={{color: 'white'}}>
            <Header 
                removeCookie={props.removeCookie}
                setCookie={props.setCookie}
                userDetails={userDetails} 
            />
            <h2 className="text-center mt-3">Transaktionshistorik - {nameOfBankAccount}</h2>
            <TransactionList bankAccountNumber={bankAccountNumber} nameOfBankAccount={nameOfBankAccount} transactions={transactions} />
            <ModalEditBankAccountName handleClose={handleCloseEditName} handleSubmit={handleSubmitEditName} show={showEditName}/>
            <ModalDeleteBankAccount handleClose={handleCloseDeleteAccount} handleSubmit={handleSubmitDeleteAccount} show={showDeleteAccount}/>
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                    
                        <Button className="btn-sm" variant="primary" onClick={handleRedirectBack}><ArrowLeft className='m-1' size={18}/>Tillbaka</Button>
                    </Col>
                    {/* <Col xs="auto">
                        <Button className="btn-sm" variant="info" onClick={handleShowEditName}>Byt namn<Pencil className='m-1' size={18}/></Button>
                    </Col> */}
                    <Col xs="auto">
                        <Button className="btn-sm" variant="danger" onClick={handleShowDeleteAccount}>Avsluta konto<Trash className='m-1' size={18}/></Button>
                    </Col>                    
                </Row>
            </Container>
        </Container>
    );
}

export default TransactionView;