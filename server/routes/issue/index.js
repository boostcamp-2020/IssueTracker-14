const express = require("express");
const router = express.Router();

const issueController = require("../../controllers/issue_controller");
const commentController = require("../../controllers/issue_item_controller/issue_comment_controller");
const assigneeController = require("../../controllers/issue_item_controller/issue_assignee_controller");
const labelToIssueController = require("../../controllers/issue_item_controller/issue_label_controller");
const milestoneToIssueController = require("../../controllers/issue_item_controller/issue_milestone_controller");

router.get("/", issueController.readIssue);
router.post("/", issueController.createIssue);
router.put("/:issueid", issueController.updateIssue);

router.get("/:issueid/comment", commentController.readComment);
router.post("/:issueid/comment", commentController.createComment);
router.put("/:issueid/comment/:commentid", commentController.updateComment);
router.delete("/:issueid/comment/:commentid", commentController.deleteComment);

router.get("/:issueid/assignee", assigneeController.readAssignee);
router.post("/:issueid/assignee", assigneeController.createAssignee);
router.delete(
  "/:issueid/assignee/:assigneeid",
  assigneeController.deleteAssignee
);

router.get("/:issueid/label", labelToIssueController.readLabelToIssue);
router.post("/:issueid/label", labelToIssueController.createLabelToIssue);
router.delete(
  "/:issueid/label/:labelid",
  labelToIssueController.deleteLabelToIssue
);

router.put(
  "/:issueid/milestone",
  milestoneToIssueController.toggleMilestoneToIssue
);
router.put(
  "/:issueid/milestone/:milestoneid",
  milestoneToIssueController.toggleMilestoneToIssue
);

module.exports = router;
