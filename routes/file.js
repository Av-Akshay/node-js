const express = require("express");
const {handelRenderHomePage,handelUploadFile} = require("../controllers/file")

const router = express.Router();

router.route("/").get(handelRenderHomePage)
router.route("/upload").post(handelUploadFile)

module.exports = router;