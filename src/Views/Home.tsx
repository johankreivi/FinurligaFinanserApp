import { FC, useEffect, useState } from 'react';
import { Row, Button, Col, Alert, } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateBankAccountForm from '../Components/CreateBankAccountForm';
import { BankAccount } from '../Models/Dto/BankAccount';
import { getAllUserBankAccounts, getUserDetails } from '../Services/APIService';
import BankAccountList from '../Components/BankAccountList';
import { UserDetails } from '../Models/Dto/UserDetails';
import ModalTransaction from '../Components/ModalTransaction';
import { ArrowClockwise, PlusCircle } from 'react-bootstrap-icons';


const Home: FC<IRegisterFormProps> = (props) => {  
    const redirect = useNavigate();    

    const [showCreateAccountModal, setShowCreateAccountModal] = useState<boolean>(false);
    const [showNewTransaction, setShowNewTransaction] = useState<boolean>(false);

    useEffect(() => {
        if(!props.cookieUser || !props.cookieUser.isAuthorized){
            redirect('/');
        }
        refresh();
        getFullName();
    }, [props.cookieUser?.isAuthorized, redirect]);

    const refresh = async () => {        
        try {
            const accounts = await getAllUserBankAccounts(props.cookieUser?.id);
            setListOfBankAccounts(accounts);
        } catch (error) {
            console.error('Error fetching bank accounts:', error);
        }
    }

    const getFullName = async () => {
        const user = await getUserDetails(props.cookieUser?.id);
        setUserDetails(user);
    }

    const [userDetails, setUserDetails] = useState<UserDetails>({id: -1, firstName: "aa", lastName: "bb"});
    const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);
    const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);

    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const [listOfBankAccounts, setListOfBankAccounts] = useState<BankAccount[]>([]);


    const handleShowNewTransaction = () => {
        setShowNewTransaction(true);
    }
    const handleCloseNewTransaction = () => {
        setShowNewTransaction(false);
    }

    const handleSubmitNewTransaction = () => {
        setShowNewTransaction(false);
    }

    return(
        <Container data-testid="home-component" className="mx-0 px-0" fluid style={{color: 'white'}}>
            <Header 
                removeCookie={props.removeCookie}
                setCookie={props.setCookie}
                userDetails={userDetails} 
            />
            <Row className='height-100'>
            <BankAccountList handleShowModal={handleShowCreateAccountModal} refresh={refresh} listOfBankAccounts={listOfBankAccounts}/>            
            </Row>
            <Row className='width-100'>
            </Row>
            <Row>
                <CreateBankAccountForm 
                    cookieUser={props.cookieUser}
                    show={showCreateAccountModal}
                    handleClose={handleCloseCreateAccountModal}
                    refresh={refresh} 
                />
            </Row>
            <div>
            {showAlert && (
                <Alert variant="success">
                    Transaktionen har genomförts!
                </Alert>
            )}
            <ModalTransaction refresh={refresh} listOfBankAccounts={listOfBankAccounts} show={showNewTransaction} handleClose={handleCloseNewTransaction} handleSubmit={handleSubmitNewTransaction} onTransactionComplete={handleShowAlert}/>
            </div>
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                        <Button className="btn-sm" variant="success" onClick={handleShowCreateAccountModal} data-testid="create-bankaccount-button" ><PlusCircle className='m-1' size={18}/> Lägg till bankkonto</Button>
                    </Col>
                    <Col xs="auto">
                        <Button className="btn-sm" variant="success" onClick={handleShowNewTransaction}><PlusCircle className='m-1' size={18}/> Ny transaktion</Button>
                    </Col>
                    <Col xs="auto">
                        <Button className="btn-sm" variant="info" onClick={refresh}>Uppdatera<ArrowClockwise className='m-1' size={18}/></Button>
                    </Col>
                    
                </Row>
            </Container>
        </Container>
    );
}

export default Home;