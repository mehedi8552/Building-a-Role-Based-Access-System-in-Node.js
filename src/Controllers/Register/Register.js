const bcrypt = require("bcrypt");

const {
  ValidateUsername,
  ValidateEmail,
  signupSchema,
} = require("../Validate/Validate.js");

const MSG = {
  usernameExists: "Username is already taken.",
  emailExists: "Email is already registered.",
  signupSuccess: "You are successfully signed up.",
  signupError: "Unable to create your account.",
};

const register = async (userRequest, role, res) => {
  try {
    const signUpRequest = await signupSchema.validateAsync(userRequest);

    let usernameNotTaken = await ValidateUsername(signUpRequest.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: MSG.usernameExists,
        success: false,
      });
    }
    let emailNotRegistered = await ValidateEmail(signUpRequest.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: MSG.emailExists,
        success: false,
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(signUpRequest.password, 12);
    // create a new user
    const newUser = new User({
      ...signUpRequest,
      password,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: MSG.signupSuccess,
      success: true,
    });
  }  catch (err) {
    let errorMsg = MSG.signupError;
    if (err.isJoi === true) {
      err.status = 403;
      errorMsg = err.message;
    }
    return res.status(500).json({
      message: errorMsg,
      success: false,
    });
  }
};
