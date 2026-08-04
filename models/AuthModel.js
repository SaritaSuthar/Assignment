const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

module.exports = mongoose.model("User", authSchema);