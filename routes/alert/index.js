const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Alert = require('../../db/models/alert');

// @route    GET /api/alert
// @desc     Get alerts
// @access   Private
router.get('/', (req, res) => {
  Alert.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route    GET /api/alert/:id
// @desc     Get single alert
// @access   Private
router.get('/:id', (req, res) => {
  Alert.find({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch((e) => res.status(404).json({ status: e.message }));
});

// @route   POST /api/alert/create
// @desc    Create a new task(comment)
// @access  Private
router.post(
  '/create',
  [
    check('name', '"name" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('message', '"message" is required parameter.')
      .not()
      .isEmpty()
      .isString() 
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const fields = { ...req.body };
    new Alert(fields)
      .save()
      .then((data) => res.json({ status: 'Created', data }))
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST /api/alert/update
// @desc    Update alert
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

    Alert.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          Alert.findOneAndUpdate(
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

// @route    PUT /api/alert
// @desc     Delete alert
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
    Alert.findById(_id)
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
