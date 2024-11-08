const express = require("express");
const cookieParser = require("cookie-parser"); // http 요청에 포함된 쿠키를 파싱하여 req.copkies 객체로 제공

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  // 클라이언트에서 쿠키를 보낸다.
  res.cookie("mycookie", "test", { maxAge: 30000 }); // 60000ms = 60s= 1분
  res.cookie("username", "user1", { maxAge: 60000 });
  res.cookie("cart", ["사과", "딸기", "바나나"], { maxAge: 90000 });
  res.send("쿠키를 담아서 보낸다");
});

app.get("/readcookie", (req, res) => {
  //   const myCookie = req.cookies.mycookie;
  //   console.log(myCookie);
  //   res.send(`번호표(쿠키)를 잘 들고 왔군: ${myCookie}`);

  const myCookie = req.cookies;
  res.send(`번호표(쿠키)를 잘 들고 왔군: ${JSON.stringify(myCookie)}`);
  // 왜 브라우저에서 안보이지????
});

app.listen(port, () => {
  console.log("서버 레디");
});
