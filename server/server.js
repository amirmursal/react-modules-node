const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const env = "local"; // prod local

const dburl =
  env === "prod"
    ? "mongodb://admin:admin123@ds033390.mlab.com:33390/rafael"
    : "mongodb://localhost:27017/rafael";

// create database connection
mongoose.connect(
  dburl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) console.log(err);
  }
);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// all other route will be prefixed with /api
// routes creation
const router = express.Router();
app.use("/api", router);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

// login user
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) res.send(err);
    if (user && user.password === req.body.password) {
      res.json(user);
    } else {
      res.json(err);
    }
  });
});

// create user
router.post("/createUser", (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.role = req.body.role;
  user.save((err) => {
    if (err) res.send(err);
    res.json({ message: "User Created" });
  });
});

// get user info
router.get("/getUser/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
});

// update user info
router.put("/updateUser/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = req.body.role;
    user.save((err) => {
      if (err) res.send(err);
      res.json({ message: "User Updated" });
    });
  });
});

// delete user
router.delete("/deleteUser/:user_id", (req, res) => {
  User.remove({ _id: req.params.user_id }, (err, user) => {
    if (err) res.send(err);
    res.json({ message: "User Removed" });
  });
});

// get all users
router.get("/getUsers", (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
});

app.listen(PORT, function () {
  console.error(
    `Node ${
      isDev ? "dev server" : "cluster worker " + process.pid
    }: listening on port ${PORT}`
  );
});
