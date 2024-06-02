const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    profile: {
        name: String,
        bio: String,
        avatar_url: String
    }
});

module.exports = mongoose.model('User', userSchema);

