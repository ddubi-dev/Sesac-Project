const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

// 가상의 데이터
const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);
const maxItems = 1000; // 최대 데이터 갯수

function getRandomIncrement() {
  return Math.floor(Math.random() * 21); // 0~20 까지의 숫자 생성
}

// 10초마다 랜덤으로 0~20 까지의 숫자를 만들어서 증가시키기
const intervalid = setInterval(() => {
  if (data.length < maxItems) {
    const randomIncrement = getRandomIncrement();
    const currentLength = data.length;
    for (let i = 0; i < randomIncrement; i++) {
      if (data.length < maxItems) {
        if (data.length < maxItems) {
          data.push(`Item ${currentLength + i + 1}`);
        }
      }
    }
    console.log(`10초 경과: 데이터가 ${randomIncrement}개 추가되어 총 ${data.length}개가 되었음`);
  } else {
    clearInterval(intervalid); // 최대 개수 도달하면 중지
    console.log(`최대 개수 ${maxItems}에 도달하여 더이상 생성하지 않음.`);
  }
}, 10_000); // 10초

app.use(morgan("dev"));
app.use(express.static("public"));

function getItems(start, end) {
  return data.slice(start, end);
}

app.get("/api/data", (req, res) => {
  const { start, end } = req.query;
  const items = getItems(parseInt(start), parseInt(end));
  res.json(items);
});

app.listen(port, () => {
  console.log("서버 레디");
});
