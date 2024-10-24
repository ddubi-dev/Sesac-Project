const fs = require("fs");

const filePath = "hello.csv";

function csv_readFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // 분류하는이유?
      console.error("파일 읽는 도중 오류 발생", err.message);
      return;
    }
    console.log(data);
    console.log(typeof data); //string type

    // // 이 문자열을 다시 우리가 원하는 자료구조(데이터형)으로 변환 시켜줘야함
    // // 1. 데이터를 한줄한줄 구분한다.
    const rows = data.split("\n");
    // // console.log(rows);

    // // 2. 한줄 한줄 내에서, 콤마로 구분짓는다
    // for (let i = 0; i < rows.length; i++) {
    //   const row = rows[i];
    //   //   console.log(row);
    //   const columns = row.split(",");
    //   console.log(columns);
    // }

    const result = rows.map((row) => {
      row.split(",");
    });
  });
  callback(result);
}

csv_readFile();

content = [
  ["이름", "나이", "직업", "거주지"],
  ["김철수", 30, "개발자", "서울"],
  ["이영희", 25, "디자이너", "부산"],
  ["박민수", 35, "마케터", "대구"],
  ["최지은", 28, "엔지니어", "인천"],
];

const csvContent = content.map((row) => row.join(",")).join("\n");

function csv_writefile(filePath, csvContent) {
  fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("파일 쓰기 오류", err.message);
      return;
    }
    console.log("파일 쓰기 완료");
  });
}

// csv_writefile(filePath, csvContent);
csv_readfile(filePath, (data) => {
  console.log("CSV 파일 내용 : ", data);
});
