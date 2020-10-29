const express = require("express");
const router = express.Router();

const passport = require("passport");

const oAuthRouter = require("./oauth");

router.use("/oauth", oAuthRouter);

router.get("/status");
router.get("/logout");

router.post("/signup");
router.post("/login");

module.exports = router;
