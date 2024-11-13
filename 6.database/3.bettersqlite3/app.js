const express = require("express");
const sqlite = require("sqlite3");
const fs = require("fs");

const app = express();
const PORT = 3000;
const dbFile = "mydb.db";
//env, 바깥에서 이름 받도록 함

const db = new sqlite.Database(dbFile);

const allowedTables = ["users", "books", "products"]; //접근 가능한 테이블

app.use(express.urlencoded({ extended: true }));

function initializeDatabase() {
  // 동기
  const sql = fs.readFileSync("init_database.sql", "utf8");

  // 비동기
  db.exec(sql, (err) => {
    if (err) {
      if (err.errno == 19) {
        // 로그 레벨
        console.log("초기화 이미 이전에 완료");
      } else {
        console.log("초기화 오류");
      }
    } else {
      console.log("초기화 성공");
    }
  });
}

initializeDatabase();

// app.put("/users/:id/:username/:password", (req, res) => {
//   // 사용자 정보를 바꾸려면 어떻게 해야함?
//   const id = req.params.id;
//   const username = req.params.username;
//   const password = req.params.password;

//   db.run("UPDATE users SET username = ?, password = ?, WHERE id = ?", [username, password, id], (err) => {
//     if (err) {
//       console.log("오류", err);
//       return res.status(500).send("내부 오류");
//     }
//     res.send(`업데이트 완료`);
//   });
// });

// app.put("/users/:id", (req, res) => {
//   // RestAPI 철학상 이게 맞음(?)
//   const userId = req.params.id;
//   const { username, password } = req.body;

//   // 동적으로 오는 입력값을 쿼리문으로 해결하려면?
//   // 있으면 넣는다 없으면 안 넣는다
//   // 변수로 넘겨주기
//   const isUsername = username ? `username =${username}` : ``;
//   const isPassword = password ? `password=${password}` : ``;

//   // 비동기, 이벤트 루프 안에 있다가 끝남
//   db.run("UPDATE users SET ? WHERE id = ?", [isUsername + isPassword, userId], (err) => {
//     if (err) {
//       console.log("오류", err);
//       return res.status(500).send("내부 오류");
//     }
//     res.send(`사용자(${userId}) 정보 업데이트 완료`);
//   });
// });

app.put("/users/:id", (req, res) => {
  // RestAPI 철학상 이게 맞음(?)
  const userId = req.params.id;
  const { username, password } = req.body;

  let fields = [];
  let values = [];

  if (username !== undefined) {
    fields.push("username=?");
    values.push(username);
  }

  if (password !== undefined) {
    fields.push("password = ?");
    values.push(password);
  }

  if (fields.length === 0) {
    return res.status(400).send("변경할 필드가 없다~!");
  }

  values.push(userId);

  // 비동기, 이벤트 루프 안에 있다가 끝남
  db.run(`UPDATE users SET ${fields.join(",")} WHERE id = ?`, values, (err) => {
    if (err) {
      consSole.log("오류", err);
      return res.status(500).send("내부 오류");
    }
    res.send(`사용자(${userId}) 정보 업데이트 완료`);
  });
});

// 사용자 삭제하는 거 구현
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.run("DELETE FROM users WHERE id = ? ", [userId], (err) => {
    if (err) {
      console.log("오류", err);
      return res.status(500).send("내부 오류");
    }
    res.send(`사용자(${userId}) 정보 삭제 완료`);
  });
});

app.post("/users", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  db.run("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function (err) {
    //this.lastID 하려면 일반 함수로 (람다(화살표)함수 X)
    if (err) {
      console.log("오류!", err);
      return res.status(500).send("내부 오류");
    }
    res.send(`사용자 추가 완료: ${this.lastID}`);
  });
});

app.get("/:table", (req, res) => {
  const db_table = req.params.table;

  if (!allowedTables.includes(db_table)) {
    return res.status(401).send("Invalid table name");
  }

  const query = `SELECT * FROM ${db_table}`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.send("DB 조회 오류");
    }
    res.json(rows);
  });
});

app.get("/:table/:id", (req, res) => {
  const db_table = req.params.table;
  const id = req.params.id;

  if (!allowedTables.includes(db_table)) {
    return res.status(401).send("Invalid table name");
  }

  const query = `SELECT * FROM ${db_table} WHERE id = ?`;

  db.get(
    query,
    [id],
    (err,
    (row) => {
      if (err) {
        return res.send("DB 조회 오류");
      }

      if (!row) {
        return res.status(404).send(`Invalid ID: ${id}`);
      }
      res.json(row);
    })
  );
});

app.listen(PORT, () => {
  console.log("서버레디");
});
