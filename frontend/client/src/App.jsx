import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import EditFormPage from './pages/EditFormPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContextProvider } from './AuthContext';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      } />
      <Route path='/register' element={
        <AuthContextProvider>
          <Register />
        </AuthContextProvider>
      } />
      <Route path='/:user' element={
        <AuthContextProvider>
          <User />
        </AuthContextProvider>
      } />
      <Route path='/:user/edit' element={
        <AuthContextProvider>
          <EditFormPage />
        </AuthContextProvider>
      } />
    </Routes>
  )
}

export default App
