const express = require("express");
const nunjucks = require("nunjucks");

const { getSeoulPopulationData } = require("./data");

const app = express();
const PORT = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

app.get("/", (req, res) => {
  const seoulData = getSeoulPopulationData(); // 파일로부터 함수를 넘겨받아, 함수로 데이터를 받음.
  res.render("population", { seoulData: JSON.stringify(seoulData) });
  // 눈적스의 변수로 전달함
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
