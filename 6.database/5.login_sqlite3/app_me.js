// 모듈들 불러오기
const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const path = require("path");

// 내부에서 사용할 변수들 정의
const app = express();
const PORT = 3000;
const db = new sqlite3.Database("users.db");

// 세션 초기화
app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
  })
);

// db 초기화
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY
//     AUTOINCREMENT, username TEXT, password TEXT)`);
// });

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 기본 폼 입력값 처리
app.use(express.static(path.join(__dirname, "public")));
// 전역으로 파일을 불러올 수 있도록, static 처리

// 라우팅 등록
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/profile", (req, res) => {
  // 절대 경로를 넣어줘야함!!
  // res.sendFile(path.resolve("public/profile.html"));
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

app.get("/profile-data", (req, res) => {
  const user = req.session.user;
  // console.log(user);

  if (user) {
    db.get(`SELECT * FROM users WHERE id = ?`, [user.id], (err, row) => {
      if (row) {
        // console.log(`사용자 프로필 데이터 조회: `, row);
        res.json(row);
        // 잘 필터링해서 보내야 함. password등의 민감 정보
        // res.json({
        //   username,
        //   email,
        //   created_at,
        //   role
        // })
      }
    });
  } else {
    res.status(404).json({ error: "사용자 없다" });
  }
});

app.post("/login", (req, res) => {
  // const username = req.body.username;
  const { username, password } = req.body; // 미들웨어가 해줌
  console.log(`username: ${username}, password: ${password}`);

  // 실무에서 절대 이렇게 코딩하면 안됨!!! sql injection에 취약함
  // 하드코딩 할수록 취약한 코드
  //   const queryStr = `SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
  const queryStr = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(queryStr, [username, password], (err, row) => {
    if (row) {
      console.log(`사용자 조회:`, row);
      req.session.user = row;
      res.send(`로그인 성공: ${row.username}`);
      // res.redirect("/profile");
    } else {
      res.send("로그인 실패");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy(); // 세션 자체가 사라짐.
  // 에러처리 아무것도 안 했음.
  console.log("로그아웃 완료");
  res.send();
  // 이래야 요청이 끝남. 안그러면 pending 상태로 가만히 있음.
  // res.redirect("/"); // form을 통해 넘어온거면 가능. 프론트-fetch로 온거면 불가능
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
