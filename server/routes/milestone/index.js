const express = require("express");
const router = express.Router();
const milestoneController = require("../../controllers/milestone_controller");

router.get("/", milestoneController.readMilestones);
router.post("/", milestoneController.createMilestone);
router.get("/:milestoneid", milestoneController.readMilestone);
router.put("/:milestoneid", milestoneController.updateMilestone);
router.delete("/:milestoneid", milestoneController.deleteMilestone);

module.exports = router;
