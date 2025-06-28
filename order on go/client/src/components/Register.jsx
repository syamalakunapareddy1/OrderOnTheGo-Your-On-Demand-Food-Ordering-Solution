import React, { useContext, useState } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {

  const { setUsername, setEmail, setPassword, setUsertype, usertype, setRestaurantAddress, setRestaurantImage, register } = useContext(GeneralContext);

  const [localPassword, setLocalPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    // Minimum 6 characters, at least 1 uppercase letter, 1 number, and 1 special character
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setLocalPassword(value);
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters, include an uppercase letter, a number, and a special character.');
    } else {
      setPasswordError('');
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordError || localPassword === '') {
      alert('Please enter a valid password.');
      return;
    }
    await register();
  }

  return (
    <form className="authForm">
      <h2>Register</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="floatingInput" placeholder="username"
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
          onChange={handlePasswordChange} />
        <label htmlFor="floatingPassword">Password</label>
        {passwordError && <small style={{ color: 'red' }}>{passwordError}</small>}
      </div>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        onChange={(e) => setUsertype(e.target.value)}>
        <option value="">User type</option>
        <option value="admin">Admin</option>
        <option value="restaurant">Restaurant</option>
        <option value="customer">Customer</option>
      </select>

      {usertype === 'restaurant' &&
        <>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="floatingAddress" placeholder="Address"
              onChange={(e) => setRestaurantAddress(e.target.value)} />
            <label htmlFor="floatingAddress">Address</label>
          </div>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="floatingImage" placeholder="Image"
              onChange={(e) => setRestaurantImage(e.target.value)} />
            <label htmlFor="floatingImage">Thumbnail Image</label>
          </div>
        </>
      }

      <button className="btn btn-primary" onClick={handleRegister}>Sign up</button>
      <p>Already registered? <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>Login</span></p>
    </form>
  )
}

export default Register;
