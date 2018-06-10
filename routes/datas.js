const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

// @route   POST api/getFormData
// @desc    Return current user Form Data
// @access  Public
router.post("/getFormData", (req, res) => {
  Data.findOne({ id: req.body.id }).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  });
});

// @route   POST api/saveFormData
// @desc    Save the Form Data
// @access  Public
router.post("/saveFormData", (req, res) => {
  Data.findOne({ id: req.body.id }).then(data => {
    if (data) {
      data.formData = req.body.formData;

      data
        .save()
        .then(() =>
          res.json({
            message: "Formulaire enregistré.",
            color: "#007bff"
          })
        )
        .catch(() =>
          res.json({
            message: "Erreur lors de l'enregistrement.",
            color: "#dc3545"
          })
        );
    } else {
      const newData = new Data({
        id: req.body.id,
        formData: req.body.formData
      });

      newData
        .save()
        .then(() =>
          res.json({
            message: "Formulaire enregistré.",
            color: "#007bff"
          })
        )
        .catch(() =>
          res.json({
            message: "Erreur lors de l'enregistrement.",
            color: "#dc3545"
          })
        );
    }
  });
});

module.exports = router;
