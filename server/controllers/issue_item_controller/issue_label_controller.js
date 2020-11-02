const { label_has_issue: LabelHasModel } = require("../../db/models");
const { issue: IssueModel } = require("../../db/models");
const { label: LabelModel } = require("../../db/models");

const createLabelToIssue = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { labelid } = req.body;

    const newLabelToIssue = await LabelHasModel.create({ issueid, labelid });
    if (!newLabelToIssue) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readLabelsToIssue = async (req, res) => {
  try {
    const { issueid } = req.params;
    const [{ label_has_issues }] = await IssueModel.findAll({
      include: [
        {
          model: LabelHasModel,
          include: [{ model: LabelModel }],
        },
      ],
      where: { id: issueid },
    });
    return res.status(200).json({ message: "success", label_has_issues });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteLabelToIssue = async (req, res) => {
  try {
    const { issueid, labelid } = req.params;
    await LabelHasModel.destroy({ where: { issueid, labelid } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  createLabelToIssue,
  readLabelsToIssue,
  deleteLabelToIssue,
};
