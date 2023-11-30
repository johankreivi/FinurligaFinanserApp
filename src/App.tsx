import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Views/Home';
import {Routes, Route} from 'react-router-dom';
import SignInView from './Views/SignInView';
import RegisterView from './Views/RegisterView';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ResponseLoginUserDto } from './Models/Dto/ResponseLoginUserDto';

function App() {
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState<ResponseLoginUserDto>({ isAuthorized: false});
  

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
      } onClose={() => setShowAlert(false)} dismissible className='position-absolute start-50 translate-middle top-50 '>
          {alertMessage}
      </Alert>
          :
          null
      }
    <div data-bs-theme='dark' style={{ backgroundColor: '#001A2F', height: '100vh' }}>
      <Routes>
        <Route path='/Home' element={<Home setIsAuthorized={setIsAuthorized} handleAlert={handleAlert} setAlertMessage={setAlertMessage} getIsAuthorized={isAuthorized} />} />
        <Route path='/register' element={<RegisterView setIsAuthorized={setIsAuthorized} handleAlert={handleAlert} setAlertMessage={setAlertMessage} />} />
        <Route path='/' element={<SignInView handleAlert={handleAlert} setAlertMessage={setAlertMessage} setIsAuthorized={setIsAuthorized} />} />
        
      </Routes>
      
    </div>
    </>
  );
}

export default App;
