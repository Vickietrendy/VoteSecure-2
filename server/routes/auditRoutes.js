// server/routes/auditRoutes.js
const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.post('/', async (req, res) => {
  const { userId } = req.body; // Changed to userId
  try {
    const vote = await Vote.findOne({ userId }); // Use userId or email
    if (vote) {
      res.json({
        success: true,
        voteDetails: {
          candidateName: vote.candidateName,
          candidateParty: vote.candidateParty,
          userId: vote.userId, // Use userId or email
        },
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error auditing vote:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
