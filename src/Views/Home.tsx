import { FC, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateBankAccountForm from '../Components/CreateBankAccountForm';

const Home: FC<IRegisterFormProps> = (props) => {  
    const redirect = useNavigate();    

    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

    useEffect(() => {
        if(props.getIsAuthorized?.isAuthorized === false){
            redirect('/');
        }
    }, [props.getIsAuthorized?.isAuthorized, redirect]);

    const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);
    const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);

    return(
        <Container fluid style={{color: 'white'}}>
            <Header 
                userName={'Bobo'} 
                balance={0} 
                handleShowModal={handleShowCreateAccountModal} 
            />
            
            <Row>
                <Col>
                
                </Col>
            </Row>
            <Row>
                <CreateBankAccountForm 
                    handleAlert={props.handleAlert} 
                    setAlertMessage={props.setAlertMessage} 
                    userId={props.getIsAuthorized?.userId} 
                    userName='Bobo'
                    show={showCreateAccountModal}
                    handleClose={handleCloseCreateAccountModal} 
                />
            </Row>
        </Container>
    );
}

export default Home;