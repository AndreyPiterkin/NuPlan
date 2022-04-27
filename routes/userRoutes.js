const router = require("express").Router();
const User = require("../model/model.user.js")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const withAuth = require('../middle.js')
dotenv.config();

router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password)
      .then((user) => {
        if (user.uid) {
          const payload = {uid: user.uid}
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '5h'
          });
          res.cookie('uid', user.uid, {maxAge: (1000 * 60 * 60 * 5)});
          res.cookie('token', token, { httpOnly: true}).sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        res.status(401).json(err)
      });
  } else {
    res.status(401).json({message: "Fill out all fields"});
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
  } else {
    res.status(401).json({message: "Fill out all fields"});
  }
});

// require authentication for all routes below

router.get("/:id", withAuth, (req, res) => {
  User.getPlans(parseInt(req.params.id, 10))
    .then((plans) => {
      res.status(200).json(plans);
    }).catch((err) => {
      res.status(401).json(err);
    })
})

module.exports = router;

