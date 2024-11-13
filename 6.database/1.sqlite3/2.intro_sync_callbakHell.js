const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("test.db");

db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
  if (err) throw err;
  console.log("테이블 생성이 완료되었습니다.");

  db.run("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"], (err) => {
    if (err) throw err;
    console.log("데이터 삽입에 성공했습니다.");

    db.each("SELECT * FROM messages", (err, row) => {
      if (err) throw err;
      console.log(row);
    });
  });
});
// callback hell

db.close();
