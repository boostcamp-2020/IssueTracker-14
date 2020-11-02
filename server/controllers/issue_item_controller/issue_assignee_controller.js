const { assignee: AssigneeModel } = require("../../db/models");

const createAssignee = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { userid } = req.body;

    const newAssignee = await AssigneeModel.create({ issueid, userid });
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
    //   TODO: read assignee 할때 user, assignee, issue의 join 필요
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteAssignee = async (req, res) => {
  try {
    const { issueid, assineeid } = req.params;
    await AssigneeModel.destroy({ where: { issueid, assineeid } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = { createAssignee, readAssignees, deleteAssignee };
