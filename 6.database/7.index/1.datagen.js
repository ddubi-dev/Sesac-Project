const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");

const numData = 1_000_000; // 100만

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS employees(
        id INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT,
        salary INTEGER
        )
    `);
});

function getRandomName() {
  const lastname = ["김", "이", "박", "최", "정"];
  const firstname1 = ["가", "나", "다", "라", "마"];
  const firstname2 = ["바", "사", "아", "자", "차"];

  const randomLastname = lastname[Math.floor(Math.random() * lastname.length)];
  const randomFirstname1 = firstname1[Math.floor(Math.random() * firstname1.length)];
  const randomFirstname2 = firstname2[Math.floor(Math.random() * firstname2.length)];

  return { name: randomLastname + randomFirstname1 + randomFirstname2 };
}

function getRandomDept() {
  const departments = ["IT", "HR", "Engineering", "Marketing"];
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomSalary() {
  // 0 ~ 1.0 보다 작은 수...
  return Math.floor(Math.random() * 100) * 1000 + 10000; // 10,000~100,000 사이의 랜덤 급여
}

db.serialize(() => {
  console.time("Execution Time");
  db.run("BEGIN TRANSACTION");
  const insertStmt = db.prepare("INSERT INTO employees(name, department, salary) VALUES (?,?,?)");
  for (let i = 0; i < numData; i++) {
    const { name } = getRandomName();
    const department = getRandomDept();
    const salary = getRandomSalary();

    insertStmt.run(name, department, salary, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }
  insertStmt.finalize((err) => {
    // console.timeEnd("Execution Time"); // 종료 시간 및 소요 시간 출력
  });

  db.run("COMMIT", () => {
    console.timeEnd("Execution Time");
  });
});

// node 1.datagen.js
// sqlite3 mydb.db
// SELECT count(*) FROM employees;
// SELECT * FROM employees LIMIT 10;
