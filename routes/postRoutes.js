const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware");
const { createPostController, updatePostController, getPostsController, deletePostController } = require("../controllers/postControllers");

//ROUTES

//CREATE POST ROUTE || POST
router.post("/create-post", authMiddleware, createPostController);

//UPDATE POST ROUTE || PUT
router.put("/update-post/:id", authMiddleware, updatePostController);

//GET ALL POSRT ROUTE || GET
router.get("/get-posts", authMiddleware, getPostsController);

//DELET POST ROUTE || DELETE
router.delete("/delete-post/:id", authMiddleware, deletePostController);

module.exports = router;