const { label: labelModel } = require("../db/models");

const createLabel = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    const newLabel = await labelModel.findOrCreate({
      where: { title },
      defaults: { title, description, color },
    });

    if (!newLabel) return res.status(400).json({ message: "fail" });

    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readLabel = async (req, res) => {
  try {
    const { labelid: id } = req.params;
    const label = await labelModel.findOne({
      where: { id },
      attributes: ["id", "title", "color", "description"],
    });
    return res.status(200).json({ message: "success", label: label });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readLabels = async (req, res) => {
  try {
    const labels = await labelModel.findAll({
      attributes: ["id", "title", "color", "description"],
    });
    if (!Array.isArray(labels)) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success", labels });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const updateLabel = async (req, res) => {
  try {
    const { labelid: id } = req.params;
    const { title, description, color } = req.body;
    await labelModel.update(
      { title, description, color },
      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteLabel = async (req, res) => {
  try {
    const { labelid: id } = req.params;
    await labelModel.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  createLabel,
  readLabel,
  readLabels,
  updateLabel,
  deleteLabel,
};
