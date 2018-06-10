const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
  JSONSchema: {
    type: Schema.Types.Mixed,
    required: true
  },
  UISchema: {
    type: Schema.Types.Mixed,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Form = mongoose.model("forms", FormSchema);
