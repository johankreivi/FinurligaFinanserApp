import { FC, useState } from "react";
import { IModalProps } from "../Models/Interfaces/IModalProps";
import { Modal, Button, Col, Form, Row, Dropdown } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { IModalTransactionProps } from "../Models/Interfaces/IModalTransaction";
import { event } from "cypress/types/jquery";
import {PostTransactionDto} from '../Models/Dto/PostTransactionDto'
import {postTransaction as postNewTransaction} from '../Services/APIService';

const ModalTransaction: FC<IModalTransactionProps> = (props) => {
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [selectedAccountNumber, setSelectedAccountNumber] = useState<number | string>("Välj ett konto i listan");

    const validationSchema = Yup.object({
        receivingAccountNumber: Yup.number()
            .min(1000000000, 'Fel på inmatning.')
            .max(2147483647, 'Fel på inmatning.')
            .required('Obligatoriskt')
            .test('check-equality', 'Från och till konto kan ej vara samma.', function(value) {
                // Replace 'yourValueToCheck' with the value you want to compare against
                return  value !== selectedAccountNumber;
            }),
        amount: Yup.number()
            .min(1, "Du måste föra över minst 1kr.")
            .max(currentBalance, "Beloppet överstiger ditt saldo.")
            .required('Obligatoriskt')
    });

    const formik = useFormik({
        initialValues: {
            sendingAccountNumber: selectedAccountNumber,
            receivingAccountNumber: 0,
            amount: 0,
            message: ""
        },
        validationSchema,
        onSubmit: async values => {
            try {
                let postTransaction: PostTransactionDto= { 
                    sendingAccountNumber: parseInt(selectedAccountNumber.toString()), 
                    receivingAccountNumber: values.receivingAccountNumber,
                    amount: values.amount,
                    message: values.message
                }
                let postTransactionResult = await postNewTransaction(postTransaction);
                props.refresh();
                formik.resetForm();
                handleClose();
            }
            catch{
                alert('feeeel');
            }
        },
    });    

    const handleSelect = (eventKey: any) => {
        let values = eventKey.split(',');
        setCurrentBalance(parseInt(values[0]));
        setSelectedAccountNumber(parseInt(values[1]));
    }

    const handleSubmit= () =>{
        formik.handleSubmit();
        
    }

    const handleClose = () =>{
        props.handleClose();
    }

    return (
        <Modal data-testid="delete-account" show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title data-testid="bankaccount-created-title">Ny överföring</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <Row>
          <Col>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label>Från konto:</Form.Label>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Konto
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {props.listOfBankAccounts.map(item => 
                        <Dropdown.Item eventKey={`${item.balance}, ${item.accountNumber}`}>{item.nameOfAccount}, {item.balance.toFixed(2)} kr</Dropdown.Item>
                        )}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              
              <Form.Group>
                <Form.Control 
                type="sendingAccountNumber" 
                placeholder="Välj konto i listan" 
                value={selectedAccountNumber}
                name='sendingAccountNumber'
                onChange={formik.handleChange}
                disabled/>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Mottagande konto:</Form.Label>
                <Form.Control 
                type="number" 
                placeholder="Ange mottagande konto" 
                value={formik.values.receivingAccountNumber}
                name='receivingAccountNumber'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.receivingAccountNumber && !!formik.errors.receivingAccountNumber}
                />
                <Form.Control.Feedback type="invalid">
                                {formik.errors.receivingAccountNumber}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Belopp:</Form.Label>
                <Form.Control 
                type="number" 
                placeholder="Ange belopp" 
                name="amount" 
                min="1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.amount && !!formik.errors.amount}
                value={formik.values.amount}
                />
                <Form.Control.Feedback type="invalid">
                                {formik.errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Kommentar:</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Valfri kommentar" 
                name="message" 
                onChange={formik.handleChange} 
                value={formik.values.message}
                />
              </Form.Group>
            
            </Form>
          </Col>
        </Row>
      </Modal.Body>
            <Modal.Footer>          
                <Button variant="secondary" onClick={handleClose} data-testid="bankaccount-created-close-button">
                    Avbryt
                </Button>
                <Button variant="success" onClick={handleSubmit} data-testid="bankaccount-created-close-button">
                    Bekräfta
                </Button>                
            </Modal.Footer>
        </Modal>
        
    );
};

export default ModalTransaction;