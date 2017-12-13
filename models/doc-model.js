const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const docSchema = new Schema (
  {
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Doc = mongoose.model("Doc", docSchema);

module.exports = Doc;
