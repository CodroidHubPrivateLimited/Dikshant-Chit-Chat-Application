const express = require('express');
const router = express.Router();
const avatarModel = require('../../Models/Avatar Model/avatarModel');
const users = require('../../Models/Avatar Model/avatarModel');

// Route to set avatar
router.post('/setAvatar/:email', async (req, res) => {
    const { email } = req.params;
    const { image } = req.body;

    try {
        const userAvatar = await users.findOne({ email });
        if (!userAvatar) {
            return res.status(404).json({ message: 'User not found' });
        }

        userAvatar.avatar = image;
        const updatedAvatarModel = await userAvatar.save();

        res.json({ message: 'Avatar updated successfully', updatedUser: updatedAvatarModel });
        
    } catch (error) { 
        console.error('Error updating avatar', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
