const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$ZmCTTzZmZp3bZ6O7zQ/mA.y88jcMCLuNIV6tpMvNiOsJniyvs.IDe';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
