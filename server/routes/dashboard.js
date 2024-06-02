const express = require("express");
const router = express.Router();
const { handleGetDashboard } = require('../controllers/dashboard')

router.get('/dashboard', handleGetDashboard)

module.exports = router;
