const http = require("http");
// const fs = require("fs");

// 동기
// const file = fs.readFileSync("./index.html");
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     res.end(file);
//   })
//   .listen(3000, () => {
//     console.log("서버 대기중.. on 3000");
//   });

// ------------------------------비동기------------------------------

// http
//   .createServer((req, res) => {
//     fs.readFile("./index1.html", (err, data) => {
//       if (err) {
//         console.log(err);
//         res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
//         res.end("오류가 발생했습니다: 내부에 xxx 오류가 발생했습니다"); // 사용자에게 직접적인 오류 메시지(err.messages)를 주는 건 좋지 X
//         return; // 일단 에러 찍고 무시
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//         res.end(data); // 파일로부터 콘텐츠(html)를 읽어와서 그 내용을 여기서 전달...
//       }
//     });
//   })
//   .listen(3000, () => {
//     console.log("서버 대기중.. on 3000");
//   });

// ----------------------------Promise 처리--------------------------------

// 우리의 fs 의 콜백 기반 비동기 함수를, promise를 통해서
// 일종의 status를 반납 받아서, await로 대기(동기) 처리

// function readFilePromise(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }
// http
//   .createServer(async (req, res) => {
//     try {
//       const data = await readFilePromise("./index.html");
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

// --------------------------fs.promises----------------------------------

const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile("./index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("오류가 발생했습니다: 내부에 xxx 오류가 발생했습니다");
    }
  })
  .listen(3000, () => {
    console.log("서버 대기중.. on 3000");
  });
