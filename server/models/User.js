const mongoose = require('mongoose');
const { projectSchema } = require('./Project')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    completed: [projectSchema],
    ongoing: [projectSchema]
});

module.exports = new mongoose.model('user', userSchema);
