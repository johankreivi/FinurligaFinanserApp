import { FC, useEffect, useState } from "react";
import { ICreateBankAccountFormProps } from "../Models/Interfaces/ICreateBankAccountFormProps";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { postBankAccount } from "../Services/APIService";
import { ResponseBankAccountDto } from "../Models/Dto/ResponseBankAccountDto";

const CreateBankAccountForm: FC<ICreateBankAccountFormProps> = (props) => {    

    const [showBankAccountOrConfirmitionInModal, setShowBankAccountOrConfirmitionInModal] = useState(props.show); 
    const [bankAccountMessage, setBankAccountMessage] = useState<string>("");

    const validationSchema = Yup.object({
        bankAccountName: Yup.string()
            .min(2, 'Måste vara minst 2 tecken')
            .max(50, 'Får inte vara längre än 50 tecken')
            .required('Obligatoriskt'),
    });

  const formik = useFormik({
    initialValues: {
        bankAccountName: '',
    },
    validationSchema,
    onSubmit: async values => {
        try {
            let bankAccountResponse: ResponseBankAccountDto = await postBankAccount({userAccountId: props.cookieUser.id, nameOfAccount: values.bankAccountName});
            if (bankAccountResponse.accountNumber !== undefined) { 
                formik.resetForm();
                setShowBankAccountOrConfirmitionInModal(true);
                setBankAccountMessage(`Bankkonto "${bankAccountResponse.nameOfAccount}" skapades och tilldelades kontonummer ${bankAccountResponse.accountNumber}.`);     
            }         
        }
        catch(error) {
            console.log(error);
        }
    }
});    

const handleSubmit = () => {
    formik.handleSubmit();    
}

const handleClose = () => {
    setBankAccountMessage("");
    setShowBankAccountOrConfirmitionInModal(false);
    props.handleClose();
}

return (
    <>        
        <Modal show={props.show && !showBankAccountOrConfirmitionInModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Skapa bankkonto</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className='align-items-center'>
                    <Col>
                        <Form.Group className="w-full mb-3">                            
                            <Form.Control
                                type="text"
                                placeholder="Kontonamn"
                                name="bankAccountName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.bankAccountName}
                                isInvalid={formik.touched.bankAccountName && !!formik.errors.bankAccountName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.bankAccountName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>  
                </Row>
            </Form>

            </Modal.Body>
            <Modal.Footer>          
                <Button variant="secondary" onClick={props.handleClose}>
                    Avbryt
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Bekräfta
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={props.show && showBankAccountOrConfirmitionInModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Bankkonto skapat!</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Row>
                <Col>
                    <p>{bankAccountMessage}</p>
                </Col>
            </Row>   

            </Modal.Body>
            <Modal.Footer>          
                <Button variant="secondary" onClick={handleClose}>
                    Stäng
                </Button>                
            </Modal.Footer>
        </Modal>
    </>
);
}
export default CreateBankAccountForm;