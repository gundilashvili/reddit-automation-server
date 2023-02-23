const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskCommentSchema = new Schema({
  task_status: {
    type: String,
    default: 'active',
  },
  post_url: {
    type: String,
    default: '',
  },
  comments: {
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

module.exports = TaskComment = mongoose.model('task_comment', TaskCommentSchema);
