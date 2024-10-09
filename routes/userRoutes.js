const express = require("express");
const { forgetPassword, setPassword } = require("../controllers/authControllers");
const { getUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router()

//Routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE USER
router.put("/updateUser", authMiddleware, updateUserController);

//FORGET PASSWORD VIA AN EMAIL
router.post("/forget-password", authMiddleware, forgetPassword);

//SET NEW PASSWORD FOR EMAIL SENT API
router.post("/reset-password/:token", authMiddleware, setPassword);

module.exports = router;