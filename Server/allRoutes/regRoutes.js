
// const express = require('express');
// const bcrypt = require('bcrypt');
// const regApi = express.Router();
// const User = require('../Models/RegistrationModel/regModel');

// regApi.post('/regUser', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword
//     });
    
//     await newUser.save();
//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// });

// module.exports = regApi;























const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const regApi = express.Router();
const User = require('../Models/RegistrationModel/regModel');

const secretKey = 'codroidHubIsMySecretKey'; // Replace with a strong, unique secret key

regApi.post('/regUser', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = regApi;
