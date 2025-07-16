import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');

  const [productSearch, setProductSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await axios.get('http://localhost:6001/fetch-cart');
        setCartCount(response.data.filter(item => item.userId === userId).length);
      }
    } catch (err) {
      console.error('Cart Count Error:', err);
    }
  };

  const handleSearch = () => {
    navigate('#products-body');
  };

  const login = async () => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post('http://localhost:6001/login', loginInputs);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'restaurant') {
        navigate('/restaurant');
      }

    } catch (err) {
      console.error('Login Error:', err);
      alert('Login failed! Please check your credentials.');
    }
  };

  const inputs = { username, email, usertype, password, restaurantAddress, restaurantImage };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:6001/register', inputs);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'restaurant') {
        navigate('/restaurant');
      }

    } catch (err) {
      console.error('Registration Error:', err);
      alert('Registration failed! Please try again.');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUsername('');
    setEmail('');
    setPassword('');
    setUsertype('');
    setRestaurantAddress('');
    setRestaurantImage('');
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{
      login,
      register,
      logout,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      usertype, setUsertype,
      setRestaurantAddress,
      setRestaurantImage,
      productSearch, setProductSearch,
      handleSearch,
      cartCount, fetchCartCount
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
