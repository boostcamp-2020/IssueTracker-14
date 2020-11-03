const { assignee: AssigneeModel } = require("../../db/models");
const { user: UserModel } = require("../../db/models");
const { issue: IssueModel } = require("../../db/models");

const createAssignee = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { userid } = req.body;
    const newAssignee = await AssigneeModel.findOrCreate({
      where: { userid, issueid },
      defaults: { userid, issueid },
    });
    if (!newAssignee) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readAssignees = async (req, res) => {
  try {
    const { issueid } = req.params;
    const [{ assignees }] = await IssueModel.findAll({
      include: [
        {
          model: AssigneeModel,
          include: [
            { model: UserModel, attributes: ["id", "nickname", "imageurl"] },
          ],
          attributes: ["id"],
        },
      ],
      where: { id: issueid },
    });
    return res.status(200).json({ message: "success", assignees });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteAssignee = async (req, res) => {
  try {
    const { issueid, assineeid } = req.params;
    console.log(issueid, assineeid);
    await AssigneeModel.destroy({ where: { issueid, assineeid } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = { createAssignee, readAssignees, deleteAssignee };
