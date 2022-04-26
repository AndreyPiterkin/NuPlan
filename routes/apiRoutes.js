const userRoutes = require("./userRoutes.js")
const planRoutes = require("./planRoutes.js")
const router = require("express").Router();
const withAuth = require('../middle.js')

router.use("/users", userRoutes);
router.use("/plans", withAuth, planRoutes);
// test token
router.use('/checkToken', withAuth, function(req, res) {
  res.status(200).json({"uid": req.uid});
});

module.exports = router;