const express = require("express");
const router = express.Router();

const userRouter = require("./user/index");
const issuesRouter = require("./issue/index");
const labelRouter = require("./label/index");
const milestoneRouter = require("./milestone/index");

const fileuploadController = require("../controllers/file_upload_controller");

const { isAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/file_upload");

router.use("/user", userRouter);

router.use("/issues", isAuth, issuesRouter);
router.use("/label", isAuth, labelRouter);
router.use("/milestone", isAuth, milestoneRouter);

router.post("/fileupload", upload.single("filename"), fileuploadController);

module.exports = router;
