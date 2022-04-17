const cnx = require('./db.js')

const User = class {
  constructor (data) {
    Object.assign(this, data);
  }

  static authenticate(username, password) {
    // need to sanitize inputs here
    return new Promise((resolve, reject) => {
      let user = null;
      cnx.query("call authenticate(?, ?)", [username, password], (err, results) => {
        if (err) {
          reject(err)
        } else {
          let rows = JSON.parse(JSON.stringify(results[0]));
          user = new User(rows[0]);
          if (rows[0]) {
            resolve(user);
          } else {
            reject({ message: "Invalid credentials"});
          }
        }
      })
    });
  }

  static signup(uname, pwd, fname, lname) {
    return new Promise((resolve, reject) => {
      let user = null;
      cnx.query("call createUser(?, ?, ?, ?)", [uname, pwd, fname, lname], (err, results) => {
        if (err) {
          reject(err);
        } else {
          let rows = JSON.parse(JSON.stringify( (results[0] ? results[0] : results)));
          user = new User(rows[0]);
          if (rows[0]) {
            resolve(user)
          } else {
            reject({ message: "Username already exists"})
          }
        }
      })
    })
  }
};

module.exports = User