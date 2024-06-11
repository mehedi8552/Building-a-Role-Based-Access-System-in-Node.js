const passport = require("passport");
const Register = require("./Register/Register") ;
const Login = require("./Login/Login");


const UserRegister = (userRequest, role, res) =>
    Register(userRequest, role, res);

const UserLogin = (userRequest, role, res)=>
    Login(userRequest, role, res)

const UserAuth = passport.authenticate("jwt",{session:false});

const CheckRole = (roles) =>(req,res,next)=>{
    !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
}

const SerializeUser = (user) => {
  console.log(user);
    return {
      username: user.username,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  };


  module.exports ={
    
    UserRegister,
    UserLogin,
    CheckRole,
    UserAuth,
    SerializeUser
  }