import React,{useState,useEffect,useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { selectAuthenticated , selectUserName, logOutAsync} from '../auth/authSlice';
// import {UserContext} from '../App';
const Navbar = () => {
//   const {state,dispatch}=useContext(UserContext);
// const isAuthenticated = useSelector(selectAuthenticated);
const storedData = localStorage.getItem('user');
const userName=useSelector(selectUserName);
const dispatch = useDispatch();
const navigate=useNavigate();
const handleLogOut = () => {
  console.log("before dispatch");
  navigate('/login')
  dispatch(logOutAsync());
  console.log("after dispatch");
  
};
  const RenderMenu = () =>{
    if(storedData){
      return(
        <>
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/chat">Chat <span className="sr-only">(current)</span></NavLink>
      </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="#" onClick={handleLogOut} >Logout</NavLink>
      </li>
 
        </>
      )
    }
    else{
      return(
        <>
         <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
          <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Signup</NavLink>
      </li>
        </>
      )
    }
  }
   
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/navbar"><h2>web<span style={{color:'#34a3c2'}}>M</span>essenger</h2></NavLink>
  {/* {isAuthenticated&& <NavLink className="navbar-brand" to="#" style={{marginLeft:'26%',color:'#34a3c2'}}><h2>Hi {userName}</h2></NavLink>} */}
 
    {/* <p className="nav-link" style={{ cursor: 'default', textAlign: 'center', fontSize:30, marginLeft:"15em", marginTop:5 }}>Hi {userName}</p> */}
   
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
        </div>
    )
}

export default Navbar