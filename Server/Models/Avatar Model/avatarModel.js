// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     // username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     avatar: { type: String },
//     // Add other fields as needed
// });

// const avatarModel = mongoose.model('user', userSchema);

// module.exports = avatarModel;



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
});

const avatarModel = mongoose.model('user', userSchema);

module.exports = avatarModel;
