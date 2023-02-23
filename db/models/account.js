const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  full_name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  browser_profile_id: {
    type: String,
    default: '',
  }, 
  browser_cookie: {
    type: String,
    default: '',
  },
  browser_proxy: {
    type: String,
    default: '',
  },
  counter: {
    type: Array,
    default: [],
  },
  karma_count: {
    type: String,
    default: '',
  },
  last_post_date: {
    type: String,
    default: '',
  },
  warm_up_stats: {
    type: String,
    default: '',
  },
  daily_task: {
    type: Array,
    default: []
  },
  daily_warm_up_task: {
    type: Array,
    default: []
  },
  notes: {
    type: String,
    default: '',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Account = mongoose.model('accounts', AccountSchema);
