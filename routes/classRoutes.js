const router = require("express").Router();
const Sem = require("../model/model.sem.js")
const Queries = require("../environment/queries.js");

router.post("/delete", (req, res) => {
  Sem.deleteClass(req.body.sid, req.body.ccode, req.body.clvl)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(401).json(err);
  });
});

router.get('/', function(req, res) {
  Queries.execute('call validClasses()', [], 'Can\'t connect to database')
    .then(data => {
      res.status(200).json(data);
    });
});

router.post('/add', function(req, res) {
  Queries.execute('call addClass(?, ?, ?)', [req.body.sid, req.body.ccode, req.body.clvl], 'Can\'t add class')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    }
  );
});

module.exports = router;
