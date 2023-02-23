const mongoose = require('mongoose');
const initialize = require('./initialize');
require('dotenv').config();

module.exports = connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose
      .connect(MONGO_URI)
      .then(async () => {
        console.log('Connected to database.');
        await initialize();
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};
