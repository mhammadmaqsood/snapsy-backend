const { addCommentValidate } = require("../middlewares/comment.validation");
const Comment = require("../models/comment.model");

//ADD NEW COMMENT SERVICE
const newComment = async (userBody, res) => {
    try {
        const { postId, reelId, storyId, commentText } = userBody;

        // JOI Validation
        const { error } = addCommentValidate({
            postId,
            reelId,
            storyId,
            commentText
        });

        if (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Invalid request, please provide required fields.",
                error: error.details.map(detail => detail.message).join(', ')
            });
        }

        const addedComment = new Comment({
            postId,
            reelId,
            storyId,
            userId: userBody.id,
            commentText
        })

        await addedComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Server error in add comment API', error });
    }
}

//GET COMMENTS
const getComment = async (userQuery, res) => {
    const { postId, reelId, storyId } = userQuery;
    try {
        const filter = {};
        if (postId) filter.postId = postId;
        if (reelId) filter.reelId = reelId;
        if (storyId) filter.storyId = storyId;

        const comments = await Comment.find(filter);

        res.status(200).json({
            message: "Comments retrieved successfully",
            comments
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error in get comments API",
            error
        });
    }
}

// DELETE COMMENT
const deleteComments = async (userParams, res) => {
    const { id } = userParams;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error in delete comment API",
            error
        });
    }
};

module.exports = { newComment, getComment, deleteComments };