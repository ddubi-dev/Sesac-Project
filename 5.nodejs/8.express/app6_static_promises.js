const express = require("express");
const app = express();
const fs = require("fs").promises;
const path = require("path");
const port = 3000;

// 정적 폴더 정의
app.use(express.static("public")); // 내가 정한 폴더명
// 여기있는거 줄게~줄게~ 모두다 줄게~

app.get("/", async (req, res) => {
  const htmlFileData = path.join(__dirname, "public", "index.html");
  try {
    const data = await fs.readFile(htmlFileData);
    res.send(data);
  } catch (err) {
    res.status(500).send("서버 오류");
  }
});

app.listen(port, () => {
  console.log("서버 오픈");
});
