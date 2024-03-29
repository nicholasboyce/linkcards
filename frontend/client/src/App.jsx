import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import User from './User';
import EditForm from './EditForm';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Home loggedIn={loggedIn} />} />
      <Route path='/:user' element={<User loggedIn={loggedIn} />}>
        <Route path='edit' element={<EditForm loggedIn={loggedIn} />} />
      </Route>
    </Routes>
  )
}

export default App
