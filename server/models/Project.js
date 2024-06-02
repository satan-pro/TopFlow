const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    maintainer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' }
});

module.exports = mongoose.model('Project', projectSchema);
