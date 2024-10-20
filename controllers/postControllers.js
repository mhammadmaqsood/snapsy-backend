const { createPostValidate } = require("../middlewares/postSchemaValidator");
const postModel = require("../models/postModel");

//CREATE POST CONTROLLER
const createPostController = async (req, res) => {
    try {
        const { id: userId, caption, media, hashTags, location, createdAt } = req.body;

        // JOI Validation
        const { error } = createPostValidate({
            userId,
            caption,
            media,
            hashTags,
            location,
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

const updatePostController = async (req, res) => {
    try {
        const post = await postModel.findById({ _id: req.params.id });

        //Validation
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const { id: userId, caption, media, hashTags, location, createdAt } = req.body;

        //UPDATE
        if (caption) post.caption = caption;
        if (media) post.media = media;
        if (hashTags) post.hashTags = hashTags;
        if (location) post.location = location;

        //SAVE POST
        await post.save();
        res.status(200).json({
            success: true,
            message: "Post Updated Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in update post API",
            error: error.message
        });
    }
}

//GET ALL THE POSTS
const getPostsController = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in get all posts API",
            error: error.message
        });
    }
}

//DELETE POST CONTROLLER
const deletePostController = async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Post has been deleted"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in get all posts API",
            error: error.message
        });
    }
}

module.exports = { createPostController, updatePostController, getPostsController, deletePostController };