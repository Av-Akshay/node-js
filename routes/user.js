const express = require("express");
const {
  handelCreateUser,
  handleGetAllUsers,
  getUserById,
  handelUpdateUserById,
  handelDeleteUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").post(handelCreateUser).get(handleGetAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(handelUpdateUserById)
  .delete(handelDeleteUser);

module.exports = router;
