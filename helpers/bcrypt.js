const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);
const comparePassword = (password, dbpassword) =>
  bcrypt.compareSync(password, dbpassword);

module.exports = { hashPassword, comparePassword };
