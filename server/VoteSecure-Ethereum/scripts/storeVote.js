// server/storeVote.js
const Web3 = require('web3');
const VoteSecureABI = require('../build/contracts/VoteSecure.json');
const generateReceipt = require('./generateHash');
const Vote = require('./models/Vote'); // Assuming you have a Mongoose model for Vote

const web3 = new Web3('http://127.0.0.1:7545'); // Ensure Ganache is running

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(VoteSecureABI.abi, contractAddress);

const castVote = async (candidateId, voterAddress) => {
  const receipt = generateReceipt(voterAddress, candidateId);
  try {
    await contract.methods.vote(candidateId).send({ from: voterAddress });
    console.log('Vote cast successfully!', receipt);
    // Save the vote details to the database
    const candidate = candidates.find(c => c.id === candidateId);
    const vote = new Vote({
      voterAddress,
      candidateId,
      candidateName: candidate.name,
      candidateParty: candidate.party,
    });
    await vote.save();
  } catch (error) {
    console.error('Error casting vote:', error);
  }
};

// Example usage
castVote(1, 'voter-address');
