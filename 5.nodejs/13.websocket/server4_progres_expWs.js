const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

const app = express();
expressWs(app);

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress2.html"));
});

app.ws("/progress", (ws, req) => {
  // 왔을 때부터 존재함.
  console.log("클라이언트 웹소켓으로 접속");
  let interval;

  ws.on("message", (message) => {
    console.log("message:", message, message.toString());

    if (message.toString() === "start") {
      let progress = 0;

      interval = setInterval(() => {
        progress += 10;
        ws.send(JSON.stringify({ progress }));

        if (progress >= 100) {
          clearInterval(interval);
          console.log("작업 완료");
        }
      }, 500);

      console.log(message);
    } else if (message.toString() === "stop") {
      clearInterval(interval);
      console.log("작업 중지");
    }
  });
});

app.listen(port, () => {
  console.log("서버 레디");
});
