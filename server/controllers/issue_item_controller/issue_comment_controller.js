// TODO: comment model CRUD
const { comment: CommentModel } = require("../../db/models");

const createComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const readComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "fail", erroror: error.message });
  }
};

module.exports = { createComment, readComment, updateComment, deleteComment };
