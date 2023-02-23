const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskFollowSchema = new Schema({
  task_status: {
    type: String,
    default: 'active',
  },
  profile_urls: {
    type: Array,
    default: [],
  },
  up_vote: {
    type: String,
    default: '',
  },
  comment: {
    type: Array,
    default: [],
  },
  delay: {
    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
  required_action: {
    type: String,
    default: '',
  },
  counter: {
    type: Array,
    default: [],
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
  },
});

module.exports = TaskFollow = mongoose.model('task_follow', TaskFollowSchema);
