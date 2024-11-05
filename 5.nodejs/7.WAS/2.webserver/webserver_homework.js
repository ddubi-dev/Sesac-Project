const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const { parse } = require("querystring");

let userName = {};

http
  .createServer(async (req, res) => {
    try {
      // GET
      if (req.method == "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./index.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //
          res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else if (req.url.startsWith("/image/")) {
          const imageName = path.basename(req.url);
          console.log(imageName);
          const imagePath = path.join("static", imageName);
          console.log(imagePath);

          const imageData = await fs.readFile(imagePath);
          res.writeHead(200, { "Content-Type": "image/jpg" });

          res.end(imageData);
        } else if (req.url === "/user") {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`${JSON.stringify(userName)}`);
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not Found");
        }

        // POST
      } else if (req.method == "POST") {
        if (req.url === "/user") {
          let body = "";

          req.on("data", (data) => {
            body += data;
          });

          req.on("end", () => {
            const formData = parse(body);

            for (let key in formData) {
              if (key === "name") {
                userName[formData[key]] = formData[key];
              }
            }
          });

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end("등록 성공");
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not Found");
        }

        // DELETE
      } else if (req.method === "DELETE") {
        if (req.url === "/user") {
          let body = "";

          req.on("data", (data) => {
            body += data;
          });

          req.on("end", () => {
            const formData = parse(body);

            for (let key in formData) {
              if (key === "name") {
                delete userName[formData.name];
              }
            }
          });

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end("삭제 성공");
        } else {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end("Not found");
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
