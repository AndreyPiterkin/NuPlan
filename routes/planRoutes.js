const router = require("express").Router();
const Plan = require("../model/model.plan.js")

router.get("/:pid", (req, res) => {
  Plan.getPlanInfo(parseInt(req.params.pid, 10))
    .then((sems) => {
      res.status(200).json(sems);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/new", (req, res) => {
  Plan.newPlan(req.body.uid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/:pid", (req, res) => {
  Plan.removePlan(req.params.pid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/rename/:pid", (req, res) => {
  Plan.renamePlan(req.params.pid, req.body.newName)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/redesc/:pid", (req, res) => {
  Plan.reDesc(req.params.pid, req.body.newDesc)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});



module.exports = router;
