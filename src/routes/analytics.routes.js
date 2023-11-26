const express = require('express');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

router.get("/overview",analyticsController.getAnalyticsTaskDateRange)
router.get("/me",analyticsController.getAnalyticsMe)

module.exports = router;
