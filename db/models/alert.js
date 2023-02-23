const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Alert = mongoose.model('alert', AlertSchema);
