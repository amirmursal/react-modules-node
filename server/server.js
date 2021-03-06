const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("./models/user");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const env = "local"; // prod local
const JWT_SECRET = "addjsonwebtokensecretherelikeQuiscustodietipsoscustodes";
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
  User.findOne(
    { $or: [{ email: req.body.email }, { phone: req.body.email }] },
    (err, user) => {
      if (err) res.send(err);
      console.log(user);
      if (user && user.password === req.body.password) {
        // Create a token
        const payload = { user: user.email };
        const options = { expiresIn: "1d", issuer: "https://scotch.io" };
        const token = jwt.sign(payload, JWT_SECRET, options);
        res.json(token);
      } else {
        res.json(err);
      }
    }
  );
});

// forgot password user
router.post("/getPassword", (req, res) => {
  // auth
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amirthink72@gmail.com",
      pass: "amirisreact",
    },
  });
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send(err);
    if (user && user.email === req.body.email) {
      const mailOptions = {
        from: "amirthink72@gmail.com", // sender address
        to: user.email, // receiver address
        subject: "Account Password", // Subject line
        html:
          "<div> Hi, <br/> Your account passowrd is <b>" +
          user.password +
          "</b> </div>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.json(user);
        }
      });
    } else {
      res.json(err);
    }
  });
});

// register user
router.post("/register", (req, res) => {
  User.findOne(
    { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    (err, user) => {
      if (err) res.send(err);
      if (user !== null) {
        res.json({ message: "User already exists" });
      } else {
        const user = new User();
        user.email = req.body.email;
        user.company = req.body.company;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.address1 = req.body.address1;
        user.address2 = req.body.address2;
        user.country = req.body.country;
        user.state = req.body.state;
        user.postcode = req.body.postcode;
        user.phone = req.body.phone;
        user.password = req.body.password;
        user.save((err) => {
          if (err) res.send(err);
          res.json({ message: "User Created" });
        });
      }
    }
  );
});

// get user info
router.get("/getUser/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
});

app.listen(PORT, function () {
  console.error(`Node server listening on port ${PORT}`);
});
