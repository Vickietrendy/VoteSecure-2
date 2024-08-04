const bcrypt = require('bcryptjs');

const saltRounds = 10;
const plainPassword = 'password';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log(`Hashed Password: ${hash}`);
});
