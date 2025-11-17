const user = require('../models/User');
const project = require('../models/Project');
const axios = require("axios");

async function handleGetDashboard(req, res) {

    const userGithubId = req.user;

    const userDetails = await user.findOne({githubId: userGithubId});
    
    if(userDetails) {
        const importRepos = await axios.get(`http://localhost:5000/github/repos`, {withCredentials: true, 
            headers: {
                Cookie: req.headers.cookie // Pass cookies for authentication
            }
        });

        if(importRepos.status !== 201) {
            console.log("Failed to import repos");
            res.redirect(`http://localhost:3000/login`);
        }

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