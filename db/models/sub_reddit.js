const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubRedditSchema = new Schema({
   
  url: {
    type: String,
    default: '',
  },
  flaire: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  up_votes: {
    from : {
      type: String,
      default: '',
    },
    to : {
      type: String,
      default: '',
    },
  },
  group_id: {
    type: String,
    default: '',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SubReddit = mongoose.model('sub_reddits', SubRedditSchema);
