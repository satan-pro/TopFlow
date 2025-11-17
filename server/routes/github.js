const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Project = require("../models/Project");


router.get('/repos', async function(req, res) {
    try {
        console.log("Github route: ", req.user);
        console.log("Github route: ", req.accessToken);
        const userGithubId = req.user;
        const user = await User.findOne({githubId: userGithubId});
        if(!user)
            return res.status(401).json({error: "GitHub account not linked"});

        //const accessToken = user.refreshToken;
        const userName = user.username;
        const response = await axios.get(`https://api.github.com/users/${userName}/repos`);

        const repos = response.data;
        // If the user has no repos then send a 400 status response
        if(!repos.length) {
            return res.status(400).json({error: "No repositories found"});
        }

        // transform the data in the model's format
        const projectsToInsert = repos.map(repo => ({

            // projectId: repo.id.toString(),
            // name: repo.name,
            // description: repo.description || "",
            // maintainer_id: user._id,
            // githubId: user.githubId,
            // details: {
            //     projectUrl: repo.html_url,
            //     cloneUrl: repo.clone_url,
            //     openIssues: repo.open_issues_count,
            //     forks: repo.forks_count,
            //     language: repo.language || "Unknown",
            // },
            // created_at: new Date(repo.created_at),
            // updated_at: new Date(repo.updated_at),
            // pushed_at: new Date(repo.pushed_at),
            // status: "active"

            updateOne: {
                filter: { projectId: repo.id },  // Match by GitHub repo ID
                update: {
                    $set: {
                        name: repo.name,
                        description: repo.description,
                        maintainer_id: user._id,  // Link to logged-in user
                        githubId: user.githubId,
                        details: {
                            projectUrl: repo.html_url,
                            cloneUrl: repo.clone_url,
                            openIssues: repo.open_issues_count,
                            forks: repo.forks_count,
                            language: repo.language
                        },
                        updated_at: new Date(),
                        pushed_at: new Date(repo.pushed_at),
                    }
                },
                upsert: true  // Insert if not found
            }
        }));

        // insert into MongoDB
        const insertedProjects = await Project.bulkWrite(projectsToInsert, {ordered: false}).catch(err=>{console.log(err)});

        res.status(201).json({insertedProjects})
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch repositories"});
    }
})

module.exports = router;