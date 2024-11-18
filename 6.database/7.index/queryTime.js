const sqlite3 = require("sqlite3").verbose();

function connectToDatabase() {
  return new sqlite3.Database("mydb.db");
}

function queryName(db, searchName) {
  const selectQuery = "SELECT * FROM employees WHERE name = ? ";
  console.time("Query Time");

  // 하나만 찾음
  db.all(selectQuery, [searchName], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Result: ", rows);
    }
  });

  console.timeEnd("Query Time");
}

function queryAll(db, searchOptions) {
  let selectQuery = "SELECT * FROM employees WHERE 1=1 ";
  // 의미없지만 true이고, 1=1을 통해 일괄성 있게 만들어서 정상 동작하게 만듦.
  const queryParams = [];

  if (searchOptions.name) {
    selectQuery += "AND name =? ";
    queryParams.push(searchOptions.name);
  }

  if (searchOptions.department) {
    selectQuery += "AND department = ?";
    queryParams.push(searchOptions.department);
  }

  if (searchOptions.salary) {
    selectQuery += "AND salary = ?";
    queryParams.push(searchOptions.salary);
  }

  //   console.log(selectQuery);

  console.time("Query Time");

  db.all(selectQuery, queryParams, (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("결과: ", rows);
      console.timeEnd("Query Time");
    }
  });
}

module.exports = { connectToDatabase, queryName, queryAll };
