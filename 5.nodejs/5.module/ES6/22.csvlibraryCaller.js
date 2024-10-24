// 호출자

const { readCSV, writeCSV } = require("./21.csvlibrary");

const filePath = "hello2.csv";

content = [
  ["이름", "나이", "직업", "거주지"],
  ["김철수", 30, "개발자", "서울"],
  ["이영희", 25, "디자이너", "부산"],
  ["박민수", 35, "마케터", "대구"],
  ["최지은", 28, "엔지니어", "인천"],
];

writeCSV(filePath, content);
