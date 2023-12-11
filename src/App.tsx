import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Views/Home';
import {Routes, Route} from 'react-router-dom';
import SignInView from './Views/SignInView';
import RegisterView from './Views/RegisterView';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { CookiesProvider, useCookies } from "react-cookie";
import TransactionView from './Views/TransactionView';

function App() {
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const handleRemove = () => removeCookie('user', { path: '/', });

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
      <CookiesProvider>
        <div data-bs-theme='dark' style={{ margin: '0px',backgroundColor: '#001A2F', height: '100%', minHeight: '100vh' }}>
        
          <Routes>
            <Route path='/Home' element={<Home 
              removeCookie={handleRemove} 
              cookieUser={cookie.user} 
              setCookie={setCookie} />} />

            <Route path='/register' element={<RegisterView 
            setCookie={setCookie} 
            handleAlert={handleAlert}
            setAlertMessage={setAlertMessage}
            />} 
            />

            <Route path='/' element={<SignInView 
            setCookie={setCookie} 
            handleAlert={handleAlert}
            setAlertMessage={setAlertMessage}
            />} />

            <Route path='/transactionview' element={<TransactionView 
            cookieUser={cookie.user} 
            setCookie={setCookie} 
            removeCookie={handleRemove} />} />

          </Routes>
        </div>
      </CookiesProvider>
    </>
  );
}

export default App;
