const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarmUpTaskSchema = new Schema({ 
  content_source: {
    type: String,
    default: '',
  },
  title_source: {
    type: String,
    default: '',
  },
  flaire: {
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

module.exports = WarmUpTask = mongoose.model('warm_up_task', WarmUpTaskSchema);
