const express = require("express");
const router = express.Router();
const { handleGetProjects } = require('../controllers/projects')

router.get('/project', handleGetProjects)

module.exports = router;
