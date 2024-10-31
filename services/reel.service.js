const Reel = require("../models/reel.model");


//CREATE REEL
exports.createReel = async (data) => {
    const reel = new Reel(data);
    return reel.save();
};

//GET REELS
exports.getReels = async () => {
    return Reel.find().populate("userId", "userName").exec();
}

//GET REEL BY ID
exports.getReelById = async (id) => {
    return Reel.findById(id).populate('userId', 'userName').exec();
};

//UPDATE REEL
exports.updateReel = async (id, data) => {
    return Reel.findByIdAndUpdate(id, data, { new: true });
}

//DELETE REEL
exports.deleteReel = async (id) => {
    return Reel.findByIdAndDelete(id);
};