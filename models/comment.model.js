const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    reelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
    },
    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    commentText: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Indexes to ensure that only one of postId, reelId, or storyId is set
commentsSchema.index({ postId: 1 }, { partialFilterExpression: { postId: { $exists: true } } });
commentsSchema.index({ reelId: 1 }, { partialFilterExpression: { reelId: { $exists: true } } });
commentsSchema.index({ storyId: 1 }, { partialFilterExpression: { storyId: { $exists: true } } });

module.exports = mongoose.model("Comment", commentsSchema);