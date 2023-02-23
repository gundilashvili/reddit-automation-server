const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSettingSchema = new Schema({
  up_vote: {
    from: {
      type: String,
      default: '',
    },
    to: {
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
  },
  down_vote: {
    from: {
      type: String,
      default: '',
    },
    to: {
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
  },
  comment: {
    from: {
      type: String,
      default: '',
    },
    to: {
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
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TaskSetting = mongoose.model('task_setting', TaskSettingSchema);
