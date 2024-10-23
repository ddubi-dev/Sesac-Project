const fs = require("fs");
const path = require("path");

const directoryPath = "../../3.function"; // 현재 페이지

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    // 에러 처리를 하는 게 좋은 코드
    console.log("읽기 실패!!", err.message);
    return;
  }

  console.log(files);
  console.log(files[0]);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file); // 변경된 주소
    fs.readFile(filePath, "utf-8", (err, data) => {
      //현재 위치에서 해당 파일을 읽으려고 함
      if (err) {
        console.log("파일 내용 읽기 실패", err.message);
        return;
      }
      console.log(data);
    });
  });
});
