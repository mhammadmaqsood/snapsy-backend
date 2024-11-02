const Story = require("../models/story.model");

//CREATE STORY
exports.createStory = async (data) => {
    const story = new Story(data);
    return story.save();
}

//GET STORY BY ID
exports.getStoryById = async (storyId) => {
    return Story.findById(storyId).populate("userId", "userName");
}

//GET USER STORIES
exports.getUserStories = async (userId) => {
    return Story.find({ userId }).sort({ createdAt: -1 });
}

//DELET STORY
exports.deleteStory = async (storyId) => {
    return Story.findByIdAndDelete(storyId);
}