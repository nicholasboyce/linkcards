import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import EditFormPage from './pages/EditFormPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContextProvider } from './AuthContext';

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={
            <Login />
        } />
        <Route path='/register' element={
            <Register />
        } />
        <Route path='/:user' element={
            <User />
        } />
        <Route path='/:user/edit' element={
            <EditFormPage />
        } />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
