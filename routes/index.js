var express = require("express");
var router = express.Router();
const { createPool } = require("mysql");
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo",
  connectionLimit: 10,
});

pool.query(`select * from login`, (err, users, fields) => {
  if (err) {
    return console.log(err);
  }
  console.log(users);
  router.post("/login", function (req, res) {
    let result = users.find((user) => user.email == req.body.email);
    if (result) {
      if (result.password == req.body.password) {
        res.status(200).send({
          message: "Login Successful",
        });
      } else {
        res.status(405).send({
          message: "Password incorrect",
        });
      }
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  });
});

// var users = [
//   {
//     email: "nithish@gmail.com",
//     password: "password",
//   },
// ];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("WELCOME");
});

module.exports = router;
