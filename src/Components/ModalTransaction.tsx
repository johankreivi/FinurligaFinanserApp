import { FC, useEffect, useState } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { IModalTransactionProps } from "../Models/Interfaces/IModalTransaction";
import {PostTransactionDto} from '../Models/Dto/PostTransactionDto'
import {getRecipientBankAccountDetails, postTransaction as postNewTransaction } from '../Services/APIService';

const ModalTransaction: FC<IModalTransactionProps> = (props) => {
  const [currentBalance, setCurrentBalance] = useState<number>(0); 
  const [checked, setChecked] = useState(false);
  const [showInternalInput, setShowInternalInput]=useState(false);
  const [showExternalInput, setShowExternalInput]=useState(true);
  const [recipientName, setRecipientName] = useState<string>("");

  const validationSchema = Yup.object({
    sendingAccountNumber: Yup.number()
      .test('check-equality', 'Välj ett giltigt konto.', function(value) {              
        return  props.listOfBankAccounts.find(x => x.accountNumber === value) && true;
      })
      .required('Obligatoriskt'),
    receivingAccountNumber: Yup.number()
      .test('check-equality', 'Från och till konto kan ej vara samma.', function(value) {  
        if(formik.values.sendingAccountNumber === null) return true; 
        let sender: number = parseInt(formik.values.sendingAccountNumber);  
        return  value !== sender;
      })
      .test('check-equality', 'Angivet mottagarkonto finns ej.', function(value) {              
        return  accountExists(value!);
      })
      .required('Obligatoriskt'),
    amount: Yup.number()
      .min(1, "Du måste föra över minst 1kr.")
      .max(currentBalance, "Beloppet överstiger ditt saldo.")
      .required('Obligatoriskt'),
    message: Yup.string()      
      .max(50, "Meddelandet får inte överstiga 25 tecken.")        
  });

  const formik = useFormik({
    initialValues: {
      sendingAccountNumber: null,
      receivingAccountNumber: null,
      amount: 0,
      message: ""
    },        
    validationSchema,
    onSubmit: async values => {
      try {
        let postTransaction: PostTransactionDto= { 
          sendingAccountNumber: values.sendingAccountNumber!, 
          receivingAccountNumber: values.receivingAccountNumber!,
          amount: values.amount,
          message: values.message
        }
        await postNewTransaction(postTransaction);
        props.refresh();
        formik.resetForm();
        handleClose();
        props.onTransactionComplete();
      }
      catch(error){
        alert('Något gick fel. Detaljer: ' + error);
      }
    },
  });
  
  const accountExists = async (accountNumber: number) => {
    let result = await getRecipientBankAccountDetails(accountNumber);
    return result? true : false;
  }

  const handleClose = () =>{
    props.handleClose();
    setRecipientName("");
    if(checked) handleToggle();
    formik.resetForm();
  }

  const handleGetRecipient = async () => {
      try{
        let recipientDetails = await getRecipientBankAccountDetails(formik.values.receivingAccountNumber!);
        const fullNameOfRecipient = recipientDetails.firstName + " " + recipientDetails.lastName; 
        setRecipientName(fullNameOfRecipient);  
      }
      catch{
        setRecipientName("Angivet bankkonto saknar ägare");
      }
  }

  const handleToggle = () => {
    setChecked(prev => !prev);
    setShowInternalInput(!checked);
    setShowExternalInput(checked);
  };

  useEffect(() => {    
    // eslint-disable-next-line eqeqeq
    let account = props.listOfBankAccounts.find(x => x.accountNumber == formik.values.sendingAccountNumber);
    if(account === undefined) return
    setCurrentBalance(account.balance);
  }, [formik.values.sendingAccountNumber, props.listOfBankAccounts])

  return (
    <Modal data-testid="create-transaction" show={props.show} onHide={handleClose}>
      <Modal.Header closeButton style={{ backgroundColor: '#eaeaea' }}>
          <Modal.Title data-testid="bankaccount-created-title">Ny överföring</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={formik.handleSubmit}>                
        <Modal.Body>      
            <Row className="align-items-center mb-3">
              <Col sm={2}>
                <Form.Label>Från:</Form.Label>
              </Col>
              <Col sm={{ span: 8, offset: 1 }}>
                <Form.Group>
                  <Form.Select 
                  name="sendingAccountNumber" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.sendingAccountNumber && !!formik.errors.sendingAccountNumber}   
                  >
                    <option>Välj ett konto i listan</option>
                      {props.listOfBankAccounts.map(item =>{
                      
                      return (<option key={`sender_accountnumber_${item.accountNumber}`} value={item.accountNumber.toString()}>
                        {item.nameOfAccount}, {item.balance.toFixed(2)} kr
                      </option>)
                      })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                                  {formik.errors.sendingAccountNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>              
            </Row>       

            <Form.Check 
              type="switch"
              id="custom-switch"
              label={checked ? "Mellan egna konton" : "Till extern mottagare"}
              checked={checked}
              onChange={handleToggle}
              onBlur={formik.handleBlur}
              className="mb-3"
            />

            <Row className="align-items-center mb-3">
              <Col sm={2}>
                  <Form.Label>Mottagare:</Form.Label>
              </Col>                      

              {showExternalInput && (
              <Col sm={{ span: 8, offset: 1 }}>
                <Form.Group>
                  <Form.Select 
                  isInvalid={formik.touched.receivingAccountNumber && !!formik.errors.receivingAccountNumber}   
                  name="receivingAccountNumber" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  >
                    <option>Välj ett konto i listan</option>
                  {props.listOfBankAccounts.map(item =>{
                      if(item.accountNumber === formik.values.sendingAccountNumber) return null;

                      return (<option key={`reciever_accountnumber_${item.accountNumber}`} value={item.accountNumber.toString()}>
                        {item.nameOfAccount}, {item.balance.toFixed(2)} kr
                      </option>)
                  })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                      {formik.errors.receivingAccountNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              )}
                  
              {showInternalInput && (
                <Col sm={{span: 5, offset: 1}}>
                <Form.Group controlId="formReceiverAccountNumber">                  
                  <Form.Control
                    type="number"
                    placeholder="Kontonummer"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="receivingAccountNumber"
                    isInvalid={formik.touched.receivingAccountNumber && !!formik.errors.receivingAccountNumber}    
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.receivingAccountNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>            
              )}
              {showInternalInput && (
                <Col>
                  <Button onClick={handleGetRecipient}>
                    Visa mottagare
                  </Button>
                </Col>
              )}
            </Row>
            
            {showInternalInput && (
              <Row>
                <Col sm={2}>
                  <Form.Label>Kontoägare:</Form.Label>
                </Col>
                <Col sm={{span: 5, offset: 1}} className="mb-2">
                  <h6 style={{color: "#0d6efd"}}>{recipientName === "" ? "- - -": recipientName}</h6>
                </Col>
              </Row>
            )}
        
            <Row className="mb-3">
              <Col sm={2} className="mt-1">
                <Form.Label>Belopp:</Form.Label>                
              </Col>

              <Col sm={{ span: 5, offset: 1}}>
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
              </Col>            
            </Row>        
        
            <Row>
              <Col sm={2} className="mt-1">
                <Form.Label>Kommentar:</Form.Label>
              </Col>

              <Col sm={{ span: 8, offset: 1}}>
                <Form.Group>
                  <Form.Control 
                  type="text" 
                  placeholder="Valfri kommentar" 
                  name="message" 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.message && !!formik.errors.message}
                  value={formik.values.message}
                  />
                  <Form.Control.Feedback type="invalid">
                                  {formik.errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>      
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#eaeaea' }}>
          <Button variant="secondary" onClick={handleClose} data-testid="bankaccount-created-close-button">
            Avbryt
          </Button>
          <Button 
          className="ms-3" variant="success" type="submit" data-testid="bankaccount-created-confirm-button">
            Bekräfta
          </Button>
        </Modal.Footer>
      </Form>

    </Modal>
  );
};

export default ModalTransaction;