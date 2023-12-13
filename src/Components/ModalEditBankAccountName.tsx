import { FC } from "react";
import { IModalProps } from "../Models/Interfaces/IModalProps";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';

const ModalEditBankAccountName: FC<IModalProps> = (props) => {
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
            props.handleSubmit(values.bankAccountName);
        },
    });
    
    return (
        <Modal data-testid="edit-name" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Byt namn</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className='align-items-center'>
                        <Col>
                            <Form.Group className="w-full mb-3">                            
                                <Form.Control
                                    type="text"
                                    placeholder="Ange nytt namn.."
                                    name="bankAccountName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bankAccountName}
                                    isInvalid={formik.touched.bankAccountName && !!formik.errors.bankAccountName}
                                    data-testid="bankaccount-input"
                                    autoComplete="false"
                                />
                                <Form.Control.Feedback data-testid="create-bankaccount-invalid-input" type="invalid">
                                    {formik.errors.bankAccountName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>  
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>          
                <Button variant="secondary" onClick={props.handleClose} data-testid="bankaccount-creation-modal-abort">
                    Avbryt
                </Button>
                <Button variant="primary" onClick={formik.submitForm} data-testid="bankaccount-creation-modal-confirm">
                    Bekräfta
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditBankAccountName;