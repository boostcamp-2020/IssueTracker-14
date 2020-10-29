const express = require("express");
const router = express.Router();

const passport = require("passport");
const userController = require("../../controllers/user_controller");

router.get("/github", passport.authenticate("github", { session: false }));
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  userController.githubLogin
);

router.post("/apple", userController.appleLogin);

module.exports = router;
