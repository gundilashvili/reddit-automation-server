const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarmUpSettingSchema = new Schema({
  post: {
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

module.exports = WarmUpSetting = mongoose.model(
  'warm_up_setting',
  WarmUpSettingSchema
);
