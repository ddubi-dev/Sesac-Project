const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "my-secret-key", //내 메모리에 저장할 데이터의 암호화키
    resave: false, // 세션 데이터가 변경되지 않았어도 계속 재저장할거냐?
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할거냐?
  })
);

function userCount(req, res, next) {
  // 세션 방문 카운트 변수 있으면 재사용, 없으면 0으로 초기화
  req.session.visitCount = req.session.visitCount || 0;

  req.session.visitCount++;

  console.log(`이 SessionID: ${req.sessionID}는 몇 번째 방문 : ${req.session.visitCount}`);
  // http://localhost:3000/readsession

  next();
}

app.use(userCount);

app.get("/", (req, res) => {
  // 해당 페이지 방문시 쿠기 발행
  req.session.username = "user1";
  req.session.cart = ["사과우유", "딸기우유", "바나나우유"];

  // 세션에 저장했지만, 자동으로 set-cookie를 통해서 session id 가 전송됨
  // 이때, express에서 정한 세션 id 의 키가 connect.sid
  res.send("루트");
});

app.get("/readsession", (req, res) => {
  const username = req.session.username;
  const cart = req.session.cart;
  const visitCount = req.session.visitCount;

  if (username && cart) {
    res.send(`너는 ${username}이고, ${visitCount}번째 방문이고, 이전에 장바구니에 ${cart}를 담았군요.`);
    // 쿠키 발급 받았으면
  } else {
    res.send(`새로 오셨군요 고객님 상품을 담아주쇼...`);
    // 쿠키 발급을 안 받았으면 (브라우저에서 쿠키 삭제)
  }

  console.log(`세션ID: ${req.sessionID}`);
  console.log(`세션내용: ${JSON.stringify(req.session)}`);
  // js가 관련된건 다 js 객체
  // 시크릿 브라우저는 하나
});

app.listen(port, () => {
  console.log("서버 레디");
});
