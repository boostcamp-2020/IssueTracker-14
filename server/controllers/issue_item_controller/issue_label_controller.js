const { label_has_issue: LabelHasModel } = require("../../db/models");

const createLabelToIssue = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { id: labelid } = req.body;

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
    //  TODO: Join이 필요함.
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
