const router = require('express').Router();
const {ROLE} = require("../../config/roles");

const {
    userRegister,
    UserLogin,
    CheckRole,
    UserAuth,
    SerializeUser
}=  require("../../Controllers")