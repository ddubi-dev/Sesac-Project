const fs = require("fs");

const filePath = "hello.csv";

function readCSV(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("파일 읽는 도중 오류 발생", err.message);
      return;
    }
    console.log(data);
    console.log(typeof data);
    const rows = data.split("\n");
    const result = rows.map((row) => {
      row.split(",");
    });
  });
  callback(result);
}

content = [
  ["이름", "나이", "직업", "거주지"],
  ["김철수", 30, "개발자", "서울"],
  ["이영희", 25, "디자이너", "부산"],
  ["박민수", 35, "마케터", "대구"],
  ["최지은", 28, "엔지니어", "인천"],
];

const csvContent = content.map((row) => row.join(",")).join("\n");

function writeCSV(filePath, csvContent) {
  // 사용자가 전달한 자료구조를 다시 string 파입으로 변환한다
  fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("파일 쓰기 오류", err.message);
      return;
    }
    console.log("파일 쓰기 완료");
  });
}

// csv_writefile(filePath, csvContent);
readCSV(filePath, (data) => {
  console.log("CSV 파일 내용 : ", data);
});

module.exports = { readCSV, writeCSV };
