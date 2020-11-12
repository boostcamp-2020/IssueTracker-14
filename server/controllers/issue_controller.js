const { issue: IssueModel } = require("../db/models");
const { user: UserModel } = require("../db/models");
const { milestone: MilestoneModel } = require("../db/models");
const { comment: CommentModel } = require("../db/models");
const { label: LabelModel } = require("../db/models");
const { label_has_issue: LabelHasIssueModel } = require("../db/models");
const { assignee: AssigneeModel } = require("../db/models");

const db = require("../db/models/index");
const { Op } = require("sequelize");

const createIssue = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const {
      title,
      milestoneid,
      assigneeIdList,
      labelIdList,
      commentContent,
    } = req.body;
    const { id: authorid } = req.user;

    const AssigneeIdList = JSON.parse(assigneeIdList);
    const LabelIdList = JSON.parse(labelIdList);

    const { id: issueid } = await IssueModel.create(
      {
        title,
        authorid,
        milestoneid,
        status: "open",
      },
      { transaction: t }
    );

    await CommentModel.create(
      { issueid, content: commentContent, userid: authorid },
      { transaction: t }
    );

    Array.isArray(AssigneeIdList) &&
      (await AssigneeModel.bulkCreate(
        AssigneeIdList.map((userid) => {
          return { issueid, userid };
        }),
        { transaction: t }
      ));

    Array.isArray(LabelIdList) &&
      (await LabelHasIssueModel.bulkCreate(
        LabelIdList.map((labelid) => {
          return { issueid, labelid };
        }),
        { transaction: t }
      ));

    await t.commit();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    await t.rollback();
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readIssue = async (req, res) => {
  try {
    const { issueid: id } = req.params;
    const issue = await IssueModel.findOne({
      include: [
        {
          model: UserModel,
          attributes: ["id", "nickname"],
        },
        {
          model: MilestoneModel,
          attributes: ["id", "title"],
        },
        {
          model: AssigneeModel,
          include: [
            {
              model: UserModel,
              attributes: ["id", "nickname", "imageurl"],
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
              attributes: ["id", "title", "color", "description"],
            },
          ],
          attributes: ["id"],
        },
      ],
      attributes: [
        "id",
        "title",
        "status",
        "createdAt",
        "updatedAt",
        "description",
      ],
      where: { id },
    });
    return res.status(200).json({ message: "success", issue });
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
      attributes: [
        "id",
        "title",
        "status",
        "createdAt",
        "updatedAt",
        "description",
      ],
    });

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
    const { title, status, description, milestoneid } = req.body;
    await IssueModel.update(
      {
        title,
        status,
        description,
        milestoneid,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const updateIssues = async (req, res) => {
  try {
    const { issueIdList, status } = req.body;
    const issues = await IssueModel.findAll();
    const issueList = issues
      .map((issue) => {
        if (issueIdList.includes(issue.id)) {
          return {
            id: issue.id,
            title: issue.title,
            status: status,
            description: issue.description,
            authorid: issue.authorid,
            milestoneid: issue.milestoneid,
          };
        }
        return;
      })
      .filter((issue) => issue !== undefined);
    await IssueModel.bulkCreate(issueList, { updateOnDuplicate: ["status"] });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  createIssue,
  readIssue,
  readIssues,
  updateIssue,
  updateIssues,
};
