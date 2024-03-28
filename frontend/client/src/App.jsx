import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import User from './User';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/:user' element={<User /> } ></Route>
    </Routes>
  )
}

export default App
