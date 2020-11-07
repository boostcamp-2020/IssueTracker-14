const express = require("express");
const router = express.Router();
const labelController = require("../../controllers/label_controller");

router.get("/", labelController.readLabels);
router.post("/", labelController.createLabel);

router.get("/:labelid", labelController.readLabel);
router.put("/:labelid", labelController.updateLabel);
router.delete("/:labelid", labelController.deleteLabel);

module.exports = router;
