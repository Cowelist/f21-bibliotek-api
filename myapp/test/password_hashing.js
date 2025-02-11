const bcrypt = require('bcryptjs');

// Example password to hash
const plainPassword = 'otgdrodrmt';

// Salt rounds define the complexity of the hashing process (the higher the number, the more secure but slower)
const saltRounds = 1;

bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.log('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hashedPassword);
    // You can store the hashedPassword in your database
  }
});