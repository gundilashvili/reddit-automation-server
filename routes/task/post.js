const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TaskPost = require('../../db/models/task_post');

// @route    GET /api/task/post
// @desc     Get task(post)
// @access   Private
router.get('/', (req, res) => {
  TaskPost.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route    GET /api/task/post/:id
// @desc     Get single task(post)
// @access   Private
router.get('/:id', (req, res) => {
  TaskPost.find({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/task/post/create
// @desc    Create a new task(post)
// @access  Private
router.post(
  '/create',
  [
    check('post_title', '"post_title" is required parameter.')
      .not()
      .isEmpty()
      .isString(), 
    check('media_source', '"media_source" is required parameter.')
      .not()
      .isEmpty()
      .isArray(),
    check('sub_reddit_group_id', '"sub_reddit_group_id" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('account_id', '"account_id" is required parameter.')
      .not()
      .isEmpty()
      .isString(), 
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
    new TaskPost(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST /api/task/post/update
// @desc    Update a task(post)
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

    TaskPost.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          TaskPost.findOneAndUpdate(
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

// @route    PUT /api/task/post
// @desc     Delete a task(post)
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
    TaskPost.findById(_id)
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
