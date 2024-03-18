import React,{useEffect}  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
// import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
// import Logout from './components/Logout';
// import Errorpage from './components/Errorpage';
import { Route,Routes } from 'react-router-dom';
import Auth from './components/Auth'; 
import { selectAuthenticated } from './auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedInUserAsync } from './auth/authSlice';
// import { initialState,reducer} from './reducer/Usereducer';
// export const UserContext=createContext();

const App = () => {

  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch=useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
     dispatch(isLoggedInUserAsync);
    }
  },[]);
  return (
  <>
  
    <Navbar/>
    <Routes>
    <Route path="/" element={<Auth><Home /></Auth>} />
      <Route path="/about" element={<Auth><About /></Auth>} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/chat" element={<Auth><Chat /></Auth>} />
      {/* <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />}/> */}
    </Routes>

  </>
  )
}

export default App
