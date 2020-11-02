const express = require("express");
const router = express.Router();

const passport = require("passport");
const oAuthRouter = require("./oauth");
const userController = require("../../controllers/user_controller");

router.use("/oauth", oAuthRouter);

router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(201).json({ message: "ok" });
  }
);

router.post("/signup", userController.signup);
router.post("/login", userController.localLogin);

// TODO: object storage 사용해야됨.
router.post("/upload");

module.exports = router;
