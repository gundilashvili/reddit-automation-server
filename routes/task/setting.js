const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TaskSetting = require('../../db/models/task_setting');

// @route    GET /api/task/setting
// @desc     Get task setting
// @access   Private
router.get('/', (req, res) => {
  TaskSetting.find()
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/task/setting/update
// @desc    Update a task settings
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

    TaskSetting.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          TaskSetting.findOneAndUpdate(
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

module.exports = router;
