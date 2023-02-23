const express = require('express');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/alert', require('./routes/alert/index'));
app.use('/api/account', require('./routes/account/index'));
app.use('/api/warmup', require('./routes/warm_up/index'));
app.use('/api/task/setting', require('./routes/task/setting'));
app.use('/api/task/comment', require('./routes/task/comment'));
app.use('/api/task/follow', require('./routes/task/follow'));
app.use('/api/task/upvote', require('./routes/task/up_vote'));
app.use('/api/task/post', require('./routes/task/post'));  

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
