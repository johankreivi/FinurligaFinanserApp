import { FC, useEffect, useState } from "react";
import { Modal, Button, Col, Form, Row, Dropdown } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { IModalTransactionProps } from "../Models/Interfaces/IModalTransaction";
import {PostTransactionDto} from '../Models/Dto/PostTransactionDto'
import {getRecipientBankAccountDetails, postTransaction as postNewTransaction, postTransaction} from '../Services/APIService';
import { BankAccount } from "../Models/Dto/BankAccount";

const ModalTransaction: FC<IModalTransactionProps> = (props) => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);    
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<number>(0)
  const [selectedAccountNumberReceiver, setSelectedAccountNumberReceiver] = useState<number>(0);
  // const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  // const [selectedAccountReceiver, setSelectedAccountReceiver] = useState<BankAccount | null>(null);
  
  // States för vilken input för ReceiverAccount som ska visas
  const [checked, setChecked] = useState(false);
  const [showInternalInput, setShowInternalInput]=useState(false);
  const [showExternalInput, setShowExternalInput]=useState(true);
  const [recipientName, setRecipientName] = useState<string>("");
  const [showRecipientName, setShowRecipientName] = useState(false);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const accountNumber = parseInt(e.target.value, 10);

      const account = props.listOfBankAccounts.find(item => 
        item.accountNumber === accountNumber
      );
      if (account) {
        // setSelectedAccount(account);
        setCurrentBalance(account.balance);
        setSelectedAccountNumber(accountNumber);
      }
      else {alert("Detta är inte ett av dina bankkontonummer.")}
    }
  };

  const handleSelectReceiver = (e: any) => {
    const accountNumber = parseInt(e.target.value);
    const account = props.listOfBankAccounts.find(item => 
      item.accountNumber === accountNumber
    );
    if (account) {
      setSelectedAccountNumberReceiver(account.accountNumber);
      // setSelectedAccountReceiver(account); 
    }    
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setShowInternalInput(isChecked);
    setShowExternalInput(!isChecked);
    setShowRecipientName(false);
    // setSelectedAccountReceiver(null);
  };

  const validationSchema = Yup.object({
    sendingAccountNumber: Yup.number()
    .max(2147483647, 'Fel på inmatning.')  
    .required('Obligatoriskt'),
      
    receivingAccountNumber: Yup.number()
      .max(2147483647, 'Fel på inmatning.')
      .required('Obligatoriskt')
      .test('check-equality', 'Från och till konto kan ej vara samma.', function(value) {              
          return  value !== selectedAccountNumber;
      }),
    amount: Yup.number()
      .min(1, "Du måste föra över minst 1kr.")
      .max(currentBalance, "Beloppet överstiger ditt saldo.")
      .required('Obligatoriskt'),
    message: Yup.string()      
      .max(25, "Meddelandet får inte överstiga 25 tecken.")        
  });

  const formik = useFormik({
    initialValues: {
      sendingAccountNumber: selectedAccountNumber,
      receivingAccountNumber: selectedAccountNumberReceiver,
      amount: 0,
      message: ""
    },        
    validationSchema,
    
    onSubmit: async values => {
      try {
        let postTransaction: PostTransactionDto= { 
          sendingAccountNumber: selectedAccountNumber, 
          receivingAccountNumber: selectedAccountNumberReceiver,
          amount: values.amount,
          message: values.message
        }
        let postTransactionResult = await postNewTransaction(postTransaction);
        console.log(postTransactionResult)
        props.refresh();
        formik.resetForm();
        handleClose();
        props.onTransactionComplete();
      }
      catch{
        alert('fel');
      }
    },
  });

  const handleGetRecipient = async () => {
    setRecipientName("");
    setShowRecipientName(false);
    try {      
      const accountNumber = typeof selectedAccountNumberReceiver === 'string' 
        ? parseInt(selectedAccountNumberReceiver, 10)
        : selectedAccountNumberReceiver;      
      
      if (!isNaN(accountNumber)) {
        let recipientDetails = await getRecipientBankAccountDetails(accountNumber);
        const fullNameOfRecipient = recipientDetails.firstName + " " + recipientDetails.lastName; 
        setRecipientName(fullNameOfRecipient);        
      } else {
        setRecipientName("Angivet bankkonto saknar ägare");
      }
      setShowRecipientName(true);
    } catch (error) {
      console.error('Fel vid hämtning av mottagarens namn: ' + error);
    }
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
        <Form noValidate onSubmit={formik.handleSubmit}>                
          <Row className="align-items-center mb-3">
            <Col sm={2}>
              <Form.Label>Från:</Form.Label>
            </Col>

            <Col sm={{ span: 8, offset: 1 }}>
              <Form.Group>
                <Form.Select 
                isInvalid={formik.touched.sendingAccountNumber && !!formik.errors.sendingAccountNumber}   
                name="sendingAccountNumber" 
                onChange={handleSelect}>
                  <option>Välj ett konto i listan</option>
                {props.listOfBankAccounts.map(item =>{
                      if(item.accountNumber == selectedAccountNumberReceiver) {
                      return null;
                    }
                    return (<option key={`sender_accountnumber_${item.accountNumber}`} value={item.accountNumber.toString()}>
                      {item.nameOfAccount}, {item.balance.toFixed(2)} kr
                    </option>)
                })}
                </Form.Select>
              </Form.Group>
            </Col>              
          </Row>       

          <Form.Check 
            type="switch"
            id="custom-switch"
            label={checked ? "Mellan egna konton" : "Till extern mottagare"}
            checked={checked}
            onChange={handleToggle}
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
                isInvalid={formik.touched.sendingAccountNumber && !!formik.errors.sendingAccountNumber}   
                name="receivingAccountNumber" 
                onChange={handleSelectReceiver}>
                  <option>Välj ett konto i listan</option>
                {props.listOfBankAccounts.map(item =>{
                    if(item.accountNumber == selectedAccountNumber) return null;

                    return (<option key={`reciever_accountnumber_${item.accountNumber}`} value={item.accountNumber.toString()}>
                      {item.nameOfAccount}, {item.balance.toFixed(2)} kr
                    </option>)
                })}
                </Form.Select>
              </Form.Group>
              {/* ////////////// */}
              {/* <Dropdown onSelect={handleSelectReceiver}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic2">
                {selectedAccountReceiver ? `${selectedAccountReceiver.nameOfAccount}, ${selectedAccountReceiver.balance.toFixed(2)} kr` : 'Välj ett konto i listan'}
              </Dropdown.Toggle>
                <Dropdown.Menu>
                  {props.listOfBankAccounts.map(item =>{
                    if(item.accountNumber == selectedAccountNumber) return null;
                    return  (
                    <Dropdown.Item key={`reciever_accountnumber_${item.accountNumber}`} eventKey={`${item.balance}, ${item.accountNumber}`}>
                    {item.nameOfAccount}, {item.balance.toFixed(2)} kr
                  </Dropdown.Item>)
                  }
                    
                  )}
                </Dropdown.Menu>
              </Dropdown> */}
            </Col>
            )}

            {showInternalInput && (
              <Col sm={{span: 5, offset: 1}}>
              <Form.Group controlId="formReceiverAccountNumber">                  
                <Form.Control
                  type="number"
                  placeholder="Kontonummer"
                  value={selectedAccountNumberReceiver}
                  onChange={(e) => setSelectedAccountNumberReceiver(parseInt(e.target.value))}
                  name="receivingAccountNumber"
                  isInvalid={formik.touched.receivingAccountNumber && !!formik.errors.receivingAccountNumber}                 
                />
              </Form.Group>
            </Col>            
            )}
            {showInternalInput && (
              <Col>
              <Button onClick={handleGetRecipient}>Visa mottagare</Button>
              </Col>
            )}
          </Row>
          
          {showRecipientName && (
            <Row>
              <Col sm={2}>
                <Form.Label>Kontoägare:</Form.Label>
              </Col>
              <Col sm={{span: 5, offset: 1}} className="mb-2">
                <h6 style={{color: "#0d6efd"}}>{recipientName}</h6>
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
              <Form.Control 
              type="text" 
              placeholder="Valfri kommentar" 
              name="message" 
              onChange={formik.handleChange} 
              value={formik.values.message}
              />
            </Col>
          </Row>      
        </Form>
      </Modal.Body>

      <Modal.Footer >
        <Button variant="secondary" onClick={handleClose} data-testid="bankaccount-created-close-button">
          Avbryt
        </Button>
        <Button className="ms-3" variant="success" onClick={handleSubmit} data-testid="bankaccount-created-confirm-button">
          Bekräfta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTransaction;