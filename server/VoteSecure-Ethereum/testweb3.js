// testWeb3.js
const Web3 = require('web3');

// Connect to the local Ganache instance
const web3 = new Web3('http://127.0.0.1:8545');

// Get the first account from Ganache
web3.eth.getAccounts()
  .then(accounts => {
    console.log('Accounts:', accounts);
  })
  .catch(error => {
    console.error('Error fetching accounts:', error);
  });
