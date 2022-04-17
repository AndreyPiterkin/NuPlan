const router = require("express").Router();
const User = require("../model/model.user.js")

router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => {
        res.status(401).json(err)
      });
  }
});

router.post("/signup", (req, res) => {
  if (req.body.username && req.body.password && req.body.fname && req.body.lname) {
    User.signup(req.body.username, req.body.password, req.body.fname, req.body.lname)
      .then((user) => {
        res.status(200).json(user);
      }).catch((err) => {
        res.status(401).json(err);
      })
  }
});

module.exports = router;