const express = require("express");
const stripeController = require("../controllers/stripe.controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/subscribe", authMiddleware, stripeController.subscribe);
router.get("/success", stripeController.success);
router.get("/billing-portal", authMiddleware, stripeController.billingPortal);

module.exports = router;