import React,{useEffect, useState}from 'react'
import './Chat.css';
const Home = () => {
    const [userData,setUserData]=useState({});
    useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      // Parse the JSON data
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
    }, []);
    return (
       <>
           <div className="home-page">
            <div className="home-div mt-5">
                <p className="pt-5" style={{marginLeft:'44%'}}>WELCOME TO</p>
                <h1  style={{marginLeft:'38%'}}>web<span style={{color:'#34a3c2'}}>M</span>essenger</h1>
                <h2  className="pt-5" style={{marginLeft:'45%'}}><span style={{color:'#34a3c2'}}>{userData.displayName}</span></h2>
            </div>
           </div>
       </>
    )
}

export default Home
