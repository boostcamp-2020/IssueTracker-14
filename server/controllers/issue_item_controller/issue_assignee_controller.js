// TODO: assignee CRD
const { assignee: AssigneeModel } = require("../../db/models");

const createAssignee = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { id: userid } = req.user;
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const readAssignee = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const deleteAssignee = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = { createAssignee, readAssignee, deleteAssignee };
