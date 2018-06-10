const express = require("express");
const router = express.Router();
const passport = require("passport");

const Form = require("../models/Form");

// @route   GET api/getForm
// @desc    Return current user Form
// @access  Public
router.get("/getForm",
  (req, res) => {
    Form.findOne().then(form => {
      if (form) {
        res.json(form);
      } else {
        res.json({});
      }
    });
  }
);

// @route   POST api/editForm
// @desc    Change the form
// @access  Private
router.post(
  "/editForm",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.findOne().then(form => {
      if (form) {
        form.JSONSchema = req.body.JSONSchema;
        form.UISchema = req.body.UISchema;

        form
          .save()
          .then(form => res.json(form))
          .catch(err => console.log(err));
      } else {
        const newForm = new Form({
          JSONSchema: req.body.JSONSchema,
          UISchema: req.body.UISchema
        });

        newForm
          .save()
          .then(newForm => res.json(newForm))
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
