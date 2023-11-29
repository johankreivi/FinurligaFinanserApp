import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image';
import { Link } from "react-router-dom";

const SignInForm: FC = () => {  
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

return(
    <Container className='border border-4 border-dark mt-3 p-2 text-center '>
        <Form>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5'>Finurliga Finanser</h1>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Användarnamn" />               
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Lösenord" />
                    </Form.Group>

                    <Link to="/register">
                        <Button variant="light">
                            Inget konto? Registera dig
                        </Button>
                    </Link>

                    <Button className='m-2' variant="light" type="submit">
                        Logga in
                    </Button>
                    
                </Col>  
                <Col>
                    <Image src="fflogo.png" fluid className='m-2'/>
                </Col>              
            </Row>
        </Form>

    </Container>  
    );
}

export default SignInForm;