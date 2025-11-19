const Project = require('../models/Project');
const User = require('../models/User');

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
        res.status(500).json({message: "Could not fetch projects"});
    }
}

async function handleGetProjectById(req, res) {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId)
        .populate({
            path: 'members',
            model: User,
            localField: 'members', 
            foreignField: 'username'
        }).exec();
        
        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json({project});
    }
    catch(err){
        console.error("Error fetching project: ", err);
        res.status(500).json({message: "Could not fetch project details"});
    }
}

async function handleGetProjectMembers(req, res) {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId)
        .populate({
            path: 'members',
            model: User,
            localField: 'members', 
            foreignField: 'username'
        }).exec();
        
        const projectMembers = project ? project.members : [];

        return res.status(200).json(projectMembers);
    }
    catch(err) {
        console.error("Error fetching project members: ", err);
        res.status(500).json({message: "Could not fetch project members"});
    }
}

module.exports = {
    handleGetProjects,
    handleGetProjectById,
    handleGetProjectMembers
}