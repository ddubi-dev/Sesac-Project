const http = require("http");
const fs = require("fs").promises;

// /요청시 index.html
// /about 요청시 about.html
// 그 외에 나머지를 요청하면 없다고 반납 (404 Not Found)를 반납하면 됨
// 힌트: req.url을 비교

// ME
// http
//   .createServer(async (req, res) => {
//     console.log(req.method, req.url);
//     try {
//       let data;
//       switch (req.url) {
//         case "/":
//           data = await fs.readFile("./index.html");
//           break;
//         case "about":
//           data = await fs.readFile("./about.html");
//           break;
//         default:
//           return new Error();
//       }
//       res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//       res.end(data);
//     } catch (err) {
//       console.error(err);
//       res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
//       res.end("오류가 발생했습니다: 내부에 xxx 오류가 발생했습니다");
//     }
//   })
//   .listen(3000, () => {
//     console.log("서버 대기중.. on 3000");
//   });

http
  .createServer(async (req, res) => {
    console.log(req.method, req.url);
    try {
      if (req.method == "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./index.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not Found");
        }
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
