const user = require('../models/User');
const project = require('../models/Project');

async function handleGetDashboard(req, res) {

    const username = 'satan';

    const projects = await project.find({ members: username }).exec();

    if (projects.length > 0) {
        const updatedUser = await user.findOneAndUpdate(
            { username: username },
            {
                $set: {
                    completed: projects,
                    ongoing: projects
                }
            },
            { new: true }
        ).exec();

        res.json({ userData: updatedUser });
    }
    else {
        res.json({ userData: null });
    }
}

module.exports = {
    handleGetDashboard,
}