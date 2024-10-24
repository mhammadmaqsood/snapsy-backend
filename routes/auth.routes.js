const express = require("express");
const { register, login } = require("../controllers/auth.controllers");

const router = express.Router();

//REGISTER || POST
router.post("/register", register)

// //Login || POST
router.post("/login", login)

module.exports = router;