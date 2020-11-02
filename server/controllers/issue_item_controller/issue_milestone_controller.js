// TODO: issue의 Milestoneid를 CD
const { issue: IssueModel } = require("../../db/models");

const createMilestoneToIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const deleteMilestoneToIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = {
  createMilestoneToIssue,
  deleteMilestoneToIssue,
};
