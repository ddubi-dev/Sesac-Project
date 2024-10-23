const fs = require("fs");

// 파일 읽기
try {
  const data = fs.readFileSync("example.txt", "utf-8");
  console.log(data);
} catch (error) {
  console.error("파일을 읽는데 실패함", error.message);
}

const content = "이것이 파일에 쓰여질 내용입니다.";

fs.writeFileSync("example.txt", content);
