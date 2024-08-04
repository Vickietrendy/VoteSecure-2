// server/pvcVerification.js
const express = require('express');
const router = express.Router();
const Voter = require('./models/Voter');

router.post('/verify', async (req, res) => {
    const { voterId, pvcNumber } = req.body;

    try {
        const voter = await Voter.findOne({ voterId, pvcNumber });
        if (voter) {
            res.status(200).json({ success: true, message: 'Voter verified' });
        } else {
            res.status(400).json({ success: false, message: 'Voter not found or PVC invalid' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
