const userRoutes = require("./userRoutes.js")
const planRoutes = require("./planRoutes.js")
const semRoutes = require("./semRoutes.js")
const classRoutes = require("./classRoutes.js")
const router = require("express").Router();
const withAuth = require('../middle.js')
const Queries = require("../environment/queries.js")

router.use("/users", userRoutes);
router.use("/plans", withAuth, planRoutes);
// test token
router.use('/checkToken', withAuth, function(req, res) {
  res.status(200).json({"uid": req.uid});
});
router.use('/sem', withAuth, semRoutes);
router.use('/class', withAuth, classRoutes)

router.use('/semester', withAuth, function(req, res) {
  Queries.execute('call validSemester()', [], 'Can\'t connect to database')
    .then(data => {
      res.status(200).json(data);
    });
});

module.exports = router;