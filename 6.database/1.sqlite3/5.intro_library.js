const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("test.db");

function dbRunQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function dbAllQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  dbRunQuery,
  dbAllQuery,
};
