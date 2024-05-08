const handelRenderHomePage = (req, res) => {
  res.render("home");
};

const handelUploadFile = (req, res) => {
  console.log(req.file);
  res.redirect("/")
};

module.exports = {
  handelRenderHomePage,
  handelUploadFile,
};
