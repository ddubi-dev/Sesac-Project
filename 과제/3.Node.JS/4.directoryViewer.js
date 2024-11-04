import fs from "fs";
import path from "path";

const directoryPath = "./";

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    console.log(file);

    const data = fs.statSync(filePath);
    // console.log(data);

    // data.forEach((datum) => {
    if (data.isDirectory()) {
      const innerData = fs.readdirSync(filePath);
      innerData.forEach((innerDatum) => {
        console.log("..\\" + innerDatum);
      });
    }
  });
  //   });
} catch (err) {
  console.log("에러 발생", err.message);
}
