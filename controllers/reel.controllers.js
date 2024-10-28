const { reelValidate } = require("../middlewares/reel.validation")
const reelService = require("../services/reel.service");

//ADD REEL
exports.createReel = async (req, res) => {
    try {
        const { media, caption, hashtags } = req.body;
        const userId = req.body.id;
        const { error, value } = reelValidate({ media, caption, hashtags });
        console.log("User Id: ", userId);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const reelData = {
            ...value,
            userId,
        };

        const reel = await reelService.createReel(reelData);
        return res.status(201).json({ success: true, data: reel });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while creating reel", error });
    }
}

//GET REELS
exports.getReels = async (req, res) => {
    try {
        const reels = await reelService.getReels();
        return res.status(200).json({ success: true, data: reels });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching reels", error });
    }
}

//GET REEL BY ID
exports.getReelById = async (req, res) => {
    try {
        const reel = await reelService.getReelById(req.params.id);
        if (!reel) {
            return res.status(404).json({ message: "Reel not found" });
        }
        return res.status(200).json({ success: true, data: reel });
    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching reel by ID", error: error.message });
    }
}

//UPDATE REEL
exports.updateReel = async (req, res) => {
    try {
        const { media, caption, hashtags } = req.body;
        const { error, value } = reelValidate({ media, caption, hashtags });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const reel = await reelService.updateReel(req.params.id, value);

        if (!reel) {
            return res.status(404).json({ message: "Reel not found" });
        }
        return res.status(200).json({ success: true, data: reel });
    } catch (error) {
        return res.status(500).json({ message: "Server error in update reel API", error: error.message });
    }
}

//DELETE REEL
exports.deleteReel = async (req, res) => {
    try {
        const deleted = await reelService.deleteReel(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Reel not found" });
        }
        return res.status(200).json({ success: true, message: "Reel deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while deleting reel", error });
    }
};