// TODO: label_has_issue를 CRD
const { label_has_issue: LabelHasModel } = require("../../db/models");

const createLabelToIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const readLabelToIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const deleteLabelToIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = {
  createLabelToIssue,
  readLabelToIssue,
  deleteLabelToIssue,
};
