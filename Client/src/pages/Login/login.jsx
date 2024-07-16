import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3030/api/login', formData);
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Login</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
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
            <button className="form-submit" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="register-link">
          Don't have an account? <a href="/register">Register Here!</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
