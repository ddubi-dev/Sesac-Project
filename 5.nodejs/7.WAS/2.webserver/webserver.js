const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// const parse = require("querystring").parse;
// ==
const { parse } = require("querystring");

http
  .createServer(async (req, res) => {
    // /image 요청 -> static 폴더 내의 파일 전달

    try {
      // GET
      if (req.method == "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./index.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else if (req.url.startsWith("/image/")) {
          // 1. url 뒤의 글자 자름
          // 2. 파일명을 가져옴
          const imageName = path.basename(req.url);
          console.log(imageName);

          // 3. 우리의 이미지 디렉토리인 static/ 뒤에서 위 파일명을 붙여
          const imagePath = path.join("static", imageName);
          console.log(imagePath);

          // 4. 그 내용을 전달
          const imageData = await fs.readFile(imagePath);
          res.writeHead(200, { "Content-Type": "image/jpg" }); // rfc에 정의 되어있음.

          res.end(imageData);
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not Found");
        }

        // POST
      } else if (req.method == "POST") {
        if (req.url === "/user") {
          let body = "";

          req.on("data", (data) => {
            body += data; // 데이터가 길 경우, 청크 데이터 모두 합쳐져서 넣음
          });

          req.on("end", () => {
            console.log(body);

            // undefined...
            const formData = parse(body);
            console.log("(parse) 받은 데이터는?", formData); // 데이터를 '객체 타입'으로 변환해서 가지고 있음(keyvalue로 parsing) => 다루기 쉬워짐
            const username = formData.name;
            console.log("(key)받은 데이터는?", username);
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not Found");
        }
      } else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Not Found");
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("알 수 없는 오류.. 관리자에게 문의..");
    }
  })
  .listen(3000, () => {
    console.log("서버 대기중.. on 3000");
  });
