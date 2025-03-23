module.exports = async (req, res) => {
  res.status(200).json({
    message: "This is a test",
    status: "success",
  });
};
