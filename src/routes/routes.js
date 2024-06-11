const router = require("express").Router();
const { UserAuth, CheckRole, SerializeUser,UserRegister } = require("../Controllers/index");
const { ROLE } = require("../config/roles");
const passport = require("passport");

router.get("/new", (req, res) => {
    res.send("Api running...");
  });

router.get("/admin",UserAuth, CheckRole([ROLE.admin]), async (req, res) => {
    return res.status(200).json({ type: "admin", user: SerializeUser(req.user) });
  });

  router.post("/signup", async (req, res) => {
    await UserRegister(req.body, ROLE.superadmin, res);
  });

  
module.exports = router;