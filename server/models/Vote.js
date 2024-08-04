// server/models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Use userId or email
  candidateId: { type: String, required: true },
  candidateName: { type: String, required: true },
  candidateParty: { type: String, required: true },
});

module.exports = mongoose.model('Vote', voteSchema);
