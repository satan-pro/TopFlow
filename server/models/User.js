const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true, required: function() { return !this.githubId;}  },
    password: { type: String, required: function() { return !this.githubId;} },
    githubId: {type: String, unique: true},
    created_at: { type: Date, default: Date.now },
    profile: {
        name: String,
        bio: String,
        avatar_url: String
    },
    refreshToken: { type: String }
});

module.exports = mongoose.model('User', userSchema);

