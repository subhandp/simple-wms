const AuthController = require("../controllers/AuthController");
const express = require('express');
const router = express.Router();

router.post('/login', AuthController.loginUsers);
router.post('/register', AuthController.createUsers);

module.exports = router;