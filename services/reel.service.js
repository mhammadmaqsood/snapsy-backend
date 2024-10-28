const Reel = require("../models/reel.model");


//CREATE REEL
exports.createReel = async (data) => {
    const reel = new Reel(data);
    return await reel.save();
};

//GET REELS
exports.getReels = async () => {
    return await Reel.find().populate("userId", "userName").populate("comments").exec();
}

//GET REEL BY ID
exports.getReelById = async (id) => {
    return await Reel.findById(id).populate('userId', 'username').populate('comments').exec();
};

//UPDATE REEL
exports.updateReel = async (id, data) => {
    return await Reel.findByIdAndUpdate(id, data, { new: true });
}

//DELETE REEL
exports.deleteReel = async (id) => {
    return await Reel.findByIdAndDelete(id);
};