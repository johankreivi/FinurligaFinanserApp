import { FC } from "react";
import { IModalProps } from "../Models/Interfaces/IModalProps";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';

const ModalDeleteBankAccount: FC<IModalProps> = (props) => {
    
    return (
        <Modal data-testid="delete-account" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title data-testid="bankaccount-created-title">Avsluta konto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <p data-testid="bankaccount-created-text">Vill du verkligen avsluta kontot?</p>
                    </Col>
                </Row>   
            </Modal.Body>
            <Modal.Footer>          
                <Button variant="secondary" onClick={props.handleClose} data-testid="bankaccount-created-close-button">
                    Nej
                </Button>
                <Button variant="danger" onClick={() => props.handleSubmit('')} data-testid="bankaccount-created-close-button">
                    Ja
                </Button>                
            </Modal.Footer>
        </Modal>
        
    );
};

export default ModalDeleteBankAccount;