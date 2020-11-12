const { milestone: MilestoneModel } = require("../db/models");
const { issue: IssueModel } = require("../db/models");

const createMilestone = async (req, res) => {
  try {
    const { title, duedate, description } = req.body;
    if (Date.now() > new Date(duedate) && duedate !== null) {
      return res.status(400).json({ message: "fail" });
    }
    await MilestoneModel.create({
      title,
      duedate,
      description,
      status: "open",
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readMilestone = async (req, res) => {
  try {
    const { milestoneid: id } = req.params;
    const milestone = await MilestoneModel.findOne({
      where: { id },
    });
    return res.status(200).json({ message: "success", milestone: milestone });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readMilestones = async (req, res) => {
  try {
    const { status } = req.query;
    const milestones = await MilestoneModel.findAll({
      include: [{ model: IssueModel, attributes: ["id", "status"] }],
      where: status !== undefined && { status },
      attributes: ["id", "title", "duedate", "status", "description"],
      order: [["duedate", "DESC"]],
    });
    if (!Array.isArray(milestones)) {
      return res.status(500).json({ message: "fail" });
    }
    const milestoneCount = { open: 0, closed: 0 };

    milestones.forEach((milestone) => {
      milestone.status === "open"
        ? milestoneCount.open++
        : milestoneCount.closed++;
    });
    return res.status(200).json({
      message: "success",
      milestoneCount,
      milestones: milestones,
    });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const updateMilestone = async (req, res) => {
  try {
    const { milestoneid: id } = req.params;
    const { title, duedate, description, status } = req.body;
    console.log(req.params);
    console.log(req.body);
    if (Date.now() > new Date(duedate) && duedate !== null) {
      return res.status(400).json({ message: "fail" });
    }
    await MilestoneModel.update(
      {
        title,
        duedate,
        description,
        status,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: "success" });
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
  readMilestones,
  updateMilestone,
  deleteMilestone,
};
