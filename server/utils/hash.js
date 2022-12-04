const bcrypt = require("bcrypt");

async function generate(plainText) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
}
async function compare(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}
module.exports = {
  generate,
  compare,
};
