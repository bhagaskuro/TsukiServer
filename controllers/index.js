const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  //static async for register new user
  static async register(req, res, next) {
    try {
      const newData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      };

      let createData = await User.create(newData);
      let { id, email } = createData;
      res.status(201).json({ id, email });
    } catch (error) {
      next(error);
    }
  }

  //static async login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "reqEmailPassword" };
      if (!password) throw { name: "reqEmailPassword" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "emailpassword" };

      const pass = comparePassword(password, user.password);
      if (!pass) throw { name: "emailpassword" };

      const payload = {
        id: user.id,
      };
      const acces_token = signToken(payload);

      res.status(200).json({
        access_token: acces_token,
        email: user.email,
        role: user.role,
        username: user.username,
        id: user.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
