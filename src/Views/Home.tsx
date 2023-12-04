import { FC, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateBankAccountForm from '../Components/CreateBankAccountForm';
import { BankAccount } from '../Models/Dto/BankAccount';
import { getAllUserBankAccounts } from '../Services/APIService';

const Home: FC<IRegisterFormProps> = (props) => {  
    const redirect = useNavigate();    

    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

    useEffect(() => {
        if(!props.cookieUser || !props.cookieUser.isAuthorized){
            redirect('/');
        }
        const fetchData = async () => {
            try {
              const accounts = await getAllUserBankAccounts(props.cookieUser?.id);
              setListOfBankAccounts(accounts);
            } catch (error) {
              console.error('Error fetching bank accounts:', error);
            }
          };
      
          fetchData();
    }, [props.cookieUser?.isAuthorized, redirect]);


    const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);
    const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);

    const [listOfBankAccounts, setListOfBankAccounts] = useState<BankAccount[]>([]);

    return(
        <Container fluid style={{color: 'white'}}>
            <Header 
                removeCookie={props.removeCookie}
                setCookie={props.setCookie}
                userName={props.cookieUser?.userName} 
                balance={0} 
                handleShowModal={handleShowCreateAccountModal} 
            />
            <Row>
                {
                    listOfBankAccounts.map(item => 
                        <div>
                            <p>{item.nameOfAccount}</p>
                            <p>{item.accountNumber}</p>
                            <p>{item.balance} kr</p>
                        </div>
                    )
                }
            </Row>
            <Row>
                <CreateBankAccountForm 
                    handleAlert={props.handleAlert} 
                    setAlertMessage={props.setAlertMessage} 
                    cookieUser={props.cookieUser}
                    show={showCreateAccountModal}
                    handleClose={handleCloseCreateAccountModal} 
                />
            </Row>
        </Container>
    );
}

export default Home;