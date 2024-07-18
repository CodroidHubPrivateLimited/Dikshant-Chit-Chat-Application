// const express = require('express');
// import Avatars from './../Client/src/components/Avatars/avatars';
// const cors = require('cors');
// const mongoose = require('mongoose');
// const regRoutes = require('./allRoutes/regRoutes');
// const loginRoutes = require('./allRoutes/loginRoutes');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/chitChat', {

// });

// app.use('/api', regRoutes); 
// app.use('/api', loginRoutes); 

// const server = app.listen(process.env.PORT || 3030, () => {
//   console.log(`Server is running on port ${process.env.PORT || 3030}`);
// });



























const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const regRoutes = require('./allRoutes/regRoutes');
const loginRoutes = require('./allRoutes/loginRoutes');
const avatarsRoute = require('./allRoutes/avatar Route/avatarRoutes')
// const authenticateToken = require('./middleware/authenticateToken'); // Import middleware
const authenticateToken=require('./utils/middleware/authentication_authorization')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chitChat', {

});

// Use registration and login routes
app.use('/api', regRoutes);
app.use('/api', loginRoutes);
app.use('/api', avatarsRoute);

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  // This endpoint requires authentication
  res.json({ message: 'Access granted!' });
});

const server = app.listen(process.env.PORT || 3030, () => {
  console.log(`Server is running on port ${process.env.PORT || 3030}`);
});

module.exports = server;
