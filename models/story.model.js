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
    },
    caption: {
        type: String
    },
    hashtags: {
        type: [String]
    },
}, { timestamps: true });

module.exports = mongoose.model("Story", reelSchema);