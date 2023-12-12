import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postLoginUser, postUserAccount } from '../Services/APIService';
import { PostUserAccountDto } from "../Models/Dto/PostUserAccountDto";
import { ResponseUserAccountDto } from '../Models/Dto/ResponseUserAccountDto';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';
import { ResponseLoginUserDto } from '../Models/Dto/ResponseLoginUserDto';

const RegisterForm: FC< IRegisterFormProps > = (props) => {    
  const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(6, 'Måste vara minst 6 tecken')
            .max(50, 'Får inte vara längre än 50 tecken')
            .required('Obligatoriskt'),
        firstName: Yup.string()
            .min(2, 'Måste vara minst 2 tecken')
            .max(50, 'Får inte vara längre än 50 tecken')
            .matches(/^[a-öA-Ö]+$/, 'Bara bokstäver är tillåtna')
            .required('Obligatoriskt'),
        lastName: Yup.string()
            .min(2, 'Måste vara minst 2 tecken')
            .max(50, 'Får inte vara längre än 50 tecken')
            .matches(/^[a-öA-Ö]+$/, 'Bara bokstäver är tillåtna')
            .required('Obligatoriskt'),
        password: Yup.string()
            .min(8, 'Måste vara minst 8 tecken')
            .matches(/[0-9]/, 'Måste vara minst en siffra')
            .matches(/[a-ö]/, 'Måste vara minst en liten bokstav')
            .matches(/[A-Ö]/, 'Måste vara minst en stor bokstav')
            .required('Obligatoriskt'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Lösenorden måste matcha')
            .required('Obligatoriskt'),
    });

  const formik = useFormik({
    initialValues: {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    },
    validationSchema,
    onSubmit: async values => {
        let postUser: PostUserAccountDto = {
            userName: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
        }

        
        try {
            let userResponse: ResponseUserAccountDto = await postUserAccount(postUser);
            if (userResponse.id !== undefined) {                
                let loginResponse: ResponseLoginUserDto = await postLoginUser({ 
                    userName: values.username, 
                    password: values.password
                });
                
                if (loginResponse.isAuthorized) {
                    props.setCookie("user" , {id: loginResponse.id, userName: loginResponse.userName, isAuthorized: loginResponse.isAuthorized});          
                    navigate('/Home');
                } 
                else {
                    navigate('/'); 
                }
            }
            else{
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            if(props.setAlertMessage === undefined || props.handleAlert === undefined) return
            props.setAlertMessage("Ett fel inträffade vid registrering.");
            props.handleAlert(false);        
        }
    }
});

return(
    <Container className='p-2 '>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5 text-center'>Registrera ny användare</h1>
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

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Tilltalsnamn</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Tilltalsnamn"
                            name='firstName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstName}
                        </Form.Control.Feedback>               
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Efternamn</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Efternamn" 
                            name='lastName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.lastName}
                        </Form.Control.Feedback> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Lösenord"
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            autoComplete="false"
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Upprepa Lösenord" 
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            autoComplete="false"
                            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback> 
                    </Form.Group>


                    <div className="text-center d-flex justify-content-between">
                        <Button href="/" variant="light" className='ms-5 btn-sm'>
                            Avbryt
                        </Button>

                        <Button className='me-5 btn-sm' variant="light" type="submit">
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