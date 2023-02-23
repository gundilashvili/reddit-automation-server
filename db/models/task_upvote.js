const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskUpvoteSchema = new Schema({
  task_status: {
    type: String,
    default: 'active',
  },
  url: {
    type: String,
    default: '',
  },
  required_up_votes: {
    type: String,
    default: '',
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

module.exports = TaskUpvote = mongoose.model('task_upvote', TaskUpvoteSchema);
