const mongoose = require("mongoose");
const { Schema } = mongoose;

const reelSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    media: {
        type: String,
        required: true,
        default: "https://www.youtube.com/watch?v=R-HfHwUlZbc"
    },
    caption: {
        type: String
    },
    hashtags: {
        type: [String]
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

module.exports = mongoose.model("Reel", reelSchema);