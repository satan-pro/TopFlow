const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectMembershipSchema = new Schema({
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  joined_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProjectMembership', projectMembershipSchema);
