const { issue: IssueModel } = require("../../db/models");

const toggleMilestoneToIssue = async (req, res) => {
  try {
    const { issueid, milestoneid } = req.params;
    if (milestoneid !== undefined) {
      await IssueModel.update(
        { milestoneid },
        {
          where: { id: issueid },
        }
      );
    }

    if (milestoneid === undefined) {
      await IssueModel.update(
        { milestoneid: null },
        {
          where: { id: issueid },
        }
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  toggleMilestoneToIssue,
};
