import fs from "fs";
import path from "path";

const directoryPath = "./";

function checkFile(filePath) {
  fs.stat(filePath, (err, stats) => {
    // 파일에 대한 정보를 가져다가 준비가 되면 나를 불러줘(비동기)
    // 준비가 됐을 때 처리할 로직이 들어가는 위치
    if (err) {
      console.log("읽기 오류");
      return;
    }

    if (stats.isDirectory()) {
      console.log("이것은 디렉토리");
    } else if (stats.isFile()) {
      console.log("이것은 파일");
    }
  });
}

fs.readdir(directoryPath, (err, files) => {
  // 비동기 => 혼자 시킨 일 다 함..다음꺼 상관 없이 시켜졌을 때
  // 콜백함수 내용 - 디렉토리 읽기 끝난 후 호출할 내용(함수 내용)
  if (err) {
    console.log("읽기 오류");
    return;
  }

  // console.log(files);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    console.log("파일: ", filePath);
    checkFile(filePath);
  });
});
