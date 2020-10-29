const express = require("express");
const router = express.Router();

const userRouter = require("./user/index");

router.use("/user", userRouter);

module.exports = router;
