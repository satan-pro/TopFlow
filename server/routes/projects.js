const express = require("express");
const router = express.Router();
const { handleGetProjects, handleGetProjectById } = require('../controllers/projects')

router.get('/', handleGetProjects)

router.get('/:id', handleGetProjectById)

module.exports = router;
