import React,{useState} from 'react'
import '../App.css';
import loginpic from '../img/456.png';
import { useSelector, useDispatch } from 'react-redux';
import {signUpUserAsync} from '../auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
const Signup = () => {

  const dispatch = useDispatch();
  const navigate=useNavigate();
  //const history=useNavigate();
  const [user,setUser]=useState({
    name:"",email:"",password:"",cpassword:""
  });

  let name,value;
  const handleChange=(e)=>{
      name=e.target.name;
      value=e.target.value;

      setUser({...user,[name]:value});
  };

  const postData= async (e)=>{
    e.preventDefault();
    
    const {name,email,password,cpassword}=user;
    if(!name||!email||!password||!cpassword)
        {
          window.alert('Please fill in all fields');
          return;
        }
        dispatch(signUpUserAsync(user));
        navigate('/');
  };
 
    return (      
        <div className="container">
        <div className="row ml-5">
          <div className="col-md-6">
            <div className="signup-image mt-5 ml-5">
              <figure>
                <img src={loginpic} alt="img" />
              </figure>
              <NavLink to="/login" className="signup-image-link ml-5">I have already registered</NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <section className="signup">
              <div className="container mt-5">
                <div className="signup-content">
                  <div className="signup-form">
                    <h2 className="form-title">Sign up</h2>
                    <form method="POST" className="register-form" id="register-form">
                      {/* Form inputs go here */}
                      <div className="form-group mt-5">
                                          <label htmlFor="name">
                                          <i className="zmdi zmdi-account material-icons-name mr-4"></i>
                                          </label>
                                          <input type='text' name='name' id='name' 
                                              value={user.name}
                                              onChange={handleChange}
                                              autoComplete='off' 
                                              placeholder="Name" style={{border:'none',outline: 'none'}}
                                          />
                                      </div>
                                          <div className="form-group">
                                          <label htmlFor="email">
                                          <i className="zmdi zmdi-email material-icons-name mr-4"></i>
                                          </label>
                                          <input type='email' name='email' id='email' 
                                          value={user.email}
                                              onChange={handleChange}
                                              autoComplete='off' 
                                              placeholder="Email" style={{border:'none',outline: 'none'}}
                                          />
                                      </div>
                                   
                                      <div className="form-group">
                                          <label htmlFor="password">
                                          <i className="zmdi zmdi-lock material-icons-name mr-4"></i>
                                          </label>
                                          <input type='password' name='password' id='password' 
                                          value={user.password}
                                              onChange={handleChange}
                                              autoComplete='off' 
                                              placeholder="Enter password" style={{border:'none',outline: 'none'}}
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="cpassword">
                                          <i className="zmdi zmdi-lock material-icons-name mr-4"></i>
                                          </label>
                                          <input type='cpassword' name='cpassword' id='cpassword' 
                                          value={user.cpassword}
                                              onChange={handleChange}
                                              autoComplete='off' 
                                              placeholder="Confirm password" style={{border:'none',outline: 'none'}}
                                          />
                                      </div>
                                  <div className="form-group form-button ml-5">
                                      <input type="submit" name="signup" id="signup" className="form-submit primary"
                                      value="Register" onClick={postData}/>
                                  </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        </div>
    )
}

export default Signup
