const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-ctr';
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex'); // Ensure the secretKey is in Buffer format

// Note: Initialize `iv` as a random value only for encryption, not for decryption
const encryptData = (text) => {
    const iv = crypto.randomBytes(16); // Generate a new iv for each encryption
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decryptData = (hash) => {
    if (!hash || !hash.iv || !hash.content) {
        throw new Error('Invalid hash format');
    }

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};

module.exports = {
    encryptData,
    decryptData
};
