import React, { useEffect, useState }  from 'react';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const storedData = localStorage.getItem('user');
    // Parse the JSON data
  useEffect(() => {
    if (!isAuthenticated && !storedData) {
      // If not authenticated, navigate to the login page
      navigate('/login');
    }
    else {
      // If authenticated, stop loading
      setIsLoading(false);
    }
  },[isAuthenticated, isLoading,  navigate]);

  return isLoading ? null : <>{children}</>;
};

export default Auth;
