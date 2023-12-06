import { FC, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateBankAccountForm from '../Components/CreateBankAccountForm';
import { BankAccount } from '../Models/Dto/BankAccount';
import { getAllUserBankAccounts, getUserDetails } from '../Services/APIService';
import BankAccountList from '../Components/BankAccountList';
import { UserDetails } from '../Models/Dto/UserDetails';

const Home: FC<IRegisterFormProps> = (props) => {  
    const redirect = useNavigate();    

    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

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

    const [userDetails, setUserDetails] = useState<UserDetails>({id: -1, firstName: "", lastName: ""});
    const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);
    const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);

    

    const [listOfBankAccounts, setListOfBankAccounts] = useState<BankAccount[]>([]);

    return(
        <Container className="mx-0 px-0" fluid style={{color: 'white'}}>
            <Header 
                removeCookie={props.removeCookie}
                setCookie={props.setCookie}
                userName={props.cookieUser?.userName}
                fullName={userDetails} 
                balance={0} 
                handleShowModal={handleShowCreateAccountModal} 
            />
            <Row className='height-100'>
            <BankAccountList refresh={refresh} listOfBankAccounts={listOfBankAccounts}/>            
            </Row>
            <Row>
                <CreateBankAccountForm 
                    handleAlert={props.handleAlert} 
                    setAlertMessage={props.setAlertMessage} 
                    cookieUser={props.cookieUser}
                    show={showCreateAccountModal}
                    handleClose={handleCloseCreateAccountModal}
                    refresh={refresh} 
                />
            </Row>
        </Container>
    );
}

export default Home;