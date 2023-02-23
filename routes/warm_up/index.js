const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const WarmUpTask = require('../../db/models/warm_up_task');
const WarmUpSetting = require('../../db/models/warm_up_setting');

// @route    GET /api/warmup
// @desc     Get warmup task
// @access   Private
router.get('/task', (req, res) => {
  WarmUpTask.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data));
});

// @route    GET /api/warmup/task/:id
// @desc     Get single task
// @access   Private
router.get('/task/:id', (req, res) => {
  WarmUpTask.find({ _id: req.params.id }).then((data) => res.send(data));
});

// @route    GET /api/warmup/setting
// @desc     Get warmup settings
// @access   Private
router.get('/setting', (req, res) => {
  WarmUpSetting.find().then((data) => res.send(data));
});

// @route   POST api/warmup/task/create
// @desc    Create a warmup task
// @access  Private
router.post(
  '/task/create',
  [
    check('content_source', '"content_source" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('title_source', '"title_source" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('flaire', '"flaire" is required parameter.')
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
    new WarmUpTask(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST api/warmup/task/update
// @desc    Update a warmup task
// @access  Private
router.post(
  '/task/update',
  [check('_id', '"_id" is required parameter.').not().isEmpty().isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const fields = { ...req.body };
    const { _id } = req.body;

    WarmUpTask.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          WarmUpTask.findOneAndUpdate(
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

// @route   POST api/warmup/setting/update
// @desc    Update a warmup setting
// @access  Private
router.post(
  '/setting/update',
  [
    check('_id', '"_id" is required parameter.').not().isEmpty(),
    check('post', '"post" is required parameter.').not().isEmpty(),
    check('up_vote', '"up_vote" is required parameter.').not().isEmpty(),
    check('down_vote', '"down_vote" is required parameter.').not().isEmpty(),
    check('comment', '"comment" is required parameter.').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const fields = { ...req.body };
    const { _id } = req.body;

    WarmUpSetting.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          WarmUpSetting.findOneAndUpdate(
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

// @route    PUT /api/warmup/task
// @desc     Delete task
// @access   Private
router.put(
  '/task',
  [check('_id', '"_id" is required parameter.').not().isEmpty().isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body;
    WarmUpTask.findById(_id)
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
