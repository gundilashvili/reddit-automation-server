const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TaskFollow = require('../../db/models/task_follow');

// @route    GET /api/task/follow
// @desc     Get task(follow)
// @access   Private
router.get('/', (req, res) => {
  TaskFollow.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route    GET /api/task/follow/:id
// @desc     Get single task(follow)
// @access   Private
router.get('/:id', (req, res) => {
  TaskFollow.find({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/task/follow/create
// @desc    Create a new task(follow)
// @access  Private
router.post(
  '/create',
  [
    check('up_vote', '"up_vote" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('comment', '"comment" is required parameter.')
      .not()
      .isEmpty()
      .isArray(),
    check('profile_urls', '"profile_urls" is required parameter.')
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
    new TaskFollow(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST /api/task/follow/update
// @desc    Update a task(follow)
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

    TaskFollow.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          TaskFollow.findOneAndUpdate(
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

// @route    PUT /api/task/follow
// @desc     Delete a task(follow)
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
    TaskFollow.findById(_id)
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
