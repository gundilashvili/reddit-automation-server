const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TaskComment = require('../../db/models/task_comment');

// @route    GET /api/task/comment
// @desc     Get task(comment)
// @access   Private
router.get('/', (req, res) => {
  TaskComment.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route    GET /api/task/comment/:id
// @desc     Get single task(comment)
// @access   Private
router.get('/:id', (req, res) => {
  TaskComment.find({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/task/comment/create
// @desc    Create a new task(comment)
// @access  Private
router.post(
  '/create',
  [
    check('post_url', '"post_url" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('comments', '"comments" is required parameter.')
      .not()
      .isEmpty()
      .isArray(),
    check('delay', '"delay" is required parameter.').not().isEmpty(),
    check('required_action', '"required_action" is required parameter.')
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
    new TaskComment(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST /api/task/comment/update
// @desc    Update a task(comment)
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

    TaskComment.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          TaskComment.findOneAndUpdate(
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

// @route    PUT /api/task/comment
// @desc     Delete a task(comment)
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
    TaskComment.findById(_id)
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
