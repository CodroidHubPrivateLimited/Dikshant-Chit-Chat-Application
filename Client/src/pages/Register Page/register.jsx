import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.setItem('user-Details', JSON.stringify(formData));



    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!validatePassword(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long and include a mixture of letters, numbers, and special characters.');
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMessage('You must agree to the terms and conditions');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3030/api/regUser', formData);

      if (response.status === 200) {
        alert('User registered successfully');
        localStorage.setItem('token', response.data.token); // Store the token

        navigate('/login');
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error: Email already exists');
    }
  };

  return (
    <div className="main-container">
      <h2>Register</h2>
      <div className="form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
              <label>
                First Name <span className="required-field">*</span>
              </label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                Last Name <span className="required-field">*</span>
              </label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  className="form-input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                Email <span className="required-field">*</span>
              </label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                Password <span className="required-field">*</span>
              </label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                Confirm Password <span className="required-field">*</span>
              </label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  className="form-input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="terms-label">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree with Terms and Conditions <span className="required-field">*</span>
              </label>
            </div>
            <button className="form-submit" type="submit">
              Register
            </button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
