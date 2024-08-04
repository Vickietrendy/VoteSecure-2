const { encryptData } = require('./encryption'); // Adjust the path to your encryption.js

const data = 'This is a sample text to encrypt.';
const encryptedData = encryptData(data);

console.log('Encrypted Data:', JSON.stringify(encryptedData));
