
// const{ useNavigate } = require ('react-router-dom');
const express = require('express');
const bcrypt = require('bcrypt');
const loginApi = express.Router();
const User = require('../Models/LoginModel/loginModel');

loginApi.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful' });
      // useNavigate("/chat");
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = loginApi;
