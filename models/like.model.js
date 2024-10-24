const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postType: {
        type: String,
        enum: ["post", "story", "reel"],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Like", likesSchema);