const { label: labelModel } = require("../db/models");

const createLabel = async (req, res) => {
  const { title, description, color } = req.body;

  try {
    const newLabel = await labelModel.create({
      title,
      description,
      color,
    });

    if (!newLabel) return res.status(400).json({ message: "fail" });

    return res.status(201).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err.message });
  }
};

const readLabels = async (req, res) => {
  try {
    const labels = await labelModel.findAll();

    if (!Array.isArray(labels)) {
      return res.status(400).json({ message: "fail" });
    }

    return res.status(200).json({ message: "success", data: labels });
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err.message });
  }
};

const updateLabel = async (req, res) => {
  const { id } = req.params;
  const { title, description, color } = req.body;

  try {
    await labelModel.update(
      { title, description, color },
      {
        where: id,
      }
    );
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err.message });
  }
};

const deleteLabel = async (req, res) => {
  const { id } = req.params;

  try {
    await labelModel.destroy({
      where: { id },
    });
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err.message });
  }
};

module.exports = { createLabel, readLabels, updateLabel, deleteLabel };
