const express = require("express");
const sqlite3 = require("better-sqlite3");
const fs = require("fs");

const app = express();
const PORT = 3000;
const dbFile = "mydb.db";

const db = sqlite3(dbFile);

app.use(express.urlencoded({ extended: true }));
// curl -X POST 127.0.0.1:3000/users -d username=kkk -d password=kkk
app.use(express.json());
// curl -X POST 127.0.0.1:3000/users -H "Content-Type:application/json" -d '{"username":"user5", "password":"password5"}'
// 이거 () 안해주니 오류남^^

// .all()
// 얻는거 get - 조회
// 실행하는거 run - update, insert

function initializeDatabase() {
  const sql = fs.readFileSync("init_database.sql", "utf8");
  const statements = sql.split(";");
  // console.log(statements);

  try {
    // better에만 있음
    db.transaction(() => {
      // 실행을 원하는 쿼리문
      for (const statement of statements) {
        db.exec(statement);
      }
    })();
    // transaction은 함수를 리턴함 -> 익명함수처럼 바로 실행
    // transaction: 성공하면 자동 커밋, 실패하면 자동 롤백
    console.log("초기화 성공!");
  } catch (err) {
    console.error("초기화 오류!");
  }
}

initializeDatabase();

// 사용자 조회(모두) - all()
app.get("/users", (req, res) => {
  try {
    const users = db.prepare(`SELECT * FROM users`).all();
    res.json(users);
  } catch (err) {
    res.status(500).send(`users 테이블이 없다!`);
  }
});

// 사용자 상세 조회(하나) - get()
app.get("/users/:id", (req, res) => {
  // 하나 반납
  const userId = req.params.id;
  // const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  // res.json(user);

  try {
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
    if (!user) {
      return res.status(404).send("사용자 없음");
      // 주니어와 시니어의 차이 : 어느 정도의 에러 처리를 하는지
    }
    res.json(user);
    console.log("사용자 조회: ", user);
  } catch (err) {
    res.status(500).send(`해당 user(${userId})가 없다!`);
  }
});

// 사용자 입력 - run()
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const insert = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`).run(username, password);
  res.send(`사용자 추가 완료: ${insert.lastInsertRowid}`);
});

// 사용자 정보 수정 - run()
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  db.prepare(`UPDATE users SET username = ?, password = ? WHERE id = ?`).run(username, password, userId);
  res.send(`사용자(${userId}) 업데이트 완료`);
});

// 사용자 삭제 - run()
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.prepare(`DELETE FROM users WHERE id = ?`).run(userId);
  res.send(`사용자(${userId}) 삭제 완료`);
});

// app.get("/:table", (req, res) => {
//   const db_table = req.params.table;

//   try {
//     // 동기, try-catch로 예외 처리
//     const query = db.prepare(`SELECT * FROM ${db_table}`);
//     const rows = query.all();
//     res.json(rows);
//   } catch (err) {
//     res.send(`테이블이 없다: ${db_table}`);
//   }
// });

// 3. 상품 검색 - all()
app.get("/products", (req, res) => {
  const { name } = req.query;

  if (name) {
    const query = db.prepare("SELECT * FROM products WHERE name LIKE ?");
    // ?가 하는 역할. 이스케이프문자가 오는지 확인
    const rows = query.all(`%${name}%`); // all 은 [], get {}
    res.json(rows);
  } else {
    const query = db.prepare("SELECT * FROM products").all();
    res.json(rows);
  }

  // const { name } = req.query;
  // let param = name.slice(1, -1); // name="상품"

  // if (name) {
  //   const rows = db.prepare(`SELECT * FROM products WHERE name LIKE ?`).all(`%${param}%`);
  //   console.log(rows);
  //   res.json(rows);
  // }
});

// 취약한 코드
app.get("/products_weak", (req, res) => {
  // http://localhost:3000/products_weak?name=' OR '1'='1
  // ' UNION SELECT * FROM users --
  // 입력값을 검증하지 않고 넣음, 뒤에서부터 바꿀 수 있음.

  const { name } = req.query; // name으로 들어온 걸 const name으로 만들기!!!

  const queryStr = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
  const query = db.prepare(queryStr);

  const rows = query.all();
  res.json(rows);
});

// 4. 로그인 기능 구현 - users를 통해서 db의 id/pw 체크

app.listen(PORT, () => {
  console.log("서버 레디");
});
