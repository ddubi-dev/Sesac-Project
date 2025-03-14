require("dotenv").config();

// 네이버 검색 API 예제 - 블로그 검색
const request = require("request");
const express = require("express");

const app = express();
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

// 정적 파일 제공
app.use(express.static("public"));

app.get("/search/blog", function (req, res) {
  const api_url = "https://openapi.naver.com/v1/search/blog?query=" + encodeURI(req.query.query); // JSON 결과

  const options = {
    url: api_url,
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  };

  // react app 만들시 우리 백엔드를 거쳐서 가게 하는게 좋음
  // 내가 만약에 다이렉트로 요청한다면 나의 secret 이 노출이 됨

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log("http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!");
});
