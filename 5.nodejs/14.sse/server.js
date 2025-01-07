const express = require("express");
const path = require("path");
const cors = require("cors"); //사용자 정보가 빠져나가는 걸 방지하기 위한 웹 브라우저의 보안기능.

const app = express();
const port = 3000;

app.use(cors()); // 모든 origin 다 허용

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/events", (req, res) => {
  // 헤더 설정
  res.setHeader("Cache-Control", "no-cache"); // 고전, 모던에선 필요 X
  res.setHeader("Connection", "keep-alive"); // 일반
  res.setHeader("Content-Type", "text/event-stream");

  // 프로토콜 규칙
  // 클라이언트가 접속시 현재 시간
  const sendTime = () => {
    // 데이터는 "data: "으로 시작해서 내용을 담고
    // "\n\n"로 끝나는게 기본 프로토콜
    res.write(`data: ${new Date().toISOString()}\n\n`);
  };

  // 주기적으로 전송
  const interval = setInterval(sendTime, 1000); // 1000 ms

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자가 도망감");
    // 버그
  });
});

const server = app.listen(port, () => {
  console.log("서버 레디");
});
