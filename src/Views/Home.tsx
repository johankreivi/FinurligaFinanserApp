import { FC, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateBankAccountForm from '../Components/CreateBankAccountForm';

const Home: FC<IRegisterFormProps> = (props) => {  
    
    const redirect = useNavigate();

    useEffect(() => {
        if(props.getIsAuthorized?.isAuthorized === false){
            redirect('/');
        }
    }, [props.getIsAuthorized?.isAuthorized, redirect]);

return(
    <Container fluid style={{color: 'white'}}>
        <Header userName={'Bobo'} balance={0} />
        
        <Row>
            <Col>
                
            </Col>
        </Row>
        <Row>
            <CreateBankAccountForm handleAlert={props.handleAlert} setAlertMessage={props.setAlertMessage} userId={props.getIsAuthorized?.userId} userName='Bobo' />
        </Row>
    </Container>
    );
}

export default Home;