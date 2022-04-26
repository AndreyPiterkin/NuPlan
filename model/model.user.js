const Queries = require('../environment/queries.js');

const User = class {
  constructor (data) {
    Object.assign(this, data);
  }

  static authenticate(username, password) {
    return new Promise((resolve, reject) => {
      Queries.execute("call authenticate(?, ?)", [username, password], "Invalid credentials.")
        .then((rows) => resolve(new User(rows[0])))
        .catch((err) => reject({message: err}));
    });
  }

  static signup(uname, pwd, fname, lname) {
    return new Promise((resolve, reject) => {
      Queries.execute("call createUser(?, ?, ?, ?)", [uname, pwd, fname, lname], "Username already exists.")
        .then((rows) => resolve(new User(rows[0])))
        .catch((err) => reject({message: err})); 
    })
  }

  static getPlans(uid) {
    return new Promise((resolve, reject) => {
      Queries.execute("call allPlans(?)", [uid], "No plans found.")
        .then((rows) => {
          resolve(rows)
        })
        .catch((err) => reject({message: err}));
    });
  }
};

module.exports = User