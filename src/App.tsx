import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Views/Home';
import {Routes, Route} from 'react-router-dom';
import SignInView from './Views/SignInView';
import RegisterView from './Views/RegisterView';

function App() {
  return (
    <div data-bs-theme='dark' className=' bg-dark '>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignInView />} />
        <Route path='/register' element={<RegisterView />} />
      </Routes>
    </div>
  );
}

export default App;
