const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TaskUpVote = require('../../db/models/task_upvote');

// @route    GET /api/task/upvote
// @desc     Get task(upvote)
// @access   Private
router.get('/', (req, res) => {
  TaskUpVote.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route    GET /api/task/upvote/:id
// @desc     Get single task(upvote)
// @access   Private
router.get('/:id', (req, res) => {
  TaskUpVote.find({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/task/upvote/create
// @desc    Create a new task(upvote)
// @access  Private
router.post(
  '/create',
  [
    check('url', '"url" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('delay', '"delay" is required parameter.')
      .not()
      .isEmpty(), 
    check('required_up_votes', '"required_up_votes" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const fields = { ...req.body };
    new TaskUpVote(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST /api/task/upvote/update
// @desc    Update a task(upvote)
// @access  Private
router.post(
  '/update',
  [check('_id', '"_id" is required parameter.').not().isEmpty().isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const fields = { ...req.body };
    const { _id } = req.body;

    TaskUpVote.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          TaskUpVote.findOneAndUpdate(
            { _id },
            { $set: fields },
            { new: true }
          ).then((data) => res.json({ status: 'Updated', data }));
        } else {
          res
            .status(404)
            .json({ status: `Couldn't find record with the _id: ${_id}` });
        }
      })
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route    PUT /api/task/upvote
// @desc     Delete a task(upvote)
// @access   Private
router.put(
  '/',
  [check('_id', '"_id" is required parameter.').not().isEmpty().isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body;
    TaskUpVote.findById(_id)
      .then((data) => {
        if (data) {
          data.remove().then(() => res.json({ success: true }));
        } else {
          res.status(404).json({
            success: false,
            message: `Couldn't find record with the _id: ${_id}`,
          });
        }
      })
      .catch((e) =>
        res.status(404).json({ success: false, message: e.message })
      );
  }
);

module.exports = router;
