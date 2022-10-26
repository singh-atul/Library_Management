const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

module.exports = {
  async signup(payload) {
    try {
      const { password } = payload;
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );

      payload.password = hashedPassword;
      payload.role = "member";

      let user = await User.findOne({ where: { email: payload.email } });

      if (user) {
        return {
          error: true,
          message: "Account already exists",
        };
      }

      user = await User.create(payload);

      return {
        user: user.toJSON(),
        message: "Sign up successful",
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        error: true,
      };
    }
  },

  async login(payload) {
    const { email, password } = payload;
    const errorRes = {
      message: "Wrong username or password",
      error: true,
    };

    try {
      const user = await User.findOne({ where: { email } });
      const canLogin = await bcrypt.compare(password, user.password);

      if (canLogin) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET);

        return {
          token,
          user,
          message: "Login Successfully",
          error: false,
        };
      }

      return errorRes;
    } catch (error) {
      return errorRes;
    }
  },
};
