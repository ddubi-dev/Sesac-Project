const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("test.db");

// async function create_db(){}
// 번거로움 => 익명함수

async () => {
  try {
    await new Promise((resolve, reject) => {
      // pending, resolved, reject
      db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
        if (err) reject(err);
        else resolve();
        console.log("테이블 생성이 완료되었습니다.");
      });
    });
  } catch (err) {
    console.error("에러 발생: ", err);
  }
};
// 비동기 익명함수 만들어 바로 당장 실행하게 만듦

async () => {
  try {
    await new Promise((resolve, reject) => {
      db.run("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"], (err) => {
        if (err) reject(err);
        else resolve();
        console.log("데이터 삽입에 성공했습니다.");
      });
    });
  } catch (err) {
    console.error("에러 발생: ", err);
  }
};

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
