const cnx = require('./db.js')

const Queries = class {
  static execute(query, params, failMessage) {
    return new Promise((resolve, reject) => {
      cnx.query(query, this.parse(params), (err, results) => {
        if (err) {
          reject(err);
        }
        try {
          let rows = JSON.parse(JSON.stringify((results[0] ? results[0] : results)));
          if (!rows[0]) {
            reject(failMessage)
          }
          resolve(rows);
        } catch(e) {
          reject("Malformed request")
        }
      }); 
    })
  }

  static parse(params) {
    let parsed = [];
    for (let p of params) {
      let pp = p.replace(/\W/g, '');
      parsed.push(pp)
    }
    return parsed;
  }
};

module.exports = Queries;