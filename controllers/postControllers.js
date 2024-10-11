const { createPostValidate } = require("../middlewares/postSchemaValidator");
const postModel = require("../models/postModel");

//CREATE POST CONTROLLER
const createPostController = async (req, res) => {
    try {
        const { id: userId, caption, media, hashTags, location, createdAt, likes, comments } = req.body;

        // JOI Validation
        const { error } = createPostValidate({
            userId,
            caption,
            media,
            hashTags,
            location,
            likes,
            comments
        });

        if (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Invalid request, please provide required fields.",
                error: error.details.map(detail => detail.message).join(', ')
            });
        }

        // CREATE A POST
        const newPost = new postModel({
            userId,
            caption,
            media,
            hashTags,
            location,
            createdAt: new Date(),
            likes,
            comments
        });

        await newPost.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in create post API",
            error: error.message
        });
    }
};


module.exports = { createPostController };