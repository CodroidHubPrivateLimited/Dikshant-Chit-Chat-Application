const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const regRoutes = require('./allRoutes/regRoutes'); // Corrected path for routes
const loginRoutes = require('./allRoutes/loginRoutes')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chitChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', regRoutes); // Note the '/api' prefix
app.use('/api', loginRoutes); // Note the '/api' prefix


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
