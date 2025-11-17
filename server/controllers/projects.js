const Project = require('../models/Project');

async function handleGetProjects(req, res) {
    try {
        const userGithubId = req.user;
        const projects = await Project.find({githubId: userGithubId});

        if(!projects || projects.length === 0) {
            return res.status(404).json({message: "No projects found"});
        }

        res.status(200).json({projects});
    }
    catch(err){
        console.error("Error fetching projects: ", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function handleGetProjectById(req, res) {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({_id: projectId});
        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json({project});
    }
    catch(err){
        console.error("Error fetching project: ", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {
    handleGetProjects,
    handleGetProjectById
}