const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  company: String,
  firstname: String,
  lastname: String,
  address1: String,
  address2: String,
  country: String,
  state: String,
  postcode: Number,
  phone: Number,
  password: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
