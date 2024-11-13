const sqlite = require("better-sqlite3"); // 동기 진행
const db = sqlite("text2.db");

db.exec(`
        CREATE TABLE IF NOT EXISTS greetings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT
        )
    `);

// 데이터 삽입
const insert = db.prepare("INSERT INTO greetings (messages) VALUES (?)");
const insertResult = insert.run("헬로우 B-SQLITE3");
console.log("삽입 완료: ", insertResult);

// 데이터 조회
const select = db.prepare("SELECT * FROM greetings");
const result = select.all();
result.forEach((row) => {
  console.log("조회 결과: ", row.message);
});

db.close();
console.log("끝났음");
