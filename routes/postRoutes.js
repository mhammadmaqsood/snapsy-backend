const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware");
const { createPostController } = require("../controllers/postControllers");

//ROUTES

//CREATE POST ROUTE || POST
router.post("/create-post", authMiddleware, createPostController);

module.exports = router;