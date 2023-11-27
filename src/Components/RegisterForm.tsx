import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image';
import { Link } from "react-router-dom";

const RegisterForm: FC = () => {  
    const [validated, setValidated] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      });

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        // skicka vidare
        console.log(formData);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
  

return(
    <Container className='border border-4 border-dark mt-3 p-2 '>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5 text-center'>Registrera ny användare</h1>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Användarnamn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Användarnamn"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Skriv in ett giltigt Användarnamn.
                        </Form.Control.Feedback>  
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Tilltalsnamn</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Tilltalsnamn"
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Skriv in ditt Tilltalsnamn(Förnamn).
                        </Form.Control.Feedback>               
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Efternamn</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Efternamn" 
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Skriv in ditt Efternamn.
                        </Form.Control.Feedback> 
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Lösenord"
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required        
                        />
                        <Form.Control.Feedback type='invalid'>
                           Ditt lösenord måste vara minst 8 tecken långt, en liten bokstav, en stor bokstav och ett specialtecken. 
                        </Form.Control.Feedback>                        
                    </Form.Group>

                    <Form.Group className="mb-3">                     
                        <Form.Control 
                            type="password" 
                            placeholder="Upprepa Lösenord" 
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required 
                        />
                        <Form.Control.Feedback type='invalid'>
                           Detta fält matchar inte lösenordet. 
                        </Form.Control.Feedback> 
                    </Form.Group>

                    <div className='text-center'>
                        <Link to="/signin">
                            <Button variant="light" className=''>
                                Har redan ett användarkonto? Logga in
                            </Button>
                        </Link> 

                        <Button className='m-1' variant="light" type="submit">
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