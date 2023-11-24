import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image';
import { Link } from "react-router-dom";

const RegisterForm: FC = () => {  
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

return(
    <Container className='border border-4 border-dark mt-3 p-2 '>
        <Form>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5 text-center'>Registrera ny användare</h1>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Tilltalsnamn</Form.Label>
                        <Form.Control type="text" placeholder="Tilltalsnamn" />               
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Efternamn</Form.Label>
                        <Form.Control type="text" placeholder="Efternamn" />               
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control type="password" placeholder="Lösenord" />
                    </Form.Group>

                    <Form.Group className="mb-3">                     
                        <Form.Control type="password" placeholder="Upprepa Lösenord" />
                    </Form.Group>

                    <div className='text-center'>
                        <Link to="/signin">
                            <Button variant="light" className=''>
                                Har redan ett användarkonto? Logga in
                            </Button>
                        </Link> 

                        <Button className='mx-1' variant="light" type="submit">
                            Registera
                        </Button>
                    </div>
                    

                    
                </Col>  
                <Col>
                    <Image src="fflogo.png" fluid className='m-2'/>
                </Col>              
            </Row>
        </Form>

    </Container>  
    );
}

export default RegisterForm;