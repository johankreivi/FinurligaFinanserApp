import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image';
import { Link, useNavigate } from "react-router-dom";
import { IFormProps } from '../Models/Interfaces/IFormProps';
import { useFormik } from 'formik';
import { use } from 'chai';
import { PostLoginUserDto } from '../Models/Dto/PostLoginUserDto';
import { postLoginUser } from '../Services/APIService';
import { ResponseLoginUserDto } from '../Models/Dto/ResponseLoginUserDto';

const SignInForm: FC<IFormProps> = (props) => { 
const redirect = useNavigate();
const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    onSubmit: async values => {
        let postLogin : PostLoginUserDto = {
            userName: values.username,
            password: values.password,
        }

        try {
            let response : ResponseLoginUserDto = await postLoginUser(postLogin);
            /*let response : ResponseLoginUserDto = {
                isAuthorized: true,
                userName: 'Testanvändare',
                message: 'Testmeddelande',
            }*/
            if(response.isAuthorized){
                props.handleAlert(true);
                props.setAlertMessage('Inloggning lyckades! Välkommen ' + response.userName + '!');
                if(props.setIsAuthorized === undefined) throw new Error('setIsAuthorized is undefined');
                props.setIsAuthorized({ isAuthorized: true, userName: response.userName, message: response.message });
                redirect('/Home');
            }
        } catch (error) {
            props.handleAlert(false);
            props.setAlertMessage('Inloggning misslyckades!');
        }
    },
});

return(
    <Container className='border border-4 border-dark mt-3 p-2 text-center '>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5'>Finurliga Finanser</h1>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Användarnamn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Användarnamn"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Lösenord"
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
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