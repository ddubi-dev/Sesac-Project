// const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(express.json()); // 이 미들웨어가 body안의 내용 중 json을 처리해서 body라는 변수에 담아줌.

app.get("/", (req, res) => {
  res.send("루트");
});

// app.post("/submit", (req, res) => {
//   let data = "";
//   req.on("data", (chunk) => {
//     data += chunk;
//   });
//   req.on("end", () => { // bodyparser... 데이터를 기다림
//     try {
//       const jsonData = JSON.parse(data);
//       res.json({ receivedData: jsonData });
//     } catch (error) {
//       res.status(400).json({ error: "잘못된 형식의 JSON을 보냈다" });
//     }
//   });
// });
// curl -X POST localhost:3000/submit -H "Content-Type:application/json" -d "{\"name\":\"john\"}
// >>> {"receivedData":{"name":"john"}}

app.post("/submit2", (req, res) => {
  const jsonData = req.body; // req.body에 파싱된 JSON 데이터를 담아서 보내줌.
  res.json({ receivedData: jsonData });
});
// curl -X POST localhost:3000/submit2 -H "Content-Type:application/json" -d "{\"name\":\"john\"}"

app.listen(port, () => {
  console.log("서버 준비 완료");
});
