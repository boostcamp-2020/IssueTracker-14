const { issue: IssueModel } = require("../db/models");
const { user: UserModel } = require("../db/models");
const { milestone: MilestoneModel } = require("../db/models");
const { comment: CommentModel } = require("../db/models");
const { label: LabelModel } = require("../db/models");
const { label_has_issue: LabelHasIssueModel } = require("../db/models");
const { assignee: AssigneeModel } = require("../db/models");

const { Op } = require("sequelize");

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
    const { status, author, label, milestone, assignee } = req.query;

    const issues = await IssueModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["id", "nickname"],
          where: author !== undefined && { nickname: author },
        },
        {
          model: MilestoneModel,
          attributes: ["id", "title"],
          where: milestone !== undefined && { title: milestone },
        },
        {
          model: AssigneeModel,
          include: [
            {
              model: UserModel,
              attributes: ["id", "nickname", "imageurl"],
              where: assignee !== undefined && { nickname: assignee },
            },
          ],
          attributes: ["id"],
        },
        {
          model: CommentModel,
        },
        {
          model: LabelHasIssueModel,
          include: [
            {
              model: LabelModel,
              where: label !== undefined && {
                title: {
                  [Op.or]: Array.isArray(label) ? label : [label],
                },
              },
              attributes: ["id", "title", "color", "description"],
            },
          ],
          attributes: ["id"],
        },
      ],
      attributes: ["id", "title", "status", "createdAt", "updatedAt"],
    });
    //TODO: Comment count
    const issueCount = { open: 0, closed: 0 };

    const filteredIssues = issues.filter((issue) => {
      issue.status === "open" ? issueCount.open++ : issueCount.closed++;
      return status !== undefined
        ? status.includes(issue.status)
        : issue.status === "open";
    });

    return res.status(200).json({
      message: "success",
      issues: filteredIssues,
      issueCount,
    });
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
