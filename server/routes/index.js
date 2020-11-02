const express = require("express");
const router = express.Router();

const userRouter = require("./user/index");
const labelRouter = require("./label/index");
const milestoneRouter = require("./milestone/index");

router.use("/user", userRouter);

router.use("/label", labelRouter);
router.use("/milestone", milestoneRouter);

module.exports = router;
