const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    tag: String,
    members: [String],
    tasks: Number,
    completedTasks: Number
});
const Projects = new mongoose.model('project', projectSchema);

module.exports = {
    projectSchema,
    Projects
};