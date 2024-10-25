const likeModel = require("../models/like.model");

const likePost = async (userBody, res) => {
    try {
        const { postId, userId, postType } = userBody;

        // Check if the like already exists (to prevent multiple likes from the same user on the same post)
        const existingLike = await likeModel.findOne({ postId, userId });

        if (existingLike) {
            return res.status(400).json({ message: "User has already liked this post" })
        }

        const newLike = new likeModel({
            postId,
            userId,
            postType
        })

        await newLike.save();

        res.status(201).json({ message: "Post liked successfully", like: newLike })
    } catch (error) {
        res.status(500).json({ message: 'Server error in adding like API', error });
    }
}

//UNLIKE POST
const unlikePost = async (userBody, res) => {
    try {
        const { postId, userId, postType } = userBody;

        const like = await likeModel.findOneAndDelete({ postId, userId });

        if (!like) {
            return res.status(404).json({ message: 'Like not found' });
        }

        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error in unlike post API', error });
    }
}

//GET ALL LIKES FOR A SPECIFIC POST
const getLikesForPost = async (userParams, res) => {
    try {
        const { postId } = userParams;

        const likes = await likeModel.find({ postId }).populate("userId", "userName");

        res.status(200).json({ likes });
    } catch (error) {
        res.status(500).json({ message: 'Server error in get all likes for specific post API', error });
    }
}

module.exports = { likePost, unlikePost, getLikesForPost };