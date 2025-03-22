const express = require("express");
const router = express.Router();
const { handleGetDashboard } = require('../controllers/dashboard')

router.get('/', function(req, res) {
    console.log(req.user);
    console.log(`hello ${req.user}`);

    res.json({
        user: req.user
    });
})

module.exports = router;
