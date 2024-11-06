const express = require("express");
const { addLike, unlike, getLikes } = require("../controllers/like.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const paginationMiddleware = require("../middlewares/pagination.middleware");

const router = express.Router();

//LIKE A POST
router.post("/add-like", authMiddleware, addLike);

// UNLIKE POST
router.post('/unlike', authMiddleware, unlike);

//GET ALL LIKES FOR A SPECIFIC POST
router.get("/post/:postId/likes", authMiddleware, paginationMiddleware, getLikes);

module.exports = router;