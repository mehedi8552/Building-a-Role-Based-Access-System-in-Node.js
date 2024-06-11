const passport = require("passport");
const User = require("../../Models/User");
const Joi = require("joi");

const ValidateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const ValidateEmail = async (email) => {
  let email = User.findOne({ email });
  return email ? false : true;
};

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  passport: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});

const LoginSchema = Joi.object({
  username: Joi.string().min(4).required(),
  passport: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});

module.exports ={
    ValidateUsername,
    ValidateEmail,
    signupSchema,
    LoginSchema
}
