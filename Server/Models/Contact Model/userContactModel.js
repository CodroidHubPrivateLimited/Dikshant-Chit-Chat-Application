const mongoose = require('mongoose');

const userContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('userContact', userContactSchema);