const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { SECRATE, TOKEN_EXPIREATION } = require("../../config/ConfigEnv");
const User = require("../../Models/User");
const { LoginSchema } = require("../Validate/Validate");

const MSG = {
  usernameNotExist: "Username is not found. Invalid login credentials.",
  wrongRole: "Please make sure this is your identity.",
  loginSuccess: "You are successfully logged in.",
  wrongPassword: "Incorrect password.",
  loginError: "Oops! Something went wrong.",
};

const login = async (userRequest, role, res) => {
  try {
    const loginRequest = await LoginSchema.validateAsync(userRequest);

    let { username, password } = userRequest;

    let user;
    if (isEmail(username)) {
      const email = username;
      user = await User.findOne({ email });
    } else {
      user = await User.findOne();
    }

    if (!user) {
      return res.status(404).json({
        reason: "username",
        message: MSG.usernameNotExist,
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(404).json({
        resone: "role",
        message: MSG.wrongRole,
        success: false,
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRATE,
        { expiresIn: "7 days" }
      );

      let result = {
        username: user.username,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: TOKEN_EXPIREATION,
      };

      return res.status(200).json({
        ...result,
        message: MSG.loginSuccess,
        success: true,
      });
    } else {
      return res.status(403).json({
        reason: "password",
        message: MSG.wrongPassword,
        success: false,
      });
    }
  } catch (err) {
    let errorMsg = MSG.loginError;
    if (err.isJoi === true) {
      err.status = 403;
      errorMsg = err.message;
    }
    return res.status(500).json({
      reason: "server",
      message: errorMsg,
      success: false,
    });
  }
};
