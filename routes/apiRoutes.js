const userRoutes = require("./userRoutes.js")
const router = require("express").Router();
const withAuth = require('../middle.js')

router.use("/users", userRoutes);

router.use('/checkToken', withAuth, function(req, res) {
  res.status(200).json({"uid": req.uid});
});

module.exports = router;