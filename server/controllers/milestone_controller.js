const { milestone: MilestoneModel } = require("../db/models");

const createMilestone = async (req, res) => {
  try {
    const { title, duedate, description } = req.body;
    const NewMilestone = await MilestoneModel.create({
      title,
      duedate,
      description,
      status: "open",
    });
    if (!NewMilestone) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readMilestone = async (req, res) => {
  try {
    const milestones = await MilestoneModel.findAll();
    if (Array.isArray(milestones)) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success", milestones: milestones });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const updateMilestone = async (req, res) => {
  try {
    const { milestoneid: milestoneId } = req.params;
    const { title, duedate, description, status } = req.body;
    await MilestoneModel.update(
      {
        title,
        duedate,
        description,
        status,
      },
      { where: { milestoneId } }
    );
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteMilestone = async (req, res) => {
  try {
    const { milestoneid: milestoneId } = req.params;
    await MilestoneModel.destroy({ where: { id: milestoneId } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  createMilestone,
  readMilestone,
  updateMilestone,
  deleteMilestone,
};
