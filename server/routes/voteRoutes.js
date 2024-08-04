// server/routes/voteRoutes.js
const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.post('/', async (req, res) => {
  const { userId, candidateId, candidateName, candidateParty } = req.body; // Changed to userId
  try {
    const vote = new Vote({
      userId, // Use userId or email
      candidateId,
      candidateName,
      candidateParty,
    });
    await vote.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving vote:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
