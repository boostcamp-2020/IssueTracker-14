const { comment: CommentModel } = require("../../db/models");

const createComment = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { content } = req.body;
    const { id: userid } = req.user;

    const newComment = await CommentModel.create({ issueid, userid, content });
    if (!newComment) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readComments = async (req, res) => {
  try {
    //   TODO: Join이 필요함
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { issueid, commentid } = req.params;
    const { content } = req.body;
    const { id: userid } = req.user;
    await CommentModel.update(
      { issueid, content, userid },
      { where: { id: commentid } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentid } = req.params;
    await CommentModel.delete({ where: { id: commentid } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = { createComment, readComments, updateComment, deleteComment };
