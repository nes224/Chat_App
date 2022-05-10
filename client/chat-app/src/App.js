import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/setAvatar" element = {<SetAvatar />} />
        <Route path = "/" element = {<Chat />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
