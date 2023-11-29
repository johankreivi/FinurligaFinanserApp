import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Views/Home';
import {Routes, Route} from 'react-router-dom';
import SignInView from './Views/SignInView';
import RegisterView from './Views/RegisterView';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

function App() {
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleAlert = (success: boolean) => {
    success ? setAlertSuccess(true) : setAlertSuccess(false);

    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  return (
    <>
    {showAlert ?
      <Alert variant={
          alertSuccess ? 'success' : 'danger'
      } onClose={() => setShowAlert(false)} dismissible className='position-absolute start-50 translate-middle top-0 mt-5'>
          {alertSuccess ?
          "Ditt konto har skapats!"
          :
          "Något gick fel, försök igen!"
          }
      </Alert>
          :
          null
      }
    <div data-bs-theme='dark' className=' bg-dark '>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignInView />} />
        <Route path='/register' element={<RegisterView handleAlert={handleAlert}/>} />
      </Routes>
      
    </div>
    </>
  );
}

export default App;
