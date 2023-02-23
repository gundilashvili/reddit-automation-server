const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Account = require('../../db/models/account');

// @route    GET /api/account
// @desc     Get account
// @access   Private
router.get('/', (req, res) => {
  Account.find()
    .sort({ createDate: -1 })
    .then((data) => res.send(data));
});

// @route    GET /api/account/:id
// @desc     Get single account
// @access   Private
router.get('/:id', (req, res) => {
  Account.find({ _id: req.params.id }).then((data) => res.send(data));
});

// @route   POST api/account/create
// @desc    Create a new account
// @access  Private
router.post(
  '/create',
  [
    check('full_name', '"full_name" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('username', '"username" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('state', '"state" is required parameter.').not().isEmpty().isString(),
    check('password', '"password" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('browser_profile_id', '"browser_profile_id" is required parameter.')
      .not()
      .isEmpty()
      .isString(),
    check('password', '"password" is required parameter.')
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
    const { username } = req.body;

    Account.findOne({ username })
      .then((record) => {
        if (record) {
          res.json({
            status: `Account already exists: ${username}`,
          });
        } else {
          new Account(fields)
            .save()
            .then((data) => res.json({ status: 'Created', data }));
        }
      })
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route   POST api/account/update
// @desc    Update account
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

    Account.findOne({ _id })
      .then((record) => {
        if (record) {
          // Update
          Account.findOneAndUpdate(
            { _id },
            { $set: fields },
            { new: true }
          ).then((data) => res.json({ status: 'Updated', data }));
        } else {
          res
            .status(404)
            .json({ status: `Couldn't find account with the _id: ${_id}` });
        }
      })
      .catch((e) => res.status(404).json({ status: e.message }));
  }
);

// @route    PUT /api/account
// @desc     Delete account
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
    Account.findById(_id)
      .then((data) => {
        if (data) {
          data.remove().then(() => res.json({ success: true }));
        } else {
          res
            .status(404)
            .json({
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
