const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// 미들웨어
app.use(
  session({
    secret: "my-secret-key", // 세션 암호화 키
    resave: false, // 세션 데이터가 변경되지 않으면 저장하지 않음
    saveUninitialized: true, // 초기화하지 않은 세션을 저장
    cookie: { maxAge: 60000 }, // 쿠키 만료 시간 설정
  })
);

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const users = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
];

const sessionDB = [];

// 로그인 라우트
app.get("/login", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "login.html"));
});
app.post("/login", (req, res) => {
  const { username, password } = req.body; // 미들웨어로 파서 추가해야함
  // 사용자가 입력한 id/pw를 위의 users 자료구조에서 검색..
  let userId = "";

  // console.log(`username: ${username}`);
  // console.log(`password: ${password}`);
  // console.log(`req.sessionID: ${req.sessionID}`);
  // console.log(`req.session: ${JSON.stringify(req.session)}`);

  for (let user of users) {
    if (user.username === username && user.password === password) {
      req.session.username = user.username;
      break;
    }
  }

  // if (req.session.userId) {
  //   console.log(`req.session.userId: ${req.session.userId}`);
  // }

  if (req.session.username) {
    res.status(200).json({ message: "로그인 성공" });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});

app.get("/profile", (req, res) => {
  const user = req.session;

  if (user) {
    res.json({ username: user.username, message: "프로필 정보" });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자임" });
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  // 세션에서 사용자 정보 삭제
  req.session.destroy((error) => {
    if (error){
      res.status(400).send("로그아웃 중 오류 발생");
    }
    res.status(200).sendFile(path.join(__dirname, "public", "logout.html"));
  });
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
