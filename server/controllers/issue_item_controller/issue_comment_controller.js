const { comment: CommentModel } = require("../../db/models");
const { issue: IssueModel } = require("../../db/models");
const { user: UserModel } = require("../../db/models");

const createComment = async (req, res) => {
  try {
    const { issueid } = req.params;
    const { content } = req.body;
    const { id: userid } = req.user;

    await CommentModel.create({ issueid, userid, content });
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

const readComments = async (req, res) => {
  try {
    const { issueid } = req.params;
    const [{ comments }] = await IssueModel.findAll({
      include: [
        {
          model: CommentModel,
          attributes: ["id", "content", "createdAt", "updatedAt"],
          include: [
            { model: UserModel, attributes: ["id", "nickname", "imageurl"] },
          ],
        },
      ],
      where: { id: issueid },
    });
    return res.status(200).json({ message: "success", comments });
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
    await CommentModel.destroy({ where: { id: commentid } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ message: "fail", error: error.message });
  }
};

module.exports = { createComment, readComments, updateComment, deleteComment };
