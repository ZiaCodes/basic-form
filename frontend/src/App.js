import { Route, Routes } from 'react-router-dom';
import Login from './container/Login';
import Register from './container/Register';
import Home from './container/Home';
import EmailVerification from './components/EmailVerification';

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='email-verification' element={<EmailVerification/>}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
  );
}

export default App;
