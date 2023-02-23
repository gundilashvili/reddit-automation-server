const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubRedditGroupSchema = new Schema({
   
  name: {
    type: String,
    default: '',
  }, 
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SubRedditGroup = mongoose.model('sub_reddit_group', SubRedditGroupSchema);
