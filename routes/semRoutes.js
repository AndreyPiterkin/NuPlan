const router = require("express").Router();
const Sem = require("../model/model.sem.js")

router.post("/new", (req, res) => {
  Sem.newSem(req.body.pid, req.body.sem, req.body.year, req.body.is_coop)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(401).json(err);
  });
});

router.post("/delete", (req, res) => {
  Sem.deleteSem(req.body.pid)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(401).json(err);
  });
});


module.exports = router;
