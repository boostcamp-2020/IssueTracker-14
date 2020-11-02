const { issue: IssueModel } = require("../db/models");
const { user: UserModel } = require("../db/models");
const { milestone: MilestoneModel } = require("../db/models");
const { comment: CommentModel } = require("../db/models");
const { label: LabelModel } = require("../db/models");
const { label_has_issue: LabelHasIssueModel } = require("../db/models");

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
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readIssues = async (req, res) => {
  try {
    const { id: userid } = req.user;
    const [{ issues }] = await UserModel.findAll({
      include: [
        {
          model: IssueModel,
          include: [
            { model: UserModel },
            { model: MilestoneModel },
            { model: CommentModel, include: [{ model: UserModel }] },
            { model: LabelHasIssueModel, include: [{ model: LabelModel }] },
          ],
        },
      ],
      where: { id: userid },
    });
    return res.status(200).json({ message: "success", issues });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
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
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = { createIssue, readIssues, updateIssue };
