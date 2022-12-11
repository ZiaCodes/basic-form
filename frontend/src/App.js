import { Route, Routes } from 'react-router-dom';
import Login from './container/Login';
import Register from './container/Register';
import Home from './container/Home';

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
  );
}

export default App;
