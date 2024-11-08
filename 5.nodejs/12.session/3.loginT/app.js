const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 2 depth 이상 파싱

// 세션 관리; express-session 미들웨어를 사용해 사용자의 세션 정보 관리
app.use(
  session({
    secret: "my-secret-key", // 내 메모리에 저장할 데이터의 암호화 키
    resave: false, // 세션 데이터가 변경되지 않았어도 계속 재저장할거냐
    saveUninitialized: true, // 초기화되지 않은 세션을 저장
    cookie: {
      maxAge: 15000, // 세션의 유효 시간을 60초 = 1분
    },
  })
);

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const users = [
  { id: 1, username: "user1", password: "pass1", hobby: "sleeping" },
  { id: 2, username: "user2", password: "pass2", hobby: "studying" },
  { id: 3, username: "user3", password: "pass3", hobby: "walking" },
];

app.post("/login", (req, res) => {
  // 로그인 코드 개발
  const { username, password } = req.body; // 미들웨어로 파서 추가해야함
  console.log(`사용자로부터 받아온 username: ${username}, password:${password} `);

  const user = users.find((u) => u.username == username && u.password == password);

  if (user) {
    req.session.user = user;
    res.json({ message: "로그인 성공" }); // 명시 안하면 기본 값은 200
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});

app.get("/profile", (req, res) => {
  const user = req.session.user;

  if (user) {
    res.json({ username: user.username, message: "프로필 정보" });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자임" });
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  // 세션에서 사용자 정보를 삭제
  const user = req.session.user;

  if (user && user.username) {
    req.session.destroy(); // 나의 유저를 관리하던 세션 삭제
    res.json({ message: "로그아웃 성공" });
  } else {
    res.json({ message: "잉? 로그인 한 적이 없는데?" });
  }
});

// 로그인 상태 체크
app.get("/check-login", (req, res) => {
  // 세션 체크해서 사용자에게 username 반납
  const user = req.session.user;
  if (user) {
    // res.status(200).send({ username: user.username });
    res.send({ username: user.username });
  } else {
    res.status(400).json({ message: "로그인 안 됨" });
  }
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
