const express = require("express");
const router = express.Router();
const { handleGetProjects } = require('../controllers/projects')

router.get('/', handleGetProjects)

module.exports = router;
