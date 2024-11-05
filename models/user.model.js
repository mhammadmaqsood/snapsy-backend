const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String
    },
    bio: {
        type: String
    },
    userType: {
        type: String,
        default: "client",
        enum: ["client", "admin"]
    },
    profile: {
        type: String,
        default: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
    },
    stripeCustomerId: String,
    subscriptionStatus: {
        type: String,
        enum: ["active", "canceled", "past_due"],
        default: "canceled"
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)