const sqlite3 = require("sqlite3").verbose();
// const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("test.db");
// 없으면 생성, 있으면 불러옴(외부DB에 접속 명령어)
// const db = new sqlite3.Database(':memory:');
// 파일 만들지 않고 메모리에 올려서 관리(추후 삭제됨)
// db는 일반적으로 파일. 그래서 속도가 느림.

db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)"); // 없으면 만들 것

db.run("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"]);
// db.run('INSERT INTO messages(text) VALUES "Hello, SQLite"');
// placeholder를 통해 입력값을 입력 받도록 설정함. SQL injection에 취약하지 않도록 입력값에 대해 필터링해줌

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});
// get all each
// 가져온 데이터 처리 방식
// 비동기 -> 출력하는 시점에 만들어졌을지, 안만들어졌을지 ...

db.close();
