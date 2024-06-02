const project = require('../models/Project');

async function handleGetProjects(req, res) {
    project.find({}).exec().then((projects) => {
        res.json({ projects: projects });
    });
}

module.exports = {
    handleGetProjects,
}