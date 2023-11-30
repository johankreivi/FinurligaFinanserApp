import { FC, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { IFormProps } from '../Models/Interfaces/IFormProps';
import { useNavigate } from 'react-router-dom';

const Home: FC<IFormProps> = (props) => {  
    
    const redirect = useNavigate();

    useEffect(() => {
        if(props.getIsAuthorized?.isAuthorized === false){
            redirect('/');
        }
    }, [props.getIsAuthorized?.isAuthorized, redirect]);

return(

    <Container>
        <Row>
            <Col>
                <h1 className='text-light text-center'>Du är inloggad som: {props.getIsAuthorized?.userName} </h1>             
            </Col>
        </Row>
    </Container>       
    );
}

export default Home;