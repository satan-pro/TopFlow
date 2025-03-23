const user = require('../models/User');
const project = require('../models/Project');

async function handleGetDashboard(req, res) {

    const userGithubId = req.user;

    const userDetails = await user.findOne({githubId: userGithubId});

    console.log(userDetails);
    
    if(userDetails) {
        res.status(200).json({
            user: userDetails
        });
    }
    else {
        res.status(401).json({
            message: "User not found"
        })
    }
}

module.exports = {
    handleGetDashboard,
}