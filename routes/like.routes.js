const express = require("express");
const { addLike, unlike, getLikes } = require("../controllers/like.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

//LIKE A POST
router.post("/add-like", authMiddleware, addLike);

// UNLIKE POST
router.post('/unlike', authMiddleware, unlike);

//GET ALL LIKES FOR A SPECIFIC POST
router.get("/post/:postId/likes", authMiddleware, getLikes);

module.exports = router;