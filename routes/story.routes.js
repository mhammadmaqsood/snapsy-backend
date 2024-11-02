const express = require("express");
const storyController = require("../controllers/story.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-story", authMiddleware, storyController.createStory);
router.get("/get-story/:id", authMiddleware, storyController.getStoryById);
router.get("/user/stories", authMiddleware, storyController.getUserStories);
router.delete("/delete/:id", authMiddleware, storyController.deleteStory);

module.exports = router;