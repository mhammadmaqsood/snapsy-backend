const { storyValidate } = require("../middlewares/story.validation");
const storyService = require("../services/storyService");

//CREATE STORY
exports.createStory = async (req, res) => {
    try {
        const { media, caption, hashtags, id } = req.body;
        const userId = id;
        const { error, value } = storyValidate({ media, caption, hashtags });
        if (error?.details?.length) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const storyData = {
            ...value,
            userId
        };

        const story = await storyService.createStory(storyData);
        return res.status(201).json({ success: true, data: story });
    } catch (error) {
        return res.status(500).json({ message: "Server error while creating story", error: error.message });
    }
}

//GET STORY BY ID
exports.getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyService.getStoryById(id);
        if (!story) return res.status(404).json({ message: "Story not found" });
        return res.json(story);
    } catch (error) {
        return res.status(500).json({ message: "Server error while getting story by ID", error: error.message });
    }
}

//GET USER STORIES
exports.getUserStories = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = id;
        console.log("User ID: ", userId)
        const stories = await storyService.getUserStories(userId);
        res.json(stories);
    } catch (error) {
        return res.status(500).json({ message: "Server error in get user stories API", error: error.message });
    }
}

//DELETE USER STORY
exports.deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyService.deleteStory(id);
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json({ message: "Story deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error in delete story API", error: error.message });
    }
}