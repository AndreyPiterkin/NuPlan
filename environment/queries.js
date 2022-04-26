const cnx = require('./db.js')

const Queries = class {
  static execute(query, params, failMessage) {
    return new Promise((resolve, reject) => {
      cnx.query(query, params, (err, results) => {
        if (err) {
          reject(err);
        }
        try {
          let rows = JSON.parse(JSON.stringify((results[0] ? results[0] : results)));
          resolve(rows);
        } catch(e) {
          reject("Malformed request")
        }
      }); 
    })
  }
};

module.exports = Queries;