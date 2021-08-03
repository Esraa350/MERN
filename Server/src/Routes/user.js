const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserController");

router.post("/register", UserController.register);
router.post('/login',UserController.login);
router.get("/logged", UserController.getUser);
module.exports = router;
