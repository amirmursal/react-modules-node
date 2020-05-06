const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: String,
  email: String,
  company: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
