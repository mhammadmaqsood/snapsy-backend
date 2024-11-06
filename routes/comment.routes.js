const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/comment.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const paginationMiddleware = require("../middlewares/pagination.middleware");

const router = express.Router();

//ADD A COMMENT
router.post("/add-comment", authMiddleware, addComment);

//GET COMMENTS FOR A SPECIFIC POST, REEL, OR STORY
router.get("/get-comments", authMiddleware, paginationMiddleware, getComments);

// Route to delete a comment
router.delete("/delete-comment/:id", authMiddleware, deleteComment);

module.exports = router;