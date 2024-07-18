const express = require('express');
const router = express.Router();
const userContact = require('../../Models/Contact Model/userContactModel');

// Get all products
router.get('/userContacts', async (req, res) => {
    try {
        const userContacts = await userContact.find();
        res.json(userContacts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;