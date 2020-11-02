const { issue: IssueModel } = require("../db/models");

const createIssue = async (req, res) => {
  try {
    const { title } = req.body;
    const { id: authorid } = req.user;
    const newIssue = await IssueModel.create({
      title,
      authorid,
      status: "open",
    });
    if (!newIssue) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const readIssues = async (req, res) => {
  try {
    //   TODO: 여기는 고민을 많이해야됨....
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    const { issueid: id } = req.params;
    const { title, status } = req.body;
    await IssueModel.update(
      {
        title,
        status,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = { createIssue, readIssues, updateIssue };
