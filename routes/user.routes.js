const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { forgetPassword, setNewPassword, getUser, updateUser, deleteUser } = require("../controllers/user.controllers");

const router = express.Router()

//Routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUser);

//UPDATE USER
router.put("/updateUser", authMiddleware, updateUser);

//FORGET PASSWORD VIA AN EMAIL
router.post("/forget-password", authMiddleware, forgetPassword);

//SET NEW PASSWORD FOR EMAIL SENT API
router.post("/reset-password/:token", authMiddleware, setNewPassword);

//DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteUser)

module.exports = router;