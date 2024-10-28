const express = require("express");
const reelController = require("../controllers/reel.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add-reel", authMiddleware, reelController.createReel);
router.get('/get-reels', authMiddleware, reelController.getReels);
router.get('/get-reel/:id', authMiddleware, reelController.getReelById);
router.put('/update-reel/:id', authMiddleware, reelController.updateReel);
router.delete('/delete-reel/:id', authMiddleware, reelController.deleteReel);

module.exports = router;
