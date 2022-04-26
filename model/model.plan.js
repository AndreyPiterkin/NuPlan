const Queries = require('../environment/queries.js');

const Plan = class {
  constructor (data) {
    Object.assign(this, data);
  }

  static getPlanInfo(pid) {
    return new Promise((resolve, reject) => {
      Queries.execute("call getAllSemesters(?)", [pid], "No semesters found.")
        .then(data => {
          let semesters = {};
          let semData = { sems: []};
          for (let i = 0; i < data.length; i++) {
            if (data[i].usid in semesters) {
              semesters[data[i].usid].push(data[i]);
            } else {
              semesters[data[i].usid] = [data[i]];
            }
          }

          for (let key in semesters) {
            semData.sems.push(semesters[key]);
          }
          resolve(new Plan(semData));
        })
        .catch(err => {
          reject({message: err});
        });
    });
  }

  static removePlan(pid) {
    return new Promise((resolve, reject) => {
      Queries.execute("call deletePlan(?)", [pid], "Can't delete plan")
        .then((data) => {
          resolve({message: "Plan deleted"});
        })
        .catch(err => {
          resolve({message: "Plan deleted"});
        });
    });
  }

  static renamePlan(pid, newName) {
    return new Promise((resolve, reject) => {
      Queries.execute("call renamePlan(?, ?)", [pid, newName], "Can't rename plan")
        .then((data) => {
          resolve({message: "Plan renamed"});
        })
        .catch(err => {
          resolve({message: err});
        });
    });
  }

  static reDesc(pid, newText) {
    return new Promise((resolve, reject) => {
      Queries.execute("call renameDesc(?, ?)", [pid, newText], "Can't rename plan")
        .then((data) => {
          resolve({message: "Plan description renamed"});
        })
        .catch(err => {
          resolve({message: err});
        });
    });
  }

  static newPlan(uid) {
    return new Promise((resolve, reject) => {
      Queries.execute("call createPlan(?, ?, ?)", ["New Plan", null, uid], "Can't make new plan")
        .then((data) => {
          resolve(data);
        })
        .catch(err => {
          reject({message: err});
        });
    });
  }
};

module.exports = Plan