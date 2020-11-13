const fileuploadController = (req, res) => {
  return res.status(200).json({ filePath: req.file.location });
};

module.exports = fileuploadController;
