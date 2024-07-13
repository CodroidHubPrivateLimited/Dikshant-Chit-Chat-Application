const express = require('express');
const loginApi = express.Router();


loginApi.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await users.findOne({ email, password });
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = loginApi;