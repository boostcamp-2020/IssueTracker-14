const express = require("express");
const router = express.Router();

const userRouter = require("./user/index");

const passport = require("passport");

router.use("/user", userRouter);

module.exports = router;
