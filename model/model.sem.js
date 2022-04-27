const Queries = require('../environment/queries.js');

const Sem = class {
  constructor (data) {
    Object.assign(this, data);
  }

  static newSem(pid, sem, year, is_coop) {
    return new Promise((resolve, reject) => {
      Queries.execute("call addSemester(?, ?, ?, ?)", [pid, sem, is_coop, year], "Can't make new semester")
        .then((data) => {
          resolve(data);
        })
        .catch(err => {
          reject({message: err});
        });
    });
  }

  static deleteSem(pid) {
    return new Promise((resolve, reject) => {
      Queries.execute("call deleteSemester(?)", [pid], "Can't delete semester")
        .then((data) => {
          resolve({message: "Deleted semester"});
        })
        .catch(err => {
          reject({message: err});
        });
    });
  }

  static deleteClass(sid, ccode, clvl) {
    return new Promise((resolve, reject) => {
      Queries.execute("call removeClass(?, ?, ?)", [sid, ccode, clvl], "Can't delete class")
        .then((data) => {
          resolve({message: "Deleted class"});
        })
        .catch(err => {
          reject({message: err});
        });
    });
  }
};

module.exports = Sem