const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: [true, "Please write your pen name."]
    },
    email: {
      type: String,
      required: [true, "Please write your email."]
    },
    encryptedPassword: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
