const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

router.route("/")
    .get(UsersController.getUsers)
    .delete(UsersController.deleteUsersById)
router.route("/:id")
    .get(UsersController.getUsersById)
    .patch(UsersController.updateUsers)


module.exports = router;