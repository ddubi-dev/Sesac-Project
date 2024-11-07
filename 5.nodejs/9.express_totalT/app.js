// 새로운 폴더니 익스프레스 설치

// 외부 모듈 import
const express = require("express");
const path = require("path");

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// 미들웨어
// app.use(express.static("static")); // static 폴더를 static으로 만들어줌. 파일은 인지함.
app.use("/static", express.static("static")); // 이렇게 접근할 때 우리의 폴더 내용을 보여줘
app.use("/image", express.static("static/image")); // 이미지 오면 static에서 가져가

app.use(express.json());
// app.use(express.text());

// LOG
app.use((req, _, next) => {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
});

// 라우트
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "static", "index.html"); // 일반적으로 '절대 경로'를 요청함
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  //resolve??
  res.sendFile(path.join(__dirname, "static", "about.html"));
});

app.get("/user", (req, res) => {
  res.json(users); //json 형태로 req.body에 들어감
});

app.post("/user", (req, res) => {
  // const name = req.body.name;
  const { name } = req.body;
  users[name] = name;
  res.status(201).send("등록 성공"); // 201은 created
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  users[id] = req.body.name;
  res.status(200).send("수정 성공");
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  if (id in users) {
    delete users[id];
    // res.status(200).send("삭제 성공");
    res.status(204).send();
  } else {
    res.status(404).send(`${id} 해당 id가 없음`);
  }
});

// 오류미들웨어
app.use((req, res) => {
  const errorPage = path.join(__dirname, "static", "error.html");
  // res.status(404).send(`이 페이지(${req.url})는 없습니다.`);
  res.status(404).sendFile(errorPage);
});

//서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 대기 중입니다.`);
});
