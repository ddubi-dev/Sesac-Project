const express = require("express");
const path = require("path");
const { WebSocketServer } = require("ws");

const app = express();
const port = 3000; // http - 통신 => 업그레이드, 소켓
// 8000 - 연결성, 소켓 => 비용 더 발생

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress.html"));
});

const server = app.listen(port, () => {
  console.log("서버 레디");
});

// http 업그레이드(?), 같은 포트로 웹소켓 연결 가능
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("클라이언트 웹소켓으로 접속");

  ws.on("message", (message) => {
    console.log("message:", message, message.toString());

    // 원래는 JSON, type(?)
    // 지금은 간단하게
    if (message.toString() === "start") {
      // start를 받으면 0을 보냄
      let progress = 0;

      const interval = setInterval(() => {
        progress += 10;

        // 현재는 의미있는게 중요함
        // ws.send(progress);
        ws.send(JSON.stringify({ progress }));

        if (progress >= 100) {
          clearInterval(interval);
          console.log("작업 완료");
        }
      }, 500); // 500ms 마다
    }
  });
});
