const fs = require("fs");

// 파일 읽기
fs.readFile("example.txt", "utf-8", (err, data) => {
  //콜백함수, return void
  if (err) {
    console.log("파일 읽기 실패");
  } else {
    console.log("파일 내용: ", data);
  }
});

const content = "이것이 파일에 쓰여질 내용입니다.";

fs.writeFile("example.txt", content, (err) => {
  if (err) {
    console.log("파일에 쓰는 중 오류가 발생했습니다.");
  } else {
    console.log("파일에 내용이 성공적으로 쓰였습니다.");
  }
});
