const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "example.csv",
  header: [
    { id: "column1", title: "Column 1" },
    { id: "column2", title: "Column 2" },
  ],
});

const data = [
  { column1: "값1", column2: "값2" },
  { column1: "값3", column2: "값4" },
  { column1: "값5", column2: "값6" },
  { column1: "값7", column2: "값8" },
];

csvWriter.writeRecords(data).then(() => {
  console.log("성공적으로 썼음");
});
