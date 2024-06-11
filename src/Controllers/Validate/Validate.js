const passport = require("passport");
const User = require("../../Models/User");
const Joi = require("joi");

const ValidateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const ValidateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]"))
    .min(8)
    .required(),
});

const LoginSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]"))
    .min(8)
    .required(),
});

module.exports ={
    ValidateUsername,
    ValidateEmail,
    signupSchema,
    LoginSchema
}
