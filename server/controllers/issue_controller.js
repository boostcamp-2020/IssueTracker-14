const { issue: IssueModel } = require("../db/models");

const createIssue = async (req, res) => {
  try {
    const { title } = req.body;
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const readIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = { createIssue, readIssue, updateIssue };
