const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DataSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  formData: {
    type: Schema.Types.Mixed,
    default: {}
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Data = mongoose.model("datas", DataSchema);
