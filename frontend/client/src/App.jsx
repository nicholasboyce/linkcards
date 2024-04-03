import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import EditForm from './pages/EditForm';
import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Home loggedIn={loggedIn} />} />
      <Route path='/login' element={<Login loggedIn={loggedIn} />} />
      <Route path='/register' element={<Register loggedIn={loggedIn} />} />
      <Route path='/:user' element={<User loggedIn={loggedIn} />} />
      <Route path='/:user/edit' element={<EditForm loggedIn={loggedIn} />} />
    </Routes>
  )
}

export default App
