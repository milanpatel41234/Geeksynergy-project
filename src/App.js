import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Header/NavBar';
import { useState } from 'react';
import Login from './Components/Pages/Login';
import CreateAccount from './Components/Pages/CreateAccount';
import HomePage from './Components/Pages/HomePage';


function App() {
  const [LoginState , setLoginState] = useState(false);
  const setLogin =()=>{
  setLoginState(true);
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path='/signup' element={!LoginState ? <CreateAccount /> : <Navigate to='/' />} />
      <Route path='/login' element={!LoginState ? <Login onLogin={setLogin} /> : <Navigate to='/' />} />
      <Route path='/' element={LoginState ? <HomePage/> : <Navigate to='/login' />} />

      </Routes>
    </div>
  );
}

export default App;
