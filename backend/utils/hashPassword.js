// Script to generate hashed password for admin user
// Run: node utils/hashPassword.js <password>

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node utils/hashPassword.js <password>');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('Hashed Password:', hashedPassword);
  console.log('\nUse this hash in your database query or setup.sql file');
});
