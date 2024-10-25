const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware");
const { createPost, updatePost, getAllPosts, deletePost } = require("../controllers/post.controllers");

//ROUTES

//CREATE POST ROUTE || POST
router.post("/create-post", authMiddleware, createPost);

//UPDATE POST ROUTE || PUT
router.put("/update-post/:id", authMiddleware, updatePost);

//GET ALL POSTS ROUTE || POST
router.get("/get-posts", authMiddleware, getAllPosts);

//DELETE POST ROUTE || POST
router.delete("/delete-post/:id", authMiddleware, deletePost);


module.exports = router;