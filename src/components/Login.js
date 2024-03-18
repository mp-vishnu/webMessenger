import React,{useState} from 'react';
import loginpic from '../img/123.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUserAsync } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from '../auth/authSlice';

//import {UserContext} from '../App';
const Login = () => {
  
   // const {state,dispatch} = useContext(UserContext);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isAuthenticated = useSelector(selectAuthenticated);
    const handleLogin= async (e)=>{
      e.preventDefault();
      if (!email || !password) {
        window.alert('Please fill in all fields');
        return;
      }
      else{
        dispatch(signInUserAsync({email,password}))
        .then(()=>navigate('/'))
        .catch((error) => console.error("Error :", error));      
      }
     
    }
    return (
       !isAuthenticated?
       ( <div>
        <div className="container">
<div className="row ml-5">
<div className="col-md-6">
  <section className="signin">
    <div className="container mt-5">
      <div className="signin-content">
        <div className="signin-form">
          <h2 className="form-title ml-5">Login</h2>
          <form method="POST" className="register-form ml-5 mt-5" id="register-form">
                  {/* Form inputs go here */}
                                      <div className="form-group">
                                      <label htmlFor="email">
                                      <i className="zmdi zmdi-email material-icons-name mr-4"></i>
                                      </label>
                                       <input type='email' name='email' id='email' 
                                      value={email}
                                          onChange={(e)=>setEmail(e.target.value)}
                                          autoComplete='off' 
                                          placeholder="Email" style={{border:'none',outline: 'none'}}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="password">
                                      <i className="zmdi zmdi-lock material-icons-name mr-4"></i>
                                      </label>
                                      <input type='password' name='password' id='password' 
                                       value={password}
                                          onChange={(e)=>setPassword(e.target.value)}
                                          autoComplete='off' 
                                          placeholder="Enter password" style={{border:'none',outline: 'none'}}
                                      />
                                  </div>
                              <div className="form-group form-button ml-5">
                                  <input type="submit" name="signin" id="signin" className="form-submit"
                                  onClick={handleLogin} value="Login" />
                              </div>
                </form>
        </div>
      </div>
    </div>
  </section>
</div>
<div className="col-md-6">
  <div className="signin-image mt-4">
    <figure>
      <img src={loginpic} alt="img" />
    </figure>
    <NavLink to="/register" className="signin-image-link ml-5">Create an account</NavLink>
  </div>
</div>
</div>
</div>
    </div>):
    navigate('/')
    )
}

export default Login