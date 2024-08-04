const { keccak256 } = require('ethereumjs-util');

// Function to generate receipt hash
const generateReceipt = (voter, candidateId) => {
  const receipt = keccak256(Buffer.from(`${voter}-${candidateId}-${Date.now()}`)).toString('hex');
  return receipt;
};

// Example usage
const receipt = generateReceipt('voter-address', 1);
console.log('Generated Receipt:', receipt);

module.exports = generateReceipt;
