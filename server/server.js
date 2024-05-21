const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/teampilotDB');

const projectSchema = new mongoose.Schema({
    title:String,
    tag:String,
    members : [String],
    tasks : Number,
    completedTasks : Number
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    completed : [projectSchema],
    ongoing : [projectSchema]
});

const user = new mongoose.model('user', userSchema);
const project = new mongoose.model('project', projectSchema);

app.get("/", function(req, res){
    console.log("Working...")
});

app.get("/projects", function(req, res){
    project.find({}).exec().then((projects)=>{
        res.json({projects: projects});
    });
});

app.get("/dashboard", async function(req, res){

   const username = 'satan';

   const projects = await project.find({members:username}).exec();

   if(projects.length >0)
   {
    const updatedUser = await user.findOneAndUpdate(
        { username:username },
        { $set : {
            completed : projects,
            ongoing : projects
        }},
        {new : true}
    ).exec();

   res.json({userData : updatedUser});
    }
    else{
        res.json({userData : null});
    }
});

app.listen(5000, function(){
    console.log("Server set on port 5000");
})