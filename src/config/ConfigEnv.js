require("dotenv").config();

module.exports = {
    DB: process.env.DB,
    SECRATE : process.env.SECRATE,
    TOKEN_EXPIREATION : process.env.TOKEN_EXPIREATION,
    REQUEST_TIMEOUT : process.env.REQUEST_TIMEOUT,
    PORT: process.env.PORT
};