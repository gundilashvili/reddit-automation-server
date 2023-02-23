const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskPostSchema = new Schema({
  task_status: {
    type: String,
    default: 'active',
  },
  post_title: {
    type: String,
    default: '',
  },
  media_source: {
    type: Array,
    default: [],
  },
  sub_reddit_group_id: {
    type: String,
    default: '',
  },
  account_id: {
    type: String,
    default: '',
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

module.exports = TaskPost = mongoose.model('task_post', TaskPostSchema);
