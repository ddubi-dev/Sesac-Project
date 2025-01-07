const express = require("express");
const path = require("path");
const cors = require("cors"); //사용자 정보가 빠져나가는 걸 방지하기 위한 웹 브라우저의 보안기능.

const app = express();
const port = 3000;

app.use(cors()); // 모든 origin 다 허용

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "progress.html"));
});

// SSE 엔드포인트
app.get("/progress", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  let progress = 0;

  // 주기적으로 전송
  const interval = setInterval(() => {
    progress += 10;
    res.write(`data: ${JSON.stringify({ progress })}\n\n`);

    if (progress >= 100) {
      clearInterval(interval);
      res.end();
    }
  }, 500);

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자가 도망감");
    // 버그
  });
});

const server = app.listen(port, () => {
  console.log("서버 레디");
});
